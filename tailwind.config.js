/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
      },
    },
    extend: {
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        canvas: "#fafcff",
        ink: {
          950: "#0a0f1f",
          900: "#111733",
          800: "#1e264a",
          700: "#2f3a63",
          500: "#5c6894",
          400: "#8892b3",
          300: "#b7bfd8",
        },
        klystic: {
          blue: "#1e90ff",
          indigo: "#5b5cff",
          purple: "#8a2be2",
          pink: "#ff3ea5",
          orange: "#ff8a3d",
          teal: "#14c7c4",
          green: "#22c55e",
        },
      },
      boxShadow: {
        glow: "0 20px 60px -15px rgba(91, 92, 255, 0.35)",
        "glow-soft": "0 12px 30px -10px rgba(30, 144, 255, 0.25)",
        "card-hover": "0 30px 70px -25px rgba(138, 43, 226, 0.4)",
      },
      backgroundImage: {
        "grid-dots":
          "radial-gradient(circle at 1px 1px, rgba(91,92,255,0.18) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(-10px) scale(0.96)" },
          "60%": { opacity: "1", transform: "translateY(2px) scale(1.01)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(1deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-24px) translateX(10px)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.2s ease both",
        "pop-in":
          "pop-in 0.38s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 9s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        shimmer: "shimmer 8s ease infinite",
      },
    },
  },
  plugins: [],
};
