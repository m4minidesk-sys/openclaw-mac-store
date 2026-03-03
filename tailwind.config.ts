import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0a0a0a',
          bgLight: '#ffffff',
          bgSection: '#111111',
          accent: '#818cf8',
          accentBtn: '#4f46e5',
          accentHover: '#4338ca',
          textDark: '#f5f5f7',
          textLight: '#1d1d1f',
          textMuted: '#a0a0a2',
          textSubtle: '#8a8a8b',
          border: 'rgba(255,255,255,0.1)',
        },
      },
    },
  },
  plugins: [],
}

export default config
