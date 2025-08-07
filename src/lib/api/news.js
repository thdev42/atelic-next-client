import { API_BASE_URL } from "@/config/config";
import QueryString from "qs";
import { fetchWithSmartCache } from "../cache";

export const fetchNewsPageData = async () => {
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
            "shared.hero-container": {
              populate: {
                image: true,
                headings: {
                  populate: "*",
                },
              },
            },
            "shared.our-team": {
              populate: {
                heading: {
                  populate: "*",
                },
                teamMembers: {
                  populate: "*",
                },
              },
            },
            "shared.ai-insights": {
              populate: {
                heading: {
                  populate: "*",
                },
                details: {
                  populate: "*",
                },
              },
            },
            "shared.blogs-news": {
              populate: {
                details: {
                  populate: "*",
                },
              },
            },
            "shared.appointment": {
              populate: "*",
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
    key: "news",
    url,
    getUpdatedAt: (res) => {
      const sections = res?.data?.[0]?.section;
      if (!Array.isArray(sections)) return res?.data?.[0]?.updatedAt;

      let latestDate = new Date(res?.data?.[0]?.updatedAt || 0);

      sections.forEach((section) => {
        console.log(section, "NEWS SECTIONS");
        const possibleArrays = [
          section?.headings,
          section?.image,
          section?.teamMembers,
          section?.details,
        ];

        possibleArrays.forEach((arr) => {
          if (Array.isArray(arr)) {
            arr.forEach((item) => {
              const updated = new Date(item?.updatedAt || 0);
              if (updated > latestDate) latestDate = updated;
            });
          }
        });
      });

      return latestDate.toISOString();
    },
  });
};
