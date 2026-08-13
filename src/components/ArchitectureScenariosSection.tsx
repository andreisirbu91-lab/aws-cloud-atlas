'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FlaskConical,
  GitBranch,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { Language } from '@/types';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import {
  architectureScenarios,
  type ArchitectureScenario,
  type LocalizedText,
} from '@/data/architecture-scenarios';

function t(text: LocalizedText, language: Language): string {
  return text[language as 'en' | 'ro'] ?? text.en;
}

export function ArchitectureScenariosSection({ language }: { language: Language }) {
  const [selected, setSelected] = useState<ArchitectureScenario | null>(null);

  return (
    <section id="architecture-scenarios">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-[0.2em] text-accent">SAA-C03 · Design practice</p>
          <h2 className="mt-2 flex items-center gap-2 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            <GitBranch className="h-5 w-5 text-accent" />
            {language === 'ro' ? 'Scenarii de arhitectură' : 'Architecture scenarios'}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary text-pretty">
            {language === 'ro'
              ? 'Pleacă de la cerințe, compară opțiuni și justifică decizia — exact reflexul cerut unui Solutions Architect.'
              : 'Start from requirements, compare options and justify the decision — the core Solutions Architect habit.'}
          </p>
        </div>
        <span className="hidden font-mono text-2xs uppercase tracking-wider text-text-tertiary sm:block">
          {architectureScenarios.length} {language === 'ro' ? 'scenariu' : 'scenario'}
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {architectureScenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => setSelected(scenario)}
            className="group rounded-xl border border-border bg-surface-elevated p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-2xs font-semibold uppercase text-accent">
                {scenario.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-2xs text-text-tertiary">
                <Clock className="h-3 w-3" /> {scenario.estimatedMinutes} min
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-text-primary">{t(scenario.title, language)}</h3>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary text-pretty">{t(scenario.brief, language)}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-2xs text-text-tertiary">
                {scenario.options.length} {language === 'ro' ? 'opțiuni' : 'options'} · {scenario.failureModes.length} failure modes
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
                {language === 'ro' ? 'Rezolvă' : 'Solve'} <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {selected && <ScenarioModal scenario={selected} language={language} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ScenarioModal({ scenario, language, onClose }: { scenario: ArchitectureScenario; language: Language; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="scenario-title">
      <div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-t-2xl border border-border bg-surface-elevated shadow-xl sm:rounded-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-surface-elevated/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="font-mono text-2xs uppercase tracking-wider text-accent">SAA-C03 · Compute & resilience</p>
            <h2 id="scenario-title" className="mt-1 text-xl font-bold text-text-primary sm:text-2xl">{t(scenario.title, language)}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close scenario" className="rounded-lg p-1.5 text-text-tertiary hover:bg-muted hover:text-text-primary"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-8 px-5 py-6 sm:px-7">
          <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">{t(scenario.brief, language)}</p>

          <div className="grid gap-5 md:grid-cols-2">
            <ListBlock title={language === 'ro' ? 'Cerințe' : 'Requirements'} icon={<CheckCircle2 className="h-4 w-4 text-success" />} items={scenario.requirements.map((item) => t(item, language))} />
            <ListBlock title={language === 'ro' ? 'Constrângeri' : 'Constraints'} icon={<ShieldCheck className="h-4 w-4 text-warning" />} items={scenario.constraints.map((item) => t(item, language))} />
          </div>

          <section>
            <h3 className="mb-3 text-base font-semibold text-text-primary">{language === 'ro' ? 'Opțiuni și trade-off-uri' : 'Options and trade-offs'}</h3>
            <div className="grid gap-3 lg:grid-cols-3">
              {scenario.options.map((option) => (
                <article key={option.id} className={`rounded-xl border p-4 ${option.recommended ? 'border-accent bg-accent-soft' : 'border-border bg-surface'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-text-primary">{t(option.title, language)}</h4>
                    {option.recommended && <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-2xs font-semibold text-accent-foreground">{language === 'ro' ? 'ALES' : 'CHOSEN'}</span>}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">{t(option.summary, language)}</p>
                  <ul className="mt-3 space-y-1.5 text-xs text-text-secondary">
                    {option.strengths.map((item, index) => <li key={`s-${index}`} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success" />{t(item, language)}</li>)}
                    {option.tradeoffs.map((item, index) => <li key={`t-${index}`} className="flex gap-2"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-warning" />{t(item, language)}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-accent/30 bg-accent-soft p-4">
            <h3 className="text-sm font-semibold text-accent">{language === 'ro' ? 'Decizie' : 'Decision'}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-primary">{t(scenario.decision, language)}</p>
          </section>

          <section>
            <h3 className="mb-3 text-base font-semibold text-text-primary">{language === 'ro' ? 'Fluxul ales' : 'Chosen flow'}</h3>
            <div className="rounded-xl border border-border bg-surface p-4"><MermaidDiagram code={scenario.diagram} ariaLabel={t(scenario.title, language)} /></div>
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            <section>
              <h3 className="mb-3 text-base font-semibold text-text-primary">Failure modes</h3>
              <div className="space-y-2">
                {scenario.failureModes.map((mode, index) => <div key={index} className="rounded-lg border border-border bg-surface p-3"><p className="text-xs font-semibold text-text-primary">{t(mode.event, language)}</p><p className="mt-1 text-xs leading-relaxed text-text-secondary">{t(mode.response, language)}</p></div>)}
              </div>
            </section>
            <ListBlock title={language === 'ro' ? 'Cost drivers' : 'Cost drivers'} icon={<AlertTriangle className="h-4 w-4 text-warning" />} items={scenario.costDrivers.map((item) => t(item, language))} />
          </div>

          <section>
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-text-primary"><FlaskConical className="h-4 w-4 text-accent" />{language === 'ro' ? 'Lab hands-on și dovezi' : 'Hands-on lab and evidence'}</h3>
            <ol className="grid gap-3 md:grid-cols-2">
              {scenario.lab.map((step, index) => <li key={index} className="rounded-xl border border-border bg-surface p-4"><span className="font-mono text-xs font-bold text-accent">{String(index + 1).padStart(2, '0')}</span><h4 className="mt-2 text-sm font-semibold text-text-primary">{t(step.title, language)}</h4><p className="mt-1 text-xs leading-relaxed text-text-secondary"><strong>{language === 'ro' ? 'Dovadă:' : 'Evidence:'}</strong> {t(step.evidence, language)}</p></li>)}
            </ol>
          </section>

          <section className="border-t border-border pt-4">
            <h3 className="mb-2 font-mono text-2xs uppercase tracking-wider text-text-tertiary">AWS references</h3>
            <div className="flex flex-wrap gap-2">{scenario.awsReferences.map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-accent hover:border-accent/40">{reference.label}<ExternalLink className="h-3 w-3" /></a>)}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ListBlock({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return <section><h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-text-primary">{icon}{title}</h3><ul className="space-y-2">{items.map((item, index) => <li key={index} className="rounded-lg border border-border bg-surface px-3 py-2 text-xs leading-relaxed text-text-secondary">{item}</li>)}</ul></section>;
}
