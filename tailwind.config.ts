import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        secondary: "#525252",
        tertiary: "#737373",
        border: "#e5e5e5",
        accent: "#b8543a",
        codebg: "#fafafa",
        surface: "#fafaf8",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        meta: ["13px", { lineHeight: "1.5" }],
      },
      maxWidth: {
        content: "1100px",
        prose: "680px",
      },
    },
  },
  plugins: [],
};

export default config;
