'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, ChevronRight, RefreshCw, Trophy, Check, Lightbulb, BookOpen, Repeat } from 'lucide-react';
import type { Language, Service } from '@/types';
import { services as allServices } from '@/data/services';
import { useProgressStore } from '@/store/progress';

interface FlashcardsModalProps {
  language: Language;
  onClose: () => void;
  onServiceClick?: (s: Service) => void;
  /** Which services to study. Defaults to weakest-first across the whole catalog. */
  filterCategoryId?: string;
}

function t(rec: Record<string, string> | undefined, lang: Language): string {
  if (!rec) return '';
  return rec[lang] ?? rec.en ?? Object.values(rec)[0] ?? '';
}

/**
 * Flashcards study mode.
 * Front: service abbreviation + full name. Click to reveal back.
 * Back: description + analogy + first 2 exam tips.
 * Then user marks "Need review" (confidence → 1) or "I know it" (confidence + 1).
 */
export function FlashcardsModal({ language, onClose, onServiceClick, filterCategoryId }: FlashcardsModalProps) {
  const serviceProgress = useProgressStore((s) => s.progress.serviceProgress);
  const updateConfidence = useProgressStore((s) => s.updateServiceConfidence);

  // Build ordered deck once on mount.
  // Weakest first: sort by confidenceLevel ascending. New services count as 0.
  const deck = useMemo<Service[]>(() => {
    const filtered = filterCategoryId
      ? allServices.filter((s) => s.category === filterCategoryId)
      : allServices;
    return [...filtered].sort((a, b) => {
      const aLvl = serviceProgress[a.id]?.confidenceLevel ?? 0;
      const bLvl = serviceProgress[b.id]?.confidenceLevel ?? 0;
      if (aLvl !== bLvl) return aLvl - bLvl;
      // tie-break: more difficult & higher exam frequency first
      const aF = a.examFrequency === 'high' ? 0 : a.examFrequency === 'medium' ? 1 : 2;
      const bF = b.examFrequency === 'high' ? 0 : b.examFrequency === 'medium' ? 1 : 2;
      return aF - bF;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategoryId]);

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ knew: 0, review: 0 });
  const [done, setDone] = useState(false);

  const card = deck[idx];

  // Lock body scroll, ESC closes, Space flips, arrows nav (if not revealed: no nav)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!revealed) setRevealed(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [revealed, onClose]);

  if (deck.length === 0) {
    return (
      <Shell onClose={onClose}>
        <div className="px-6 py-12 text-center text-sm text-text-secondary">
          {language === 'ro' ? 'Nu sunt cartonașe pentru selecție.' : 'No flashcards for this selection.'}
        </div>
      </Shell>
    );
  }

  function advance(knew: boolean) {
    const cur = deck[idx];
    const prevLvl = serviceProgress[cur.id]?.confidenceLevel ?? 0;
    const nextLvl = knew ? Math.min(5, prevLvl + 1) : 1;
    updateConfidence(cur.id, nextLvl);
    setStats((s) => ({
      knew: s.knew + (knew ? 1 : 0),
      review: s.review + (knew ? 0 : 1),
    }));
    if (idx + 1 >= deck.length) {
      setDone(true);
      return;
    }
    setIdx(idx + 1);
    setRevealed(false);
  }

  // ============ DONE SCREEN ============
  if (done) {
    const total = deck.length;
    const knewPct = Math.round((stats.knew / total) * 100);
    return (
      <Shell onClose={onClose}>
        <div className="px-6 py-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
            <Trophy className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            {language === 'ro' ? 'Sesiune completă' : 'Session complete'}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {language === 'ro' ? 'Ai studiat ' : 'You studied '}
            <span className="font-mono font-semibold text-text-primary">{total}</span>
            {language === 'ro' ? ' cartonașe' : ' cards'}
          </p>
          <div className="mx-auto mt-6 grid max-w-xs grid-cols-2 gap-3">
            <Stat label={language === 'ro' ? 'Știam' : 'Knew it'} value={stats.knew} accent />
            <Stat label={language === 'ro' ? 'De repetat' : 'Need review'} value={stats.review} />
          </div>
          <p className="mt-4 text-xs text-text-tertiary">
            {language === 'ro' ? 'Confidența a fost actualizată pentru fiecare serviciu.' : 'Confidence levels updated for each service.'}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-text-primary hover:border-border-strong"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {language === 'ro' ? 'Închide' : 'Close'}
            </button>
          </div>
          <p className="mt-3 font-mono text-2xs text-text-tertiary">
            {knewPct}% {language === 'ro' ? 'cunoscute' : 'known'}
          </p>
        </div>
      </Shell>
    );
  }

  // ============ CARD SCREEN ============
  const progress = ((idx + (revealed ? 0.5 : 0)) / deck.length) * 100;
  const confidence = serviceProgress[card.id]?.confidenceLevel ?? 0;

  return (
    <Shell onClose={onClose}>
      {/* Header */}
      <div className="border-b border-border px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-accent-soft px-2 py-0.5 font-mono text-2xs font-semibold uppercase tracking-wider text-accent">
              {language === 'ro' ? 'Cartonașe' : 'Flashcards'}
            </span>
            <span className="font-mono text-2xs uppercase tracking-wider text-text-tertiary">
              {idx + 1} / {deck.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ConfidencePips level={confidence} />
            <span className="font-mono text-2xs text-text-tertiary">
              {language === 'ro' ? 'știut' : 'knew'} {stats.knew}
            </span>
          </div>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card body — vertical layout */}
      <div className="flex min-h-[400px] flex-col gap-4 px-6 py-6 sm:py-8">
        {/* Front */}
        <div className="flex items-center justify-center gap-3 text-center">
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: card.visual.color }}
            aria-hidden
          />
          <div>
            <div className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {card.abbreviation}
            </div>
            <div className="mt-1 text-sm text-text-secondary">{card.fullName}</div>
          </div>
        </div>

        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mx-auto mt-4 flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-border px-8 py-12 text-center text-text-tertiary transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
          >
            <span className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4" />
              {language === 'ro' ? 'Click sau Space pentru a vedea răspunsul' : 'Click or press Space to reveal'}
            </span>
          </button>
        ) : (
          <div className="space-y-4 animate-fade-up">
            {/* Description */}
            <div>
              <h4 className="mb-1 font-mono text-2xs uppercase tracking-wider text-text-tertiary">
                {language === 'ro' ? 'Ce e' : 'What it is'}
              </h4>
              <p className="text-sm leading-relaxed text-text-primary text-pretty">
                {t(card.description, language)}
              </p>
            </div>

            {/* Analogy */}
            {t(card.analogy, language) && (
              <div className="rounded-xl border border-accent/20 bg-accent-soft px-4 py-3">
                <h4 className="mb-1 flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-accent">
                  <Lightbulb className="h-3 w-3" />
                  {language === 'ro' ? 'Analogie' : 'Analogy'}
                </h4>
                <p className="text-sm leading-relaxed text-text-primary text-pretty">
                  {t(card.analogy, language)}
                </p>
              </div>
            )}

            {/* First 2 exam tips */}
            {card.examTips && card.examTips.length > 0 && (
              <div>
                <h4 className="mb-1.5 font-mono text-2xs uppercase tracking-wider text-text-tertiary">
                  {language === 'ro' ? 'Pe examen' : 'Exam tips'}
                </h4>
                <ul className="space-y-1.5">
                  {card.examTips.slice(0, 2).map((tip, i) => (
                    <li key={i} className="flex gap-2 text-xs leading-relaxed text-text-secondary">
                      <span className="font-mono font-semibold text-text-primary">{i + 1}.</span>
                      <span>{t(tip.content, language)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {onServiceClick && (
              <button
                type="button"
                onClick={() => {
                  onServiceClick(card);
                  onClose();
                }}
                className="text-xs text-accent hover:underline"
              >
                {language === 'ro' ? 'Deschide detaliile complete →' : 'Open full details →'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-surface px-6 py-4">
        {revealed ? (
          <>
            <button
              type="button"
              onClick={() => advance(false)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-danger/40 bg-danger/5 px-4 py-2 text-sm font-medium text-danger hover:bg-danger/10"
            >
              <Repeat className="h-3.5 w-3.5" />
              {language === 'ro' ? 'De repetat' : 'Need review'}
            </button>
            <button
              type="button"
              onClick={() => advance(true)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90"
            >
              <Check className="h-3.5 w-3.5" />
              {language === 'ro' ? 'O știam' : 'I knew it'}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <p className="flex-1 text-center text-xs text-text-tertiary">
            {language === 'ro' ? 'Apasă' : 'Press'}{' '}
            <kbd className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-2xs">Space</kbd>{' '}
            {language === 'ro' ? 'sau click pe carte' : 'or click the card'}
          </p>
        )}
      </div>
    </Shell>
  );
}

function ConfidencePips({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Confidence ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i <= level ? 'bg-accent' : 'bg-muted'
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${
        accent ? 'border-accent/30 bg-accent-soft' : 'border-border bg-surface'
      }`}
    >
      <div className={`font-mono text-xl font-bold tabular-nums ${accent ? 'text-accent' : 'text-text-primary'}`}>
        {value}
      </div>
      <div className="font-mono text-2xs uppercase tracking-wider text-text-tertiary">{label}</div>
    </div>
  );
}

function Shell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Flashcards"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close flashcards"
          className="absolute right-3 top-3 z-10 rounded-lg p-2 text-text-tertiary hover:bg-muted hover:text-text-primary"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
