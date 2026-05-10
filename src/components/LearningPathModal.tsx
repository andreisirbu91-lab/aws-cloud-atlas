'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Map, Trophy, BookOpen, GitCompare, Box, Lightbulb, Check } from 'lucide-react';
import type { LearningPath, Language, Service, Concept, Comparison } from '@/types';
import { getServiceById } from '@/data/services';
import { concepts as allConcepts } from '@/data/concepts';
import { comparisons as allComparisons } from '@/data/comparisons';
import { useProgressStore } from '@/store/progress';

interface LearningPathModalProps {
  path: LearningPath;
  language: Language;
  onClose: () => void;
  onServiceClick: (s: Service) => void;
  onConceptClick: (c: Concept) => void;
  onComparisonClick: (c: Comparison) => void;
}

function t(rec: Record<string, string> | undefined, lang: Language): string {
  if (!rec) return '';
  return rec[lang] ?? rec.en ?? Object.values(rec)[0] ?? '';
}

export function LearningPathModal({
  path,
  language,
  onClose,
  onServiceClick,
  onConceptClick,
  onComparisonClick,
}: LearningPathModalProps) {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const markServiceLearned = useProgressStore((s) => s.markServiceLearned);
  const serviceProgress = useProgressStore((s) => s.progress.serviceProgress);

  // Lock body + ESC + arrows
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && idx > 0) setIdx(idx - 1);
      if (e.key === 'ArrowRight') {
        if (idx < path.steps.length - 1) setIdx(idx + 1);
        else setDone(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [idx, path.steps.length, onClose]);

  const step = path.steps[idx];

  // Resolve the step's referenced entity
  let entity:
    | { kind: 'service'; data: Service }
    | { kind: 'concept'; data: Concept }
    | { kind: 'comparison'; data: Comparison }
    | null = null;

  if (step) {
    if (step.kind === 'service') {
      const s = getServiceById(step.refId);
      if (s) entity = { kind: 'service', data: s };
    } else if (step.kind === 'concept') {
      const c = allConcepts.find((c) => c.id === step.refId);
      if (c) entity = { kind: 'concept', data: c };
    } else if (step.kind === 'comparison') {
      const c = allComparisons.find((c) => c.id === step.refId);
      if (c) entity = { kind: 'comparison', data: c };
    }
  }

  function next() {
    // Mark service learned as we walk past it
    if (step && step.kind === 'service') {
      markServiceLearned(step.refId);
    }
    if (idx < path.steps.length - 1) setIdx(idx + 1);
    else setDone(true);
  }

  // ============ DONE SCREEN ============
  if (done) {
    return (
      <Shell onClose={onClose}>
        <div className="px-6 py-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
            <Trophy className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            {language === 'ro' ? 'Traseu complet 🎉' : 'Path complete 🎉'}
          </h2>
          <p className="mt-2 text-sm text-text-secondary text-pretty">
            {language === 'ro'
              ? `Ai parcurs „${t(path.title, language)}". Continuă cu un quiz pe topicul ăsta.`
              : `You finished "${t(path.title, language)}". Continue with a quiz on this topic.`}
          </p>
          <button
            onClick={onClose}
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            {language === 'ro' ? 'Închide' : 'Close'}
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell onClose={onClose}>
      {/* Header */}
      <div className="border-b border-border px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="rounded bg-accent-soft px-2 py-0.5 font-mono text-2xs font-semibold uppercase tracking-wider text-accent">
              <Map className="mr-1 inline h-3 w-3" />
              {t(path.title, language)}
            </span>
            <span className="font-mono text-2xs uppercase tracking-wider text-text-tertiary">
              {idx + 1} / {path.steps.length}
            </span>
          </div>
          {step?.kind && (
            <span className="font-mono text-2xs text-text-tertiary">
              {step.kind}
            </span>
          )}
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${((idx + 1) / path.steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="max-h-[calc(92vh-200px)] overflow-y-auto px-6 py-6">
        {!entity ? (
          <p className="text-sm text-text-tertiary">
            {language === 'ro' ? 'Pas indisponibil.' : 'Step unavailable.'}
          </p>
        ) : entity.kind === 'service' ? (
          <ServiceStepCard
            service={entity.data}
            language={language}
            note={step.note ? t(step.note, language) : undefined}
            learned={serviceProgress[entity.data.id]?.status === 'mastered' || serviceProgress[entity.data.id]?.status === 'review'}
            onOpen={() => onServiceClick(entity.data)}
          />
        ) : entity.kind === 'concept' ? (
          <ConceptStepCard
            concept={entity.data}
            language={language}
            note={step.note ? t(step.note, language) : undefined}
            onOpen={() => onConceptClick(entity.data)}
          />
        ) : (
          <ComparisonStepCard
            comparison={entity.data}
            language={language}
            note={step.note ? t(step.note, language) : undefined}
            onOpen={() => onComparisonClick(entity.data)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-surface px-6 py-4">
        <button
          type="button"
          onClick={() => idx > 0 && setIdx(idx - 1)}
          disabled={idx === 0}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-sm font-medium text-text-primary disabled:cursor-not-allowed disabled:opacity-40 hover:border-border-strong"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {language === 'ro' ? 'Înapoi' : 'Back'}
        </button>

        <span className="font-mono text-2xs text-text-tertiary">
          {language === 'ro' ? 'Folosește' : 'Use'}{' '}
          <kbd className="rounded border border-border bg-surface-elevated px-1 py-0.5 font-mono text-2xs">←</kbd>{' '}
          <kbd className="rounded border border-border bg-surface-elevated px-1 py-0.5 font-mono text-2xs">→</kbd>
        </span>

        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          {idx === path.steps.length - 1
            ? language === 'ro' ? 'Termină' : 'Finish'
            : language === 'ro' ? 'Următorul' : 'Next'}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </Shell>
  );
}

// ============================================================================
// Step cards
// ============================================================================

function NoteBox({ note }: { note: string | undefined }) {
  if (!note) return null;
  return (
    <div className="mb-4 flex gap-2 rounded-lg border border-accent/20 bg-accent-soft px-3 py-2 text-xs leading-relaxed text-text-primary">
      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
      <span>{note}</span>
    </div>
  );
}

function ServiceStepCard({
  service,
  language,
  note,
  learned,
  onOpen,
}: {
  service: Service;
  language: Language;
  note?: string;
  learned: boolean;
  onOpen: () => void;
}) {
  return (
    <div>
      <NoteBox note={note} />
      <div className="flex items-start gap-3">
        <span
          className="mt-1 h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: service.visual.color }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-text-primary">
              {service.abbreviation}
            </h3>
            {learned && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 font-mono text-2xs font-semibold text-success">
                <Check className="h-2.5 w-2.5" />
                {language === 'ro' ? 'studiat' : 'studied'}
              </span>
            )}
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-2xs text-text-secondary">
              <Box className="mr-1 inline h-3 w-3" />
              {language === 'ro' ? 'serviciu' : 'service'}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-text-secondary">{service.fullName}</p>

          <p className="mt-3 text-sm leading-relaxed text-text-primary text-pretty">
            {t(service.description, language)}
          </p>

          {t(service.analogy, language) && (
            <div className="mt-3 rounded-lg border border-accent/20 bg-accent-soft px-3 py-2">
              <h4 className="mb-1 flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-accent">
                <Lightbulb className="h-3 w-3" />
                {language === 'ro' ? 'Analogie' : 'Analogy'}
              </h4>
              <p className="text-sm leading-relaxed text-text-primary text-pretty">
                {t(service.analogy, language)}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={onOpen}
            className="mt-3 text-xs font-medium text-accent hover:underline"
          >
            {language === 'ro' ? 'Deschide detaliile complete →' : 'Open full details →'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConceptStepCard({
  concept,
  language,
  note,
  onOpen,
}: {
  concept: Concept;
  language: Language;
  note?: string;
  onOpen: () => void;
}) {
  return (
    <div>
      <NoteBox note={note} />
      <div className="flex items-start gap-3">
        <BookOpen className="mt-1 h-4 w-4 shrink-0 text-accent" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-text-primary">
              {t(concept.title as Record<string, string>, language)}
            </h3>
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-2xs text-text-secondary">
              {language === 'ro' ? 'concept' : 'concept'}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-primary text-pretty">
            {t(concept.tagline, language)}
          </p>
          {/* Show first section body as a preview */}
          {concept.sections?.[0] && (
            <div className="mt-3 border-l-2 border-accent/30 pl-3">
              <h4 className="mb-1 font-mono text-2xs uppercase tracking-wider text-text-tertiary">
                {t(concept.sections[0].heading, language)}
              </h4>
              <p className="line-clamp-3 text-xs leading-relaxed text-text-secondary text-pretty">
                {t(concept.sections[0].body, language)}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={onOpen}
            className="mt-3 text-xs font-medium text-accent hover:underline"
          >
            {language === 'ro' ? 'Deschide explicația completă →' : 'Open full explanation →'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparisonStepCard({
  comparison,
  language,
  note,
  onOpen,
}: {
  comparison: Comparison;
  language: Language;
  note?: string;
  onOpen: () => void;
}) {
  return (
    <div>
      <NoteBox note={note} />
      <div className="flex items-start gap-3">
        <GitCompare className="mt-1 h-4 w-4 shrink-0 text-accent" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-text-primary">
              {t(comparison.title, language)}
            </h3>
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-2xs text-text-secondary">
              {language === 'ro' ? 'comparație' : 'comparison'}
            </span>
            {comparison.examFrequency === 'high' && (
              <span className="rounded bg-danger/15 px-1.5 py-0.5 font-mono text-2xs font-semibold text-danger">
                {language === 'ro' ? 'frecvent' : 'high freq'}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-primary text-pretty">
            {t(comparison.tagline, language)}
          </p>
          <p className="mt-2 font-mono text-2xs text-text-tertiary">
            {comparison.rows.length} {language === 'ro' ? 'rânduri' : 'rows'} ·{' '}
            {comparison.serviceIds.length} {language === 'ro' ? 'coloane' : 'columns'}
          </p>
          <button
            type="button"
            onClick={onOpen}
            className="mt-3 inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:opacity-90"
          >
            {language === 'ro' ? 'Deschide tabelul' : 'Open the table'}
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
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
      aria-label="Learning path"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close path"
          className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-text-tertiary hover:bg-muted hover:text-text-primary"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
