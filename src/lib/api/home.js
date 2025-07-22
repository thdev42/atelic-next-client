import { API_BASE_URL } from "@/config/config";
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
                  sort: ["order:asc"],
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
    key: "home",
    url,
    getUpdatedAt: (res) => {
      const sections = res?.data?.[0]?.section;
      if (!Array.isArray(sections)) return res?.data?.[0]?.updatedAt;

      let latestDate = new Date(res?.data?.[0]?.updatedAt || 0); // page-level updatedAt

      sections.forEach((section) => {
        // Check nested arrays (deep components)
        if (Array.isArray(section.details)) {
          section.details.forEach((detail) => {
            const updated = new Date(detail?.updatedAt || 0);
            if (updated > latestDate) latestDate = updated;
          });
        }

        if (Array.isArray(section.teamMembers)) {
          section.teamMembers.forEach((member) => {
            const updated = new Date(member?.updatedAt || 0);
            if (updated > latestDate) latestDate = updated;
          });
        }

        if (Array.isArray(section.headings)) {
          section.headings.forEach((heading) => {
            const updated = new Date(heading?.updatedAt || 0);
            if (updated > latestDate) latestDate = updated;
          });
        }

        if (Array.isArray(section.logos)) {
          section.logos.forEach((logo) => {
            const updated = new Date(logo?.updatedAt || 0);
            if (updated > latestDate) latestDate = updated;
          });
        }
      });

      return latestDate.toISOString();
    },
  });
};
