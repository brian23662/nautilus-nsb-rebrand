import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — exact spec from project brief
        ink: '#000000',          // Primary black
        char: '#0d0d0e',         // Near-black
        steel: '#1a1a1c',        // Card surface (slightly lifted from char)
        ash: '#333333',          // Dark gray from spec — borders / dividers
        bone: '#FFFFFF',
        smoke: '#a3a3a3',
        // Accents — from spec
        sky: '#6CBBDE',          // PRIMARY accent — high-intensity blue
        deep: '#216081',         // Depth / pressed state
        sand: '#C29E6A'          // Warm secondary
      },
      fontFamily: {
        // Heavy condensed display for grunge/cinematic vibe
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        // Editorial body
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Mono accents (eyebrows, micro-labels)
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        ultra: '0.32em'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '30%': { transform: 'translate(3%, -10%)' },
          '50%': { transform: 'translate(-10%, 5%)' },
          '70%': { transform: 'translate(7%, 7%)' },
          '90%': { transform: 'translate(-3%, 3%)' }
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        grain: 'grain 8s steps(10) infinite'
      }
    }
  },
  plugins: []
};
export default config;
