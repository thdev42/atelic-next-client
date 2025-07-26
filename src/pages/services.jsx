"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";
import { fetchServicesPageData } from "@/lib/api/services";
import { fetchUpdatedAt } from "@/lib/updatedAt";
import { useLoader } from "@/context/useLoader";

// Components
import { HeroServices } from "@/components/HeroScreens/HeroScreens";
import HowWeWork from "@/components/Services/HowWeWork";
import IceBerg from "@/components/Services/IceBerg";
import OurSolutions from "@/components/Services/OurSolutions";
import { RedefiningSuccess } from "@/components/Services/RedefiningSuccess";
import { useBackground } from "@/context/BackgroundContext";
import Loader from "@/components/Loader/Loader";
import Footer from "@/components/Footer/Footer";

const Services = () => {
  const container = useRef();
  const [sections, setSections] = useState([]);

  const { setBackground, setIsDark } = useBackground();
  const { setLoading, setIsCached, setDataFetched, dataFetched } = useLoader();

  let cached = null;

  const getPageSections = async () => {
    const latestUpdatedAt = await fetchUpdatedAt("services");
    const cachedPage = cached?.content?.data?.[0];

    if (!cached || cachedPage?.updatedAt !== latestUpdatedAt) {
      try {
        setLoading(true);
        const res = await fetchServicesPageData();
        const fetchedSections = res?.data?.[0]?.section || [];
        setSections(fetchedSections);
      } catch (err) {
        console.error("Error loading services data:", err);
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
    setBackground("#00172B");
    setIsDark(true);
    if (typeof window !== "undefined") {
      try {
        cached = JSON.parse(localStorage.getItem("services") || "null");
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
    return () => {
      setIsDark(false);
    };
  }, []);

  // Extract components
  const hero = sections?.find(
    (sec) => sec?.__component === "shared.hero-container"
  );
  const howWeWork = sections?.find(
    (sec) => sec?.__component === "shared.services-progress"
  );
  const servicesWork = sections?.find(
    (sec) => sec?.__component === "shared.services-work"
  );
  const solutions = sections?.filter(
    (sec) => sec?.__component === "shared.services-solutions"
  );

  const iceberg = sections?.find((sec) => sec?.__component === "shared.sols2");
  if (!dataFetched) {
    return <Loader />;
  }
  return (
    <section ref={container}>
      <HeroServices sections={hero} />
      <HowWeWork sections={[howWeWork, servicesWork]} />
      <OurSolutions sections={solutions[0]} />
      <RedefiningSuccess sections={solutions[1]} />
      <IceBerg sections={iceberg} />
      <Footer />
    </section>
  );
};

export default Services;
