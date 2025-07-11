import { API_BASE_URL } from "@/config/config";
import axios from "axios";
import QueryString from "qs";

export const fetchUpdatedAt = async (slug) => {
  const query = QueryString.stringify(
    {
      fields: ["updatedAt"],
      filters: {
        slug: { $eq: "home" },
      },
    },
    { encodeValuesOnly: true }
  );

  const url = `${API_BASE_URL}/api/pages?${query}`;
  const res = await axios.get(url);
  return res?.data?.data?.[0]?.updatedAt || null;
};
