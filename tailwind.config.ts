import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        terracotta: "var(--terracotta)",
        cream: "var(--cream)",
        dark: "var(--dark)",
        indigo: "var(--indigo)",
        sage: "var(--sage)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "'DM Sans'", "sans-serif"],
        serif: ["var(--font-serif)", "'Libre Baskerville'", "Georgia", "serif"],
      },
      fontSize: {
        "display": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "title": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "body": ["1.125rem", { lineHeight: "1.7" }],
        "small": ["0.875rem", { lineHeight: "1.6" }],
      },
      maxWidth: {
        "prose": "65ch",
        "content": "720px",
      },
    },
  },
  plugins: [],
};

export default config;
