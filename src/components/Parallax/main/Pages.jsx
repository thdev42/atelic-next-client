"use client";

import React, { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/HeroMain/HeroMain";
import AnimatedPageManager from "./Transition";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";
import { fetchHomePageData } from "@/lib/api/home";
import { useLoader } from "@/context/useLoader";
import { fetchUpdatedAt } from "@/lib/updatedAt";
import Loader from "@/components/Loader/Loader";

const HomePage = () => {
  const container = useRef();
  const [sections, setSections] = useState([]);

  const { setLoading, setIsCached, loading, setDataFetched, dataFetched } =
    useLoader();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  let cached = null;
  const getPageSections = async () => {
    const latestUpdatedAt = await fetchUpdatedAt("home");
    const cachedPage = cached?.content?.data?.[0];

    console.log(latestUpdatedAt);
    if (!cached || cachedPage?.updatedAt !== latestUpdatedAt) {
      try {
        setLoading(true);
        const res = await fetchHomePageData();
        const fetchedSections = res?.data?.[0]?.section || [];
        setSections(fetchedSections);
      } catch (err) {
        console.error("Error loading home data:", err);
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
        cached = JSON.parse(localStorage.getItem("home") || "null");
      } catch (e) {
        console.warn("Error parsing cache:", e);
      }

      if (cached?.content?.data?.[0]?.section) {
        setSections(cached.content.data?.[0].section);
        setIsCached(true);
        setDataFetched(true);
      }
    }

    getPageSections();
  }, []);
  console.log(sections, "SECTIONS");

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const mainHero = sections?.find(
    (sec) => sec?.__component === "shared.main-hero"
  );

  if (!dataFetched) {
    return <Loader />;
  }
  return (
    <main ref={container} className="relative">
      {sections?.length > 0 && (
        <HeroSection scrollYSProgress={scrollYProgress} section={mainHero} />
      )}
      <AnimatedPageManager
        scrollYProgress={scrollYProgress}
        showHero={() => {}}
        data={sections}
      />
    </main>
  );
};

export default HomePage;
