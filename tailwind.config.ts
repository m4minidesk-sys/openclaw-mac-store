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
          accent: '#6366f1',
          accentHover: '#4f46e5',
          textDark: '#f5f5f7',
          textLight: '#1d1d1f',
          border: 'rgba(255,255,255,0.1)',
        },
      },
    },
  },
  plugins: [],
}

export default config
