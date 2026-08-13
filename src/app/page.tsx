'use client';

import { useState, useCallback, useMemo } from 'react';
import { Flame, Trophy, Target, BookOpen, Sparkles, Brain } from 'lucide-react';
import type { Service, Concept, Language, Comparison, QuizQuestion, LearningPath, ExamId } from '@/types';
import { getServicesForExam } from '@/data/services';
import { categories } from '@/data/categories';
import { concepts } from '@/data/concepts';
import { getQuestionsForExam } from '@/data/quiz-questions';
import { EXAMS, EXAM_IDS, isOnExam } from '@/data/exams';
import { useProgressStore } from '@/store/progress';
import { CategorySection } from '@/components/CategorySection';
import { ConceptsSection } from '@/components/ConceptsSection';
import { ComparisonsSection } from '@/components/ComparisonsSection';
import { ComparisonModal } from '@/components/ComparisonModal';
import { DailyChallenge } from '@/components/DailyChallenge';
import { FlashcardsModal } from '@/components/FlashcardsModal';
import { RetrievalDrillModal } from '@/components/RetrievalDrillModal';
import { LearningPathsSection } from '@/components/LearningPathsSection';
import { LearningPathModal } from '@/components/LearningPathModal';
import { ServiceModal } from '@/components/ServiceModal';
import { ConceptModal } from '@/components/ConceptModal';
import { QuizModalV2 } from '@/components/QuizModalV2';
import { QuizLauncher, type QuizLaunchConfig } from '@/components/QuizLauncher';
import { GlobalSearch } from '@/components/GlobalSearch';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArchitectureScenariosSection } from '@/components/ArchitectureScenariosSection';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ro', label: 'RO' },
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [selectedComparison, setSelectedComparison] = useState<Comparison | null>(null);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [flashcardsOpen, setFlashcardsOpen] = useState(false);
  const [drillOpen, setDrillOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<(QuizLaunchConfig & { sessionId: number }) | null>(null);
  /** When set, the active quiz is the Daily Challenge for this date. */
  const [dailyQuiz, setDailyQuiz] = useState<{ date: string; questions: QuizQuestion[]; sessionId: number } | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const { progress, getStreak } = useProgressStore();
  const recordDailyChallenge = useProgressStore((s) => s.recordDailyChallenge);
  const activeExam = useProgressStore((s) => s.activeExam);
  const setActiveExam = useProgressStore((s) => s.setActiveExam);
  const examCfg = EXAMS[activeExam];

  const handleServiceSelect = useCallback((s: Service) => {
    setSelectedConcept(null);
    setSelectedService(s);
  }, []);
  const handleConceptSelect = useCallback((c: Concept) => {
    setSelectedService(null);
    setSelectedConcept(c);
  }, []);

  // Everything below is scoped to the exam the user is currently studying.
  const examServices = useMemo(() => getServicesForExam(activeExam), [activeExam]);
  const examConcepts = useMemo(() => concepts.filter((c) => isOnExam(c, activeExam)), [activeExam]);
  const examQuestions = useMemo(() => getQuestionsForExam(activeExam), [activeExam]);

  // Group services by category (no client-side search filter — search has its own dropdown)
  const grouped = useMemo(
    () =>
      categories
        .map((cat) => ({
          category: cat,
          items: examServices.filter((s) => s.category === cat.id),
        }))
        .filter((g) => g.items.length > 0),
    [examServices],
  );

  // Progress is shared per service, but the header stats count only the active exam's services.
  const examServiceIds = useMemo(() => new Set(examServices.map((s) => s.id)), [examServices]);
  const stats = {
    total: examServices.length,
    mastered: Object.entries(progress.serviceProgress).filter(
      ([id, p]) => p.status === 'mastered' && examServiceIds.has(id),
    ).length,
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
              <span className="font-mono text-2xs text-text-tertiary">{examCfg.code}</span>
            </div>
          </a>

          {/* Exam switcher */}
          <div className="flex shrink-0 items-center rounded-lg border border-border bg-surface-elevated p-0.5">
            {EXAM_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveExam(id)}
                title={EXAMS[id].title[language] ?? EXAMS[id].title.en}
                className={`rounded-md px-2.5 py-1 font-mono text-2xs font-semibold transition-colors ${
                  activeExam === id
                    ? 'bg-accent text-accent-foreground shadow-xs'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {EXAMS[id].code}
              </button>
            ))}
          </div>

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
            onClick={() => setLauncherOpen(true)}
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
            {examCfg.code} · {examServices.length} services · {examConcepts.length} concepts · {examQuestions.length} practice questions
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-text-primary text-balance sm:text-4xl">
            {examCfg.heroTitle[language] ?? examCfg.heroTitle.en} —{' '}
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
              onClick={() => setLauncherOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              Start a quiz · {examQuestions.length} questions
            </button>
            <button
              type="button"
              onClick={() => setFlashcardsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent-soft px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              <BookOpen className="h-4 w-4" />
              Flashcards
            </button>
            <button
              type="button"
              onClick={() => setDrillOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent-soft px-4 py-2 text-sm font-medium text-accent hover:bg-accent/15"
            >
              <Brain className="h-4 w-4" />
              {language === 'ro' ? 'Recall mixt' : 'Retrieval drill'}
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
        <DailyChallenge
          language={language}
          exam={activeExam}
          onLaunch={(qs, date) =>
            setDailyQuiz({ date, questions: qs, sessionId: Date.now() })
          }
        />

        <LearningPathsSection
          language={language}
          exam={activeExam}
          onPathClick={setSelectedPath}
        />

        <ArchitectureScenariosSection language={language} />

        <div id="concepts">
          <ConceptsSection language={language} exam={activeExam} onConceptClick={handleConceptSelect} />
        </div>

        <ComparisonsSection
          language={language}
          exam={activeExam}
          onComparisonClick={setSelectedComparison}
        />

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
          <p>Built for the AWS {examCfg.code} exam · Sources: AWS docs, Stephane Maarek course</p>
          <p className="font-mono">
            v0.3 · {examServices.length} services · {examConcepts.length} concepts · {examQuestions.length} questions
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
      {flashcardsOpen && (
        <FlashcardsModal
          language={language}
          onClose={() => setFlashcardsOpen(false)}
          onServiceClick={handleServiceSelect}
        />
      )}
      {drillOpen && (
        <RetrievalDrillModal
          language={language}
          onClose={() => setDrillOpen(false)}
        />
      )}
      {selectedPath && (
        <LearningPathModal
          path={selectedPath}
          language={language}
          onClose={() => setSelectedPath(null)}
          onServiceClick={(s) => {
            setSelectedPath(null);
            handleServiceSelect(s);
          }}
          onConceptClick={(c) => {
            setSelectedPath(null);
            handleConceptSelect(c);
          }}
          onComparisonClick={(c) => {
            setSelectedPath(null);
            setSelectedComparison(c);
          }}
        />
      )}
      {selectedComparison && (
        <ComparisonModal
          comparison={selectedComparison}
          language={language}
          onClose={() => setSelectedComparison(null)}
          onServiceClick={(s) => {
            setSelectedComparison(null);
            handleServiceSelect(s);
          }}
        />
      )}
      {launcherOpen && (
        <QuizLauncher
          language={language}
          exam={activeExam}
          onClose={() => setLauncherOpen(false)}
          onLaunch={(cfg) => {
            setLauncherOpen(false);
            // sessionId is generated ONCE per launch; stays stable across re-renders
            setActiveQuiz({ ...cfg, sessionId: Date.now() });
          }}
        />
      )}
      {activeQuiz && (
        <QuizModalV2
          key={activeQuiz.sessionId}
          language={language}
          exam={activeExam}
          onClose={() => setActiveQuiz(null)}
          onServiceClick={handleServiceSelect}
          scope={activeQuiz.scope}
          questionCount={activeQuiz.count}
          label={activeQuiz.label}
          examMode={activeQuiz.examMode}
          timerSeconds={activeQuiz.timerSeconds}
        />
      )}
      {dailyQuiz && (
        <QuizModalV2
          key={`daily-${dailyQuiz.sessionId}`}
          language={language}
          exam={activeExam}
          onClose={() => setDailyQuiz(null)}
          onServiceClick={handleServiceSelect}
          presetQuestions={dailyQuiz.questions}
          label={language === 'ro' ? 'Provocarea zilei' : 'Daily Challenge'}
          onComplete={(correct, total) => {
            recordDailyChallenge(dailyQuiz.date, correct, total);
          }}
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
