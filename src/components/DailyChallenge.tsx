'use client';

import { useMemo } from 'react';
import { Calendar, Sparkles, Trophy, Check, ArrowRight, Flame } from 'lucide-react';
import type { Language, QuizQuestion } from '@/types';
import { getDailyChallengeQuestions } from '@/data/quiz-questions';
import { useProgressStore } from '@/store/progress';

interface DailyChallengeProps {
  language: Language;
  onLaunch: (questions: QuizQuestion[], dateStr: string) => void;
}

function todayLocalIsoDate(): string {
  const d = new Date();
  // YYYY-MM-DD in local timezone
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateHuman(dateStr: string, lang: Language): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(lang === 'ro' ? 'ro-RO' : 'en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

export function DailyChallenge({ language, onLaunch }: DailyChallengeProps) {
  const today = useMemo(() => todayLocalIsoDate(), []);
  const questions = useMemo(() => getDailyChallengeQuestions(today, 5), [today]);
  const dailyChallenge = useProgressStore((s) => s.dailyChallenge);

  const completed = dailyChallenge?.date === today;
  const pct = completed && dailyChallenge
    ? Math.round((dailyChallenge.correct / dailyChallenge.total) * 100)
    : 0;
  const passed = pct >= 70;

  // Domain-distribution preview
  const domainCounts: Record<string, number> = {};
  for (const q of questions) {
    const d = q.examDomain ?? 'other';
    domainCounts[d] = (domainCounts[d] ?? 0) + 1;
  }
  const domainKeys = Object.keys(domainCounts);

  return (
    <section
      aria-labelledby="daily-challenge-title"
      className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent-soft via-surface-elevated to-surface-elevated p-5 shadow-sm sm:p-6"
    >
      {/* Decorative dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '12px 12px',
          color: 'var(--accent)',
        }}
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: meta + title */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            <span className="font-mono text-2xs uppercase tracking-wider text-accent">
              {language === 'ro' ? 'Provocarea zilei' : 'Daily challenge'}
            </span>
            <span className="hidden font-mono text-2xs text-text-tertiary sm:inline">
              · {formatDateHuman(today, language)}
            </span>
          </div>
          <h2
            id="daily-challenge-title"
            className="mt-1 text-lg font-bold tracking-tight text-text-primary sm:text-xl"
          >
            {completed
              ? language === 'ro'
                ? 'Făcut pentru azi 🎉'
                : 'Done for today 🎉'
              : language === 'ro'
              ? '5 întrebări mixate, alese pentru azi'
              : '5 mixed questions, picked for today'}
          </h2>

          {/* Body: depending on completed */}
          {completed && dailyChallenge ? (
            <p className="mt-1 text-sm text-text-secondary">
              {language === 'ro' ? 'Scor: ' : 'Score: '}
              <span className="font-mono font-semibold text-text-primary">
                {dailyChallenge.correct}/{dailyChallenge.total}
              </span>
              {' · '}
              <span
                className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-2xs font-semibold ${
                  passed
                    ? 'bg-success/15 text-success'
                    : 'bg-warning/15 text-warning'
                }`}
              >
                {passed ? <Trophy className="h-3 w-3" /> : <Flame className="h-3 w-3" />}
                {pct}%
              </span>
              {' · '}
              <span className="text-text-tertiary">
                {language === 'ro' ? 'revino mâine pentru un set nou' : 'come back tomorrow for a fresh set'}
              </span>
            </p>
          ) : (
            <p className="mt-1 text-sm text-text-secondary text-pretty">
              {language === 'ro'
                ? 'Acelaşi set pentru toată lumea, în fiecare zi. ~3 minute, păstrează streak-ul.'
                : 'Same set for everyone, every day. ~3 minutes. Keep your streak alive.'}
            </p>
          )}
        </div>

        {/* Right: action */}
        <div className="shrink-0">
          {completed ? (
            <button
              type="button"
              onClick={() => onLaunch(questions, today)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-text-primary hover:border-border-strong"
            >
              <Check className="h-3.5 w-3.5 text-success" />
              {language === 'ro' ? 'Reia (fără scor)' : 'Replay (no score)'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onLaunch(questions, today)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              {language === 'ro' ? 'Pornește · 5 întrebări' : 'Start · 5 questions'}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Domain badges */}
      {!completed && domainKeys.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {domainKeys.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-2xs text-text-secondary"
            >
              <span className="font-semibold text-text-primary">{domainCounts[d]}</span>
              {' · '}
              {d.replace('-', ' ')}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
