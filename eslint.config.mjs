import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    // Existing UI debt surfaced by stricter Next 16 rules. Keep these visible
    // without blocking this security-only framework migration.
    rules: {
      '@next/next/no-html-link-for-pages': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react/no-unescaped-entities': 'warn',
    },
  },
  globalIgnores([
    '.next/**',
    'dist/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);
