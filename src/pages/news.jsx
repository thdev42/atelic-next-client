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

const NewsPage = () => {
  const container = useRef();
  const [sections, setSections] = useState([]);

  const { setLoading, setIsCached, setDataFetched, dataFetched } = useLoader();

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
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

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

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Component filters
  const mainHero = sections?.find(
    (sec) => sec?.__component === "shared.hero-container"
  );
  const aiInsights = sections?.find(
    (sec) => sec?.__component === "shared.our-team"
  );
  const blogs = sections?.find(
    (sec) => sec?.__component === "shared.blogs-news"
  );
  const newsLetter = sections?.find(
    (sec) => sec?.__component === "shared.appointment"
  );
  if (!dataFetched) {
    return <Loader />;
  }
  return (
    <section ref={container}>
      <NewsHero sections={mainHero} />
      <AiInsights sections={aiInsights} />
      <Blogs sections={blogs} />
      <NewsLetter sections={newsLetter} />
      <Footer />
    </section>
  );
};

export default NewsPage;
