"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Partners } from "@/components/Partners/Partners";
import { DecisionTree } from "@/components/DecisionTree/DecisionTree";
import AboutAtelic from "@/components/AboutAtelic/AboutAtelic";
import Footer from "@/components/Footer/Footer";
import Appointment from "@/components/Appointment/Appointment";

const Section = ({ scrollYProgress, onComplete, shouldScrollToForm }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const formRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <motion.div
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <Partners />
      <div ref={formRef}>
        <DecisionTree onComplete={onComplete} />
      </div>
      <AboutAtelic />
      <Appointment />
      <Footer />
    </motion.div>
  );
};

export default Section;
