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
import { NextSeo } from "next-seo";
import Head from "next/head";

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
  const redefiningSuccess = sections?.filter(
    (sec) => sec?.__component === "shared.redefining-success"
  );

  const iceberg = sections?.find((sec) => sec?.__component === "shared.sols2");
  if (!dataFetched) {
    return <Loader />;
  }
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Artificial Intelligence Consulting",
    provider: {
      "@type": "Organization",
      name: "Atelic AI",
      url: "https://atelic.ai",
    },
    description:
      "AI consulting and development services to help businesses automate and innovate.",
  };
  return (
    <section ref={container}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </Head>
      <NextSeo
        title="Our Services"
        description="Explore Atelic AI's comprehensive services including cloud computing, AI solutions, machine learning, data analytics, and enterprise technology tailored to empower your business."
        canonical="https://atelic.ai/services"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "services, cloud computing, AI solutions, machine learning, data analytics, enterprise solutions, NVIDIA, Microsoft, AWS, GitHub, OpenStack, VMware, Google Cloud, Kubeflow, Apache Druid, Apache Kafka, big data, AI infrastructure, DevOps, cloud migration, software development, data engineering, MLOps, SaaS solutions, container orchestration, Kubernetes, AI-powered analytics, distributed systems, edge computing, neural networks, enterprise AI, hybrid cloud, data visualization",
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
            content: "Technology, Artificial Intelligence, Services",
          },
        ]}
        openGraph={{
          url: "https://atelic.ai/services",
          title: "Our Services",
          description:
            "Explore Atelic AI's comprehensive services including cloud computing, AI solutions, machine learning, data analytics, and enterprise technology tailored to empower your business.",
          images: [
            {
              url: "https://atelic.com/images/services-og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Atelic AI Services",
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

      <HeroServices sections={hero} />
      <HowWeWork sections={[howWeWork, servicesWork]} />
      <OurSolutions sections={solutions[0]} />
      <RedefiningSuccess sections={redefiningSuccess[0]} />
      <IceBerg sections={iceberg} />
      <Footer />
    </section>
  );
};

export default Services;
