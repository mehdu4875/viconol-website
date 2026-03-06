import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- NOUVELLE PALETTE LUMINEUSE ---
        viconol: {
          primary: "#d4af37",    // L'or reste pour les accents (boutons, titres clairs)
          bg: {
            light: "#ffffff",    // Le nouveau fond principal du site (BLANC)
            alt: "#f8f9fa",      // Un gris très clair pour alterner les sections
          },
          text: {
            dark: "#1a1a1a",     // La nouvelle couleur principale du texte (PRESQUE NOIR)
            muted: "#666666",    // Pour les textes secondaires
          },
          border: {
            light: "#e5e7eb",    // Pour les bordures fines sur fond blanc
          }
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slow-zoom': 'slow-zoom 20s linear infinite alternate',
      },
    },
  },
  plugins: [],
};
export default config;