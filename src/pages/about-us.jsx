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
import { NextSeo } from "next-seo";

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
  const ourAdvisors = sections?.filter(
    (sec) => sec?.__component === "shared.our-advisors"
  );

  console.log(ourAdvisors, "OUR");
  const investors = sections?.find(
    (sec) => sec?.__component === "shared.investors"
  );
  if (!dataFetched) {
    return <Loader />;
  }

  return (
    <section ref={container}>
      <NextSeo
        title="About Us"
        description="Discover Atelic AI’s mission, vision, and expertise in delivering innovative artificial intelligence solutions that empower businesses worldwide."
        canonical="https://atelic.ai/about"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "about Atelic AI, AI company profile, artificial intelligence experts, AI innovation, AI solutions provider, Atelic AI mission, AI company vision, AI technology team",
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
            content: "Technology, Artificial Intelligence, Company",
          },
        ]}
        openGraph={{
          url: "https://atelic.ai/about",
          title: "About Us",
          description:
            "Learn about Atelic AI’s mission, vision, and the innovative team driving cutting-edge artificial intelligence solutions worldwide.",
          images: [
            {
              url: "https://atelic.com/images/about-og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Atelic AI Team and Mission",
            },
            {
              url: "https://atelic.com/images/office-photo.jpg",
              width: 800,
              height: 600,
              alt: "Atelic AI Office",
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

      <HeroAboutUs sections={mainHero} />
      <Vision sections={[solutions[0], solutions[1]]} />

      <TeamSection sections={teamMembers[0]} />

      <OurJourney sections={solutions[2]} />
      {/* <div className="lg:hidden block">
        <OurTeam sections={teamMembers[1]} />
      </div> */}
      <Advisors sections={ourAdvisors[0]} />
      <Investors sections={investors} />
      <Footer />
    </section>
  );
};

export default AboutUsPage;
