"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import Results from "@/components/DecisionTree/Results";
import { useNav } from "@/context/NavContext";

export default function AnimatedPageManager({
  scrollYProgress,
  showHero,
  data,
}) {
  const [showNext, setShowNext] = useState(false);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState([]);
  const formRef = useRef(null);
  const { setIsShowNav } = useNav();
  const handleComplete = (data) => {
    showHero(false);
    setDirection(1);
    setShowNext(true);
    setIsShowNav(false);
    setFormData(data);
  };

  const handleBack = () => {
    setDirection(-1);
    setShowNext(false);
    showHero(true);
    setIsShowNav(true);
  };

  const variants = {
    initial: (dir) => ({
      x: dir === 1 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
    animate: {
      x: 0,
      opacity: 1,
      position: "relative",
      width: "100%",
    },
    exit: (dir) => ({
      x: dir === 1 ? "-100%" : "100%",
      opacity: 0,
      position: "absolute",
      width: "100%",
    }),
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence custom={direction} mode="popLayout">
        <div key="form">
          <Section
            scrollYProgress={scrollYProgress}
            formRef={formRef}
            data={data}
          />
        </div>
      </AnimatePresence>
    </div>
  );
}
