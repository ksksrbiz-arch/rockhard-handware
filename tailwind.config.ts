import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0d0c0a',
        'bg-alt': '#1a1816',
        card: '#222020',
        border: '#332f2c',
        ink: '#f4f0e8',
        muted: '#9c948a',
        accent: '#e8651b',
        'accent-2': '#fbbf24',
        'light-bg': '#e8e4dd',
        'light-ink': '#1a1816',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        grunge: ['var(--font-grunge)'],
      },
      letterSpacing: {
        'wider-2': '0.06em',
        'wider-3': '0.1em',
        'wider-4': '0.15em',
        'wider-5': '0.22em',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
