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
  const [prevSection, setPrevSection] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-play states - Enhanced
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);
  const AUTO_PLAY_DELAY = 7000; // 4 seconds
  const [isPaused, setIsPaused] = useState(false); // Track pause state

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

  // Enhanced auto-play function
  const startAutoPlay = () => {
    // Don't start if disabled, paused, or only one slide
    if (!isAutoPlay || isPaused || heroDataArray.length <= 1) return;

    // Clear any existing timer
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }

    autoPlayRef.current = setTimeout(() => {
      setPrevSection((current) => current);
      setSlideDirection(1);
      setActiveSection((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= heroDataArray.length ? 0 : nextIndex;
      });
    }, AUTO_PLAY_DELAY);
  };

  // Enhanced reset timer function
  const resetAutoPlayTimer = () => {
    // Clear existing timer
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    // Only restart if auto-play is enabled and not paused
    if (isAutoPlay && !isPaused) {
      startAutoPlay();
    }
  };

  // Auto-play effect - runs when activeSection changes or auto-play settings change
  useEffect(() => {
    setPrevSection(activeSection);

    // Start auto-play if conditions are met
    if (isAutoPlay && !isPaused && heroDataArray.length > 1) {
      startAutoPlay();
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeSection, isAutoPlay, isPaused, heroDataArray.length]);

  // Enhanced mouse handlers for hover pause
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (isAutoPlay) {
      startAutoPlay();
    }
  };

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

  // Enhanced touch handlers with timer reset
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
      setPrevSection(activeSection);
      setSlideDirection(1);
      setActiveSection(activeSection + 1);
      resetAutoPlayTimer(); // Reset timer on manual interaction
    }
    if (isRightSwipe && activeSection > 0) {
      setPrevSection(activeSection);
      setSlideDirection(-1);
      setActiveSection(activeSection - 1);
      resetAutoPlayTimer(); // Reset timer on manual interaction
    }
  };

  // Enhanced keyboard navigation with timer reset
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && activeSection > 0) {
        setPrevSection(activeSection);
        setSlideDirection(-1);
        setActiveSection(activeSection - 1);
        resetAutoPlayTimer(); // Reset timer on manual interaction
      }
      if (e.key === "ArrowRight" && activeSection < heroDataArray.length - 1) {
        setPrevSection(activeSection);
        setSlideDirection(1);
        setActiveSection(activeSection + 1);
        resetAutoPlayTimer(); // Reset timer on manual interaction
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, heroDataArray.length]);

  // Background effect
  useEffect(() => {
    const currentSlide = heroDataArray[activeSection];

    if (currentSlide?.heroType === "fullBg" && currentSlide?.bgImage?.url) {
      setBackground(currentSlide.bgImage.url, "image");
    } else {
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

  // Enhanced goToSlide with timer reset
  const goToSlide = (newIndex) => {
    if (
      newIndex < 0 ||
      newIndex >= heroDataArray.length ||
      newIndex === activeSection
    )
      return;

    setPrevSection(activeSection);
    setSlideDirection(newIndex > activeSection ? 1 : -1);
    setActiveSection(newIndex);
    resetAutoPlayTimer(); // Reset timer on manual slide change
  };

  const activeSlideData = heroDataArray[activeSection];
  const isDark = activeSlideData?.theme === "dark";

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const slideTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`overflow-hidden ${
        isMobile ? "relative" : "sticky top-0"
      } max-w-[1920px] mx-auto w-full 2xl:py-5 transition-all duration-1000 ease-in-out z-0`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter} // Pause on hover
      onMouseLeave={handleMouseLeave} // Resume on mouse leave
    >
      {/* Slide Component with Animation Container */}
      <div className="relative w-full h-full overflow-hidden">
        {isMobile ? (
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={activeSection}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full h-full"
            >
              <HeroDynamic
                heroData={activeSlideData}
                sectionY={sectionY}
                backgroundY={backgroundY}
                robotY={robotY}
                textY={textY}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={activeSection}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full h-full"
            >
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
      </div>

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
