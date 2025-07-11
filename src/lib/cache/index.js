import axios from "axios";

export const fetchWithSmartCache = async ({
  key,
  url,
  getUpdatedAt = (res) => res?.data?.[0]?.updatedAt,
}) => {
  const cached = JSON.parse(localStorage.getItem(key) || "null");
  const now = new Date().getTime();

  try {
    const res = await axios.get(url);
    const apiData = res.data;

    const newUpdatedAt = getUpdatedAt(apiData);

    if (!cached) {
      console.log(`[${key}] ➜ No cache found. Saving fresh data from API.`);
    } else if (cached.updatedAt !== newUpdatedAt) {
      console.log(`[${key}] ➜ Cache outdated. Updating with new API data.`);
    } else {
      console.log(`[${key}] ✅ Using localStorage cache. No API update.`);
      return cached.content;
    }

    localStorage.setItem(
      key,
      JSON.stringify({
        content: apiData,
        updatedAt: newUpdatedAt,
        cachedAt: now,
      })
    );

    return apiData;
  } catch (err) {
    if (cached) {
      console.log(`[${key}] ⚠️ API failed. Using cached data as fallback.`);
      return cached.content;
    }
    throw err;
  }
};
