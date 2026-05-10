/**
 * CLF-C02 official exam domains with their published weights.
 * Used to weight question pools and report per-domain scores.
 */
export type ExamDomain =
  | 'cloud-concepts'      // 24%
  | 'security'            // 30%
  | 'tech-services'       // 34%
  | 'billing-support';    // 12%

/** Where a piece of content was sourced from (for transparency). */
export type ContentSource =
  | 'maarek'              // Stephane Maarek course
  | 'aws-docs'            // Official AWS docs
  | 'exam-guide'          // Official CLF-C02 Exam Guide PDF
  | 'tutorials-dojo'      // Tutorials Dojo practice exams
  | 'aws-skill-builder';  // AWS Skill Builder free questions

export interface Service {
  id: string;
  abbreviation: string;
  fullName: string;
  category: string;
  level: 'clf' | 'saa' | 'sap';
  /** 1=easy, 2=medium, 3=hard. Maps to importance in CLF-C02 exam. */
  difficulty: 1 | 2 | 3;
  /** How frequently this service appears in exam questions. */
  examFrequency: 'high' | 'medium' | 'low';
  description: Record<string, string>;
  analogy: Record<string, string>;
  examTips: Array<{
    key: string;
    content: Record<string, string>;
  }>;
  pricing: Record<string, string>;
  /** Connected services shown in detail panel and on map. */
  connections: string[];
  /** Official AWS documentation URL. */
  docsUrl?: string;
  visual: {
    color: string;
    icon?: string;
  };
  /** Optional memory hook to help recall the service (e.g., "S3 = Simple Storage Service, like Dropbox for buckets"). */
  mnemonic?: Record<string, string>;
  /** Which CLF-C02 exam domain(s) this service is tested under. */
  examDomains?: ExamDomain[];
  learned?: boolean;
  confidenceLevel?: number;
  nextReview?: string;
}

export interface Category {
  id: string;
  label: Record<string, string>;
  description: Record<string, string>;
  color: string;
  services: string[];
}

/**
 * AWS knowledge concepts that aren't services — global infrastructure,
 * frameworks (Well-Architected, CAF), shared responsibility, pricing models, etc.
 * These appear in the CLF-C02 exam alongside service-specific questions.
 */
export interface Concept {
  id: string;
  /** Display name shown in UI (e.g., "Availability Zones"). */
  title: Record<string, string>;
  /** Short tagline shown on cards/search results. */
  tagline: Record<string, string>;
  /** Topic group used for filtering. */
  topic:
    | 'global-infrastructure'
    | 'well-architected'
    | 'shared-responsibility'
    | 'pricing'
    | 'cloud-fundamentals'
    | 'support'
    | 'compliance'
    | 'caf';
  /** Search aliases ("AZ", "availability zone", "data center" etc.). */
  aliases: string[];
  /** Markdown-ish sections that render as the modal body. */
  sections: Array<{
    heading: Record<string, string>;
    /** Plain paragraph or bullet list — bullets start each line with "- ". */
    body: Record<string, string>;
  }>;
  /** Quick-reference key facts (memorize-these style). */
  keyFacts: Array<Record<string, string>>;
  /** Service IDs connected to this concept. */
  relatedServices?: string[];
  /** Other concept IDs to suggest. */
  relatedConcepts?: string[];
  docsUrl?: string;
  /** Importance for the exam — drives sort order in concept list. */
  examFrequency: 'high' | 'medium' | 'low';
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'matching' | 'fill_blank';
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Topical categories for filtering (e.g., 'storage', 'compute'). */
  categories: string[];
  /** Official CLF-C02 exam domain(s) this question maps to. */
  examDomain?: ExamDomain;
  question: Record<string, string>;
  options?: Array<Record<string, string>>;
  correct: number | boolean;
  explanation: Record<string, string>;
  hint?: Record<string, string>;
  relatedServices: string[];
  /** Concept IDs (from concepts.ts) that this question tests. */
  relatedConcepts?: string[];
  /** Where the question pattern is sourced from. */
  source?: ContentSource;
}

