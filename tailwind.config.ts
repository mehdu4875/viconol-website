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
        viconol: {
            dark: "#050505",       // Noir pur profond (Luxe)
            panel: "#121212",      // Gris anthracite très sombre (Cartes)
            primary: "#D4AF37",    // OR Métallique (Le vrai Gold standard)
            accent: "#F59E0B",     // Or ambré (Pour les effets de lumière)
            warning: "#B8860B",    // Or foncé (Dark Goldenrod)
            metal: "#A3A3A3",      // Argent/Gris (Textes secondaires)
        }
      },
      backgroundImage: {
        'hero-gradient': "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)",
        // Nouveau dégradé doré pour les effets
        'gold-gradient': "linear-gradient(135deg, #D4AF37 0%, #F59E0B 100%)",
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #D4AF37 0deg, #F59E0B 180deg, #B8860B 360deg)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;