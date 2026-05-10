'use client';

import type { Service, Language } from '@/types';
import { Star, Check } from 'lucide-react';
import { useProgressStore } from '@/store/progress';

interface ServiceCardProps {
  service: Service;
  language: Language;
  onClick: (service: Service) => void;
}

const FREQ_DOTS: Record<Service['examFrequency'], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function ServiceCard({ service, language, onClick }: ServiceCardProps) {
  const progress = useProgressStore((s) => s.progress.serviceProgress[service.id]);
  const learned = progress?.status === 'mastered' || progress?.status === 'review';

  const desc = service.description[language] ?? service.description.en;

  return (
    <button
      type="button"
      onClick={() => onClick(service)}
      className="card-lift group relative flex h-full flex-col items-start rounded-xl border border-border bg-surface-elevated p-4 text-left shadow-xs hover:border-border-strong hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* Top row: name + indicators */}
      <div className="flex w-full items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold tracking-tight text-text-primary">
              {service.abbreviation}
            </h3>
            {learned && (
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-white"
                aria-label="Learned"
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-xs text-text-tertiary">
            {service.fullName}
          </p>
        </div>
        <span
          className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: service.visual.color }}
          aria-hidden
        />
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-text-secondary">
        {desc}
      </p>

      {/* Footer: exam frequency dots */}
      <div className="mt-3 flex w-full items-center justify-between border-t border-border pt-2">
        <div className="flex items-center gap-1" aria-label={`Exam frequency: ${service.examFrequency}`}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              className={`h-2.5 w-2.5 ${
                i < FREQ_DOTS[service.examFrequency]
                  ? 'fill-accent text-accent'
                  : 'text-border-strong'
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-2xs text-text-tertiary">
          {service.connections.length} links
        </span>
      </div>
    </button>
  );
}
