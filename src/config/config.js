const ENV = process.env.NEXT_PUBLIC_APP_ENV;

export const API_BASE_URL =
  ENV === "development"
    ? "http://localhost:1337"
    : "https://atelic-strapi.collabdash.io";
