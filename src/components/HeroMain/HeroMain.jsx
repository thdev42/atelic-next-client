"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";

import {
  HeroComponent1,
  HeroComponent2,
  HeroComponent3,
} from "../HeroScreens/HeroScreens";
import { useBackground } from "@/context/BackgroundContext";
import VerticalNumbers from "./VerticalNumbers"; // Import the new component

const HeroSection = ({ scrollYSProgress }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isHeroComplete, setIsHeroComplete] = useState(false);
  const { setBackground, setActiveHeroIndex, setSlideProgress } =
    useBackground();
  const scrollTimeout = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // Motion values for smooth gradual transitions - RESET TO 0 ON MOUNT
  const slideProgress = useMotionValue(0);
  const smoothSlideProgress = useSpring(slideProgress, {
    stiffness: 40,
    damping: 30,
    mass: 1.5,
  });

  // Track accumulated scroll for gradual transitions
  const [accumulatedScroll, setAccumulatedScroll] = useState(0);
  const scrollAccumulator = useRef(0);

  // RESET HERO STATE ON COMPONENT MOUNT/REFRESH
  useEffect(() => {
    // Reset all states to initial values
    setActiveSection(0);
    setIsHeroComplete(false);
    setShowScrollIndicator(false);
    setIsScrolling(false);

    // Reset motion values
    slideProgress.set(0);

    // Reset scroll lock
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.overscrollBehavior = "none";
    window.scrollTo(0, 0);

    // Reset background to first slide
    setBackground && setBackground("#e9e9e9");
    setActiveHeroIndex && setActiveHeroIndex(0);
    setSlideProgress && setSlideProgress(0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main parallax layers for section
  const sectionY = useTransform(scrollYSProgress, [0, 1], ["0%", "-10%"]);
  const backgroundY = useTransform(scrollYSProgress, [0, 1], ["0%", "-20%"]);
  const robotY = useTransform(scrollYSProgress, [0, 1], ["0%", "-30%"]);
  const textY = useTransform(scrollYSProgress, [0, 1], ["0%", "-50%"]);

  // Hero components array
  const heroComponents = [HeroComponent1, HeroComponent2, HeroComponent3];

  // Create items array for VerticalNumbers component
  const numberItems = heroComponents.map((_, index) => ({
    id: index,
    label: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
  }));

  // Updated background colors with smooth hex values for better interpolation
  const bgColors = [
    "#e9e9e9", // Light gray
    "#e9e9e9", // Light gray
    "#03080E", // Dark blue-black for gradient start
  ];

  // Calculate color transition progress (0 = black, 1 = white)
  // You can adjust this logic based on when you want the transition to happen
  const colorTransitionProgress = useTransform(
    smoothSlideProgress,
    [0, 1, 2], // Adjust these values based on when you want color change
    [0, 0.5, 1] // 0 = black, 1 = white
  );

  // Function to interpolate between hex colors
  const interpolateColor = (color1, color2, factor) => {
    if (!color1 || !color2) return color1 || color2 || "#e9e9e9";

    // Handle gradient strings - for now return the target color
    if (color1.includes("gradient") || color2.includes("gradient")) {
      if (factor > 0.5) {
        return "linear-gradient(180deg, #03080E 1.61%, #09111C 24.4%, #101D26 50.12%, #131D29 64.35%, #121D29 75.72%, #121C26 87.16%, #0D1620 98.06%)";
      } else {
        return color1;
      }
    }

    const hex1 = color1.replace("#", "");
    const hex2 = color2.replace("#", "");

    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);

    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  // Smooth background color transition based on slideProgress
  const smoothBackgroundColor = useTransform(
    smoothSlideProgress,
    [0, 1, 2],
    [bgColors[0], bgColors[1], bgColors[2]]
  );

  // Check if user is in hero section viewport
  const isInHeroSection = () => {
    if (!containerRef.current) return false;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Check if hero section is visible in viewport
    return rect.top <= viewportHeight && rect.bottom >= 0;
  };

  // Touch handlers with gradual scroll
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);

    if (!touchStart) return;

    const currentY = e.targetTouches[0].clientY;
    const diff = touchStart - currentY;

    // Only handle touch if we're in hero section and hero is not complete
    if (isInHeroSection() && !isHeroComplete) {
      // Gradual scroll based on touch movement
      const scrollAmount = diff * 0.005; // Adjust sensitivity
      updateGradualScroll(scrollAmount);
    }
  };

  const handleTouchEnd = () => {
    // Only snap if we're in hero section and hero is not complete
    if (isInHeroSection() && !isHeroComplete) {
      // Snap to nearest section after touch ends
      const currentSection = Math.round(slideProgress.get());
      const clampedSection = Math.max(
        0,
        Math.min(heroComponents.length - 1, currentSection)
      );
      goToSlide(clampedSection);
    }
  };

  // Handle scroll lock based on active section
  useEffect(() => {
    const currentSlideProgress = slideProgress.get();
    const isLastSection = currentSlideProgress >= heroComponents.length - 1;

    if (
      isLastSection &&
      Math.abs(currentSlideProgress - (heroComponents.length - 1)) < 0.05
    ) {
      // Hero is complete - unlock scroll permanently
      setIsHeroComplete(true);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overscrollBehavior = "";
      setShowScrollIndicator(true);
    } else if (!isHeroComplete) {
      // Hero is not complete - lock scroll
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.overscrollBehavior = "none";
      window.scrollTo(0, 0);
      setShowScrollIndicator(false);
    }

    return () => {
      // Only reset if hero is not complete
      if (!isHeroComplete) {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";
        document.body.style.overscrollBehavior = "";
      }
    };
  }, [slideProgress, isHeroComplete]);

  // Gradual scroll update function
  const updateGradualScroll = (scrollDelta) => {
    const currentProgress = slideProgress.get();
    const newProgress = currentProgress + scrollDelta;
    const clampedProgress = Math.max(
      0,
      Math.min(heroComponents.length - 1, newProgress)
    );

    slideProgress.set(clampedProgress);

    // Update active section based on progress
    const newActiveSection = Math.round(clampedProgress);
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }

    // Handle scroll unlock when reaching last slide
    if (clampedProgress >= heroComponents.length - 1 - 0.05) {
      setIsHeroComplete(true);
      setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";
        document.body.style.overscrollBehavior = "";
      }, 100);
    }
  };

  // Handle wheel events for gradual slide navigation - FIXED VERSION
  useEffect(() => {
    const handleWheel = (e) => {
      // Only handle wheel events if we're in the hero section AND hero is not complete
      if (!isInHeroSection() || isHeroComplete) {
        return; // Let normal scrolling happen
      }

      const currentProgress = slideProgress.get();
      const isLastSection = currentProgress >= heroComponents.length - 1;
      const isAtLastSlide =
        Math.abs(currentProgress - (heroComponents.length - 1)) < 0.05;

      // If we're at the last slide and scrolling down, complete hero and allow normal scroll
      if (isLastSection && isAtLastSlide && e.deltaY > 0) {
        setIsHeroComplete(true);
        // Release scroll lock and allow normal scrolling
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";
        document.body.style.overscrollBehavior = "";
        return; // Allow default scroll behavior
      }

      // If we're at the last slide but scrolling up, go back to previous slide
      if (isLastSection && isAtLastSlide && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();

        // Move back gradually
        const newProgress = Math.max(0, currentProgress - 0.15);
        slideProgress.set(newProgress);
        setActiveSection(Math.round(newProgress));
        setIsHeroComplete(false); // Re-enable hero mode

        // Re-enable scroll lock
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.overscrollBehavior = "none";

        return;
      }

      // Normal slide navigation within hero
      e.preventDefault();
      e.stopPropagation();

      // Gradual scroll based on wheel delta
      const scrollAmount = e.deltaY * 0.002; // Adjust sensitivity
      updateGradualScroll(scrollAmount);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [slideProgress, activeSection, isHeroComplete]);

  // Function to handle slide transitions with smooth animation
  const goToSlide = (newIndex) => {
    if (newIndex < 0 || newIndex >= heroComponents.length) return;

    setIsScrolling(true);
    setActiveSection(newIndex);

    // Smooth transition to target slide
    slideProgress.set(newIndex);

    // Handle scroll unlock for last slide
    if (newIndex === heroComponents.length - 1) {
      setShowScrollIndicator(true);

      // Small delay to ensure smooth transition then unlock scroll
      setTimeout(() => {
        setIsHeroComplete(true);
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";
        document.body.style.overscrollBehavior = "";
      }, 500);
    } else {
      setShowScrollIndicator(false);
      setIsHeroComplete(false);

      // Ensure scroll is locked for non-last slides
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.overscrollBehavior = "none";
    }

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle keyboard if we're in hero section and hero is not complete
      if (!isInHeroSection() || isHeroComplete) return;

      if (e.key === "ArrowUp" && activeSection > 0) {
        goToSlide(activeSection - 1);
      } else if (
        e.key === "ArrowDown" &&
        activeSection < heroComponents.length - 1
      ) {
        goToSlide(activeSection + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, isHeroComplete]);

  // Updated background effect with smooth transitions
  useEffect(() => {
    const unsubscribe = smoothSlideProgress.onChange((progress) => {
      // Update slide progress in context for navbar
      setSlideProgress && setSlideProgress(progress);

      // Calculate which sections we're transitioning between
      const currentIndex = Math.floor(progress);
      const nextIndex = Math.min(currentIndex + 1, bgColors.length - 1);
      const factor = progress - currentIndex;

      // Handle gradient case specially
      if (currentIndex === 2 || nextIndex === 2) {
        if (progress >= 1.5) {
          setBackground(
            "linear-gradient(180deg, #03080E 1.61%, #09111C 24.4%, #101D26 50.12%, #131D29 64.35%, #121D29 75.72%, #121C26 87.16%, #0D1620 98.06%)"
          );
        } else {
          // Interpolate between gray and gradient start
          const interpolated = interpolateColor(
            bgColors[currentIndex],
            "#03080E",
            factor
          );
          setBackground(interpolated);
        }
      } else {
        // Normal color interpolation
        const interpolated = interpolateColor(
          bgColors[currentIndex],
          bgColors[nextIndex],
          factor
        );
        setBackground(interpolated);
      }
    });

    setActiveHeroIndex(activeSection);

    return () => unsubscribe();
  }, [
    smoothSlideProgress,
    activeSection,
    setBackground,
    setActiveHeroIndex,
    setSlideProgress,
  ]);

  const scale = useTransform(scrollYSProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYSProgress, [0, 1], [0, -5]);

  // Create smooth gradual transforms for each slide with depth layers
  const getSlideTransforms = (index) => {
    // Main slide container - smooth gradual movement
    const slideY = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      ["100vh", "0vh", "-100vh"]
    );

    const slideOpacity = useTransform(
      smoothSlideProgress,
      [index - 1, index - 0.5, index, index + 0.5, index + 1],
      [0, 0.3, 1, 0.3, 0]
    );

    const slideScale = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      [0.85, 1, 0.85]
    );

    const slideRotateX = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      [10, 0, -10]
    );

    const slideZ = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      [-150, 0, -150]
    );

    // Background elements - slower, more gradual
    const bgY = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      ["60vh", "0vh", "-60vh"]
    );

    const bgScale = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      [0.95, 1, 0.95]
    );

    const bgOpacity = useTransform(
      smoothSlideProgress,
      [index - 0.8, index, index + 0.8],
      [0.2, 1, 0.2]
    );

    // Robot/Image elements - more responsive to scroll
    const robotY = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      ["120vh", "0vh", "-120vh"]
    );

    const robotScale = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      [0.8, 1, 0.8]
    );

    const robotRotateY = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      [-8, 0, 8]
    );

    // Text elements - medium gradual movement
    const textY = useTransform(
      smoothSlideProgress,
      [index - 1, index, index + 1],
      ["80vh", "0vh", "-80vh"]
    );

    const textOpacity = useTransform(
      smoothSlideProgress,
      [index - 0.6, index, index + 0.6],
      [0, 1, 0]
    );

    return {
      slide: {
        y: slideY,
        opacity: slideOpacity,
        scale: slideScale,
        rotateX: slideRotateX,
        z: slideZ,
      },
      background: { y: bgY, scale: bgScale, opacity: bgOpacity },
      robot: { y: robotY, scale: robotScale, rotateY: robotRotateY },
      text: { y: textY, opacity: textOpacity },
    };
  };

  // State to track current color transition value
  const [currentColorTransition, setCurrentColorTransition] = useState(0);

  // Update color transition based on slide progress
  useEffect(() => {
    const unsubscribe = smoothSlideProgress.onChange((progress) => {
      // Calculate color transition (adjust these values as needed)
      // Example: transition starts at slide 1.5 and completes at slide 2
      let colorProgress = 0;
      if (progress >= 1.5) {
        colorProgress = Math.min(1, (progress - 1.5) / 0.5);
      }
      setCurrentColorTransition(colorProgress);
    });

    return () => unsubscribe();
  }, [smoothSlideProgress]);

  return (
    <div
      ref={containerRef}
      className=" sticky top-10 h-screen 2xl:h-[800px] lg:h-[600px] w-full flex flex-col"
      style={{
        overflow: "hidden",
        touchAction: "none",
        overscrollBehavior: "none",
        perspective: "1000px",
        perspectiveOrigin: "center center",
      }}
    >
      <motion.section
        ref={sectionRef}
        style={{
          // y: sectionY,
          willChange: "transform",
        }}
        className="max-w-[1920px] mx-auto h-screen 2xl:h-[800px] lg:h-[600px] w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Using the new VerticalNumbers component */}
        <VerticalNumbers
          items={numberItems}
          activeIndex={activeSection}
          onItemClick={goToSlide}
          colorTransition={currentColorTransition}
          position="left"
          size="default"
        />

        {/* Smooth Gradual Hero Content */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1200px",
          }}
        >
          {heroComponents.map((HeroComponent, index) => {
            const transforms = getSlideTransforms(index);

            return (
              <motion.div
                key={index}
                style={{
                  y: transforms.slide.y,
                  opacity: transforms.slide.opacity,
                  scale: transforms.slide.scale,
                  rotateX: transforms.slide.rotateX,
                  z: transforms.slide.z,
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Custom Hero Component Wrapper with Gradual 3D Layers */}
                <div className="relative w-full h-full">
                  {/* Background Layer */}
                  <motion.div
                    style={{
                      y: transforms.background.y,
                      scale: transforms.background.scale,
                      opacity: transforms.background.opacity,
                      willChange: "transform, opacity",
                    }}
                    className="absolute inset-0 z-0"
                  >
                    <HeroComponent
                      sectionY={transforms.background.y}
                      backgroundY={transforms.background.y}
                      robotY={transforms.robot.y}
                      textY={transforms.text.y}
                    />
                  </motion.div>

                  {/* Robot/Image Layer */}
                  <motion.div
                    style={{
                      y: transforms.robot.y,
                      scale: transforms.robot.scale,
                      rotateY: transforms.robot.rotateY,
                      willChange: "transform",
                    }}
                    className="absolute inset-0 z-10 pointer-events-none"
                  >
                    {/* This will contain the robot/image elements */}
                  </motion.div>

                  {/* Text Layer */}
                  <motion.div
                    style={{
                      y: transforms.text.y,
                      opacity: transforms.text.opacity,
                      willChange: "transform, opacity",
                    }}
                    className="absolute inset-0 z-20"
                  >
                    {/* This will contain the text elements */}
                  </motion.div>
                </div>
              </motion.div>
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

          .parallax-3d {
            transform-style: preserve-3d;
            backface-visibility: hidden;
            will-change: transform;
          }

          .depth-layer-1 {
            transform: translateZ(0px);
          }

          .depth-layer-2 {
            transform: translateZ(-50px);
          }

          .depth-layer-3 {
            transform: translateZ(-100px);
          }
        `}</style>
      </motion.section>
    </div>
  );
};

export default HeroSection;
