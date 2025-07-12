import { API_BASE_URL } from "@/config/config";
import QueryString from "qs";
import { fetchWithSmartCache } from "../cache";

export const fetchPartnersPageData = async () => {
  const query = QueryString.stringify(
    {
      filters: {
        slug: {
          $eq: "partners",
        },
      },
      populate: {
        section: {
          on: {
            "shared.hero-container": {
              populate: {
                image: true,
                headings: { populate: true },
              },
            },
            "shared.services-solutions": {
              populate: {
                details: { populate: "*" },
              },
            },
            "shared.partners-speciality": {
              populate: {
                tabs: {
                  populate: {
                    tools: { populate: "*" },
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
    key: "partners",
    url,
    getUpdatedAt: (res) => {
      const sections = res?.data?.[0]?.section;
      if (!Array.isArray(sections)) return res?.data?.[0]?.updatedAt;

      let latestDate = new Date(res?.data?.[0]?.updatedAt || 0);

      sections.forEach((section) => {
        const possibleArrays = [
          section?.details,
          section?.tabs,
          section?.tools,
          section?.headings,
          section?.logos,
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
