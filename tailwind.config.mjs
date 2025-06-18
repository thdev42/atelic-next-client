/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

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
