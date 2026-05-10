'use client';

import { Map, Clock, ArrowRight, Lock } from 'lucide-react';
import type { LearningPath, Language } from '@/types';
import { learningPaths } from '@/data/learning-paths';
import { useProgressStore } from '@/store/progress';

interface LearningPathsSectionProps {
  language: Language;
  onPathClick: (path: LearningPath) => void;
}

function t(rec: Record<string, string> | undefined, lang: Language): string {
  if (!rec) return '';
  return rec[lang] ?? rec.en ?? Object.values(rec)[0] ?? '';
}

const DIFFICULTY_LABELS: Record<LearningPath['difficulty'], { en: string; ro: string; color: string }> = {
  beginner: { en: 'Beginner', ro: 'Începător', color: 'var(--success)' },
  intermediate: { en: 'Intermediate', ro: 'Intermediar', color: 'var(--warning)' },
  advanced: { en: 'Advanced', ro: 'Avansat', color: 'var(--danger)' },
};

export function LearningPathsSection({ language, onPathClick }: LearningPathsSectionProps) {
  const serviceProgress = useProgressStore((s) => s.progress.serviceProgress);

  // Compute progress per path (% of service steps mastered)
  function pathProgress(path: LearningPath): { done: number; total: number } {
    const serviceSteps = path.steps.filter((s) => s.kind === 'service');
    let done = 0;
    for (const step of serviceSteps) {
      const sp = serviceProgress[step.refId];
      if (sp && sp.status !== 'new') done++;
    }
    return { done, total: serviceSteps.length };
  }

  return (
    <section
      id="learning-paths"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14"
    >
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            <Map className="h-5 w-5 text-accent" />
            {language === 'ro' ? 'Trasee de învățare' : 'Learning Paths'}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary text-pretty">
            {language === 'ro'
              ? 'Trasee curate cu ordine inteligentă: concepte → servicii → comparații. Pornești de aici dacă nu știi unde să începi.'
              : 'Curated routes with smart ordering: concepts → services → comparisons. Start here if you don\'t know where to begin.'}
          </p>
        </div>
        <span className="hidden font-mono text-2xs uppercase tracking-wider text-text-tertiary sm:block">
          {learningPaths.length} {language === 'ro' ? 'trasee' : 'paths'}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path) => {
          const prog = pathProgress(path);
          const pct = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0;
          const diff = DIFFICULTY_LABELS[path.difficulty];

          return (
            <button
              key={path.id}
              type="button"
              onClick={() => onPathClick(path)}
              className="group flex flex-col rounded-xl border border-border bg-surface-elevated p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
            >
              {/* Top row: difficulty + time */}
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-2xs font-semibold"
                  style={{ color: diff.color, backgroundColor: `color-mix(in srgb, ${diff.color} 15%, transparent)` }}
                >
                  {t(diff, language)}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-2xs text-text-tertiary">
                  <Clock className="h-3 w-3" />
                  {path.estimatedMinutes} min
                </span>
              </div>

              {/* Title + tagline */}
              <h3 className="font-semibold text-text-primary leading-tight">
                {t(path.title, language)}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-secondary text-pretty">
                {t(path.tagline, language)}
              </p>

              {/* Step count + prerequisites */}
              <div className="mt-3 flex items-center gap-2 text-2xs text-text-tertiary">
                <span className="font-mono">{path.steps.length} {language === 'ro' ? 'pași' : 'steps'}</span>
                {path.prerequisites && path.prerequisites.length > 0 && (
                  <span className="inline-flex items-center gap-0.5 font-mono">
                    <Lock className="h-2.5 w-2.5" />
                    {language === 'ro' ? 'după' : 'after'} {path.prerequisites.join(', ')}
                  </span>
                )}
              </div>

              {/* Progress bar */}
              {prog.total > 0 && (
                <div className="mt-2.5">
                  <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between font-mono text-2xs text-text-tertiary">
                    <span>
                      {prog.done}/{prog.total} {language === 'ro' ? 'servicii' : 'services'}
                    </span>
                    <span className={pct === 100 ? 'text-success' : ''}>{pct}%</span>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-3 flex items-center justify-end border-t border-border pt-2">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
                  {language === 'ro' ? 'Pornește' : 'Start'}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
