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
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ParticlesComp from "../Particles/Particles";

const HeroSection = ({ scrollYSProgress, section }) => {
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const {
    setBackground,
    backgroundType,
    setActiveHeroIndex,
    setSlideProgress,
    setFixedNav,
    setIsShowNav,
  } = useBackground();

  const heroDataArray = section?.details || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // if (backgroundType === "image") {
    //   setIsShowNav(false);
    // } else {
    //   setIsShowNav(true);
    // }
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
  }, [backgroundType]);

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

    // Handle fullBg type - use bgImage instead of bgColor
    if (currentSlide?.heroType === "fullBg" && currentSlide?.bgImage?.url) {
      // For fullBg type, pass the background image URL as image type
      setBackground(currentSlide.bgImage.url, "image");
    } else {
      // For all other types, use bgColor as color type
      const bgColor = currentSlide?.bgColor || "#e9e9e9";
      setBackground(bgColor, "color");
    }

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
      // style={{ y: isMobile ? 0 : sectionY, willChange: "transform" }}
      className={`overflow-y-visible ${
        isMobile ? "relative" : "sticky top-0"
      } max-w-[1920px]  mx-auto w-full  2xl:py-5 transition-all duration-1000 ease-in-out z-0`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Vertical Numbers - Fixed Position */}
      {/* <div
        className="font-poppins hidden z-50 lg:flex flex-col gap-4 2xl:ml-20 xl:ml-10 ml-10 items-center fixed left-0 top-1/2 -translate-y-1/2"
        style={{ transform: "translateY(-50%) translateY(10vh)" }}
      >
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
      </div> */}

      {/* Slide Component */}
      {isMobile ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            // initial={{ opacity: 0, x: 100 }}
            // animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <HeroDynamic
              heroData={activeSlideData}
              sectionY={sectionY}
              backgroundY={backgroundY}
              activeSection={activeSection}
              robotY={robotY}
              textY={textY}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={activeSection}>
            <ParticlesComp isDark={isDark} />

            <HeroDynamic
              heroData={activeSlideData}
              sectionY={sectionY}
              hero={heroDataArray}
              goToSlide={goToSlide}
              activeSection={activeSection}
              backgroundY={backgroundY}
              robotY={robotY}
              textY={textY}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Slide Indicators */}
      <div className="absolute lg:hidden bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 items-center z-20">
        {heroDataArray.map((_, idx) => {
          const isActive = idx === activeSection;
          return (
            <motion.button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: isActive ? "21px" : "9px",
                height: isActive ? "21px" : "9px",
                borderWidth: isActive ? 1 : 0,
                borderColor: isActive
                  ? isDark
                    ? "#ffffff"
                    : "#335F86"
                  : "transparent",
              }}
              initial={false}
              animate={{
                width: isActive ? "21px" : "9px",
                height: isActive ? "21px" : "9px",
                borderWidth: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className={`rounded-full ${
                  isActive
                    ? isDark
                      ? "bg-white"
                      : "bg-[#335F86]"
                    : isDark
                    ? "bg-white hover:bg-gray-300"
                    : "bg-[#335F86] hover:bg-gray-400"
                }`}
                style={{ width: "9px", height: "9px" }}
                initial={false}
                animate={{
                  backgroundColor: isActive
                    ? isDark
                      ? "#ffffff"
                      : "#335F86"
                    : isDark
                    ? "#ffffff"
                    : "#335F86",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.button>
          );
        })}
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
