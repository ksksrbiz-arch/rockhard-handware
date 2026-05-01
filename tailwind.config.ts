import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0d0d0d',
        'bg-alt': '#161616',
        card: '#1c1c1c',
        border: '#2c2c2c',
        ink: '#f5f5f4',
        muted: '#a8a29e',
        accent: '#f97316',
        'accent-hover': '#ea580c',
        gold: '#fbbf24',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'mega': '0.02em',
        'wider-2': '0.08em',
      },
    },
  },
  plugins: [],
};

export default config;
