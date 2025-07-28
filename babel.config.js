module.exports = {
  presets: ["next/babel"], // already present in Next.js internally
  plugins:
    process.env.NODE_ENV === "production" ? ["transform-remove-console"] : [],
};
