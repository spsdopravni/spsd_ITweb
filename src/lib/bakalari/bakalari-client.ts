/**
 * Bakaláři API v3 Client
 *
 * Real implementation for mot-spsd.bakalari.cz
 * Based on official Bakaláři API v3 documentation
 *
 * @see https://github.com/bakalari-api/bakalari-api-v3
 */

export interface BakalariAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
  'bak:ApiVersion'?: string;
  'bak:AppVersion'?: string;
  'bak:UserId'?: string;
}

export interface BakalariClientConfig {
  baseUrl: string;
  accessToken?: string;
  refreshToken?: string;
}

export class BakalariClient {
  private baseUrl: string;
  private accessToken?: string;
  private refreshToken?: string;
  private tokenExpiresAt?: Date;

  constructor(config: BakalariClientConfig) {
    // Ensure baseUrl doesn't end with slash
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.accessToken = config.accessToken;
    this.refreshToken = config.refreshToken;
  }

  /**
   * Authenticate with username and password
   */
  async authenticate(username: string, password: string): Promise<BakalariAuthResponse> {
    const params = new URLSearchParams({
      client_id: 'ANDR',
      grant_type: 'password',
      username: username,
      password: password,
    });

    const response = await fetch(`${this.baseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Authentication failed: ${error}`);
    }

    const data: BakalariAuthResponse = await response.json();

    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenExpiresAt = new Date(Date.now() + (data.expires_in * 1000));

    return data;
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAuth(): Promise<BakalariAuthResponse> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const params = new URLSearchParams({
      client_id: 'ANDR',
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken,
    });

