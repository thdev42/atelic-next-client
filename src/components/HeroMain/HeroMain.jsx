"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";

import { useBackground } from "@/context/BackgroundContext";
import { HeroDynamic } from "../HeroScreens/HeroScreens";
import ParticlesComp from "../Particles/Particles";

const HeroSection = ({ scrollYSProgress, section }) => {
  const sectionRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);

  const autoPlayRef = useRef(null);
  const AUTO_PLAY_DELAY = 15000; // 15 seconds

  const { setBackground, setActiveHeroIndex, setSlideProgress } =
    useBackground();

  const heroDataArray = section?.details || [];
  const [isMobile, setIsMobile] = useState(false);
  const [isMid, setIsMid] = useState(false);

  const startAutoPlay = () => {
    if (!shouldAutoPlay) return;

    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }

    autoPlayRef.current = setTimeout(() => {
      setSlideDirection(1);
      setActiveSection((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= heroDataArray.length ? 0 : nextIndex;
      });
    }, AUTO_PLAY_DELAY);
  };

  const resetAutoPlayTimer = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    if (shouldAutoPlay) {
      startAutoPlay();
    }
  };

  useEffect(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    if (shouldAutoPlay) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeSection, shouldAutoPlay]);

  useEffect(() => {
    const handleResize = () => {
      const width =
        typeof window !== "undefined"
          ? window.visualViewport?.width || window.innerWidth
          : 1024;
      setIsMobile(width < 768);
      setIsMid(width < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll to stop auto-play when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldStop = scrollY > 750; // Stop auto-play after 750px scroll

      if (shouldStop !== !shouldAutoPlay) {
        setShouldAutoPlay(!shouldStop);

        // Clear timeout if stopping auto-play
        if (shouldStop && autoPlayRef.current) {
          clearTimeout(autoPlayRef.current);
          autoPlayRef.current = null;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldAutoPlay]);

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
      setSlideDirection(1);
      setActiveSection(activeSection + 1);
      resetAutoPlayTimer();
    }
    if (isRightSwipe && activeSection > 0) {
      setSlideDirection(-1);
      setActiveSection(activeSection - 1);
      resetAutoPlayTimer();
    }
  };

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

  const goToSlide = (newIndex) => {
    if (
      newIndex < 0 ||
      newIndex >= heroDataArray.length ||
      newIndex === activeSection
    )
      return;

    setSlideDirection(newIndex > activeSection ? 1 : -1);
    setActiveSection(newIndex);
    resetAutoPlayTimer();
  };

  const activeSlideData = heroDataArray[activeSection];
  const isDark = activeSlideData?.theme === "dark";

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
    <>
      <motion.section
        ref={sectionRef}
        className={`overflow-hidden ${
          isMid ? "relative" : "sticky top-0"
        } max-w-[1920px] mx-auto w-full 2xl:py-5 transition-all duration-1000 ease-in-out z-0`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={resetAutoPlayTimer}
      >
        <div className="relative w-full h-full overflow-hidden">
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
              {!isMobile && <ParticlesComp isDark={isDark} />}
              <HeroDynamic
                heroData={activeSlideData}
                sectionY={sectionY}
                hero={heroDataArray}
                backgroundY={backgroundY}
                activeSection={activeSection}
                goToSlide={goToSlide}
                robotY={robotY}
                textY={textY}
                isDark={isDark}
              />
            </motion.div>
          </AnimatePresence>
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
    </>
  );
};

export default HeroSection;
