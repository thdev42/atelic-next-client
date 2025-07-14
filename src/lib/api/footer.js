import { API_BASE_URL } from "@/config/config";
import { fetchWithSmartCache } from "../cache";

export const fetchFootersData = async () => {
  const url = `${API_BASE_URL}/api/footers?populate[details]=*&populate[icons][populate][logo]=true&populate[image]=true`;

  return await fetchWithSmartCache({
    key: "footers",
    url,
    getUpdatedAt: (res) => {
      const footers = res?.data;
      if (!Array.isArray(footers)) return res?.data?.[0]?.updatedAt;

      let latestDate = new Date(footers?.[0]?.updatedAt || 0);

      footers.forEach((footer) => {
        const { details, icons, logo, updatedAt } = footer || {};

        if (updatedAt) {
          const updated = new Date(updatedAt);
          if (updated > latestDate) latestDate = updated;
        }

        if (Array.isArray(details)) {
          details.forEach((item) => {
            const updated = new Date(item?.updatedAt || 0);
            if (updated > latestDate) latestDate = updated;
          });
        }

        if (Array.isArray(icons)) {
          icons.forEach((icon) => {
            const updated = new Date(icon?.updatedAt || 0);
            if (updated > latestDate) latestDate = updated;

            const logo = icon?.logo;
            if (logo?.updatedAt) {
              const logoUpdated = new Date(logo.updatedAt);
              if (logoUpdated > latestDate) latestDate = logoUpdated;
            }
          });
        }
      });

      return latestDate.toISOString();
    },
  });
};
