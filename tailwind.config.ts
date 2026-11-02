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
        surface: {
          DEFAULT: "#0D1224",
          card: "#0D1224",
          elevated: "#131930",
          deep: "#070B18",
          subtle: "#0A0E1C",
        },
        border: {
          subtle: "#1C2438",
          DEFAULT: "#1C2438",
          highlight: "#2563EB",
          light: "#25314D",
        },
        accent: {
          blue: "#2563EB",
          "blue-hover": "#1D4ED8",
          "blue-glow": "rgba(37, 99, 235, 0.2)",
          silver: "#E2E8F0",
          cyan: "#38BDF8",
        },
        navy: {
          950: "#050817",
          900: "#070B18",
          850: "#0D1224",
          800: "#131930",
          700: "#1C2438",
          600: "#25314D",
        },
        muted: {
          DEFAULT: "#94A3B8",
          dim: "#64748B",
          faint: "#475569",
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
          "'Newsreader'",
          "Georgia",
          "Cambria",
          "serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
