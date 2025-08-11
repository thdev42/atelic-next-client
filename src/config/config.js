const ENV = process.env.NEXT_PUBLIC_APP_ENV;
const ProductionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const DevelopmentUrl = process.env.NEXT_PUBLIC_DEVELOPEMENT_URL;
export const API_BASE_URL =
  ENV === "development" ? DevelopmentUrl : ProductionUrl;
