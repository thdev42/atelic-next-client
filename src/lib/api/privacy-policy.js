import { API_BASE_URL } from "@/config/config";
import { fetchWithSmartCache } from "../cache";

export const fetchPrivacyPolicy = async () => {
  const url = `${API_BASE_URL}/api/privacy-policies`;

  return await fetchWithSmartCache({
    key: "privacy-policy",
    url,
    getUpdatedAt: (res) => {
      const data = res?.data?.[0];
      return data?.updatedAt || new Date().toISOString();
    },
  });
};
