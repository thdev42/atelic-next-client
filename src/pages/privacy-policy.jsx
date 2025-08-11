import React, { useEffect, useState } from "react";

// import { fetchPrivacyPolicyUpdatedAt } from "@/utils/api/privacy"; // adjust path if needed
import Loader from "@/components/Loader/Loader";
import { fetchPrivacyPolicyUpdatedAt } from "@/lib/updatedAt";
import { fetchPrivacyPolicy } from "@/lib/api/privacy-policy";
import Footer from "@/components/Footer/Footer";
import { NextSeo } from "next-seo";
import Head from "next/head";

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
  const privacyPolicySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: "https://atelic.ai/privacy-policy",
    about: {
      "@type": "CreativeWork",
      name: "Atelic AI Privacy Policy",
      description: "Details about data collection, use, and privacy practices.",
    },
  };

  if (loading && !dataFetched) return <Loader />;

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(privacyPolicySchema),
          }}
        />
      </Head>
      <NextSeo
        title="Privacy Policy "
        description="Read our Privacy Policy to learn how we collect, use, and protect your personal information. We are committed to safeguarding your privacy and ensuring data security."
        canonical="https://atelic.ai/privacy-policy"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "privacy policy, data protection, user privacy, personal information security, data privacy practices, GDPR compliance, privacy rights, how we collect data, how we use data, cookie policy, user data protection, privacy statement, terms and privacy, information security, online privacy",
          },
          { name: "robots", content: "index, follow" },
          { name: "author", content: "Atelic AI Team" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "revisit-after", content: "7 days" },
          { name: "rating", content: "General" },
          { name: "distribution", content: "global" },
          { name: "language", content: "English" },
          { name: "copyright", content: "© 2025 Atelic AI" },
          { name: "expires", content: "never" },
          { name: "generator", content: "Next.js & next-seo" },
          { name: "category", content: "Privacy, Data Protection, Security" },
        ]}
        openGraph={{
          url: "https://atelic.ai/privacy-policy",
          title: "Privacy Policy",
          description:
            "Understand how Atelic AI collects, uses, and protects your personal information to ensure your privacy and data security.",
          images: [
            {
              url: "https://atelic.com/images/privacy-og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Atelic AI Privacy Policy",
            },
          ],
          site_name: "Atelic AI",
          type: "website",
          locale: "en_US",
        }}
        twitter={{
          handle: "@atelic",
          site: "@atelic",
          cardType: "summary_large_image",
        }}
      />

      <section className="font-sora max-w-[1920px] mx-auto w-full py-10 lg:py-20 text-black px-6 lg:px-20">
        <div dangerouslySetInnerHTML={{ __html: privacyHtml }} />
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
