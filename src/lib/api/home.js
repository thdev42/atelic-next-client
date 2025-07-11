import { API_BASE_URL } from "@/config/config";
import axios from "axios";
import QueryString from "qs";
import { fetchWithSmartCache } from "../cache";

export const fetchHomePageData = async () => {
  const query = QueryString.stringify(
    {
      filters: {
        slug: {
          $eq: "home",
        },
      },
      populate: {
        section: {
          on: {
            "shared.main-hero": {
              populate: {
                details: {
                  populate: {
                    heroImage: true,
                    bgImage: true,
                    stats: {
                      populate: "*",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const url = `${API_BASE_URL}/api/pages?${query}`;

  return await fetchWithSmartCache({
    key: "home",
    url,
    getUpdatedAt: (res) => {
      const details = res?.data?.[0]?.section?.find(
        (s) => s.__component === "shared.main-hero"
      );

      if (!details || !Array.isArray(details)) return res?.data?.[0]?.updatedAt;

      const latest = details.reduce((latestDate, item) => {
        const updated = new Date(item.updatedAt);
        return updated > latestDate ? updated : latestDate;
      }, new Date(0));
      console.log(latest.toISOString());
      return latest.toISOString();
    },
  });
};
