import { API_BASE_URL } from "@/config/config";
import QueryString from "qs";
import { fetchWithSmartCache } from "../cache";
import { icons } from "lucide-react";

export const fetchAboutPageData = async () => {
  const query = QueryString.stringify(
    {
      filters: {
        slug: {
          $eq: "about-us",
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
                stats: {
                  populate: "*",
                },
              },
            },
            "shared.main-hero": {
              populate: {
                details: {
                  populate: {
                    stats: {
                      populate: "*",
                    },
                  },
                },
              },
            },
            "shared.global-partners": {
              populate: {
                logos: {
                  populate: "*",
                },
              },
            },
            "shared.ai-solution": {
              populate: {
                headings: {
                  populate: "*",
                },
              },
            },
            "shared.solutions": {
              populate: {
                image: {
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
                  populate: {
                    image: {
                      populate: "*",
                    },
                    icons: { populate: "*" },
                  },
                },
              },
            },
            "shared.investors": {
              populate: "*",
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const url = `${API_BASE_URL}/api/pages?${query}`;

  return await fetchWithSmartCache({
    key: "about-us",
    url,
    getUpdatedAt: (res) => {
      const sections = res?.data?.[0]?.section;
      if (!Array.isArray(sections)) return res?.data?.[0]?.updatedAt;

      let latestDate = new Date(res?.data?.[0]?.updatedAt || 0);

      sections.forEach((section) => {
        // Add updatedAt comparisons for various arrays
        ["details", "teamMembers", "headings", "logos", "stats"].forEach(
          (field) => {
            if (Array.isArray(section[field])) {
              section[field].forEach((item) => {
                const updated = new Date(item?.updatedAt || 0);
                if (updated > latestDate) latestDate = updated;
              });
            }
          }
        );
      });

      return latestDate.toISOString();
    },
  });
};
