'use client';

import { useEffect } from 'react';
import { X, Check, Minus, AlertTriangle, Lightbulb } from 'lucide-react';
import type { Comparison, Language, Service } from '@/types';
import { getServiceById } from '@/data/services';

interface ComparisonModalProps {
  comparison: Comparison;
  language: Language;
  onClose: () => void;
  onServiceClick?: (s: Service) => void;
}

function t(rec: Record<string, string> | undefined, lang: Language): string {
  if (!rec) return '';
  return rec[lang] ?? rec.en ?? Object.values(rec)[0] ?? '';
}

/** Render bold/italic markdown markers (`**bold**`, `*italic*`) inline. */
function renderInlineMd(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={key++} className="font-semibold text-text-primary">{m[1]}</strong>);
    else if (m[2]) parts.push(<em key={key++}>{m[2]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const HINT_STYLES: Record<string, { bg: string; border: string; icon?: React.ElementType; iconColor?: string }> = {
  pass: { bg: 'bg-success/10', border: 'border-success/40', icon: Check, iconColor: 'text-success' },
  fail: { bg: 'bg-danger/10', border: 'border-danger/40', icon: X, iconColor: 'text-danger' },
  partial: { bg: 'bg-warning/10', border: 'border-warning/40', icon: AlertTriangle, iconColor: 'text-warning' },
  na: { bg: 'bg-muted/40', border: 'border-border', icon: Minus, iconColor: 'text-text-tertiary' },
  neutral: { bg: 'bg-surface', border: 'border-border' },
};

export function ComparisonModal({ comparison, language, onClose, onServiceClick }: ComparisonModalProps) {
  // Lock body scroll + ESC close
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

  const cols = comparison.serviceIds;

  function getColumnHeader(colId: string) {
    const svc = getServiceById(colId);
    if (svc) {
      return {
        label: svc.abbreviation,
        sub: svc.fullName,
        color: svc.visual.color,
        clickable: true,
        service: svc,
      };
    }
    const lbl = comparison.columnLabels?.[colId];
    return {
      label: t(lbl, language),
      sub: '',
      color: undefined as string | undefined,
      clickable: false,
      service: null as Service | null,
    };
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-t-2xl border border-border bg-surface-elevated shadow-xl animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xs uppercase tracking-wider text-accent">
                {language === 'ro' ? 'Comparație' : 'Comparison'}
              </span>
              {comparison.examFrequency === 'high' && (
                <span className="rounded bg-danger/15 px-1.5 py-0.5 font-mono text-2xs font-semibold text-danger">
                  {language === 'ro' ? 'frecvent în examen' : 'high exam frequency'}
                </span>
              )}
            </div>
            <h2 id="comparison-title" className="mt-1 text-xl font-bold tracking-tight text-text-primary">
              {t(comparison.title, language)}
            </h2>
            <p className="mt-1 text-sm text-text-secondary text-pretty">
              {t(comparison.tagline, language)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-4 rounded-lg p-2 text-text-tertiary hover:bg-muted hover:text-text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[calc(92vh-200px)] overflow-y-auto px-6 py-5">
          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="sticky left-0 z-[1] border-b border-border bg-surface px-4 py-3 text-left font-mono text-2xs uppercase tracking-wider text-text-tertiary">
                    {language === 'ro' ? 'Caracteristică' : 'Feature'}
                  </th>
                  {cols.map((colId) => {
                    const h = getColumnHeader(colId);
                    return (
                      <th
                        key={colId}
                        scope="col"
                        className="border-b border-l border-border bg-surface px-4 py-3 text-left font-semibold text-text-primary"
                      >
                        <div className="flex items-center gap-2">
                          {h.color && (
                            <span
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{ backgroundColor: h.color }}
                              aria-hidden
                            />
                          )}
                          <div className="min-w-0">
                            {h.clickable && h.service && onServiceClick ? (
                              <button
                                type="button"
                                onClick={() => onServiceClick(h.service!)}
                                className="text-text-primary hover:text-accent"
                              >
                                {h.label}
                              </button>
                            ) : (
                              <span className="text-text-primary">{h.label}</span>
                            )}
                            {h.sub && (
                              <div className="font-normal text-2xs text-text-tertiary">
                                {h.sub}
                              </div>
                            )}
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, ri) => (
                  <tr key={ri} className="even:bg-surface/50">
                    <th
                      scope="row"
                      className="sticky left-0 z-[1] border-b border-border bg-surface-elevated px-4 py-3 text-left font-medium text-text-primary"
                    >
                      {t(row.feature, language)}
                    </th>
                    {cols.map((colId) => {
                      const cell = row.cells[colId];
                      if (!cell) {
                        return (
                          <td
                            key={colId}
                            className="border-b border-l border-border px-4 py-3 text-text-tertiary"
                          >
                            —
                          </td>
                        );
                      }
                      const hint = cell.hint ?? 'neutral';
                      const styles = HINT_STYLES[hint];
                      const Icon = styles.icon;
                      return (
                        <td
                          key={colId}
                          className={`border-b border-l border-border px-4 py-3 align-top ${styles.bg}`}
                        >
                          <div className="flex items-start gap-1.5">
                            {Icon && (
                              <Icon
                                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${styles.iconColor ?? ''}`}
                                strokeWidth={2.5}
                                aria-hidden
                              />
                            )}
                            <span className="text-text-primary leading-snug">
                              {t(cell.value, language)}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rules of thumb */}
          {comparison.rulesOfThumb && comparison.rulesOfThumb.length > 0 && (
            <div className="mt-5 space-y-2">
              <h3 className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-accent">
                <Lightbulb className="h-3.5 w-3.5" />
                {language === 'ro' ? 'Reguli de bun-simț' : 'Rules of thumb'}
              </h3>
              {comparison.rulesOfThumb.map((rule, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm leading-relaxed text-text-primary text-pretty"
                >
                  {renderInlineMd(t(rule, language))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
