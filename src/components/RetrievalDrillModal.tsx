'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, ChevronRight, RefreshCw, Trophy, Check, Repeat, Brain, BookOpen } from 'lucide-react';
import type { Language, Service } from '@/types';
import { services as allServices } from '@/data/services';
import { useProgressStore } from '@/store/progress';

interface RetrievalDrillModalProps {
  language: Language;
  onClose: () => void;
}

function t(rec: Record<string, string> | undefined, lang: Language): string {
  if (!rec) return '';
  return rec[lang] ?? rec.en ?? Object.values(rec)[0] ?? '';
}

interface DrillCard {
  serviceId: string;
  abbreviation: string;
  color: string;
  q: Record<string, string>;
  a: Record<string, string>;
}

/**
 * Retrieval Drill — the highest-utility learning mode (active recall) combined
 * with INTERLEAVING: questions from many services are mixed together so the
 * brain must first retrieve "which service is this?" before recalling the answer.
 *
 * Each card hides its answer; after revealing, self-grading ("Got it" / "Review")
 * feeds the SAME spaced-repetition signal flashcards use (updateServiceConfidence),
 * so weak services resurface sooner across the app.
 */
export function RetrievalDrillModal({ language, onClose }: RetrievalDrillModalProps) {
  const serviceProgress = useProgressStore((s) => s.progress.serviceProgress);
  const updateConfidence = useProgressStore((s) => s.updateServiceConfidence);

  // Build an interleaved deck once on mount: collect every retrieval question,
  // then order so consecutive cards rarely share a service (interleaving).
  const deck = useMemo<DrillCard[]>(() => {
    const cards: DrillCard[] = [];
    for (const svc of allServices as Service[]) {
      if (!svc.retrievalQuestions?.length) continue;
      for (const rq of svc.retrievalQuestions) {
        cards.push({
          serviceId: svc.id,
          abbreviation: svc.abbreviation,
          color: svc.visual.color,
          q: rq.q,
          a: rq.a,
        });
      }
    }
    // Deterministic interleave (no Math.random): round-robin by service, so
    // two cards from the same service are spread apart. Weakest services first.
    const byService = new Map<string, DrillCard[]>();
    for (const c of cards) {
      const list = byService.get(c.serviceId) ?? [];
      list.push(c);
      byService.set(c.serviceId, list);
    }
    const groups = Array.from(byService.values()).sort((a, b) => {
      const aLvl = serviceProgress[a[0].serviceId]?.confidenceLevel ?? 0;
      const bLvl = serviceProgress[b[0].serviceId]?.confidenceLevel ?? 0;
      return aLvl - bLvl;
    });

    const interleaved: DrillCard[] = [];
    let added = true;
    let round = 0;
    while (added) {
      added = false;
      for (const g of groups) {
        if (round < g.length) {
          interleaved.push(g[round]);
          added = true;
        }
      }
      round++;
    }
    return interleaved;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ knew: 0, review: 0 });
  const [done, setDone] = useState(false);

  const card = deck[idx];

  // Lock scroll, ESC closes, Space/Enter reveals.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === ' ' || e.key === 'Enter') && !revealed) {
        e.preventDefault();
        setRevealed(true);
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
          {language === 'ro'
            ? 'Nu există încă întrebări de recall. Adaugă servicii îmbogățite.'
            : 'No retrieval questions yet. Enrich some services first.'}
        </div>
      </Shell>
    );
  }

  function grade(knew: boolean) {
    const cur = deck[idx];
    const prevLvl = serviceProgress[cur.serviceId]?.confidenceLevel ?? 0;
    updateConfidence(cur.serviceId, knew ? Math.min(5, prevLvl + 1) : 1);
    setStats((s) => ({ knew: s.knew + (knew ? 1 : 0), review: s.review + (knew ? 0 : 1) }));
    if (idx + 1 >= deck.length) {
      setDone(true);
      return;
    }
    setIdx(idx + 1);
    setRevealed(false);
  }

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
            {language === 'ro' ? 'Drill complet' : 'Drill complete'}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {language === 'ro' ? 'Ai răspuns la ' : 'You answered '}
            <span className="font-mono font-semibold text-text-primary">{total}</span>
            {language === 'ro' ? ' întrebări' : ' questions'}
          </p>
          <div className="mx-auto mt-6 grid max-w-xs grid-cols-2 gap-3">
            <Stat label={language === 'ro' ? 'Știam' : 'Knew it'} value={stats.knew} accent />
            <Stat label={language === 'ro' ? 'De repetat' : 'Need review'} value={stats.review} />
          </div>
          <p className="mt-4 text-xs text-text-tertiary">
            {language === 'ro'
              ? 'Confidența a fost actualizată — serviciile slabe revin mai des.'
              : 'Confidence updated — weaker services resurface sooner.'}
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

  const progress = ((idx + (revealed ? 0.5 : 0)) / deck.length) * 100;

  return (
    <Shell onClose={onClose}>
      {/* Header */}
      <div className="border-b border-border px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-accent-soft px-2 py-0.5 font-mono text-2xs font-semibold uppercase tracking-wider text-accent">
              <Brain className="h-3 w-3" />
              {language === 'ro' ? 'Recall mixt' : 'Retrieval drill'}
            </span>
            <span className="font-mono text-2xs uppercase tracking-wider text-text-tertiary">
              {idx + 1} / {deck.length}
            </span>
          </div>
          <span className="font-mono text-2xs text-text-tertiary">
            {language === 'ro' ? 'știut' : 'knew'} {stats.knew}
          </span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card body */}
      <div className="flex min-h-[360px] flex-col gap-4 px-6 py-6 sm:py-8">
        <div className="flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: card.color }} aria-hidden />
          <span className="font-mono text-2xs uppercase tracking-wider text-text-tertiary">
            {card.abbreviation}
          </span>
        </div>

        <p className="text-center text-lg font-semibold leading-relaxed text-text-primary text-pretty sm:text-xl">
          {t(card.q, language)}
        </p>

        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mx-auto mt-2 flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-border px-8 py-10 text-center text-text-tertiary transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
          >
            <span className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4" />
              {language === 'ro' ? 'Click sau Space pentru răspuns' : 'Click or press Space to reveal'}
            </span>
          </button>
        ) : (
          <div className="animate-fade-up rounded-xl border border-border bg-surface px-4 py-4">
            <p className="text-sm leading-relaxed text-text-primary text-pretty">{t(card.a, language)}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-surface px-6 py-4">
        {revealed ? (
          <>
            <button
              type="button"
              onClick={() => grade(false)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-danger/40 bg-danger/5 px-4 py-2 text-sm font-medium text-danger hover:bg-danger/10"
            >
              <Repeat className="h-3.5 w-3.5" />
              {language === 'ro' ? 'De repetat' : 'Need review'}
            </button>
            <button
              type="button"
              onClick={() => grade(true)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90"
            >
              <Check className="h-3.5 w-3.5" />
              {language === 'ro' ? 'O știam' : 'I knew it'}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <p className="flex-1 text-center text-xs text-text-tertiary">
            {language === 'ro' ? 'Încearcă să răspunzi cu voce tare întâi' : 'Try to answer out loud first'}
          </p>
        )}
      </div>
    </Shell>
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
      aria-label="Retrieval drill"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close retrieval drill"
          className="absolute right-3 top-3 z-10 rounded-lg p-2 text-text-tertiary hover:bg-muted hover:text-text-primary"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
