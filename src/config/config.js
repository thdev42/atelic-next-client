const ENV = process.env.NEXT_PUBLIC_APP_ENV;

export const API_BASE_URL =
  ENV === "development"
    ? "https://atelic-strapi.collabdash.io"
    : "http://138.68.136.194";
