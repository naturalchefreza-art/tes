/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#FFC107",
        charcoal: "#333333",
        body: "#666666",
        light: "#F5F5F5",
        ink: "#111111",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
