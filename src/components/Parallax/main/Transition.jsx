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
        {!showNext ? (
          <div
            key="form"
            // custom={direction}
            // variants={variants}
            // initial="initial"
            // animate="animate"
            // exit="exit"
            // transition={{ duration: 0.6, ease: "easeInOut" }}
            // onAnimationComplete={() => {
            //   if (direction === -1 && formRef.current) {
            //     formRef.current.scrollIntoView({ behavior: "smooth" });
            //   }
            // }}
          >
            <Section
              scrollYProgress={scrollYProgress}
              onComplete={handleComplete}
              formRef={formRef}
              data={data}
            />
          </div>
        ) : (
          <motion.div
            key="result"
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Results data={formData} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
