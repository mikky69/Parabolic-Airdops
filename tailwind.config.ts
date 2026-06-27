import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces — deep obsidian with a violet undertone, lifted from
        // the negative space in the Parabolic DAO logo.
        obsidian: {
          DEFAULT: "#0A0612",
          surface: "#120A1F",
          raised: "#1B1029",
          border: "#2A1B3D",
        },
        // Brand gradient — magenta to orange, the exact sweep used in the
        // glowing "P" mark.
        brand: {
          magenta: "#D946EF",
          violet: "#9333EA",
          orange: "#FB923C",
          pink: "#EC4899",
        },
        // Functional-only states (never used as brand/decorative color)
        state: {
          active: "#2DD4BF",
          ending: "#FB923C",
          expired: "#6B5B7A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "aurora-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(217,70,239,0.25) 0%, rgba(147,51,234,0.12) 45%, transparent 80%)",
        "card-glow":
          "radial-gradient(80% 80% at 50% 0%, rgba(217,70,239,0.18) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(217,70,239,0.45)",
        "glow-orange": "0 0 40px -10px rgba(251,146,60,0.4)",
      },
      animation: {
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
