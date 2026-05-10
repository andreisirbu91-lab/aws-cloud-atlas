'use client';

import { useEffect } from 'react';
import { X, ExternalLink, Check, Lightbulb, BookOpen, DollarSign, Link2 } from 'lucide-react';
import type { Service, Language } from '@/types';
import { useProgressStore } from '@/store/progress';
import { getServiceById } from '@/data/services';

interface ServiceModalProps {
  service: Service;
  language: Language;
  onClose: () => void;
  onServiceClick: (s: Service) => void;
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

  const desc = service.description[language] ?? service.description.en;
  const analogy = service.analogy[language] ?? service.analogy.en;
  const pricing = service.pricing[language] ?? service.pricing.en;

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
          {/* What it is */}
          <section className="mb-6">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              <BookOpen className="h-3.5 w-3.5" />
              What it is
            </h3>
            <p className="text-base leading-relaxed text-text-primary text-pretty">{desc}</p>
          </section>

          {/* Analogy */}
          <section className="mb-6 rounded-xl border border-accent/20 bg-accent-soft px-4 py-3">
            <h3 className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Lightbulb className="h-3.5 w-3.5" />
              Analogy
            </h3>
            <p className="text-sm italic leading-relaxed text-text-primary">{analogy}</p>
          </section>

          {/* Exam tips */}
          {service.examTips.length > 0 && (
            <section className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                <Check className="h-3.5 w-3.5" />
                Key exam points ({service.examTips.length})
              </h3>
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
                      {tip.content[language] ?? tip.content.en}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Pricing */}
          <section className="mb-6">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
              <DollarSign className="h-3.5 w-3.5" />
              Pricing
            </h3>
            <p className="font-mono text-sm text-text-primary">{pricing}</p>
          </section>

          {/* Connections */}
          {connections.length > 0 && (
            <section className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                <Link2 className="h-3.5 w-3.5" />
                Works with
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
              View AWS docs
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
                <Check className="h-4 w-4" /> Mastered
              </span>
            ) : (
              'Mark as learned'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
