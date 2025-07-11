"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";

import { useBackground } from "@/context/BackgroundContext";
import { HeroDynamic } from "../HeroScreens/HeroScreens";

const HeroSection = ({ scrollYSProgress, section }) => {
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { setBackground, setActiveHeroIndex, setSlideProgress } =
    useBackground();

  const heroDataArray = section?.details || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width =
        typeof window !== "undefined"
          ? window.visualViewport?.width || window.innerWidth
          : 1024;
      setIsMobile(width < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax motion transforms
  const sectionY = useTransform(
    scrollYSProgress,
    [0, 1],
    isMobile ? [0, 0] : [90, -50]
  );
  const backgroundY = useTransform(
    scrollYSProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-50%"]
  );
  const robotY = useTransform(
    scrollYSProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-30%"]
  );
  const textY = useTransform(
    scrollYSProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-90%"]
  );

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeSection < heroDataArray.length - 1) {
      setActiveSection(activeSection + 1);
    }
    if (isRightSwipe && activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && activeSection > 0) {
        setActiveSection(activeSection - 1);
      }
      if (e.key === "ArrowRight" && activeSection < heroDataArray.length - 1) {
        setActiveSection(activeSection + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  useEffect(() => {
    const currentSlide = heroDataArray[activeSection];
    const bgColor = currentSlide?.bgColor || "#e9e9e9";
    setBackground(bgColor);
    setActiveHeroIndex(activeSection);
    setSlideProgress && setSlideProgress(activeSection);
  }, [
    activeSection,
    heroDataArray,
    setBackground,
    setActiveHeroIndex,
    setSlideProgress,
  ]);

  const goToSlide = (newIndex) => {
    if (newIndex < 0 || newIndex >= heroDataArray.length) return;
    setActiveSection(newIndex);
  };

  const activeSlideData = heroDataArray[activeSection];
  const isDark = activeSlideData?.theme === "dark";

  return (
    <motion.section
      ref={sectionRef}
      style={{ y: isMobile ? 0 : sectionY, willChange: "transform" }}
      className={`overflow-y-visible ${
        isMobile ? "relative" : "sticky top-0"
      } max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 transition-all duration-1000 ease-in-out z-0`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Vertical Numbers */}
      <div className="font-poppins hidden xl:flex flex-col gap-4 2xl:ml-20 xl:ml-10 ml-0 items-center absolute left-0 top-1/2 -translate-y-1/2 z-20">
        {heroDataArray.map((_, idx) => (
          <div
            key={idx}
            className={`relative cursor-pointer transition-all duration-300 ${
              idx === activeSection ? "w-14 h-14" : "w-11 h-11"
            } flex items-center justify-center`}
            onClick={() => goToSlide(idx)}
          >
            <span
              className={`text-sm font-semibold z-10 transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            {idx === activeSection && (
              <motion.span
                className={`absolute w-14 h-14 rounded-full border-[2px] rotate-[45deg] border-t-transparent transition-colors duration-300 ${
                  isDark ? "border-white" : "border-black"
                }`}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Slide Component */}
      {isMobile ? (
        <HeroDynamic
          heroData={activeSlideData}
          sectionY={sectionY}
          backgroundY={backgroundY}
          robotY={robotY}
          textY={textY}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={activeSection}>
            <HeroDynamic
              heroData={activeSlideData}
              sectionY={sectionY}
              backgroundY={backgroundY}
              robotY={robotY}
              textY={textY}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroDataArray.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              idx === activeSection
                ? isDark
                  ? "bg-white w-8"
                  : "bg-black w-8"
                : "bg-gray-400"
            }`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes floatUpDown {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </motion.section>
  );
};

export default HeroSection;
