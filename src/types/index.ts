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
  categories: string[];
  question: Record<string, string>;
  options?: Array<Record<string, string>>;
  correct: number | boolean;
  explanation: Record<string, string>;
  hint?: Record<string, string>;
  relatedServices: string[];
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
}

export type Language = 'en' | 'ro' | 'es' | 'de';
