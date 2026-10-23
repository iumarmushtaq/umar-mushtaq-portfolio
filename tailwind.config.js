/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#111315',
        deepblack: '#0B0C0E',
        charcoal: '#27292D',
        softwhite: '#F3F1EE',
        mutedgray: '#A6A8AC',
        electricred: '#F04444',
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Syne"', 'sans-serif'],
        sans: ['"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
