/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#050816',
          surface: '#0F172A',
          border: '#1E293B',
        },
        light: {
          bg: '#F8F7F4',
          surface: '#FFFFFF',
          border: '#E2E8F0',
        },
        accent: {
          DEFAULT: '#3B82F6',
          glow: '#60A5FA',
          deep: '#1D4ED8',
          muted: 'rgba(59,130,246,0.15)',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Satoshi', 'Inter', 'sans-serif'],
      },
      fontSize: {
        fluid_sm: 'clamp(0.875rem, 1.5vw, 1rem)',
        fluid_base: 'clamp(1rem, 2vw, 1.125rem)',
        fluid_lg: 'clamp(1.125rem, 2.5vw, 1.5rem)',
        fluid_xl: 'clamp(1.5rem, 3vw, 2rem)',
        fluid_2xl: 'clamp(2rem, 4vw, 3rem)',
        fluid_3xl: 'clamp(2.5rem, 6vw, 5rem)',
        fluid_4xl: 'clamp(3.5rem, 9vw, 8rem)',
        fluid_hero: 'clamp(4rem, 12vw, 11rem)',
      },
      spacing: {
        fluid_xs: 'clamp(0.5rem, 1vw, 1rem)',
        fluid_sm: 'clamp(1rem, 2vw, 1.5rem)',
        fluid_md: 'clamp(1.5rem, 3vw, 2.5rem)',
        fluid_lg: 'clamp(2rem, 5vw, 4rem)',
        fluid_xl: 'clamp(3rem, 8vw, 7rem)',
        fluid_2xl: 'clamp(5rem, 12vw, 12rem)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
