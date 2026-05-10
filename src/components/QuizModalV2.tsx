'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, Check, ChevronRight, RefreshCw, Trophy, Target, Lightbulb, Clock, Bookmark } from 'lucide-react';
import type { QuizQuestion, Language, Service } from '@/types';
import { buildQuiz, buildWeightedExam, type QuizScope } from '@/data/quiz-questions';
import { getServiceById } from '@/data/services';
import { useProgressStore } from '@/store/progress';

interface QuizModalV2Props {
  language: Language;
  onClose: () => void;
  onServiceClick: (s: Service) => void;
  /** Pool to draw from. Defaults to 'all'. */
  scope?: QuizScope;
  /** How many questions to ask. Default 10. */
  questionCount?: number;
  /** Display label (e.g., "Practice Exam", "Quick Drill"). */
  label?: string;
  /** If true, hide explanations until the end (real-exam feel). */
  examMode?: boolean;
  /** Optional countdown in seconds. When 0, auto-submits. */
  timerSeconds?: number;
  /**
   * If provided, use these EXACT questions instead of sampling from the bank.
   * Used by Daily Challenge to guarantee everyone gets the same set per day.
   */
  presetQuestions?: QuizQuestion[];
  /** Called once when the user finishes (correct count, total). */
  onComplete?: (correct: number, total: number) => void;

  /** @deprecated Use `scope` instead. Kept for backwards-compat with old callers. */
  filterCategoryIds?: string[];
}

function fmtTime(sec: number): string {
  if (sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function QuizModalV2({
  language,
  onClose,
  onServiceClick,
  scope = 'all',
  questionCount = 10,
  label,
  examMode = false,
  timerSeconds,
  presetQuestions,
  onComplete,
  filterCategoryIds,
}: QuizModalV2Props) {
  const recordQuizAttempt = useProgressStore((s) => s.recordQuizAttempt);
  const recentlySeen = useProgressStore((s) => s.recentlySeenQuestions);
  const markQuestionsSeen = useProgressStore((s) => s.markQuestionsSeen);
  const bookmarks = useProgressStore((s) => s.bookmarkedQuestions);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
  const recordWrongAnswer = useProgressStore((s) => s.recordWrongAnswer);
  const clearWrongAnswer = useProgressStore((s) => s.clearWrongAnswer);
  const wrongCounts = useProgressStore((s) => s.wrongAnswerCounts);
  const bookmarkedQuestions = useProgressStore((s) => s.bookmarkedQuestions);

  // Build the quiz once on mount (don't reshuffle on every render)
  const questions = useMemo<QuizQuestion[]>(() => {
    // Preset (e.g., Daily Challenge) wins
    if (presetQuestions && presetQuestions.length > 0) {
      return presetQuestions;
    }
    // Practice Exam: domain-weighted pool
    if (examMode && questionCount >= 50) {
      return buildWeightedExam(questionCount);
    }
    // Legacy filterCategoryIds support
    if (filterCategoryIds && filterCategoryIds.length > 0) {
      return buildQuiz(questionCount, `category:${filterCategoryIds[0]}` as QuizScope, recentlySeen);
    }
    // Bookmarks / mistakes scopes need an id filter from the store
    if (scope === 'bookmarks') {
      return buildQuiz(questionCount, scope, recentlySeen, bookmarkedQuestions);
    }
    if (scope === 'mistakes') {
      return buildQuiz(questionCount, scope, recentlySeen, Object.keys(wrongCounts));
    }
    return buildQuiz(questionCount, scope, recentlySeen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; questionId: string; selected: number | null }[]>([]);
  const [done, setDone] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(timerSeconds ?? 0);

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

  // Countdown timer for exam mode
  useEffect(() => {
    if (!timerSeconds || done) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerSeconds, done]);

  // When `done` flips true, mark all seen question IDs in the ring buffer
  // and notify external listeners (e.g., Daily Challenge tracker).
  useEffect(() => {
    if (done && questions.length > 0) {
      markQuestionsSeen(questions.map((qq) => qq.id));
      if (onComplete) {
        const correct = answers.filter((a) => a.correct).length;
        onComplete(correct, questions.length);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

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
    if (reveal && !examMode) return;
    if (examMode && answers.find((a) => a.questionId === q.id)) return; // already answered this question
    setSelected(optionIdx);
    const isCorrect = optionIdx === q.correct;
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== q.id),
      { correct: isCorrect, questionId: q.id, selected: optionIdx },
    ]);
    const targets = q.relatedServices?.length ? q.relatedServices : ['__quiz__'];
    targets.forEach((sid) => recordQuizAttempt(sid, isCorrect));
    // Track wrong answers globally so user can review mistakes later
    if (isCorrect) {
      clearWrongAnswer(q.id);
    } else {
      recordWrongAnswer(q.id);
    }

    if (examMode) {
      // No reveal; jump to next after a tiny pause for visual feedback
      setTimeout(() => {
        if (idx < questions.length - 1) {
          setIdx(idx + 1);
          setSelected(null);
        } else {
          setDone(true);
        }
      }, 120);
    } else {
      setReveal(true);
    }
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
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {label && (
              <span className="truncate rounded bg-accent-soft px-2 py-0.5 font-mono text-2xs font-semibold uppercase tracking-wider text-accent">
                {label}
              </span>
            )}
            <span className="font-mono text-2xs uppercase tracking-wider text-text-tertiary">
              Q {idx + 1} / {questions.length}
            </span>
            <span className="hidden rounded bg-muted px-1.5 py-0.5 font-mono text-2xs text-text-secondary sm:inline">
              {q.examDomain ?? q.categories[0]}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {timerSeconds ? (
              <div
                className={`flex items-center gap-1 font-mono text-xs font-semibold tabular-nums ${
                  secondsLeft <= 60 ? 'text-danger' : secondsLeft <= 5 * 60 ? 'text-warning' : 'text-text-secondary'
                }`}
                aria-live={secondsLeft <= 60 ? 'polite' : 'off'}
              >
                <Clock className="h-3.5 w-3.5" />
                {fmtTime(secondsLeft)}
              </div>
            ) : null}
            {!examMode && (
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <Target className="h-3.5 w-3.5" />
                <span className="font-mono font-semibold tabular-nums">{correctCount}</span>
                <span className="hidden sm:inline">correct</span>
              </div>
            )}
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
        {/* Question + bookmark */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-relaxed text-text-primary text-pretty">
            {q.question[language] ?? q.question.en}
          </h3>
          <button
            type="button"
            onClick={() => toggleBookmark(q.id)}
            aria-label={bookmarks.includes(q.id) ? 'Remove bookmark' : 'Bookmark this question'}
            title={bookmarks.includes(q.id) ? 'Remove bookmark' : 'Bookmark this question'}
            className={`shrink-0 rounded-md p-1.5 transition-colors ${
              bookmarks.includes(q.id)
                ? 'bg-accent-soft text-accent'
                : 'text-text-tertiary hover:bg-muted hover:text-text-primary'
            }`}
          >
            <Bookmark
              className="h-4 w-4"
              fill={bookmarks.includes(q.id) ? 'currentColor' : 'none'}
            />
          </button>
        </div>

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
