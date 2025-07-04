"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

import {
  HeroComponent1,
  HeroComponent2,
  HeroComponent3,
} from "../HeroScreens/HeroScreens";
import { useBackground } from "@/context/BackgroundContext";

const HeroSection = ({ scrollYSProgress }) => {
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { setBackground, setActiveHeroIndex, setSlideProgress } =
    useBackground();

  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  // Auto slide functionality
  // useEffect(() => {
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //   }

  //   intervalRef.current = setInterval(() => {
  //     setActiveSection((prev) => {
  //       if (prev < heroComponents.length - 1) {
  //         return prev + 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   }, 10000);

  //   return () => clearInterval(intervalRef.current);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      const width =
        typeof window !== "undefined"
          ? window.visualViewport?.width || window.innerWidth
          : 1024;
      const newIsMobile = width < 768;
      setIsMobile(newIsMobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax layers - disable on mobile
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

  // Hero components array - Now includes all 3 components
  const heroComponents = [HeroComponent1, HeroComponent2, HeroComponent3];

  // Background colors configuration (same as first code)
  const bgColors = [
    "#e9e9e9", // Light gray for first slide
    "#e9e9e9", // Light gray for second slide
    "linear-gradient(360deg, #03080E 1.61%, #09111C 24.4%, #101D26 50.12%, #131D29 64.35%, #121D29 75.72%, #121C26 87.16%, #0D1620 98.06%)",
  ];

  // Create items array for VerticalNumbers component
  const numberItems = heroComponents.map((_, index) => ({
    id: index,
    label: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
  }));

  // Calculate color transition progress for text colors
  const currentColorTransition = activeSection === 2 ? 1 : 0; // White text on dark background

  // Touch handlers
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

    if (isLeftSwipe && activeSection < heroComponents.length - 1) {
      setActiveSection(activeSection + 1);
    }
    if (isRightSwipe && activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && activeSection > 0) {
        setActiveSection(activeSection - 1);
      }
      if (e.key === "ArrowRight" && activeSection < heroComponents.length - 1) {
        setActiveSection(activeSection + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  // Update background when slide changes
  useEffect(() => {
    setBackground(bgColors[activeSection]);
    setActiveHeroIndex(activeSection);
    // Update slide progress for navbar color transitions
    setSlideProgress && setSlideProgress(activeSection);
  }, [activeSection, setBackground, setActiveHeroIndex, setSlideProgress]);

  const CurrentHeroComponent = heroComponents[activeSection];

  // Function to handle slide transitions
  const goToSlide = (newIndex) => {
    if (newIndex < 0 || newIndex >= heroComponents.length) return;
    setActiveSection(newIndex);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{
        y: isMobile ? 0 : sectionY,
        willChange: "transform",
      }}
      className={`overflow-y-visible ${
        isMobile ? "relative" : "sticky top-0"
      } max-w-[1920px] mx-auto  w-full py-10 lg:py-5 2xl:py-5 transition-all duration-1000 ease-in-out z-0`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Vertical Numbers Component (Functional) */}
      <div className="font-poppins hidden xl:flex flex-col gap-4 2xl:ml-20 xl:ml-10 ml-0 items-center absolute left-0 top-1/2 -translate-y-1/2 z-20">
        {heroComponents.map((component, idx) => (
          <div
            key={idx + 1}
            className={`relative cursor-pointer transition-all duration-300 ${
              idx === activeSection ? "w-14 h-14" : "w-11 h-11"
            } flex items-center justify-center`}
            onClick={() => goToSlide(idx)}
          >
            <span
              className={`text-sm font-semibold z-10 transition-colors duration-300 ${
                activeSection === 2 ? "text-white" : "text-black"
              }`}
            >
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            {idx === activeSection && (
              <motion.span
                className={`absolute w-14 h-14 rounded-full border-[2px] rotate-[45deg] border-t-transparent transition-colors duration-300 ${
                  activeSection === 2 ? "border-white" : "border-black"
                }`}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Hero Components - Disable AnimatePresence on mobile */}
      {isMobile ? (
        <div className="">
          <CurrentHeroComponent
            sectionY={sectionY}
            backgroundY={backgroundY}
            robotY={robotY}
            textY={textY}
          />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            // initial={{ opacity: 0, x: 100 }}
            // animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -100 }}
            // transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <CurrentHeroComponent
              sectionY={sectionY}
              backgroundY={backgroundY}
              robotY={robotY}
              textY={textY}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Swipe Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroComponents.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              idx === activeSection
                ? activeSection === 2
                  ? "bg-white w-8"
                  : "bg-black w-8"
                : activeSection === 2
                ? "bg-gray-400"
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
