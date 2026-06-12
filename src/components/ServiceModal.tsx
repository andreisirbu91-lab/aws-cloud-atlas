'use client';

import { useEffect, useState } from 'react';
import {
  X, ExternalLink, Check, Lightbulb, BookOpen, DollarSign, Link2,
  Brain, ChevronDown, ListOrdered, KeyRound, ThumbsUp, ThumbsDown,
  AlertTriangle, Hash, GitBranch, ChevronRight, Repeat,
} from 'lucide-react';
import type { Service, Language } from '@/types';
import { useProgressStore } from '@/store/progress';
import { getServiceById } from '@/data/services';
import { MermaidDiagram } from '@/components/MermaidDiagram';

interface ServiceModalProps {
  service: Service;
  language: Language;
  onClose: () => void;
  onServiceClick: (s: Service) => void;
}

/** Bilingual fallback: current language → English → first available. */
function t(rec: Record<string, string> | undefined, lang: Language): string {
  if (!rec) return '';
  return rec[lang] ?? rec.en ?? Object.values(rec)[0] ?? '';
}

/**
 * Collapsible section for progressive disclosure — manages cognitive load
 * so dense exam material isn't a wall of text. Reuses the existing uppercase
 * header style. `defaultOpen` controls whether it starts expanded.
 */
function Section({
  icon,
  label,
  defaultOpen = false,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="mb-4 overflow-hidden rounded-xl border border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 bg-surface px-4 py-3 text-left transition-colors hover:bg-muted"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          {icon}
          {label}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="border-t border-border px-4 py-3 animate-fade-up">{children}</div>}
    </section>
  );
}

/**
 * Retrieval-practice card (the highest-utility technique — active recall).
 * Hides the answer, reveals on click, then self-grade feeds the SAME
 * spaced-repetition signal flashcards use (updateServiceConfidence).
 */
