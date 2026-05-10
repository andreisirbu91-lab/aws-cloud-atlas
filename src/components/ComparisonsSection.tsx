'use client';

import { GitCompare, ArrowRight, Flame } from 'lucide-react';
import type { Comparison, Language } from '@/types';
import { comparisons } from '@/data/comparisons';
import { getServiceById } from '@/data/services';

interface ComparisonsSectionProps {
  language: Language;
  onComparisonClick: (c: Comparison) => void;
}

function t(rec: Record<string, string> | undefined, lang: Language): string {
  if (!rec) return '';
  return rec[lang] ?? rec.en ?? Object.values(rec)[0] ?? '';
}

export function ComparisonsSection({ language, onComparisonClick }: ComparisonsSectionProps) {
  return (
    <section id="comparisons" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            <GitCompare className="h-5 w-5 text-accent" />
            {language === 'ro' ? 'Comparații cheie' : 'Key Comparisons'}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary text-pretty">
            {language === 'ro'
              ? 'Tabele „care serviciu să aleg?". Răspunsurile la întrebările frecvente de pe examen.'
              : '"Which service should I pick?" tables. The most-tested side-by-side decisions on the exam.'}
          </p>
        </div>
        <span className="hidden font-mono text-2xs uppercase tracking-wider text-text-tertiary sm:block">
          {comparisons.length} {language === 'ro' ? 'tabele' : 'tables'}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((c) => (
          <ComparisonCard
            key={c.id}
            comparison={c}
            language={language}
            onClick={() => onComparisonClick(c)}
          />
        ))}
      </div>
    </section>
  );
}

function ComparisonCard({
  comparison,
  language,
  onClick,
}: {
  comparison: Comparison;
  language: Language;
  onClick: () => void;
}) {
  // Pick up to 4 colors for the dot strip
  const dots = comparison.serviceIds
    .map((id) => getServiceById(id)?.visual.color)
    .filter(Boolean) as string[];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col rounded-xl border border-border bg-surface-elevated p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
    >
      {/* Top row: dots + frequency badge */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {dots.length > 0 ? (
            dots.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="h-3 w-3 rounded-full border-2 border-surface-elevated"
                style={{ backgroundColor: color }}
                aria-hidden
              />
            ))
          ) : (
            <span className="h-3 w-3 rounded-full bg-muted" aria-hidden />
          )}
          <span className="ml-3 font-mono text-2xs uppercase tracking-wider text-text-tertiary">
            {comparison.serviceIds.length}-{language === 'ro' ? 'way' : 'way'}
          </span>
        </div>
        {comparison.examFrequency === 'high' && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-danger/15 px-1.5 py-0.5 font-mono text-2xs font-semibold text-danger">
            <Flame className="h-2.5 w-2.5" strokeWidth={2.5} />
            {language === 'ro' ? 'frecvent' : 'high freq'}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-text-primary leading-tight">
        {t(comparison.title, language)}
      </h3>

      {/* Tagline */}
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-secondary text-pretty">
        {t(comparison.tagline, language)}
      </p>

      {/* Footer: row count + arrow */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="font-mono text-2xs text-text-tertiary">
          {comparison.rows.length} {language === 'ro' ? 'rânduri' : 'rows'}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
          {language === 'ro' ? 'Deschide' : 'Open'}
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}