export interface QuizSession {
  id: string;
  type: 'quick' | 'service' | 'category' | 'exam';
  serviceId?: string;
  categoryId?: string;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: {
    questionId: string;
    selectedAnswer: number | boolean;
    correct: boolean;
    timeSpent: number;
  }[];
  startTime: number;
  endTime?: number;
}

export interface UserProgress {
  userId: string;
  streak: {
    current: number;
    longest: number;
    lastActivity: string;
  };
  totalXp: number;
  serviceProgress: Record<string, {
    status: 'new' | 'learning' | 'review' | 'mastered';
    confidenceLevel: number;
    nextReview: string;
    reviewCount: number;
    correctStreak: number;
    totalAttempts: number;
    correctAttempts: number;
  }>;
  /** Spaced-repetition queue (simplified SM-2). Each entry surfaces when dueAt <= now. */
  reviewQueue?: Array<{
    serviceId: string;
    /** ISO timestamp when this item should next surface. */
    dueAt: string;
    /** Current interval in days (0 = same day, 1, 3, 7, 14, 30). */
    interval: number;
    /** Number of correct reps in a row — drives interval growth. */
    streak: number;
  }>;
  /** Per-day record of Daily Challenge completion (key = YYYY-MM-DD). */
  dailyChallenge?: Record<string, {
    completed: boolean;
    score: number; // 0-5
    totalQuestions: number;
  }>;
  /** Practice exam attempts (full 65q simulations). */
  examAttempts?: Array<{
    id: string;
    startedAt: string;
    completedAt?: string;
    score: number;       // 0-100
    passed: boolean;     // score >= 70
    domainScores: Record<ExamDomain, { correct: number; total: number }>;
    timeSpent: number;   // seconds
  }>;
}

export type Language = 'en' | 'ro' | 'es' | 'de';

/**
 * Side-by-side comparison of multiple services on the same set of features.
 * Rendered as a feature × service grid; each cell color-coded.
 */
export interface Comparison {
  id: string;
  title: Record<string, string>;
  /** One-line summary shown above the table. */
  tagline: Record<string, string>;
  /**
   * Column keys for the table.
   * If a key matches an entry in `services.ts`, it becomes a clickable service link.
   * Otherwise, render the label from `columnLabels[key]`.
   */
  serviceIds: string[];
  /** Optional labels for columns that are NOT services (e.g., "SG", "NACL", "User", "Role"). */
  columnLabels?: Record<string, Record<string, string>>;
  /** Each row = a feature being compared across services. */
  rows: Array<{
    /** Feature label shown in the leftmost column. */
    feature: Record<string, string>;
    /** Cell value for each serviceId (keyed by serviceId). */
    cells: Record<string, {
      /** Short text shown in the cell. */
      value: Record<string, string>;
      /** Color hint: 'pass' (green), 'fail' (red), 'partial' (amber), 'na' (gray), 'neutral' (default). */
      hint?: 'pass' | 'fail' | 'partial' | 'na' | 'neutral';
    }>;
  }>;
  /** Memorable rule-of-thumb shown at bottom of the table. */
  rulesOfThumb?: Array<Record<string, string>>;
  examFrequency: 'high' | 'medium' | 'low';
}

/**
 * Curated, ordered sequence of services to study together.
 * E.g., "Foundations" = the 10 most-tested services beginners must know.
 */
export interface LearningPath {
  id: string;
  title: Record<string, string>;
  tagline: Record<string, string>;
  /** Estimated time to complete in minutes (study + quiz). */
  estimatedMinutes: number;
  /** Difficulty signal shown on the path card. */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Ordered list of step IDs (services or concepts). */
  steps: Array<{
    kind: 'service' | 'concept' | 'comparison';
    /** ID of the underlying entity. */
    refId: string;
    /** Optional tip explaining why this step is here. */
    note?: Record<string, string>;
  }>;
  /** Prerequisite path IDs (e.g., must complete "Foundations" before "Storage Deep Dive"). */
  prerequisites?: string[];
}
