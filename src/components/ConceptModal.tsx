'use client';

import { useEffect } from 'react';
import { X, ExternalLink, BookOpen, Lightbulb, Link2 } from 'lucide-react';
import type { Concept, Language, Service } from '@/types';
import { getServiceById } from '@/data/services';
import { getConceptById, TOPIC_LABELS } from '@/data/concepts';

interface ConceptModalProps {
  concept: Concept;
  language: Language;
  onClose: () => void;
  onConceptClick: (c: Concept) => void;
  onServiceClick: (s: Service) => void;
}

/**
 * Render a body string. If lines start with "- ", render as a list,
 * otherwise as paragraphs (split on blank lines).
 */
function renderBody(body: string) {
  const lines = body.split('\n');
  const isList = lines.some((l) => l.trim().startsWith('- '));
  if (isList) {
    return (
      <ul className="space-y-1.5 text-sm leading-relaxed text-text-primary text-pretty">
        {lines
          .filter((l) => l.trim())
          .map((l, i) => {
            const clean = l.replace(/^[\s-]+/, '');
            const numMatch = clean.match(/^(\d+)\.\s+(.*)/);
            return (
              <li key={i} className="flex gap-2">
                <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-text-tertiary" aria-hidden />
                <span>
                  {numMatch ? (
                    <>
                      <span className="font-mono font-semibold text-accent">{numMatch[1]}.</span>{' '}
                      {numMatch[2]}
                    </>
                  ) : (
                    clean
                  )}
                </span>
              </li>
            );
          })}
      </ul>
    );
  }
  return (
    <div className="space-y-3 text-sm leading-relaxed text-text-primary text-pretty">
      {body
        .split(/\n\s*\n/)
        .map((para, i) => (
          <p key={i}>{para}</p>
        ))}
    </div>
  );
}

export function ConceptModal({
  concept,
  language,
  onClose,
  onConceptClick,
  onServiceClick,
}: ConceptModalProps) {
  // Body scroll lock + Escape close
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

  const title = concept.title[language] ?? concept.title.en;
  const tagline = concept.tagline[language] ?? concept.tagline.en;
  const topicLabel = TOPIC_LABELS[concept.topic][language as 'en' | 'ro'] ?? TOPIC_LABELS[concept.topic].en;

  const relatedServices = (concept.relatedServices ?? [])
    .map((id) => getServiceById(id))
    .filter((s): s is Service => Boolean(s));

  const relatedConcepts = (concept.relatedConcepts ?? [])
    .map((id) => getConceptById(id))
    .filter((c): c is Concept => Boolean(c));

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="concept-modal-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border bg-surface-elevated px-6 py-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" />
              <span className="font-mono text-2xs uppercase tracking-wider text-accent">
                {topicLabel}
              </span>
            </div>
            <h2
              id="concept-modal-title"
              className="mt-1.5 text-2xl font-bold tracking-tight text-text-primary"
            >
              {title}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">{tagline}</p>
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
        <div className="max-h-[calc(92vh-130px)] space-y-6 overflow-y-auto px-6 py-5">
          {/* Sections */}
          {concept.sections.map((section, i) => (
            <section key={i}>
              <h3 className="mb-2 text-sm font-semibold tracking-tight text-text-primary">
                {section.heading[language] ?? section.heading.en}
              </h3>
              {renderBody(section.body[language] ?? section.body.en)}
            </section>
          ))}

          {/* Key facts box */}
          {concept.keyFacts.length > 0 && (
            <section className="rounded-xl border border-accent/20 bg-accent-soft px-4 py-3">
              <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <Lightbulb className="h-3.5 w-3.5" />
                Key facts to remember
              </h3>
              <ul className="space-y-1.5">
                {concept.keyFacts.map((fact, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-text-primary">
                    <span className="font-mono text-text-tertiary">{String(i + 1).padStart(2, '0')}</span>
                    <span>{fact[language] ?? fact.en}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related services + concepts */}
          {(relatedServices.length > 0 || relatedConcepts.length > 0) && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                <Link2 className="h-3.5 w-3.5" />
                Related
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedConcepts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onConceptClick(c)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs text-accent transition-colors hover:border-accent"
                  >
                    <BookOpen className="h-3 w-3" />
                    {c.title[language] ?? c.title.en}
                  </button>
                ))}
                {relatedServices.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onServiceClick(s)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: s.visual.color }}
                      aria-hidden
                    />
                    {s.abbreviation}
                  </button>
                ))}
              </div>
            </section>
          )}

          {concept.docsUrl && (
            <a
              href={concept.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              View AWS docs
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
