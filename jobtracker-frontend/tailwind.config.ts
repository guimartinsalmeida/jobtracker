import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#131A24',
          card: '#1E2536',
          border: '#2A3344',
          text: {
            primary: '#FFFFFF',
            secondary: '#A0AEC0',
          },
        },
        light: {
          bg: '#F7FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          text: {
            primary: '#1A202C',
            secondary: '#4A5568',
          },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config;
