'use client';

import type { Concept, Language } from '@/types';
import { concepts, TOPIC_LABELS } from '@/data/concepts';
import { BookOpen, Star } from 'lucide-react';

interface ConceptsSectionProps {
  language: Language;
  onConceptClick: (c: Concept) => void;
}

const FREQ_DOTS: Record<Concept['examFrequency'], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function ConceptsSection({ language, onConceptClick }: ConceptsSectionProps) {
  // Group by topic, preserving order from data file
  const grouped = concepts.reduce<Record<string, Concept[]>>((acc, c) => {
    (acc[c.topic] ??= []).push(c);
    return acc;
  }, {});

  return (
    <section className="animate-fade-up" aria-labelledby="concepts-heading">
      <header className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <div className="flex items-center gap-3">
          <BookOpen className="h-4 w-4 text-accent" />
          <h2
            id="concepts-heading"
            className="text-base font-bold uppercase tracking-wide text-text-primary"
          >
            Core Concepts
          </h2>
          <span className="font-mono text-2xs text-text-tertiary">
            {concepts.length} topics
          </span>
        </div>
        <span className="text-xs text-text-tertiary">
          AWS infrastructure, frameworks, pricing, security
        </span>
      </header>

      <p className="mb-4 max-w-2xl text-sm text-text-secondary">
        Knowledge that isn&apos;t about a single service — Regions, AZs, Shared
        Responsibility, Well-Architected, pricing models, support plans. Heavy
        on the CLF-C02 exam.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([topic, items]) => (
          <div
            key={topic}
            className="rounded-xl border border-border bg-surface-elevated p-4"
          >
            <h3 className="mb-3 font-mono text-2xs uppercase tracking-wider text-text-tertiary">
              {TOPIC_LABELS[topic as Concept['topic']][language as 'en' | 'ro'] ??
                TOPIC_LABELS[topic as Concept['topic']].en}
            </h3>
            <ul className="space-y-1">
              {items.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onConceptClick(c)}
                    className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted"
                  >
                    <span className="truncate text-sm font-medium text-text-primary">
                      {c.title[language] ?? c.title.en}
                    </span>
                    <span
                      className="flex shrink-0 items-center gap-0.5"
                      aria-label={`Exam frequency: ${c.examFrequency}`}
                    >
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-2.5 w-2.5 ${
                            i < FREQ_DOTS[c.examFrequency]
                              ? 'fill-accent text-accent'
                              : 'text-border-strong'
                          }`}
                        />
                      ))}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
