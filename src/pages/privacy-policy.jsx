import React, { useEffect, useState } from "react";

// import { fetchPrivacyPolicyUpdatedAt } from "@/utils/api/privacy"; // adjust path if needed
import Loader from "@/components/Loader/Loader";
import { fetchPrivacyPolicyUpdatedAt } from "@/lib/updatedAt";
import { fetchPrivacyPolicy } from "@/lib/api/privacy-policy";
import Footer from "@/components/Footer/Footer";

const PrivacyPolicy = () => {
  const [privacyHtml, setPrivacyHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  let cached = null;

  const getPrivacyData = async () => {
    const latestUpdatedAt = await fetchPrivacyPolicyUpdatedAt();
    const cachedData = cached?.content?.data?.[0];

    if (!cached || cachedData?.updatedAt !== latestUpdatedAt) {
      try {
        setLoading(true);
        const res = await fetchPrivacyPolicy();
        let fetchedHtml = res?.data?.[0]?.Privacy || "";

        // Fix className to class for HTML rendering
        fetchedHtml = fetchedHtml.replace(/className=/g, "class=");

        setPrivacyHtml(fetchedHtml);
      } catch (err) {
        console.error("Error loading privacy data:", err);
        if (cachedData?.Privacy) {
          let fallbackHtml = cachedData.Privacy;
          fallbackHtml = fallbackHtml.replace(/className=/g, "class=");
          setPrivacyHtml(fallbackHtml);
        }
      } finally {
        setLoading(false);
        setDataFetched(true);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        cached = JSON.parse(localStorage.getItem("privacy-policy") || "null");
      } catch (e) {
        console.warn("Error parsing privacy-policy cache:", e);
      }

      if (cached?.content?.data?.[0]?.Privacy) {
        let cachedHtml = cached.content.data?.[0]?.Privacy;
        cachedHtml = cachedHtml.replace(/className=/g, "class=");
        setPrivacyHtml(cachedHtml);
        setIsCached(true);
        setDataFetched(true);
      }
    }

    getPrivacyData();
  }, []);

  if (loading && !dataFetched) return <Loader />;

  return (
    <>
      <section className="font-sora max-w-[1920px] mx-auto w-full py-10 lg:py-20 text-black px-6 lg:px-20">
        <div dangerouslySetInnerHTML={{ __html: privacyHtml }} />
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
