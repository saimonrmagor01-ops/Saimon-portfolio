import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050817",
        surface: "#101525",
        "surface-elevated": "#161D33",
        "surface-card": "#101525",
        "surface-deep": "#080C1E",
        border: {
          subtle: "#202A40",
          DEFAULT: "#202A40",
          highlight: "#2563EB",
          light: "#2B3752",
        },
        accent: {
          blue: "#2563EB",
          "blue-hover": "#1D4ED8",
          "blue-glow": "rgba(37, 99, 235, 0.25)",
          silver: "#E2E8F0",
          cyan: "#38BDF8",
        },
        navy: {
          950: "#050817",
          900: "#080C1E",
          850: "#101525",
          800: "#161D33",
          700: "#202A40",
          600: "#2B3752",
        },
        muted: {
          DEFAULT: "#94A3B8",
          dim: "#64748B",
          faint: "#334155",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        heading: [
          "'Space Grotesk'",
          "Inter",
          "-apple-system",
          "sans-serif",
        ],
        serif: [
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "serif",
        ],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "glow-slow": "glow 4s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        },
      },
      letterSpacing: {
        tighter: "-0.05em",
        tightest: "-0.075em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
