/**
 * Bakaláři System Type Definitions
 *
 * Type definitions for all data models used in the Bakaláři school system.
 * These types represent the structure of data fetched from the Bakaláři API.
 */

// ============================================================================
// GRADE TYPES (Známky)
// ============================================================================

export interface Grade {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectAbbreviation: string;
  grade: string; // "1", "2", "3", "4", "5", "A", "B", etc.
  gradeType: GradeType;
  weight: number;
  date: string; // ISO date string
  description?: string;
  teacherId: string;
  teacherName: string;
  isTemporary: boolean;
  points?: number;
  maxPoints?: number;
  note?: string;
}

export enum GradeType {
  ORAL = 'oral',
  WRITTEN = 'written',
  TEST = 'test',
  EXAM = 'exam',
  HOMEWORK = 'homework',
  PROJECT = 'project',
  OTHER = 'other',
}

export interface SubjectGradeSummary {
  subjectId: string;
  subjectName: string;
  subjectAbbreviation: string;
  averageGrade: number;
  finalGrade?: string;
  grades: Grade[];
  teacherName: string;
  totalWeight: number;
}

export interface GradeSemesterSummary {
  semester: 1 | 2;
  subjects: SubjectGradeSummary[];
  overallAverage: number;
}

// ============================================================================
// SCHEDULE TYPES (Rozvrh)
// ============================================================================

export interface Lesson {
  id: string;
  dayOfWeek: DayOfWeek;
  period: number; // 0-based lesson number
  startTime: string; // "08:00"
  endTime: string; // "08:45"
  subjectId: string;
  subjectName: string;
  subjectAbbreviation: string;
  teacherId: string;
  teacherName: string;
  teacherAbbreviation: string;
  roomId: string;
  roomName: string;
  groupName?: string; // For split classes (e.g., "Skupina A")
  isOnline: boolean;
  note?: string;
}

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
}

export interface DaySchedule {
  day: DayOfWeek;
  date: string; // ISO date string
  lessons: (Lesson | null)[]; // null for empty periods
  specialNote?: string; // For special days
}

export interface WeekSchedule {
  weekNumber: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  days: DaySchedule[];
}

export interface ScheduleChange {
  id: string;
  date: string; // ISO date string
  period: number;
  changeType: ScheduleChangeType;
  originalSubject?: string;
  newSubject?: string;
  originalTeacher?: string;
  newTeacher?: string;
  originalRoom?: string;
  newRoom?: string;
  note: string;
}

export enum ScheduleChangeType {
  SUBSTITUTION = 'substitution',
  CANCELLATION = 'cancellation',
  ROOM_CHANGE = 'room_change',
  TEACHER_CHANGE = 'teacher_change',
  OTHER = 'other',
}

// ============================================================================
// TASK/ASSIGNMENT TYPES (Úkoly)
// ============================================================================

export interface Assignment {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectAbbreviation: string;
  title: string;
  description: string;
  assignedDate: string; // ISO date string
  dueDate: string; // ISO date string
  teacherId: string;
  teacherName: string;
  status: AssignmentStatus;
  attachments: AssignmentAttachment[];
  submittedDate?: string; // ISO date string
  grade?: string;
  feedback?: string;
  points?: number;
  maxPoints?: number;
}

export enum AssignmentStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  GRADED = 'graded',
  LATE = 'late',
  MISSING = 'missing',
}

export interface AssignmentAttachment {
  id: string;
  fileName: string;
  fileSize: number; // in bytes
  fileType: string; // MIME type
  url: string;
  uploadedDate: string; // ISO date string
}

export interface AssignmentSubmission {
  assignmentId: string;
  studentId: string;
  submittedDate: string; // ISO date string
  files: AssignmentAttachment[];
  note?: string;
}

// ============================================================================
// COMMUNICATION TYPES (Komunikace)
// ============================================================================

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  recipientRole: UserRole;
  subject: string;
  content: string;
  sentDate: string; // ISO date string
  readDate?: string; // ISO date string
  isRead: boolean;
  attachments: MessageAttachment[];
  threadId?: string; // For message threads
  replyToId?: string; // For replies
}

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  PARENT = 'parent',
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
}

export interface MessageThread {
  id: string;
  subject: string;
  participants: MessageParticipant[];
  messages: Message[];
  lastMessageDate: string; // ISO date string
  unreadCount: number;
}

export interface MessageParticipant {
  userId: string;
  userName: string;
  userRole: UserRole;
}

// ============================================================================
// ATTENDANCE TYPES (Docházka)
// ============================================================================

export interface Absence {
  id: string;
  date: string; // ISO date string
  period?: number; // If specific lesson, otherwise whole day
  type: AbsenceType;
  isExcused: boolean;
  subjectId?: string;
  subjectName?: string;
  teacherId?: string;
  teacherName?: string;
  note?: string;
  excuseNote?: string;
  excusedBy?: string;
  excusedDate?: string; // ISO date string
}

export enum AbsenceType {
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
  ILLNESS = 'illness',
  PERMISSION = 'permission',
}

export interface AbsenceSummary {
  totalLessons: number;
  absentLessons: number;
  excusedLessons: number;
  unexcusedLessons: number;
  lateLessons: number;
  absencePercentage: number;
  bySubject: {
    [subjectId: string]: {
      subjectName: string;
      total: number;
      absent: number;
      excused: number;
      unexcused: number;
    };
  };
}

// ============================================================================
// PAYMENT TYPES (Platby)
// ============================================================================

export interface Payment {
  id: string;
  title: string;
  description: string;
  amount: number; // in CZK
  currency: string; // "CZK"
  dueDate: string; // ISO date string
  status: PaymentStatus;
  category: PaymentCategory;
  paidDate?: string; // ISO date string
  paymentMethod?: string;
  variableSymbol?: string;
  accountNumber?: string;
  note?: string;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentCategory {
  TUITION = 'tuition',
  TEXTBOOKS = 'textbooks',
  TRIP = 'trip',
  EVENT = 'event',
  CAFETERIA = 'cafeteria',
  OTHER = 'other',
}

export interface PaymentSummary {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  payments: Payment[];
}

// ============================================================================
// STUDENT INFO TYPES
// ============================================================================

export interface StudentInfo {
  id: string;
  studentId: string; // School ID number
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  classId: string;
  className: string;
  classYear: number;
  dateOfBirth: string; // ISO date string
  address?: string;
  phone?: string;
  parentContact?: ParentContact;
}

export interface ParentContact {
  fatherName?: string;
  fatherEmail?: string;
  fatherPhone?: string;
  motherName?: string;
  motherEmail?: string;
  motherPhone?: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface BakalariApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface BakalariAuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  tokenType: string;
}

// ============================================================================
// FILTER & PAGINATION TYPES
// ============================================================================

export interface GradeFilter {
  subjectId?: string;
  semester?: 1 | 2;
  dateFrom?: string;
  dateTo?: string;
  gradeType?: GradeType;
}

export interface AssignmentFilter {
  subjectId?: string;
  status?: AssignmentStatus;
  dateFrom?: string;
  dateTo?: string;
  includeGraded?: boolean;
}

export interface MessageFilter {
  senderId?: string;
  dateFrom?: string;
  dateTo?: string;
  isRead?: boolean;
  hasAttachments?: boolean;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
