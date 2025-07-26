"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";
import { fetchAboutPageData } from "@/lib/api/aboutus";
import { useLoader } from "@/context/useLoader";
import { fetchUpdatedAt } from "@/lib/updatedAt";

// Components
import { Advisors } from "@/components/AboutUs/Advisors";
import Investors from "@/components/AboutUs/Investors";
import OurJourney from "@/components/AboutUs/OurJouney";
import OurTeam from "@/components/AboutUs/OurTeam";
import TeamSection from "@/components/AboutUs/Team";
import Vision from "@/components/AboutUs/Vision";
import Footer from "@/components/Footer/Footer";
import { HeroAboutUs } from "@/components/HeroScreens/HeroScreens";
import Loader from "@/components/Loader/Loader";
import { useBackground } from "@/context/BackgroundContext";

const AboutUsPage = () => {
  const container = useRef();
  const [sections, setSections] = useState([]);

  const { setLoading, setIsCached, setDataFetched, dataFetched } = useLoader();
  const { setBackground, setIsDark, isDark, setSlideProgress } =
    useBackground();
  let cached = null;

  const getPageSections = async () => {
    const latestUpdatedAt = await fetchUpdatedAt("about-us");
    const cachedPage = cached?.content?.data?.[0];

    if (!cached || cachedPage?.updatedAt !== latestUpdatedAt) {
      try {
        setLoading(true);
        const res = await fetchAboutPageData();
        const fetchedSections = res?.data?.[0]?.section || [];
        setSections(fetchedSections);
      } catch (err) {
        console.error("Error loading about-us data:", err);
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
    setBackground("#e9e9e9", "color");
    setIsDark(false);
    setSlideProgress(0);
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [isDark]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        cached = JSON.parse(localStorage.getItem("about-us") || "null");
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

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const mainHero = sections?.find(
    (sec) => sec?.__component === "shared.hero-container"
  );
  const solutions = sections?.filter(
    (sec) => sec?.__component === "shared.solutions"
  );
  const teamMembers = sections?.filter(
    (sec) => sec?.__component === "shared.our-team"
  );
  const investors = sections?.find(
    (sec) => sec?.__component === "shared.investors"
  );
  if (!dataFetched) {
    return <Loader />;
  }

  return (
    <section ref={container}>
      <HeroAboutUs sections={mainHero} />
      <Vision sections={[solutions[0], solutions[1]]} />

      <TeamSection sections={teamMembers[0]} />

      <OurJourney sections={solutions[2]} />
      {/* <div className="lg:hidden block">
        <OurTeam sections={teamMembers[1]} />
      </div> */}
      <Advisors sections={teamMembers[2]} />
      <Investors sections={investors} />
      <Footer />
    </section>
  );
};

export default AboutUsPage;
