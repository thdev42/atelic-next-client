/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sora: ["Sora"],
        poppins: ["Poppins"],
        // sora: ["var(--font-sora)", "sans-serif"],
        // poppins: ["var(--font-poppins)", "sans-serif"],
        // roboto: ["Roboto", "sans-serif"],
        // rubik: ["Rubik"],
        // afacad: ["Afacad"],
        // orbitron: ["Orbitron"],
      },
    },
  },
  plugins: [],
};
