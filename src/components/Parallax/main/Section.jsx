"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Partners } from "@/components/Partners/Partners";
import { DecisionTree } from "@/components/DecisionTree/DecisionTree";
import AboutAtelic from "@/components/AboutAtelic/AboutAtelic";
import Footer from "@/components/Footer/Footer";
import Appointment from "@/components/Appointment/Appointment";
import ServicesSection from "@/components/ServicesSection/ServicesSection";

const Section = ({ scrollYProgress, onComplete, shouldScrollToForm, data }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const formRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const sections = data;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (shouldScrollToForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [shouldScrollToForm]);

  const partners = sections?.find(
    (sec) => sec?.__component === "shared.global-partners"
  );
  const dt = sections?.find((sec) => sec?.__component === "shared.ai-solution");
  const solutions = sections?.find(
    (sec) => sec?.__component === "shared.solutions"
  );
  const ourteam = sections?.find(
    (sec) => sec?.__component === "shared.our-team"
  );
  const appointment = sections?.find(
    (sec) => sec?.__component === "shared.appointment"
  );

  return (
    <div>
      <Partners data={partners} />

      <div ref={formRef}>
        <DecisionTree onComplete={onComplete} data={dt} />
      </div>
      <ServicesSection data={solutions} />
      <AboutAtelic data={ourteam} />
      <Appointment data={appointment} />
      <Footer />
    </div>
  );
};

export default Section;
