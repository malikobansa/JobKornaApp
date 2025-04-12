/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#2563eb",
        darkerBlue: "#1e40af",
        lightBlue: "#93c5fd",
        primaryOrange: "#f97316",
        lightOrange: "#fdba74",
        grayBg: "#f5f5f5",
        grayText: "#64748b",
        grayBorder: "#e2e8f0",
        success: "#22c55e",
        error: "#ef4444",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        bold: ["Inter-Bold", "sans-serif"],
        medium: ["Inter-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
