'use client';

import type { Category, Language, Service } from '@/types';
import { ServiceCard } from './ServiceCard';
import { useProgressStore } from '@/store/progress';

interface CategorySectionProps {
  category: Category;
  services: Service[];
  language: Language;
  onServiceClick: (service: Service) => void;
}

export function CategorySection({
  category,
  services,
  language,
  onServiceClick,
}: CategorySectionProps) {
  const progress = useProgressStore((s) => s.progress.serviceProgress);
  const learnedCount = services.filter(
    (s) => {
      const p = progress[s.id];
      return p?.status === 'mastered' || p?.status === 'review';
    },
  ).length;

  const label = category.label[language] ?? category.label.en;
  const description = category.description[language] ?? category.description.en;

  return (
    <section className="animate-fade-up" aria-labelledby={`cat-${category.id}`}>
      <header className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: category.color }}
            aria-hidden
          />
          <h2
            id={`cat-${category.id}`}
            className="text-base font-bold uppercase tracking-wide text-text-primary"
          >
            {label}
          </h2>
          <span className="font-mono text-2xs text-text-tertiary">
            {services.length} services
          </span>
        </div>
        <span className="font-mono text-xs text-text-tertiary">
          {learnedCount}/{services.length} learned
        </span>
      </header>

      <p className="mb-4 max-w-2xl text-sm text-text-secondary">{description}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {services.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            language={language}
            onClick={onServiceClick}
          />
        ))}
      </div>
    </section>
  );
}
