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
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const { setBackground, setActiveHeroIndex } = useBackground();
  const scrollTimeout = useRef(null);
  const scrollContainerRef = useRef(null);
  const isScrollLocked = useRef(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax layers
  const sectionY = useTransform(scrollYSProgress, [0, 1], ["0%", "-10%"]);
  const backgroundY = useTransform(scrollYSProgress, [0, 1], ["0%", "-20%"]);
  const robotY = useTransform(scrollYSProgress, [0, 1], ["0%", "-30%"]);
  const textY = useTransform(scrollYSProgress, [0, 1], ["0%", "-50%"]);

  // Hero components array
  const heroComponents = [
    HeroComponent1,
    HeroComponent2,
    HeroComponent3,
    // HeroComponent4
  ];
  const bgColors = [
    "#e9e9e9",
    "#e9e9e9",
    "linear-gradient(180deg, #03080E 1.61%, #09111C 24.4%, #101D26 50.12%, #131D29 64.35%, #121D29 75.72%, #121C26 87.16%, #0D1620 98.06%)",
  ];

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

  // Handle scroll lock based on active section
  useEffect(() => {
    const isLastSection = activeSection >= heroComponents.length - 1;

    if (isLastSection) {
      // Unlock scroll on last section
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overscrollBehavior = "";

      // Scroll to top of the last section
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Lock scroll for non-last sections
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.overscrollBehavior = "none";
      window.scrollTo(0, 0);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [activeSection]);

  // Handle wheel events for slide navigation
  useEffect(() => {
    const handleWheel = (e) => {
      const isLastSection = activeSection >= heroComponents.length - 1;

      // If we're on the last slide and scrolled past the top
      if (isLastSection) {
        // If at the very top of the last section and scrolling up
        if (window.scrollY <= 10 && e.deltaY < 0) {
          e.preventDefault();
          e.stopPropagation();

          // If not already on the first slide, go to previous slide
          if (activeSection > 0) {
            goToSlide(activeSection - 1);
          }
          return false;
        }

        // Allow normal scrolling on the last section
        if (window.scrollY > 0 || e.deltaY > 0) {
          return true;
        }
      }

      // Prevent default to stop any scrolling for hero sections
      e.preventDefault();
      e.stopPropagation();

      // Only process if we're not already animating
      if (isScrolling) return false;

      // Handle scroll down (next slide)
      if (e.deltaY > 0 && activeSection < heroComponents.length - 1) {
        goToSlide(activeSection + 1);
      }
      // Handle scroll up (previous slide)
      else if (e.deltaY < 0 && activeSection > 0) {
        goToSlide(activeSection - 1);
      }

      return false;
    };

    // Add event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleWheel);
    };
  }, [activeSection, isScrolling]);

  // Function to handle slide transitions
  const goToSlide = (newIndex) => {
    if (isScrolling || newIndex < 0 || newIndex >= heroComponents.length)
      return;

    setIsScrolling(true);
    setActiveSection(newIndex);

    // Update scroll indicator
    if (newIndex === heroComponents.length - 1) {
      setShowScrollIndicator(true);
    } else if (newIndex < heroComponents.length - 1) {
      setShowScrollIndicator(false);
    }

    // Reset scrolling state after animation
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && activeSection > 0) {
        goToSlide(activeSection - 1);
      } else if (
        e.key === "ArrowRight" &&
        activeSection < heroComponents.length - 1
      ) {
        goToSlide(activeSection + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

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

  useEffect(() => {
    // Whenever slide changes, update layout bg
    setBackground(bgColors[activeSection]);
    setActiveHeroIndex(activeSection);
  }, [activeSection, setBackground, setActiveHeroIndex]);

  const CurrentHeroComponent = heroComponents[activeSection];

  const scale = useTransform(scrollYSProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYSProgress, [0, 1], [0, -5]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex flex-col"
      style={{
        overflow: "hidden",
        touchAction: "none",
        overscrollBehavior: "none",
      }}
    >
      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 mb-2">
              Scroll down to continue
            </span>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
      <motion.section
        ref={sectionRef}
        style={{
          y: sectionY,
          scale: isMobile ? 1 : scale,
          rotate: isMobile ? 0 : rotate,
          willChange: "transform", // GPU acceleration
        }}
        className="sticky top-0 max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 overflow-hidden transition-all duration-1000 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Vertical Numbers */}
        <div className="font-poppins hidden xl:flex flex-col gap-4 2xl:ml-20 xl:ml-10 ml-0 items-center absolute left-0 top-1/2 -translate-y-1/2 z-20">
          {heroComponents.map((component, idx) => (
            <div
              key={idx + 1}
              className={`relative cursor-pointer transition-all duration-300 ${
                idx === activeSection ? "w-14 h-14" : "w-11 h-11"
              } flex items-center justify-center`}
              onClick={() => setActiveSection(idx)}
            >
              <span className={`text-sm font-semibold z-10 text-black`}>
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
              {idx === activeSection && (
                <motion.span
                  className="absolute w-14 h-14 rounded-full border-[2px] border-black rotate-[45deg] border-t-transparent"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 45 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: activeSection > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeSection > 0 ? -50 : 50 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <CurrentHeroComponent
              sectionY={sectionY}
              backgroundY={backgroundY}
              robotY={robotY}
              textY={textY}
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroComponents.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                idx === activeSection ? "bg-black w-8" : "bg-gray-400"
              }`}
              onClick={() => setActiveSection(idx)}
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
    </div>
  );
};

export default HeroSection;
