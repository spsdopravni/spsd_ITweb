/**
 * Moodle System Type Definitions
 *
 * Type definitions for Moodle LMS integration.
 * These types represent the structure of data fetched from the Moodle API.
 */

// ============================================================================
// COURSE TYPES
// ============================================================================

export interface MoodleCourse {
  id: number;
  shortName: string;
  fullName: string;
  displayName: string;
  summary: string;
  summaryFormat: number;
  startDate: number; // Unix timestamp
  endDate: number; // Unix timestamp
  categoryId: number;
  categoryName: string;
  visible: boolean;
  format: string; // "topics", "weeks", etc.
  showGrades: boolean;
  completed: boolean;
  progress?: number; // 0-100
  imageUrl?: string;
}

export interface MoodleCourseContent {
  id: number;
  name: string;
  visible: boolean;
  summary: string;
  summaryFormat: number;
  section: number;
  modules: MoodleModule[];
}

// ============================================================================
// MODULE TYPES
// ============================================================================

export interface MoodleModule {
  id: number;
  name: string;
  description?: string;
  modName: ModuleType;
  modIcon: string;
  url: string;
  visible: boolean;
  completionData?: CompletionData;
  contents?: MoodleModuleContent[];
  dueDate?: number; // Unix timestamp
}

export enum ModuleType {
  ASSIGNMENT = 'assign',
  QUIZ = 'quiz',
  FORUM = 'forum',
  RESOURCE = 'resource',
  PAGE = 'page',
  URL = 'url',
  BOOK = 'book',
  FOLDER = 'folder',
  LESSON = 'lesson',
  WORKSHOP = 'workshop',
  FEEDBACK = 'feedback',
  CHOICE = 'choice',
  GLOSSARY = 'glossary',
  WIKI = 'wiki',
}

export interface CompletionData {
  state: CompletionState;
  timecompleted?: number; // Unix timestamp
  tracking: number;
}

export enum CompletionState {
  INCOMPLETE = 0,
  COMPLETE = 1,
  COMPLETE_PASS = 2,
  COMPLETE_FAIL = 3,
}

export interface MoodleModuleContent {
  type: string; // "file", "url"
  filename: string;
  filepath: string;
  filesize: number;
  fileurl: string;
  timecreated: number; // Unix timestamp
  timemodified: number; // Unix timestamp
  mimetype: string;
}

// ============================================================================
// ASSIGNMENT TYPES
// ============================================================================

export interface MoodleAssignment {
  id: number;
  courseId: number;
  courseName: string;
  name: string;
  intro: string;
  introFormat: number;
  dueDate?: number; // Unix timestamp
  cutoffDate?: number; // Unix timestamp
  allowSubmissionsFromDate?: number; // Unix timestamp
  grade: number;
  timeModified: number; // Unix timestamp
  completionSubmit: boolean;
  requireSubmissionStatement: boolean;
  configs?: AssignmentConfig[];
  submission?: AssignmentSubmission;
}

export interface AssignmentConfig {
  plugin: string;
  subtype: string;
  name: string;
  value: string;
}

export interface AssignmentSubmission {
  id: number;
  userId: number;
  assignmentId: number;
  status: MoodleSubmissionStatus;
  timeCreated: number; // Unix timestamp
  timeModified: number; // Unix timestamp
  grade?: number;
  gradeDate?: number; // Unix timestamp
  grader?: number;
  feedback?: string;
  plugins?: SubmissionPlugin[];
}

export enum MoodleSubmissionStatus {
  NEW = 'new',
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  REOPENED = 'reopened',
}

export interface SubmissionPlugin {
  type: string;
  name: string;
  files?: MoodleFile[];
  onlineText?: string;
}

export interface MoodleFile {
  filename: string;
  filesize: number;
  fileurl: string;
  timecreated: number;
  timemodified: number;
  mimetype: string;
}

// ============================================================================
// GRADE TYPES
// ============================================================================

export interface MoodleGrade {
  courseId: number;
  courseName: string;
  itemName: string;
  itemType: string;
  itemModule: string;
  grade: string;
  gradeDateSubmitted?: number; // Unix timestamp
  gradeDateGraded?: number; // Unix timestamp
  gradeMin: number;
  gradeMax: number;
  rangeFormatted: string;
  percentage: number;
  feedback?: string;
  graderName?: string;
}

export interface MoodleGradeOverview {
  courseId: number;
  courseName: string;
  gradeFormatted: string;
  gradeRaw?: number;
  gradeMax?: number;
  gradePercentage?: number;
  items: MoodleGrade[];
}

// ============================================================================
// CALENDAR/EVENT TYPES
// ============================================================================

