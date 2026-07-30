import type { Config } from "tailwindcss";

// Дизайн-токени з handoff-бандла: design-handoff/.../tokens/*.css
// (логотипні сині на чорному, per client request)
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#0A0E14",
        card: "#10161F",
        sunken: "#0D131C",
        brand: "#12365F",
        band: "#1B4E8E",
        accent: {
          DEFAULT: "#2273C9",
          hover: "#2E86E0",
        },
        navy: {
          DEFAULT: "#3D82C4",
          deep: "#12365F",
        },
        cyan: {
          DEFAULT: "#4FC1F0",
          bright: "#1E9AD6",
        },
        ink: {
          1: "#EAF0F6",
          2: "#9AAABB",
          // token #5F7186 освітлено до #6E8299: 4.9:1 на #0A0E14 (AA для дрібного тексту)
          3: "#6E8299",
        },
        onnavy: "#B9CFE6",
        success: "#57C07C",
        danger: "#E5654E",
        line: {
          1: "rgba(255,255,255,.1)",
          2: "rgba(255,255,255,.3)",
          cyan: "rgba(79,193,240,.4)",
          "cyan-hover": "rgba(79,193,240,.65)",
          "accent-hover": "rgba(46,134,224,.6)",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        btn: "4px",
        card: "6px",
        tag: "3px",
      },
      letterSpacing: {
        label: ".16em",
        tag: ".14em",
        crumb: ".18em",
        wordmark: ".28em",
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        lift: "0 14px 32px rgba(18,42,71,.16)",
        ring: "0 0 0 3px rgba(30,154,214,.2)",
      },
    },
  },
  plugins: [],
};

export default config;
