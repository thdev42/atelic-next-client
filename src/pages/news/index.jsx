"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";
import { useLoader } from "@/context/useLoader";
import { fetchNewsPageData } from "@/lib/api/news";
import { fetchUpdatedAt } from "@/lib/updatedAt";

// Components
import Footer from "@/components/Footer/Footer";
import AiInsights from "@/components/News/AiInsights";
import Blogs from "@/components/News/Blogs";
import NewsHero from "@/components/News/NewsHero";
import NewsLetter from "@/components/News/NewsLetter";
import Loader from "@/components/Loader/Loader";
import { useBackground } from "@/context/BackgroundContext";
import { NextSeo } from "next-seo";
import Head from "next/head";

const NewsPage = () => {
  const container = useRef();
  const [sections, setSections] = useState([]);

  const { setLoading, setIsCached, setDataFetched, dataFetched } = useLoader();
  const { setIsDark, setSlideProgress } = useBackground();

  let cached = null;

  const getPageSections = async () => {
    const latestUpdatedAt = await fetchUpdatedAt("news");
    const cachedPage = cached?.content?.data?.[0];

    if (!cached || cachedPage?.updatedAt !== latestUpdatedAt) {
      try {
        setLoading(true);
        const res = await fetchNewsPageData();
        const fetchedSections = res?.data?.[0]?.section || [];
        setSections(fetchedSections);
      } catch (err) {
        console.error("Error loading news data:", err);
        if (cached?.content?.data?.[0]?.section) {
          setSections(cached.content.data?.[0].section);
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
        cached = JSON.parse(localStorage.getItem("news") || "null");
      } catch (e) {
        console.warn("Error parsing news cache:", e);
      }

      if (cached?.content?.data?.[0]?.section) {
        setSections(cached.content.data?.[0].section);
        setIsCached(true);
        setDataFetched(true);
      }
    }

    getPageSections();
  }, []);

  useEffect(() => {
    setIsDark(false);
    setSlideProgress(0);
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Component filters
  const mainHero = sections?.find(
    (sec) => sec?.__component === "shared.hero-container"
  );
  const aiInsights = sections?.find(
    (sec) => sec?.__component === "shared.ai-insights"
  );
  const blogs = sections?.find(
    (sec) => sec?.__component === "shared.blogs-news"
  );
  const newsLetter = sections?.find(
    (sec) => sec?.__component === "shared.appointment"
  );
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "News",
    headline: "Latest Innovations in Artificial Intelligence at Atelic AI",
    image: ["https://atelic.ai/images/news-article-image.jpg"],

    author: {
      "@type": "Person",
      name: "Atelic AI Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Atelic AI",
      logo: {
        "@type": "ImageObject",
        url: "https://atelic.ai/images/logo.png",
      },
    },
    description:
      "Stay updated with the latest news and breakthroughs in artificial intelligence from Atelic AI.",
  };

  if (!dataFetched) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(newsArticleSchema),
          }}
        />
      </Head>
      <NextSeo
        title="Latest AI News & Updates"
        description="Stay updated with the latest breakthroughs, trends, and insights in artificial intelligence, machine learning, and technology at Atelic AI."
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "AI news, artificial intelligence updates, machine learning news, AI trends, technology news, AI breakthroughs, deep learning, data science news, AI research, tech industry updates, AI articles, AI developments, AI innovation news",
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
          {
            name: "category",
            content: "Technology, Artificial Intelligence, News",
          },
        ]}
        openGraph={{
          title: "Latest AI News & Updates",
          description:
            "Stay updated with the latest breakthroughs, trends, and insights in artificial intelligence and technology at Atelic AI.",
          url: "https://atelic.ai/news",
          type: "website",
          locale: "en_US",
          images: [
            {
              url: "https://atelic.ai/images/news-og.jpg",
              width: 1200,
              height: 630,
              alt: "Atelic AI News Preview",
            },
          ],
        }}
        twitter={{
          handle: "@atelic",
          site: "@atelic",
          cardType: "summary_large_image",
        }}
      />

      <NewsHero sections={mainHero} />
      <AiInsights sections={aiInsights} />
      <Blogs sections={blogs} />
      {newsLetter?.showForm == true && <NewsLetter sections={newsLetter} />}

      <Footer />
    </>
  );
};

export default NewsPage;
