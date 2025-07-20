import { API_BASE_URL } from "@/config/config";
import axios from "axios";
import QueryString from "qs";

export const fetchUpdatedAt = async (slug) => {
  const query = QueryString.stringify(
    {
      fields: ["updatedAt"],
      filters: {
        slug: { $eq: slug },
      },
    },
    { encodeValuesOnly: true }
  );

  const url = `${API_BASE_URL}/api/pages?${query}`;
  const res = await axios.get(url);
  return res?.data?.data?.[0]?.updatedAt || null;
};
export const fetchNavUpdatedAt = async (slug) => {
  const query = QueryString.stringify(
    {
      fields: ["updatedAt"],
      filters: {
        slug: { $eq: slug },
      },
    },
    { encodeValuesOnly: true }
  );

  const url = `${API_BASE_URL}/api/navbars`;
  const res = await axios.get(url);
  return res?.data?.data?.[0]?.updatedAt || null;
};
export const fetchFooterUpdatedAt = async (slug) => {
  const query = QueryString.stringify(
    {
      fields: ["updatedAt"],
      filters: {
        slug: { $eq: slug },
      },
    },
    { encodeValuesOnly: true }
  );

  const url = `${API_BASE_URL}/api/footers`;
  const res = await axios.get(url);
  return res?.data?.data?.[0]?.updatedAt || null;
};
