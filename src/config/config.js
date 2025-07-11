const ENV = process.env.NEXT_PUBLIC_APP_ENV;

export const API_BASE_URL =
  ENV === "development"
    ? "http://localhost:1337"
    : "https://confident-event-38746b3315.strapiapp.com";
