'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, Sparkles, Zap, Target, Trophy, Boxes, Shield, Cloud, DollarSign, Layers, ChevronRight, Check } from 'lucide-react';
import type { Language, ExamDomain } from '@/types';
import type { QuizScope } from '@/data/quiz-questions';
import { quizQuestions, getQuestionsByDomain, DOMAIN_WEIGHTS } from '@/data/quiz-questions';
import { categories } from '@/data/categories';

/** Safe i18n lookup: tries the chosen language, then English, then any first key. */
function t(rec: Record<string, string> | undefined, lang: Language): string {
  if (!rec) return '';
  return rec[lang] ?? rec.en ?? Object.values(rec)[0] ?? '';
}

export type QuizLaunchConfig = {
  scope: QuizScope;
  count: number;
  /** Cosmetic label for the launched session (e.g., "Practice Exam"). */
  label: string;
  /** If true, hide explanations until the end (real-exam feel). */
  examMode?: boolean;
  /** Optional countdown in seconds (e.g., 90*60 for full exam). */
  timerSeconds?: number;
};

interface QuizLauncherProps {
  language: Language;
  onClose: () => void;
  onLaunch: (config: QuizLaunchConfig) => void;
}

type Mode = {
  id: 'quick' | 'standard' | 'long' | 'exam';
  label: { en: string; ro: string };
  count: number;
  examMode?: boolean;
  timerSeconds?: number;
  badge: { en: string; ro: string };
  icon: React.ElementType;
  description: { en: string; ro: string };
};

const MODES: Mode[] = [
  {
    id: 'quick',
    label: { en: 'Quick Drill', ro: 'Drill Rapid' },
    count: 5,
    badge: { en: '5 questions · 3 min', ro: '5 întrebări · 3 min' },
    icon: Zap,
    description: {
      en: 'A short focused burst — perfect between meetings.',
      ro: 'Un burst scurt și focusat — perfect între meeting-uri.',
    },
  },
  {
    id: 'standard',
    label: { en: 'Standard', ro: 'Standard' },
    count: 10,
    badge: { en: '10 questions · 7 min', ro: '10 întrebări · 7 min' },
    icon: Target,
    description: {
      en: 'Daily warmup. Mix of difficulties from the chosen scope.',
      ro: 'Încălzire zilnică. Mix de dificultăți din scope-ul ales.',
    },
  },
  {
    id: 'long',
    label: { en: 'Long Set', ro: 'Sesiune Lungă' },
    count: 20,
    badge: { en: '20 questions · 15 min', ro: '20 întrebări · 15 min' },
    icon: Layers,
    description: {
      en: 'Deep practice block. Builds endurance and pattern memory.',
      ro: 'Bloc profund de practică. Construiește rezistență.',
    },
  },
  {
    id: 'exam',
    label: { en: 'Practice Exam', ro: 'Examen Simulat' },
    count: 65,
    examMode: true,
    timerSeconds: 90 * 60,
    badge: { en: '65 questions · 90 min · timed', ro: '65 întrebări · 90 min · contorizat' },
    icon: Trophy,
    description: {
      en: 'Full CLF-C02 simulation: domain-weighted, no hints, results at end.',
      ro: 'Simulare CLF-C02 completă: ponderat pe domenii, fără hint-uri, rezultat la final.',
    },
  },
];

type ScopeOption = {
  id: QuizScope;
  label: { en: string; ro: string };
  badge?: { en: string; ro: string };
  icon: React.ElementType;
  /** Color hint for the option pill. */
  accent?: string;
};

const DOMAIN_ICONS: Record<ExamDomain, React.ElementType> = {
  'cloud-concepts': Cloud,
  security: Shield,
  'tech-services': Boxes,
  'billing-support': DollarSign,
};

const DOMAIN_LABELS: Record<ExamDomain, { en: string; ro: string }> = {
  'cloud-concepts': { en: 'Cloud Concepts', ro: 'Cloud Concepts' },
  security: { en: 'Security & Compliance', ro: 'Security & Compliance' },
  'tech-services': { en: 'Tech & Services', ro: 'Tech & Services' },
  'billing-support': { en: 'Billing & Support', ro: 'Billing & Support' },
};

