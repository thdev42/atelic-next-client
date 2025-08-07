import { API_BASE_URL } from "@/config/config";
import QueryString from "qs";
import { fetchWithSmartCache } from "../cache";

export const fetchNewsPageBlogsOnly = async (id) => {
  const query = QueryString.stringify(
    {
      filters: {
        slug: {
          $eq: "news",
        },
      },
      populate: {
        section: {
          on: {
            "shared.blogs-news": {
              populate: {
                details: {
                  populate: "*",
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
    key: `news-blogs-only_${id}`,
    url,
    getUpdatedAt: (res) => {
      const details = res?.data?.[0]?.section?.find?.(
        (s) => s?.__component === "shared.blogs-news"
      )?.details;

      if (Array.isArray(details)) {
        let latestDate = new Date(res?.data?.[0]?.updatedAt || 0);
        details.forEach((item) => {
          const updated = new Date(item?.updatedAt || 0);
          if (updated > latestDate) latestDate = updated;
        });
        return latestDate.toISOString();
      }

      return res?.data?.[0]?.updatedAt || new Date().toISOString();
    },
  });
};
