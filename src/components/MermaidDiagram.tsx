'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface MermaidDiagramProps {
  /** Mermaid source code. */
  code: string;
  /** Accessible description of the diagram. */
  ariaLabel?: string;
}

/**
 * Renders a Mermaid diagram (dual coding) client-side. Theme-aware: re-renders
 * with Mermaid's dark/default palette when the app theme changes, and tints the
 * accent to match the site. Fails soft — if the diagram can't parse, nothing is shown.
 *
 * Mermaid is imported dynamically so it never lands in the server bundle and only
 * loads when a service modal that uses it is actually opened.
 */
export function MermaidDiagram({ code, ariaLabel }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const reactId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const isDark = resolvedTheme === 'dark';

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: isDark ? 'dark' : 'default',
          fontFamily: 'inherit',
          themeVariables: {
            // Accent matches the site's orange; keep contrast readable in both themes.
            primaryColor: isDark ? '#3a2a14' : '#fff3e6',
            primaryBorderColor: '#ff8c1a',
            primaryTextColor: isDark ? '#f5f5f5' : '#1a1a1a',
            lineColor: isDark ? '#8a8a8a' : '#9a9a9a',
            fontSize: '13px',
          },
        });

        // Unique, DOM-id-safe id per render (colons in React useId break mermaid).
        const renderId = `mmd-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`;
        const { svg: out } = await mermaid.render(renderId, code);
        if (!cancelled) {
          setSvg(out);
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [code, resolvedTheme, reactId]);

  if (failed) return null;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className="mermaid-diagram flex w-full justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
      // Mermaid output is sanitized (securityLevel: 'strict') and the source is
      // static, author-controlled data — not user input.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
