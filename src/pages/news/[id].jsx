"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";

// Contexts
import { useBackground } from "@/context/BackgroundContext";
import { useLoader } from "@/context/useLoader";

// Components
import Loader from "@/components/Loader/Loader";
import Footer from "@/components/Footer/Footer";

// API

import { fetchUpdatedAt } from "@/lib/updatedAt";
import SingleNews from "@/components/News/SingleNews";
import { fetchNewsPageAIInsightsOnly } from "@/lib/api/singleNews";

const SingleNewsPage = () => {
  const container = useRef(null);
  const router = useRouter();
  const { id } = router.query;

  const [insight, setInsight] = useState(null);
  const { setIsDark, setSlideProgress } = useBackground();
  const { setLoading, setIsCached, setDataFetched, dataFetched } = useLoader();

  let cached = null;

  const fetchInsightData = async () => {
    const latestUpdatedAt = await fetchUpdatedAt("news");

    const cachedInsightPage = cached?.content?.data?.[0];
    const cachedDetails = cachedInsightPage?.section?.find(
      (s) => s.__component === "shared.ai-insights"
    )?.details;

    const latestCachedInsight = cachedDetails?.find((b) => b?.handle === id);

    if (
      !cached ||
      cachedInsightPage?.updatedAt !== latestUpdatedAt ||
      !latestCachedInsight
    ) {
      try {
        setLoading(true);

        const res = await fetchNewsPageAIInsightsOnly(id);

        const details = res?.data?.[0]?.section?.find(
          (s) => s.__component === "shared.ai-insights"
        )?.details;

        const insightItem = details?.find((b) => b?.handle === id);

        if (insightItem) {
          setInsight(insightItem);
        } else {
          console.warn("No insight found for id:", id);
        }
      } catch (err) {
        console.error("Failed to fetch insight:", err);

        if (latestCachedInsight) {
          setInsight(latestCachedInsight);
        }
      } finally {
        setLoading(false);
        setDataFetched(true);
      }
    } else {
      // Serve from cache
      setInsight(latestCachedInsight);
      setIsCached(true);
      setDataFetched(true);
    }
  };

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

  useEffect(() => {
    if (!id) return;

    if (typeof window !== "undefined") {
      try {
        cached = JSON.parse(
          localStorage.getItem(`news-ai-insights-only_${id}`) || "null"
        );
      } catch (e) {
        console.warn("Error parsing news cache:", e);
      }
    }

    fetchInsightData();
  }, [id]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (!dataFetched) return <Loader />;

  return (
    <div ref={container}>
      {insight ? (
        <SingleNews news={insight} />
      ) : (
        <div className="text-center py-12">Insight not found.</div>
      )}
      <Footer />
    </div>
  );
};

export default SingleNewsPage;
