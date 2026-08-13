import type { ExamDomain, ExamId } from '@/types';

/**
 * Per-exam configuration — the single source of truth for exam identity.
 * Domain weights come from the official AWS exam guides:
 *   CLF-C02 Exam Guide v1.x, SAA-C03 Exam Guide v1.0.
 */
export interface ExamConfig {
  id: ExamId;
  /** Official exam code shown in the UI (header chip, hero, footer). */
  code: string;
  title: Record<string, string>;
  /** Short hero headline fragment ("Master AWS …"). */
  heroTitle: Record<string, string>;
  /** Domains in official order, with scored-content weights (sum = 1). */
  domains: Array<{ domain: ExamDomain; weight: number }>;
  /** Practice-exam size (both exams: 65 questions incl. unscored). */
  examQuestionCount: number;
  /** Practice-exam duration in seconds (CLF: 90 min, SAA: 130 min). */
  examTimerSeconds: number;
  /**
   * Approximate pass threshold as percent of correct answers.
   * Both exams use scaled scoring (CLF 700/1000, SAA 720/1000);
   * these percentages are the commonly used practice approximations.
   */
  passPct: number;
}

export const EXAMS: Record<ExamId, ExamConfig> = {
  clf: {
    id: 'clf',
    code: 'CLF-C02',
    title: { en: 'AWS Cloud Practitioner', ro: 'AWS Cloud Practitioner' },
    heroTitle: { en: 'Master AWS Cloud Practitioner', ro: 'Stăpânește AWS Cloud Practitioner' },
    domains: [
      { domain: 'cloud-concepts', weight: 0.24 },
      { domain: 'security', weight: 0.3 },
      { domain: 'tech-services', weight: 0.34 },
      { domain: 'billing-support', weight: 0.12 },
    ],
    examQuestionCount: 65,
    examTimerSeconds: 90 * 60,
    passPct: 70,
  },
  saa: {
    id: 'saa',
    code: 'SAA-C03',
    title: { en: 'AWS Solutions Architect Associate', ro: 'AWS Solutions Architect Associate' },
    heroTitle: { en: 'Master AWS Solutions Architect', ro: 'Stăpânește AWS Solutions Architect' },
    domains: [
      { domain: 'design-secure', weight: 0.3 },
      { domain: 'design-resilient', weight: 0.26 },
      { domain: 'design-performant', weight: 0.24 },
      { domain: 'design-cost', weight: 0.2 },
    ],
    examQuestionCount: 65,
    examTimerSeconds: 130 * 60,
    passPct: 72,
  },
};

export const EXAM_IDS: ExamId[] = ['clf', 'saa'];

/** Bilingual display labels for every domain across both exams. */
export const DOMAIN_LABELS: Record<ExamDomain, Record<string, string>> = {
  'cloud-concepts': { en: 'Cloud Concepts', ro: 'Cloud Concepts' },
  security: { en: 'Security & Compliance', ro: 'Security & Compliance' },
  'tech-services': { en: 'Tech & Services', ro: 'Tech & Services' },
  'billing-support': { en: 'Billing & Support', ro: 'Billing & Support' },
  'design-secure': { en: 'Design Secure Architectures', ro: 'Arhitecturi Sigure' },
  'design-resilient': { en: 'Design Resilient Architectures', ro: 'Arhitecturi Reziliente' },
  'design-performant': { en: 'Design High-Performing Architectures', ro: 'Arhitecturi Performante' },
  'design-cost': { en: 'Design Cost-Optimized Architectures', ro: 'Arhitecturi Optimizate pe Cost' },
};

/** Reverse map: which exam does a domain belong to. */
export const DOMAIN_EXAM: Record<ExamDomain, ExamId> = {
  'cloud-concepts': 'clf',
  security: 'clf',
  'tech-services': 'clf',
  'billing-support': 'clf',
  'design-secure': 'saa',
  'design-resilient': 'saa',
  'design-performant': 'saa',
  'design-cost': 'saa',
};

export function domainsForExam(exam: ExamId): ExamDomain[] {
  return EXAMS[exam].domains.map((d) => d.domain);
}

export function domainWeight(domain: ExamDomain): number {
  const exam = EXAMS[DOMAIN_EXAM[domain]];
  return exam.domains.find((d) => d.domain === domain)?.weight ?? 0;
}

/**
 * Visibility rule shared by services / concepts / comparisons / learning paths:
 * an entry without `exams` is shown on BOTH exams.
 */
export function isOnExam(entry: { exams?: ExamId[] }, exam: ExamId): boolean {
  return !entry.exams || entry.exams.includes(exam);
}
