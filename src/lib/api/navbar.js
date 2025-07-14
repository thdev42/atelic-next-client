import { API_BASE_URL } from "@/config/config";
import { fetchWithSmartCache } from "../cache";

export const fetchNavbarsData = async () => {
  const url = `${API_BASE_URL}/api/navbars?populate=*`;

  return await fetchWithSmartCache({
    key: "navbars",
    url,
    getUpdatedAt: (res) => {
      const navbars = res?.data;
      if (!Array.isArray(navbars)) return res?.data?.[0]?.updatedAt;

      let latestDate = new Date(res?.data?.[0]?.updatedAt || 0);

      navbars.forEach((navbar) => {
        const allProps = Object.values(navbar?.details || {});

        allProps.forEach((value) => {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              const updated = new Date(item?.updatedAt || 0);
              if (updated > latestDate) latestDate = updated;
            });
          } else if (typeof value === "object" && value?.updatedAt) {
            const updated = new Date(value.updatedAt);
            if (updated > latestDate) latestDate = updated;
          }
        });
      });

      return latestDate.toISOString();
    },
  });
};
