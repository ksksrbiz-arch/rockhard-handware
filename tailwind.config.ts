import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0d0d0d',
        'bg-alt': '#161616',
        card: '#1c1c1c',
        border: '#2a2a2a',
        ink: '#fafafa',
        muted: '#8e8e8e',
        accent: '#f97316',
        'accent-2': '#fbbf24',
        'accent-3': '#171717',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      letterSpacing: {
        'wider-2': '0.08em',
        'wider-3': '0.12em',
        'wider-4': '0.16em',
      },
    },
  },
  plugins: [],
};
export default config;