export interface MoodleEvent {
  id: number;
  name: string;
  description: string;
  descriptionFormat: number;
  categoryId?: number;
  groupId?: number;
  userId?: number;
  courseId?: number;
  courseName?: string;
  timeStart: number; // Unix timestamp
  timeDuration: number; // in seconds
  timeSort: number; // Unix timestamp
  timeModified: number; // Unix timestamp
  eventType: EventType;
  url?: string;
  icon?: {
    key: string;
    component: string;
    alttext: string;
  };
}

export enum EventType {
  SITE = 'site',
  USER = 'user',
  CATEGORY = 'category',
  COURSE = 'course',
  GROUP = 'group',
}

// ============================================================================
// FORUM TYPES
// ============================================================================

export interface MoodleForum {
  id: number;
  courseId: number;
  courseName: string;
  name: string;
  intro: string;
  introFormat: number;
  type: ForumType;
  discussions: MoodleDiscussion[];
  numDiscussions: number;
  unreadPostsCount: number;
}

export enum ForumType {
  SINGLE = 'single',
  EACHUSER = 'eachuser',
  QANDA = 'qanda',
  STANDARD = 'standard',
  BLOG = 'blog',
}

export interface MoodleDiscussion {
  id: number;
  forumId: number;
  name: string;
  firstPost: number;
  userId: number;
  userName: string;
  userPictureUrl?: string;
  timeCreated: number; // Unix timestamp
  timeModified: number; // Unix timestamp
  numReplies: number;
  unreadPosts: number;
  pinned: boolean;
  locked: boolean;
}

export interface MoodlePost {
  id: number;
  discussionId: number;
  parentId: number;
  userId: number;
  userName: string;
  userPictureUrl?: string;
  created: number; // Unix timestamp
  modified: number; // Unix timestamp
  subject: string;
  message: string;
  messageFormat: number;
  attachments?: MoodleFile[];
  replies?: MoodlePost[];
}

// ============================================================================
// QUIZ TYPES
// ============================================================================

export interface MoodleQuiz {
  id: number;
  courseId: number;
  courseName: string;
  name: string;
  intro: string;
  introFormat: number;
  timeOpen?: number; // Unix timestamp
  timeClose?: number; // Unix timestamp
  timeLimit?: number; // in seconds
  attempts: number;
  gradeMethod: number;
  hasQuestions: boolean;
  hasFeedback: boolean;
  bestGrade?: number;
}

export interface MoodleQuizAttempt {
  id: number;
  quizId: number;
  userId: number;
  attemptNumber: number;
  state: QuizAttemptState;
  timeStart: number; // Unix timestamp
  timeFinish?: number; // Unix timestamp
  timeModified: number; // Unix timestamp
  grade?: number;
  feedback?: string;
}

export enum QuizAttemptState {
  IN_PROGRESS = 'inprogress',
  OVERDUE = 'overdue',
  FINISHED = 'finished',
  ABANDONED = 'abandoned',
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface MoodleNotification {
  id: number;
  userIdFrom: number;
  userFromFullName: string;
  subject: string;
  shortMessage: string;
  fullMessage: string;
  fullMessageFormat: number;
  timeCreated: number; // Unix timestamp
  read: boolean;
  deleted: boolean;
  component: string;
  eventType: string;
  contextUrl?: string;
  iconUrl?: string;
}

// ============================================================================
// MESSAGE TYPES
// ============================================================================

export interface MoodleMessage {
  id: number;
  userIdFrom: number;
  userFromFullName: string;
  userFromProfileImageUrl?: string;
  userIdTo: number;
  subject?: string;
  text: string;
  fullMessage: string;
  fullMessageFormat: number;
  smallMessage: string;
  timeCreated: number; // Unix timestamp
  read: boolean;
}

export interface MoodleConversation {
  id: number;
  name?: string;
  type: ConversationType;
  memberCount: number;
  isMuted: boolean;
  isFavourite: boolean;
  isRead: boolean;
  unreadCount: number;
  members: ConversationMember[];
  messages: MoodleMessage[];
}

export enum ConversationType {
  INDIVIDUAL = 1,
  GROUP = 2,
  SELF = 3,
}

export interface ConversationMember {
  id: number;
  fullName: string;
  profileImageUrl?: string;
  isOnline: boolean;
  showOnlineStatus: boolean;
  isBlocked: boolean;
  isContact: boolean;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface MoodleApiResponse<T> {
  data?: T;
  exception?: string;
  errorcode?: string;
  message?: string;
  warnings?: MoodleWarning[];
}

export interface MoodleWarning {
  item?: string;
  itemid?: number;
  warningcode: string;
  message: string;
}

// ============================================================================
// USER PREFERENCES
// ============================================================================

export interface MoodleUserPreferences {
  userId: number;
  courseSortOrder?: string;
  messageProvider?: string;
  emailFormat?: number;
  timezone?: string;
  language?: string;
}
