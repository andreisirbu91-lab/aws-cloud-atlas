'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, Check, ChevronRight, RefreshCw, Trophy, Target, Lightbulb } from 'lucide-react';
import type { QuizQuestion, Language, Service } from '@/types';
import { quizQuestions } from '@/data/quiz-questions';
import { getServiceById } from '@/data/services';
import { useProgressStore } from '@/store/progress';

interface QuizModalV2Props {
  language: Language;
  onClose: () => void;
  onServiceClick: (s: Service) => void;
  /** If null/undefined, run a random 10-question quiz across all topics. */
  filterCategoryIds?: string[];
  /** How many questions to ask. Default 10. */
  questionCount?: number;
}

export function QuizModalV2({
  language,
  onClose,
  onServiceClick,
  filterCategoryIds,
  questionCount = 10,
}: QuizModalV2Props) {
  const recordQuizAttempt = useProgressStore((s) => s.recordQuizAttempt);

  // Build the quiz once on mount (don't reshuffle on every render)
  const questions = useMemo<QuizQuestion[]>(() => {
    const pool = filterCategoryIds && filterCategoryIds.length > 0
      ? quizQuestions.filter((q) => q.categories.some((c) => filterCategoryIds.includes(c)))
      : quizQuestions;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(questionCount, pool.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; questionId: string }[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  // Lock body scroll + Escape closes
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (reveal && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reveal, idx]);

  if (questions.length === 0) {
    return (
      <Shell onClose={onClose}>
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-text-secondary">
            No questions available for the selected topics yet.
          </p>
        </div>
      </Shell>
    );
  }

  const correctCount = answers.filter((a) => a.correct).length;
  const progress = ((idx + (reveal ? 1 : 0)) / questions.length) * 100;

  function pick(optionIdx: number) {
    if (reveal) return;
    setSelected(optionIdx);
    setReveal(true);
    const isCorrect = optionIdx === q.correct;
    setAnswers((prev) => [...prev, { correct: isCorrect, questionId: q.id }]);
    // Record attempt for each related service (XP + confidence boost handled in store).
    // For questions without related services, attribute to a placeholder so we still gain XP.
    const targets = q.relatedServices?.length ? q.relatedServices : ['__quiz__'];
    targets.forEach((sid) => recordQuizAttempt(sid, isCorrect));
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
      setSelected(null);
      setReveal(false);
    } else {
      setDone(true);
    }
  }

  function restart() {
    onClose();
    // Caller can re-open; this keeps the component simple
  }

  // ============ DONE SCREEN ============
  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <Shell onClose={onClose}>
        <div className="px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
            <Trophy className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            {passed ? 'Solid!' : 'Keep going.'}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            You scored{' '}
            <span className="font-mono font-semibold text-text-primary">
              {correctCount}/{questions.length}
            </span>{' '}
            ({pct}%) · {passed ? 'pass-level' : 'below 70% pass-level'}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="Correct" value={correctCount} accent />
            <Stat label="Wrong" value={questions.length - correctCount} />
            <Stat label="XP earned" value={correctCount * 10} />
          </div>

          {/* Per-question summary */}
          <div className="mt-6 max-h-48 overflow-y-auto rounded-lg border border-border text-left">
            {answers.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 border-b border-border px-3 py-2 last:border-b-0"
              >
                <span className="font-mono text-2xs text-text-tertiary">Q{i + 1}</span>
                <span className="line-clamp-1 flex-1 text-xs text-text-secondary">
                  {questions[i].question[language] ?? questions[i].question.en}
                </span>
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
                    a.correct ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
                  }`}
                >
                  {a.correct ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={restart}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-text-primary hover:border-border-strong"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Close
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  // ============ QUESTION SCREEN ============
  return (
    <Shell onClose={onClose}>
      {/* Progress */}
      <div className="border-b border-border px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs uppercase tracking-wider text-text-tertiary">
              Question {idx + 1} / {questions.length}
            </span>
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-2xs text-text-secondary">
              {q.categories[0]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Target className="h-3.5 w-3.5" />
            <span className="font-mono font-semibold tabular-nums">{correctCount}</span>
            correct
          </div>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-5">
        {/* Question */}
        <h3 className="text-base font-semibold leading-relaxed text-text-primary text-pretty">
          {q.question[language] ?? q.question.en}
        </h3>

        {/* Options */}
        <div className="mt-5 space-y-2.5">
          {q.options?.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrectAnswer = i === q.correct;

            let stateClasses = 'border-border bg-surface hover:border-border-strong';
            if (reveal) {
              if (isCorrectAnswer) {
                stateClasses = 'border-success bg-success/10';
              } else if (isSelected) {
                stateClasses = 'border-danger bg-danger/10';
              } else {
                stateClasses = 'border-border bg-surface opacity-60';
              }
            } else if (isSelected) {
              stateClasses = 'border-accent bg-accent-soft';
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => pick(i)}
                disabled={reveal}
                className={`flex w-full items-start gap-3 rounded-lg border-2 px-4 py-3 text-left transition-all ${stateClasses}`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-2xs font-semibold ${
                    reveal && isCorrectAnswer
                      ? 'bg-success text-white'
                      : reveal && isSelected
                      ? 'bg-danger text-white'
                      : 'bg-muted text-text-secondary'
                  }`}
                >
                  {reveal && isCorrectAnswer ? (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  ) : reveal && isSelected ? (
                    <X className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="text-sm leading-relaxed text-text-primary">
                  {opt[language] ?? opt.en}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {reveal && (
          <div className="mt-5 rounded-xl border border-accent/20 bg-accent-soft px-4 py-3 animate-fade-up">
            <h4 className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Lightbulb className="h-3.5 w-3.5" />
              {selected === q.correct ? 'Correct' : 'Explanation'}
            </h4>
            <p className="text-sm leading-relaxed text-text-primary text-pretty">
              {q.explanation[language] ?? q.explanation.en}
            </p>
            {q.relatedServices && q.relatedServices.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {q.relatedServices.map((sid) => {
                  const s = getServiceById(sid);
                  if (!s) return null;
                  return (
                    <button
                      key={sid}
                      type="button"
                      onClick={() => onServiceClick(s)}
                      className="inline-flex items-center gap-1 rounded border border-border bg-surface-elevated px-2 py-0.5 text-2xs text-text-secondary hover:border-accent hover:text-accent"
                    >
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: s.visual.color }}
                        aria-hidden
                      />
                      {s.abbreviation}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end border-t border-border bg-surface px-6 py-4">
        {reveal && (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            {idx < questions.length - 1 ? 'Next question' : 'See results'}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </Shell>
  );
}

function Shell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quiz"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quiz"
          className="absolute right-3 top-3 z-10 rounded-lg p-2 text-text-tertiary hover:bg-muted hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${
        accent ? 'border-accent/30 bg-accent-soft' : 'border-border bg-surface'
      }`}
    >
      <div className="font-mono text-lg font-bold tabular-nums text-text-primary">{value}</div>
      <div className="text-2xs uppercase tracking-wider text-text-tertiary">{label}</div>
    </div>
  );
}
