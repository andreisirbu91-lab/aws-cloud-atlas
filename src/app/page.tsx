'use client';

import { useState, useCallback, useMemo } from 'react';
import { Flame, Trophy, Target, BookOpen, Sparkles } from 'lucide-react';
import type { Service, Concept, Language } from '@/types';
import { services } from '@/data/services';
import { categories } from '@/data/categories';
import { concepts } from '@/data/concepts';
import { quizQuestions } from '@/data/quiz-questions';
import { useProgressStore } from '@/store/progress';
import { CategorySection } from '@/components/CategorySection';
import { ConceptsSection } from '@/components/ConceptsSection';
import { ServiceModal } from '@/components/ServiceModal';
import { ConceptModal } from '@/components/ConceptModal';
import { QuizModalV2 } from '@/components/QuizModalV2';
import { GlobalSearch } from '@/components/GlobalSearch';
import { ThemeToggle } from '@/components/ThemeToggle';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ro', label: 'RO' },
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const { progress, getTotalLearned, getStreak } = useProgressStore();

  const handleServiceSelect = useCallback((s: Service) => {
    setSelectedConcept(null);
    setSelectedService(s);
  }, []);
  const handleConceptSelect = useCallback((c: Concept) => {
    setSelectedService(null);
    setSelectedConcept(c);
  }, []);

  // Group services by category (no client-side search filter — search has its own dropdown)
  const grouped = useMemo(
    () =>
      categories
        .map((cat) => ({
          category: cat,
          items: services.filter((s) => s.category === cat.id),
        }))
        .filter((g) => g.items.length > 0),
    [],
  );

  const stats = {
    total: services.length,
    learned: getTotalLearned(),
    mastered: Object.values(progress.serviceProgress).filter((p) => p.status === 'mastered').length,
    streak: getStreak(),
    xp: progress.totalXp,
  };

  const masteryPct = stats.total ? Math.round((stats.mastered / stats.total) * 100) : 0;

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-sm">
              <span className="text-xs font-bold tracking-tighter">AWS</span>
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-bold tracking-tight text-text-primary">
                Cloud Atlas
              </span>
              <span className="font-mono text-2xs text-text-tertiary">CLF-C02</span>
            </div>
          </a>

          {/* Universal search */}
          <GlobalSearch
            language={language}
            onSelectService={handleServiceSelect}
            onSelectConcept={handleConceptSelect}
          />

          {/* Stats - desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <Stat icon={<Target className="h-3.5 w-3.5" />} value={`${stats.mastered}/${stats.total}`} label="learned" />
            <Stat icon={<Flame className="h-3.5 w-3.5" />} value={stats.streak} label="streak" accent />
            <Stat icon={<Trophy className="h-3.5 w-3.5" />} value={stats.xp} label="XP" />
          </div>

          {/* Quiz button */}
          <button
            type="button"
            onClick={() => setQuizOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-sm hover:opacity-90"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Quiz</span>
          </button>

          {/* Language */}
          <div className="hidden items-center rounded-lg border border-border bg-surface-elevated p-0.5 sm:flex">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  language === l.code
                    ? 'bg-accent text-accent-foreground shadow-xs'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Theme */}
          <ThemeToggle />
        </div>

        {/* Mastery progress bar */}
        <div className="border-t border-border bg-surface">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6">
            <BookOpen className="h-3.5 w-3.5 text-text-tertiary" />
            <span className="font-mono text-xs text-text-tertiary">Mastery</span>
            <div className="flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-1.5 rounded-full bg-accent transition-all duration-500"
                style={{ width: `${masteryPct}%` }}
              />
            </div>
            <span className="font-mono text-xs font-semibold tabular-nums text-text-primary">
              {masteryPct}%
            </span>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="font-mono text-2xs uppercase tracking-[0.2em] text-accent">
            CLF-C02 · {services.length} services · {concepts.length} concepts · {quizQuestions.length} practice questions
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-text-primary text-balance sm:text-4xl">
            Master AWS Cloud Practitioner —{' '}
            <span className="text-text-secondary">one service at a time.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary text-pretty">
            Search any AWS topic — a service like <span className="font-mono text-text-primary">EC2</span>,
            or a concept like <span className="font-mono text-text-primary">availability zones</span>.
            Each entry includes a plain-English explanation, a memorable analogy, the exam tips that actually
            matter, and links to related topics.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              Take a 10-question quiz
            </button>
            <a
              href="#concepts"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-text-primary hover:border-border-strong"
            >
              <BookOpen className="h-4 w-4" />
              Browse concepts
            </a>
          </div>
        </div>
      </section>

      {/* ===== Body ===== */}
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 sm:py-14">
        <div id="concepts">
          <ConceptsSection language={language} onConceptClick={handleConceptSelect} />
        </div>

        {grouped.map(({ category, items }) => (
          <CategorySection
            key={category.id}
            category={category}
            services={items}
            language={language}
            onServiceClick={handleServiceSelect}
          />
        ))}
      </div>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-text-tertiary sm:flex-row sm:items-center sm:px-6">
          <p>Built for the AWS CLF-C02 exam · Sources: AWS docs, Stephane Maarek course</p>
          <p className="font-mono">
            v0.2 · {services.length} services · {concepts.length} concepts · {quizQuestions.length} questions
          </p>
        </div>
      </footer>

      {/* ===== Modals ===== */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          language={language}
          onClose={() => setSelectedService(null)}
          onServiceClick={handleServiceSelect}
        />
      )}
      {selectedConcept && (
        <ConceptModal
          concept={selectedConcept}
          language={language}
          onClose={() => setSelectedConcept(null)}
          onConceptClick={handleConceptSelect}
          onServiceClick={handleServiceSelect}
        />
      )}
      {quizOpen && (
        <QuizModalV2
          language={language}
          onClose={() => setQuizOpen(false)}
          onServiceClick={handleServiceSelect}
        />
      )}
    </main>
  );
}

function Stat({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs ${
        accent
          ? 'border-accent/30 bg-accent-soft text-accent'
          : 'border-border bg-surface-elevated text-text-secondary'
      }`}
    >
      {icon}
      <span className="font-mono font-semibold tabular-nums text-text-primary">{value}</span>
      <span className="text-text-tertiary">{label}</span>
    </div>
  );
}
