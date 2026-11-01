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
        background: "#050505",
        surface: "#0b0b0f",
        "surface-elevated": "#121216",
        "surface-card": "#0e0e12",
        border: {
          subtle: "#1a1a20",
          DEFAULT: "#222228",
          highlight: "#363640",
        },
        accent: {
          blue: "#9fbdff",
          "blue-glow": "rgba(159, 189, 255, 0.15)",
          silver: "#e2e8f0",
          cyan: "#38bdf8",
        },
        muted: {
          DEFAULT: "#92928f",
          dim: "#666664",
          faint: "#404040",
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
