import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  safelist: [
    'text-emerald-400',
    'text-rose-400',
    'text-slate-400',
    'text-cyan-400',
    'border-emerald-500/40',
    'border-rose-500/40',
    'border-slate-500/40',
    'from-cyan-500',
    'to-blue-500',
    'from-emerald-500',
    'to-green-500',
    'bg-slate-700/50'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