function RetrievalCard({
  questions,
  serviceId,
  language,
}: {
  questions: NonNullable<Service['retrievalQuestions']>;
  serviceId: string;
  language: Language;
}) {
  const updateConfidence = useProgressStore((s) => s.updateServiceConfidence);
  const curLevel = useProgressStore(
    (s) => s.progress.serviceProgress[serviceId]?.confidenceLevel ?? 0,
  );
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const q = questions[idx];

  function grade(knew: boolean) {
    updateConfidence(serviceId, knew ? Math.min(5, curLevel + 1) : 1);
    setRevealed(false);
    setIdx((i) => (i + 1) % questions.length);
  }

  return (
    <section className="mb-6 rounded-xl border border-accent/30 bg-accent-soft/40 px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
          <Brain className="h-3.5 w-3.5" />
          {language === 'ro' ? 'Testează-te' : 'Test yourself'}
        </h3>
        <span className="font-mono text-2xs text-text-tertiary">
          {idx + 1}/{questions.length}
        </span>
      </div>

      <p className="mb-3 text-sm font-medium leading-relaxed text-text-primary text-pretty">
        {t(q.q, language)}
      </p>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-4 text-sm text-text-tertiary transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
        >
          <BookOpen className="h-4 w-4" />
          {language === 'ro' ? 'Click pentru răspuns' : 'Click to reveal answer'}
        </button>
      ) : (
        <div className="animate-fade-up">
          <p className="rounded-lg border border-border bg-surface px-3 py-2.5 text-sm leading-relaxed text-text-primary text-pretty">
            {t(q.a, language)}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => grade(false)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-danger/40 bg-danger/5 px-3 py-2 text-sm font-medium text-danger hover:bg-danger/10"
            >
              <Repeat className="h-3.5 w-3.5" />
              {language === 'ro' ? 'Repetă' : 'Review'}
            </button>
            <button
              type="button"
              onClick={() => grade(true)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90"
            >
              <Check className="h-3.5 w-3.5" />
              {language === 'ro' ? 'Știam' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/** Renders a list of bilingual records as bullets. */
function BulletList({
  items,
  language,
  max,
}: {
  items: Array<Record<string, string>>;
  language: Language;
  max?: number;
}) {
  const shown = max ? items.slice(0, max) : items;
  return (
    <ul className="space-y-1.5">
      {shown.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm leading-relaxed text-text-primary">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-tertiary" aria-hidden />
          <span>{t(item, language)}</span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceModal({ service, language, onClose, onServiceClick }: ServiceModalProps) {
  const progress = useProgressStore((s) => s.progress.serviceProgress[service.id]);
  const markServiceLearned = useProgressStore((s) => s.markServiceLearned);
  const isLearned = progress?.status === 'mastered';

  // Lock body scroll when open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const desc = t(service.description, language);
  const analogy = t(service.analogy, language);
  const pricing = t(service.pricing, language);

  const connections = service.connections
    .map((id) => getServiceById(id))
    .filter((s): s is Service => Boolean(s));

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border bg-surface-elevated px-6 py-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: service.visual.color }}
                aria-hidden
              />
              <h2 id="modal-title" className="truncate text-2xl font-bold tracking-tight text-text-primary">
                {service.fullName}
              </h2>
            </div>
            <p className="mt-1 font-mono text-sm text-text-tertiary">
              {service.abbreviation} · {service.category}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-lg p-2 text-text-tertiary hover:bg-muted hover:text-text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[calc(92vh-130px)] overflow-y-auto px-6 py-5">
          {/* What it is — always visible (low cognitive load entry) */}
          <section className="mb-6">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              <BookOpen className="h-3.5 w-3.5" />
              {language === 'ro' ? 'Ce este' : 'What it is'}
            </h3>
            <p className="text-base leading-relaxed text-text-primary text-pretty">{desc}</p>
          </section>

          {/* Analogy — always visible (elaboration / concrete example) */}
          <section className="mb-6 rounded-xl border border-accent/20 bg-accent-soft px-4 py-3">
            <h3 className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Lightbulb className="h-3.5 w-3.5" />
              {language === 'ro' ? 'Analogie' : 'Analogy'}
            </h3>
            <p className="text-sm italic leading-relaxed text-text-primary">{analogy}</p>
          </section>

          {/* Test yourself — retrieval practice (highest utility) */}
          {service.retrievalQuestions && service.retrievalQuestions.length > 0 && (
            <RetrievalCard
              questions={service.retrievalQuestions}
              serviceId={service.id}
              language={language}
            />
          )}

          {/* How it works — segmenting (default open) */}
          {service.howItWorks && service.howItWorks.length > 0 && (
            <Section
              icon={<ListOrdered className="h-3.5 w-3.5" />}
              label={language === 'ro' ? 'Cum funcționează' : 'How it works'}
              defaultOpen
            >
              <ol className="space-y-2">
                {service.howItWorks.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-2xs font-semibold text-text-secondary">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-text-primary">{t(step, language)}</p>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {/* Key facts — chunked, capped at 5 (default open) */}
          {service.keyFacts && service.keyFacts.length > 0 && (
            <Section
              icon={<KeyRound className="h-3.5 w-3.5" />}
              label={language === 'ro' ? 'De reținut' : 'Key facts'}
              defaultOpen
            >
              <BulletList items={service.keyFacts} language={language} max={5} />
            </Section>
          )}

          {/* Key exam points (existing examTips) — default open */}
          {service.examTips.length > 0 && (
            <Section
              icon={<Check className="h-3.5 w-3.5" />}
              label={`${language === 'ro' ? 'Puncte de examen' : 'Key exam points'} (${service.examTips.length})`}
              defaultOpen
            >
              <ul className="space-y-2">
                {service.examTips.map((tip, i) => (
                  <li
                    key={tip.key}
                    className="flex gap-3 rounded-lg border border-border bg-surface px-3 py-2"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-2xs font-semibold text-text-secondary">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-text-primary">
                      {t(tip.content, language)}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Key numbers — figures to memorize (collapsed) */}
          {service.keyNumbers && service.keyNumbers.length > 0 && (
            <Section
              icon={<Hash className="h-3.5 w-3.5" />}
              label={language === 'ro' ? 'Cifre cheie' : 'Key numbers'}
            >
              <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {service.keyNumbers.map((n, i) => (
                  <div
                    key={i}
                    className="flex items-baseline justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2"
                  >
                    <dt className="text-xs text-text-secondary">{t(n.label, language)}</dt>
                    <dd className="shrink-0 font-mono text-sm font-semibold text-text-primary">
                      {t(n.value, language)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {/* When to use — application (collapsed) */}
          {service.whenToUse && service.whenToUse.length > 0 && (
            <Section
              icon={<ThumbsUp className="h-3.5 w-3.5" />}
              label={language === 'ro' ? 'Când folosești' : 'When to use'}
            >
              <BulletList items={service.whenToUse} language={language} />
            </Section>
          )}

          {/* When NOT to use — interleaving / discrimination (collapsed) */}
          {service.whenNotToUse && service.whenNotToUse.length > 0 && (
            <Section
              icon={<ThumbsDown className="h-3.5 w-3.5" />}
              label={language === 'ro' ? 'Când NU folosești' : 'When NOT to use'}
            >
              <div className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2">
                <BulletList items={service.whenNotToUse} language={language} />
              </div>
            </Section>
          )}

          {/* Exam traps — elaborative interrogation (collapsed) */}
          {service.examTraps && service.examTraps.length > 0 && (
            <Section
              icon={<AlertTriangle className="h-3.5 w-3.5" />}
              label={language === 'ro' ? 'Capcane de examen' : 'Exam traps'}
            >
              <div className="rounded-lg border border-warning/30 bg-warning/5 px-3 py-2">
                <BulletList items={service.examTraps} language={language} />
              </div>
            </Section>
          )}

          {/* Diagram — dual coding (collapsed). Mermaid takes precedence over chip flow. */}
          {(service.mermaidDiagram || (service.diagram && service.diagram.steps.length > 0)) && (
            <Section
              icon={<GitBranch className="h-3.5 w-3.5" />}
              label={language === 'ro' ? 'Diagramă' : 'Diagram'}
            >
              {service.mermaidDiagram ? (
                <figure className="m-0">
                  <MermaidDiagram
                    code={service.mermaidDiagram.code}
                    ariaLabel={t(service.mermaidDiagram.caption, language)}
                  />
                  <figcaption className="mt-2 text-center text-xs text-text-tertiary">
                    {t(service.mermaidDiagram.caption, language)}
                  </figcaption>
                </figure>
              ) : (
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  aria-label={t(service.diagram!.altText, language)}
                >
                  {service.diagram!.steps.map((step, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <span className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-text-primary">
                        {t(step, language)}
                      </span>
                      {i < service.diagram!.steps.length - 1 && (
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-text-tertiary" aria-hidden />
                      )}
                    </span>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* Pricing */}
          <section className="mb-6 mt-2">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              <DollarSign className="h-3.5 w-3.5" />
              {language === 'ro' ? 'Prețuri' : 'Pricing'}
            </h3>
            <p className="font-mono text-sm text-text-primary">{pricing}</p>
          </section>

          {/* Connections */}
          {connections.length > 0 && (
            <section className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                <Link2 className="h-3.5 w-3.5" />
                {language === 'ro' ? 'Funcționează cu' : 'Works with'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {connections.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onServiceClick(c)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: c.visual.color }}
                      aria-hidden
                    />
                    {c.abbreviation}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Docs link */}
          {service.docsUrl && (
            <a
              href={service.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              {language === 'ro' ? 'Vezi documentația AWS' : 'View AWS docs'}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 border-t border-border bg-surface px-6 py-4">
          <button
            type="button"
            onClick={() => markServiceLearned(service.id)}
            disabled={isLearned}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              isLearned
                ? 'bg-success/15 text-success cursor-not-allowed'
                : 'bg-accent text-accent-foreground hover:opacity-90'
            }`}
          >
            {isLearned ? (
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4" /> {language === 'ro' ? 'Stăpânit' : 'Mastered'}
              </span>
            ) : (
              language === 'ro' ? 'Marchează ca învățat' : 'Mark as learned'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
