'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggle = () => {
    document.documentElement.classList.add('theme-transitioning');
    setTheme(theme === 'dark' ? 'light' : 'dark');
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
  };

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg" aria-hidden />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative h-9 w-9 rounded-lg border border-border bg-surface-elevated text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Sun className="absolute inset-0 m-auto h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
