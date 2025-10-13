/**
 * Bakaláři API Client
 *
 * Client for interacting with the Bakaláři school system API.
 * Handles authentication, request/response processing, and error handling.
 *
 * @see https://github.com/bakalari-api/bakalari-api-v3
 */

import type {
  BakalariAuthToken,
  Grade,
  WeekSchedule,
  Assignment,
  Message,
  Absence,
  Payment,
  StudentInfo,
  GradeSemesterSummary,
  AbsenceSummary,
  PaymentSummary,
} from '@/types/bakalari';

// Bakaláři API configuration
const BAKALARI_BASE_URL = process.env.BAKALARI_API_URL || 'https://bakalari.spsmot.cz/api/v3';
const BAKALARI_APP_VERSION = '1.0.0';

/**
 * Bakaláři API Client
 */
export class BakalariClient {
  private baseUrl: string;
  private accessToken?: string;
  private refreshToken?: string;

  constructor(accessToken?: string, refreshToken?: string) {
    this.baseUrl = BAKALARI_BASE_URL;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  /**
   * Authenticate with Bakaláři system
   * @param username Student username
   * @param password Student password
   */
  async authenticate(username: string, password: string): Promise<BakalariAuthToken> {
    const response = await this.request<BakalariAuthToken>('/login', {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'SPSD_IT_Portal',
        grant_type: 'password',
        username,
        password,
      }),
      skipAuth: true,
    });

    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;

    return response;
  }

  /**
   * Refresh authentication token
   */
  async refreshAuth(): Promise<BakalariAuthToken> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.request<BakalariAuthToken>('/login', {
      method: 'POST',
      body: JSON.stringify({
        client_id: 'SPSD_IT_Portal',
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
      }),
      skipAuth: true,
    });

    this.accessToken = response.accessToken;
    this.refreshToken = response.refreshToken;

    return response;
  }

  // ============================================================================
  // GRADES (Známky)
  // ============================================================================

  /**
   * Get all grades for current user
   */
  async getGrades(): Promise<Grade[]> {
    return this.request<Grade[]>('/marks');
  }

  /**
   * Get grades summary by semester
   */
  async getGradesSummary(semester: 1 | 2): Promise<GradeSemesterSummary> {
    return this.request<GradeSemesterSummary>(`/marks/summary?semester=${semester}`);
  }

  /**
   * Get grades for specific subject
   */
  async getGradesBySubject(subjectId: string): Promise<Grade[]> {
    return this.request<Grade[]>(`/marks?subjectId=${subjectId}`);
  }

  // ============================================================================
  // SCHEDULE (Rozvrh)
  // ============================================================================

  /**
   * Get permanent schedule (regular timetable)
   */
  async getPermanentSchedule(): Promise<WeekSchedule> {
    return this.request<WeekSchedule>('/timetable/permanent');
  }

  /**
   * Get actual schedule (with substitutions for specific date)
   */
  async getActualSchedule(date: string): Promise<WeekSchedule> {
    return this.request<WeekSchedule>(`/timetable/actual?date=${date}`);
  }

  /**
   * Get current week schedule
   */
  async getCurrentWeekSchedule(): Promise<WeekSchedule> {
    const today = new Date().toISOString().split('T')[0];
    return this.getActualSchedule(today);
  }

  // ============================================================================
  // ASSIGNMENTS (Úkoly)
  // ============================================================================

  /**
   * Get all assignments
   */
  async getAssignments(): Promise<Assignment[]> {
    return this.request<Assignment[]>('/homeworks');
  }

  /**
   * Get assignment by ID
   */
  async getAssignment(id: string): Promise<Assignment> {
    return this.request<Assignment>(`/homeworks/${id}`);
  }

  /**
   * Get assignments due in next N days
   */
  async getUpcomingAssignments(days: number = 7): Promise<Assignment[]> {
    const assignments = await this.getAssignments();
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

    return assignments.filter((assignment) => {
      const dueDate = new Date(assignment.dueDate);
      return dueDate >= today && dueDate <= futureDate;
    });
  }

  // ============================================================================
  // MESSAGES (Komunikace)
  // ============================================================================

  /**
   * Get received messages
   */
  async getReceivedMessages(): Promise<Message[]> {
    return this.request<Message[]>('/komens/received');
  }

  /**
   * Get sent messages
   */
  async getSentMessages(): Promise<Message[]> {
    return this.request<Message[]>('/komens/sent');
  }

  /**
   * Get message by ID
   */
  async getMessage(id: string): Promise<Message> {
    return this.request<Message>(`/komens/${id}`);
  }

  /**
   * Send a message
   */
  async sendMessage(recipientId: string, subject: string, content: string): Promise<void> {
    await this.request('/komens/send', {
      method: 'POST',
      body: JSON.stringify({
        recipientId,
        subject,
        content,
      }),
    });
  }

  /**
   * Mark message as read
   */
  async markMessageAsRead(id: string): Promise<void> {
    await this.request(`/komens/${id}/read`, {
      method: 'PUT',
    });
  }

  // ============================================================================
  // ATTENDANCE (Docházka)
  // ============================================================================

  /**
   * Get absence records
   */
  async getAbsences(): Promise<Absence[]> {
    return this.request<Absence[]>('/absence/student');
  }

  /**
   * Get absence summary
   */
  async getAbsenceSummary(): Promise<AbsenceSummary> {
    return this.request<AbsenceSummary>('/absence/student/summary');
  }

  /**
   * Get absences for specific date range
   */
  async getAbsencesByDateRange(from: string, to: string): Promise<Absence[]> {
    return this.request<Absence[]>(`/absence/student?from=${from}&to=${to}`);
  }

  // ============================================================================
  // PAYMENTS (Platby)
  // ============================================================================

  /**
   * Get payment records
   */
  async getPayments(): Promise<Payment[]> {
    return this.request<Payment[]>('/payments');
  }

  /**
   * Get payment summary
   */
  async getPaymentSummary(): Promise<PaymentSummary> {
    return this.request<PaymentSummary>('/payments/summary');
  }

  /**
   * Get payment by ID
   */
  async getPayment(id: string): Promise<Payment> {
    return this.request<Payment>(`/payments/${id}`);
  }

  // ============================================================================
  // STUDENT INFO
  // ============================================================================

  /**
   * Get current user info
   */
  async getUserInfo(): Promise<StudentInfo> {
    return this.request<StudentInfo>('/user');
  }

  // ============================================================================
  // INTERNAL REQUEST HANDLER
  // ============================================================================

  /**
   * Make a request to the Bakaláři API
   */
  private async request<T>(
    endpoint: string,
    options: {
      method?: string;
      body?: string;
      skipAuth?: boolean;
    } = {}
  ): Promise<T> {
    const { method = 'GET', body, skipAuth = false } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-App-Version': BAKALARI_APP_VERSION,
    };

    if (!skipAuth && this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers,
        body,
      });

      if (!response.ok) {
        // Try to refresh token if unauthorized
        if (response.status === 401 && !skipAuth && this.refreshToken) {
          await this.refreshAuth();
          // Retry the request with new token
          return this.request<T>(endpoint, options);
        }

        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Bakaláři API error: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('Bakaláři API request failed:', error);
      throw error;
    }
  }
}

/**
 * Create a Bakaláři client instance
 */
export function createBakalariClient(accessToken?: string, refreshToken?: string): BakalariClient {
  return new BakalariClient(accessToken, refreshToken);
}

/**
 * Bakaláři API Error
 */
export class BakalariApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode?: string
  ) {
    super(message);
    this.name = 'BakalariApiError';
  }
}
