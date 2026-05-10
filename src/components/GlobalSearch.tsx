'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, BookOpen, Box, X } from 'lucide-react';
import type { Service, Concept, Language } from '@/types';
import { services } from '@/data/services';
import { concepts, TOPIC_LABELS } from '@/data/concepts';

interface GlobalSearchProps {
  language: Language;
  onSelectService: (s: Service) => void;
  onSelectConcept: (c: Concept) => void;
}

type Result =
  | { kind: 'service'; item: Service; score: number }
  | { kind: 'concept'; item: Concept; score: number };

function matchService(s: Service, q: string): number {
  const haystack = [
    s.abbreviation,
    s.fullName,
    s.id,
    s.category,
    s.description.en,
  ]
    .join(' ')
    .toLowerCase();
  if (!haystack.includes(q)) return 0;
  // Boost on exact abbreviation/name hit
  if (s.abbreviation.toLowerCase() === q) return 100;
  if (s.abbreviation.toLowerCase().startsWith(q)) return 80;
  if (s.fullName.toLowerCase().includes(q)) return 50;
  return 20;
}

function matchConcept(c: Concept, q: string): number {
  const aliasHit = c.aliases.some((a) => a.toLowerCase().includes(q));
  const titleHit = c.title.en.toLowerCase().includes(q);
  const taglineHit = c.tagline.en.toLowerCase().includes(q);
  if (!aliasHit && !titleHit && !taglineHit) {
    // Search inside section bodies as a fallback (lower score)
    const sectionHit = c.sections.some(
      (sec) =>
        sec.heading.en.toLowerCase().includes(q) ||
        sec.body.en.toLowerCase().includes(q),
    );
    if (!sectionHit) return 0;
    return 10;
  }
  if (c.aliases.some((a) => a.toLowerCase() === q)) return 100;
  if (titleHit) return 80;
  if (aliasHit) return 60;
  return 30;
}

export function GlobalSearch({
  language,
  onSelectService,
  onSelectConcept,
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cmd/Ctrl + K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const results: Result[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: Result[] = [];
    for (const s of services) {
      const score = matchService(s, q);
      if (score) out.push({ kind: 'service', item: s, score });
    }
    for (const c of concepts) {
      const score = matchConcept(c, q);
      if (score) out.push({ kind: 'concept', item: c, score });
    }
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, 12);
  }, [query]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const choose = (r: Result) => {
    if (r.kind === 'service') onSelectService(r.item);
    else onSelectConcept(r.item);
    setQuery('');
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIdx]) {
      e.preventDefault();
      choose(results[activeIdx]);
    }
  };

  return (
    <div ref={containerRef} className="relative max-w-md flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search services and concepts… (⌘K)"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-9 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-accent/30"
        aria-label="Search services and concepts"
        aria-expanded={open && results.length > 0}
        aria-controls="search-results"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-tertiary hover:bg-muted hover:text-text-primary"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {/* Results dropdown */}
      {open && query && (
        <div
          id="search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border bg-surface-elevated shadow-xl animate-fade-in"
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-text-tertiary">
              No matches for <span className="font-mono">&quot;{query}&quot;</span>
            </div>
          ) : (
            <ul className="py-1">
              {results.map((r, idx) => (
                <li key={`${r.kind}-${r.item.id}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => choose(r)}
                    role="option"
                    aria-selected={idx === activeIdx}
                    className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors ${
                      idx === activeIdx ? 'bg-muted' : ''
                    }`}
                  >
                    {r.kind === 'service' ? (
                      <ServiceRow service={r.item} language={language} />
                    ) : (
                      <ConceptRow concept={r.item} language={language} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-border bg-surface px-3 py-1.5 font-mono text-2xs text-text-tertiary">
            <span className="font-semibold">↑↓</span> navigate ·{' '}
            <span className="font-semibold">⏎</span> open ·{' '}
            <span className="font-semibold">Esc</span> close
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceRow({ service, language }: { service: Service; language: Language }) {
  return (
    <>
      <div
        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: service.visual.color + '22' }}
      >
        <Box className="h-3.5 w-3.5" style={{ color: service.visual.color }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-primary">{service.abbreviation}</span>
          <span className="text-xs text-text-tertiary">·</span>
          <span className="truncate text-xs text-text-secondary">{service.fullName}</span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-text-tertiary">
          {service.description[language] ?? service.description.en}
        </p>
      </div>
      <span className="mt-1 shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-2xs text-text-tertiary">
        Service
      </span>
    </>
  );
}

function ConceptRow({ concept, language }: { concept: Concept; language: Language }) {
  const topicLabel = TOPIC_LABELS[concept.topic][language as 'en' | 'ro'] ?? TOPIC_LABELS[concept.topic].en;
  return (
    <>
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-soft">
        <BookOpen className="h-3.5 w-3.5 text-accent" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-primary">
            {concept.title[language] ?? concept.title.en}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-text-tertiary">
          {concept.tagline[language] ?? concept.tagline.en} · {topicLabel}
        </p>
      </div>
      <span className="mt-1 shrink-0 rounded bg-accent-soft px-1.5 py-0.5 font-mono text-2xs text-accent">
        Concept
      </span>
    </>
  );
}
