"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";
import { fetchPartnersPageData } from "@/lib/api/partners";
import { fetchUpdatedAt } from "@/lib/updatedAt";
import { useLoader } from "@/context/useLoader";

// Components
import Footer from "@/components/Footer/Footer";
import { Partners } from "@/components/Partners/Partners";
import Differentiation from "@/components/PartnersSection/Differentiation";
import PartnersHero from "@/components/PartnersSection/PartnersHero";
import Specialism from "@/components/PartnersSection/Specialism";
import Loader from "@/components/Loader/Loader";
import SVGComponent from "@/components/Svg";
import RegionalPartners from "@/components/PartnersSection/RegionalPartners";
import { useBackground } from "@/context/BackgroundContext";
import { NextSeo } from "next-seo";
import Head from "next/head";

const partners = () => {
  const container = useRef();
  const [sections, setSections] = useState([]);

  const { setLoading, setIsCached, setDataFetched, dataFetched } = useLoader();
  const { setIsDark, isDark, setSlideProgress } = useBackground();
  let cached = null;

  const getPageSections = async () => {
    const latestUpdatedAt = await fetchUpdatedAt("partners");
    const cachedPage = cached?.content?.data?.[0];

    if (!cached || cachedPage?.updatedAt !== latestUpdatedAt) {
      try {
        setLoading(true);
        const res = await fetchPartnersPageData();
        const fetchedSections = res?.data?.[0]?.section || [];
        setSections(fetchedSections);
      } catch (err) {
        console.error("Error loading partners data:", err);
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
    // setIsDark(false);
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
        cached = JSON.parse(localStorage.getItem("partners") || "null");
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

  const hero = sections?.find(
    (sec) => sec?.__component === "shared.hero-container"
  );
  const partnersData = sections?.find(
    (sec) => sec?.__component === "shared.global-partners"
  );
  const differentiation = sections?.find(
    (sec) => sec?.__component === "shared.services-solutions"
  );
  const specialism = sections?.find(
    (sec) => sec?.__component === "shared.partners-speciality"
  );
  const partnersSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atelic AI",
    url: "https://atelic.ai",
    memberOf: [
      {
        "@type": "Organization",
        name: "NVIDIA",
      },
      {
        "@type": "Organization",
        name: "Microsoft",
      },
      {
        "@type": "Organization",
        name: "AWS",
      },
    ],
  };
  if (!dataFetched) {
    return <Loader />;
  }

  return (
    <div ref={container}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersSchema) }}
        />
      </Head>
      <NextSeo
        title="Our Partners"
        description="Discover our trusted partners who help us deliver high-quality services and innovative solutions to our customers."
        canonical="https://atelic.ai/partners"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "AI technology partners, artificial intelligence collaborations, AI business partnerships, strategic AI partners, AI industry leaders, AI innovation network, technology alliance, AI research partners, AI development partners, best AI companies to partner with, AI ecosystem partners, AI startup partnerships, machine learning partners, AI corporate collaborations, global AI partners, cloud computing, AI solutions, machine learning, data analytics, enterprise solutions, NVIDIA, Microsoft, AWS, GitHub, OpenStack, VMware, Google Cloud, Kubeflow, Apache Druid, Apache Kafka, big data, AI infrastructure, DevOps, cloud migration, software development, data engineering, MLOps, SaaS solutions, container orchestration, Kubernetes, AI-powered analytics, distributed systems, edge computing, neural networks, enterprise AI, hybrid cloud, data visualization",
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
            content: "Technology, Artificial Intelligence, Partnerships",
          },
        ]}
        openGraph={{
          url: "https://atelic.ai/partners",
          title: "Our Partners",
          description:
            "Meet Atelic AI’s trusted partners who collaborate to deliver innovative AI and technology solutions worldwide.",
          images: [
            {
              url: "https://atelic.com/images/partners-og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Atelic AI Partners",
            },
            {
              url: "https://atelic.com/images/partner-logos.jpg",
              width: 800,
              height: 600,
              alt: "Our Partner Logos",
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

      <PartnersHero sections={hero} />
      <Specialism sections={specialism} />
      <Partners data={partnersData} partners={true} />
      <RegionalPartners />
      <Differentiation sections={differentiation} />
      <Footer />
    </div>
  );
};

export default partners;
