import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)'
      },
      borderRadius: {
        '2xl': '1rem'
      },
      boxShadow: {
        soft: '0 8px 20px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
} satisfies Config