export function QuizLauncher({ language, onClose, onLaunch }: QuizLauncherProps) {
  const [modeId, setModeId] = useState<Mode['id']>('standard');
  const [scope, setScope] = useState<QuizScope>('all');

  // Lock body scroll + ESC close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const mode = MODES.find((m) => m.id === modeId)!;
  const isExam = mode.id === 'exam';

  // For exam mode the scope is always 'all' (domain-weighted by buildWeightedExam)
  const effectiveScope: QuizScope = isExam ? 'all' : scope;

  // Build scope options
  const scopeOptions: ScopeOption[] = useMemo(() => {
    const out: ScopeOption[] = [
      {
        id: 'all',
        label: { en: 'Mixed (all topics)', ro: 'Mix (toate topicurile)' },
        badge: { en: `${quizQuestions.length} questions`, ro: `${quizQuestions.length} întrebări` },
        icon: Sparkles,
      },
    ];

    // Domain options
    (Object.keys(DOMAIN_WEIGHTS) as ExamDomain[]).forEach((d) => {
      const count = getQuestionsByDomain(d).length;
      const weight = Math.round(DOMAIN_WEIGHTS[d] * 100);
      out.push({
        id: d,
        label: DOMAIN_LABELS[d],
        badge: { en: `${count} q · ${weight}% of exam`, ro: `${count} întrebări · ${weight}% examen` },
        icon: DOMAIN_ICONS[d],
      });
    });

    // Top categories (only those with >= 3 questions)
    const catCounts = new Map<string, number>();
    for (const q of quizQuestions) {
      for (const c of q.categories) catCounts.set(c, (catCounts.get(c) ?? 0) + 1);
    }
    for (const cat of categories) {
      const c = catCounts.get(cat.id) ?? 0;
      if (c >= 3) {
        out.push({
          id: `category:${cat.id}` as QuizScope,
          label: cat.label as { en: string; ro: string },
          badge: { en: `${c} questions`, ro: `${c} întrebări` },
          icon: Boxes,
          accent: cat.color,
        });
      }
    }
    return out;
  }, []);

  function launch() {
    onLaunch({
      scope: effectiveScope,
      count: mode.count,
      label: t(mode.label, language),
      examMode: mode.examMode,
      timerSeconds: mode.timerSeconds,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-launcher-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border bg-surface-elevated px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="font-mono text-2xs uppercase tracking-wider text-accent">
                Start a quiz
              </span>
            </div>
            <h2
              id="quiz-launcher-title"
              className="mt-1 text-xl font-bold tracking-tight text-text-primary"
            >
              {language === 'ro' ? 'Alege modul și topicul' : 'Choose mode and topic'}
            </h2>
            <p className="mt-1 text-xs text-text-tertiary">
              {language === 'ro'
                ? 'Banca are 145 de întrebări — combinații mereu diferite.'
                : `${quizQuestions.length} questions in the bank — combinations always different.`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-text-tertiary hover:bg-muted hover:text-text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(92vh-180px)] overflow-y-auto px-6 py-5">
          {/* Mode picker */}
          <h3 className="mb-2 font-mono text-2xs uppercase tracking-wider text-text-tertiary">
            {language === 'ro' ? '1. Mod' : '1. Mode'}
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MODES.map((m) => {
              const Icon = m.icon;
              const selected = m.id === modeId;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModeId(m.id)}
                  className={`group relative rounded-xl border-2 p-3 text-left transition-all ${
                    selected
                      ? 'border-accent bg-accent-soft shadow-sm'
                      : 'border-border bg-surface hover:border-border-strong'
                  }`}
                >
                  {selected && (
                    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                  )}
                  <Icon className={`h-4 w-4 ${selected ? 'text-accent' : 'text-text-tertiary'}`} />
                  <div className="mt-2 text-sm font-semibold text-text-primary">
                    {t(m.label, language)}
                  </div>
                  <div className="mt-0.5 font-mono text-2xs text-text-tertiary">
                    {t(m.badge, language)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mode description */}
          <p className="mt-3 rounded-lg border border-border bg-surface px-3 py-2 text-xs leading-relaxed text-text-secondary">
            {t(mode.description, language)}
          </p>

          {/* Scope picker — disabled in exam mode */}
          <h3 className="mb-2 mt-6 flex items-center gap-2 font-mono text-2xs uppercase tracking-wider text-text-tertiary">
            <span>{language === 'ro' ? '2. Topic' : '2. Topic'}</span>
            {isExam && (
              <span className="rounded bg-muted px-1.5 py-0.5 normal-case tracking-normal text-text-tertiary">
                {language === 'ro'
                  ? 'auto-ponderat (exam mode)'
                  : 'auto-weighted (exam mode)'}
              </span>
            )}
          </h3>

          <div className={`grid grid-cols-1 gap-1.5 sm:grid-cols-2 ${isExam ? 'pointer-events-none opacity-50' : ''}`}>
            {scopeOptions.map((opt) => {
              const Icon = opt.icon;
              const selected = !isExam && opt.id === scope;
              return (
                <button
                  key={String(opt.id)}
                  type="button"
                  onClick={() => setScope(opt.id)}
                  className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-all ${
                    selected
                      ? 'border-accent bg-accent-soft'
                      : 'border-border bg-surface hover:border-border-strong'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Icon
                      className="h-3.5 w-3.5 shrink-0"
                      style={opt.accent ? { color: opt.accent } : undefined}
                    />
                    <span className="truncate text-sm text-text-primary">
                      {t(opt.label, language)}
                    </span>
                  </span>
                  {opt.badge && (
                    <span className="shrink-0 font-mono text-2xs text-text-tertiary">
                      {t(opt.badge, language)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border bg-surface px-6 py-3">
          <div className="text-xs text-text-tertiary">
            {language === 'ro' ? (
              <>
                Vor fi <span className="font-mono font-semibold text-text-primary">{mode.count}</span>{' '}
                întrebări, prioritate pe cele neavute recent.
              </>
            ) : (
              <>
                <span className="font-mono font-semibold text-text-primary">{mode.count}</span> questions,
                preferring fresh ones you haven&apos;t seen recently.
              </>
            )}
          </div>
          <button
            type="button"
            onClick={launch}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90"
          >
            {language === 'ro' ? 'Începe' : 'Start'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