    const response = await fetch(`${this.baseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data: BakalariAuthResponse = await response.json();

    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenExpiresAt = new Date(Date.now() + (data.expires_in * 1000));

    return data;
  }

  /**
   * Make authenticated API request
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Please call authenticate() first.');
    }

    // Check if token needs refresh (refresh 5 min before expiry)
    if (this.tokenExpiresAt && this.tokenExpiresAt.getTime() - Date.now() < 5 * 60 * 1000) {
      await this.refreshAuth();
    }

    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle 401 - try to refresh token once
    if (response.status === 401 && this.refreshToken) {
      await this.refreshAuth();

      // Retry request with new token
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!retryResponse.ok) {
        throw new Error(`API request failed: ${retryResponse.status}`);
      }

      return retryResponse.json();
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  // ============================================================================
  // USER & STUDENT INFO
  // ============================================================================

  /**
   * Get current user information
   */
  async getUserInfo(): Promise<unknown> {
    return this.request('/api/3/user');
  }

  // ============================================================================
  // GRADES (Známky)
  // ============================================================================

  /**
   * Get all grades
   */
  async getGrades(): Promise<unknown> {
    return this.request('/api/3/marks');
  }

  /**
   * Get final grades
   */
  async getFinalGrades(): Promise<unknown> {
    return this.request('/api/3/marks/final');
  }

  /**
   * Get subjects
   */
  async getSubjects(): Promise<unknown> {
    return this.request('/api/3/subjects');
  }

  // ============================================================================
  // TIMETABLE (Rozvrh)
  // ============================================================================

  /**
   * Get permanent timetable
   */
  async getPermanentTimetable(): Promise<unknown> {
    return this.request('/api/3/timetable/permanent');
  }

  /**
   * Get actual timetable for a specific date
   * @param date Format: YYYY-MM-DD
   */
  async getActualTimetable(date: string): Promise<unknown> {
    return this.request(`/api/3/timetable/actual?date=${date}`);
  }

  /**
   * Get substitutions
   */
  async getSubstitutions(): Promise<unknown> {
    return this.request('/api/3/substitutions');
  }

  // ============================================================================
  // ABSENCES (Docházka)
  // ============================================================================

  /**
   * Get student absences
   */
  async getAbsences(): Promise<unknown> {
    return this.request('/api/3/absence/student');
  }

  // ============================================================================
  // HOMEWORK (Úkoly)
  // ============================================================================

  /**
   * Get homework assignments
   * @param from Optional start date (YYYY-MM-DD)
   */
  async getHomework(from?: string): Promise<unknown> {
    const params = from ? `?from=${from}` : '';
    return this.request(`/api/3/homeworks${params}`);
  }

  // ============================================================================
  // MESSAGES (Komunikace) - READ ONLY
  // ============================================================================

  /**
   * Get received messages
   */
  async getReceivedMessages(): Promise<unknown> {
    return this.request('/api/3/komens/messages/received');
  }

  /**
   * Get sent messages
   */
  async getSentMessages(): Promise<unknown> {
    return this.request('/api/3/komens/messages/sent');
  }

  /**
   * Get specific message
   * @param messageId Message ID
   */
  async getMessage(messageId: string): Promise<unknown> {
    return this.request(`/api/3/komens/message/${messageId}`);
  }

  // NOTE: Message sending is intentionally NOT implemented
  // As per requirements, sending messages is disabled

  // ============================================================================
  // EVENTS (Akce)
  // ============================================================================

  /**
   * Get all events
   */
  async getEvents(): Promise<unknown> {
    return this.request('/api/3/events');
  }

  /**
   * Get user's events
   */
  async getMyEvents(): Promise<unknown> {
    return this.request('/api/3/events/my');
  }

  /**
   * Get public events
   */
  async getPublicEvents(): Promise<unknown> {
    return this.request('/api/3/events/public');
  }

  // ============================================================================
  // PAYMENTS (Platby)
  // ============================================================================

  /**
   * Get class fund payments
   */
  async getClassFundPayments(): Promise<unknown> {
    return this.request('/api/3/payments/classfund');
  }

  // ============================================================================
  // BULK DATA FETCH
  // ============================================================================

  /**
   * Fetch all available data from Bakaláři
   * Returns all data in one object
   */
  async fetchAllData(): Promise<{
    user: unknown;
    grades: unknown;
    finalGrades: unknown;
    subjects: unknown;
    permanentTimetable: unknown;
    actualTimetable: unknown;
    substitutions: unknown;
    absences: unknown;
    homework: unknown;
    receivedMessages: unknown;
    sentMessages: unknown;
    events: unknown;
    myEvents: unknown;
    publicEvents: unknown;
    classFundPayments: unknown;
  }> {
    try {
      const today = new Date().toISOString().split('T')[0];

      const [
        user,
        grades,
        finalGrades,
        subjects,
        permanentTimetable,
        actualTimetable,
        substitutions,
        absences,
        homework,
        receivedMessages,
        sentMessages,
        events,
        myEvents,
        publicEvents,
        classFundPayments,
      ] = await Promise.allSettled([
        this.getUserInfo(),
        this.getGrades(),
        this.getFinalGrades(),
        this.getSubjects(),
        this.getPermanentTimetable(),
        this.getActualTimetable(today),
        this.getSubstitutions(),
        this.getAbsences(),
        this.getHomework(),
        this.getReceivedMessages(),
        this.getSentMessages(),
        this.getEvents(),
        this.getMyEvents(),
        this.getPublicEvents(),
        this.getClassFundPayments(),
      ]);

      return {
        user: user.status === 'fulfilled' ? user.value : null,
        grades: grades.status === 'fulfilled' ? grades.value : null,
        finalGrades: finalGrades.status === 'fulfilled' ? finalGrades.value : null,
        subjects: subjects.status === 'fulfilled' ? subjects.value : null,
        permanentTimetable: permanentTimetable.status === 'fulfilled' ? permanentTimetable.value : null,
        actualTimetable: actualTimetable.status === 'fulfilled' ? actualTimetable.value : null,
        substitutions: substitutions.status === 'fulfilled' ? substitutions.value : null,
        absences: absences.status === 'fulfilled' ? absences.value : null,
        homework: homework.status === 'fulfilled' ? homework.value : null,
        receivedMessages: receivedMessages.status === 'fulfilled' ? receivedMessages.value : null,
        sentMessages: sentMessages.status === 'fulfilled' ? sentMessages.value : null,
        events: events.status === 'fulfilled' ? events.value : null,
        myEvents: myEvents.status === 'fulfilled' ? myEvents.value : null,
        publicEvents: publicEvents.status === 'fulfilled' ? publicEvents.value : null,
        classFundPayments: classFundPayments.status === 'fulfilled' ? classFundPayments.value : null,
      };
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  }
}

/**
 * Create a Bakaláři client for mot-spsd.bakalari.cz
 */
export function createBakalariClient(accessToken?: string, refreshToken?: string): BakalariClient {
  return new BakalariClient({
    baseUrl: 'https://mot-spsd.bakalari.cz',
    accessToken,
    refreshToken,
  });
}
