import React, { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import IceBergBg from "../../../assets/IceBerg2.png";
import DashedCircle from "../DashedCircle/DashedCircle";

// Default solutions data array - Perfect for Strapi integration
const defaultSolutionsData = [
  {
    id: 1,
    title: "AGENTIC VP's",
    description: "Industry Specific LEAD Agents\ntailored to use cases.",
    bgColor: "#ffffff",
    circleColor: "#0B2341",
    cx: 402, // Add circle coordinates
    cy: 275,
    r: 56,
    stroke: "#335F86",
    strokeWidth: 2,
    dashColor: "#335F86",
  },
  {
    id: 2,
    title: "AI CONSULTING",
    description: "Expert guidance for AI\nintegration and strategy.",
    bgColor: "#ffffff",
    circleColor: "#2D5016",
    cx: 1518, // Add circle coordinates
    cy: 347,
    r: 56,
    stroke: "#335F86",
    strokeWidth: 2,
    dashColor: "#335F86",
  },
  {
    id: 4,
    title: "AUTOMATION SUITE",
    description: "Complete workflow automation\nfor business processes.",
    bgColor: "#ffffff",
    circleColor: "#8B4513",
    cx: 402, // Add circle coordinates
    cy: 649,
    r: 56,
    stroke: "white",
    strokeWidth: 2,
    dashColor: "#ffffff",
  },
  {
    id: 3,
    title: "DATA ANALYTICS",
    description: "Advanced analytics and\ninsights for decision making.",
    bgColor: "#ffffff",
    circleColor: "#6B2C91",
    cx: 1187, // Add circle coordinates
    cy: 561,
    r: 56,
    stroke: "white",
    strokeWidth: 2,
    dashColor: "#ffffff",
  },
  {
    id: 5,
    title: "DATA ANALYTICS",
    description: "Advanced analytics and\ninsights for decision making.",
    bgColor: "#ffffff",
    circleColor: "#6B2C91",
    cx: 1142, // Add circle coordinates
    cy: 800,
    r: 56,
    stroke: "white",
    strokeWidth: 2,
    dashColor: "#ffffff",
  },
  {
    id: 6,
    title: "AUTOMATION SUITE",
    description: "Complete workflow automation\nfor business processes.",
    bgColor: "#ffffff",
    circleColor: "#8B4513",
    cx: 817, // Add circle coordinates
    cy: 937,
    r: 56,
    stroke: "white",
    strokeWidth: 2,
    dashColor: "#ffffff",
  },
  {
    id: 7,
    title: "AUTOMATION SUITE",
    description: "Complete workflow automation\nfor business processes.",
    bgColor: "#ffffff",
    circleColor: "#8B4513",
    cx: 1037, // Add circle coordinates
    cy: 1055,
    r: 56,
    stroke: "white",
    strokeWidth: 2,
    dashColor: "#ffffff",
  },
];

const AgenticCard = ({ solution, onClose, index }) => {
  // Cards 1, 4, 6 (indices 0, 2, 5) come from left, others from right
  const shouldAnimateFromLeft = [0, 3, 5].includes(index);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        y: 0,
        x: shouldAnimateFromLeft ? -100 : 100, // Start from left or right
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0, // End at center position
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        y: 0,
        x: shouldAnimateFromLeft ? -100 : 100, // Exit to left or right
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="font-sora  2xl:w-[413px] 2xl:h-[120px] lg:w-[370px] lg:h-[110px] md:w-[250px] md:h-[80px] sm:w-[200px] w-[150px] sm:h-[80px] h-[50px] rounded-[66.5px] flex items-center   sm:px-6 px-3 bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={onClose}
    >
      <div
        className="2xl:w-[75px] 2xl:h-[75px] lg:w-[60px] lg:h-[60px] md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] w-[24px] h-[24px] rounded-full md:text-xl flex text-xs sm:text-md sm:items-center sm:justify-center items-center justify-center flex-shrink-0 text-white lg:text-2xl font-light"
        style={{ backgroundColor: solution.circleColor || "#0B2341" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className=" sm:ml-6 ml-2 text-left">
        <h3 className="2xl:text-[15px] lg:text-[14px] md:text-[11px] sm:text-[10px] text-[8px] font-semibold sm-pt-0 text-black ">
          {solution.title}
        </h3>
        <p className="4md:hidden block 2xl:text-[14px] lg:text-[13px] text-black leading-normal 2xl:leading-normal  whitespace-pre-line">
          {solution.description}
        </p>
      </div>
    </motion.div>
  );
};

const ScrollRevealCircle = ({
  solution,
  index,
  scrollYProgress,
  containerRef,
}) => {
  const [showCard, setShowCard] = useState(false);

  const revealThreshold = ((index + 1) / defaultSolutionsData.length) * 0.8;

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest >= revealThreshold) {
        if (!showCard) {
          setShowCard(true);
        }
      } else {
        setShowCard(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, revealThreshold]);

  // Calculate card position relative to the container
  const getCardPosition = () => {
    if (!containerRef.current || !solution.cx || !solution.cy)
      return { left: 0, top: 0 };

    const containerRect = containerRef.current.getBoundingClientRect();
    const svgWidth = 1920;
    const svgHeight = 1562;

    // Calculate position as percentage of container
    const leftPercent = (solution.cx / svgWidth) * 100;
    const topPercent = (solution.cy / svgHeight) * 100;

    return {
      left: `${leftPercent}%`,
      top: `${topPercent}%`,
    };
  };

  const cardPosition = getCardPosition();

  return (
    <>
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          left: cardPosition.left,
          top: cardPosition.top,
          transform: "translate(-50%, -50%)",
        }}
      >
        <AnimatePresence mode="wait">
          {showCard && (
            <AgenticCard
              solution={solution}
              index={index}
              onClose={() => setShowCard(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// ALTERNATIVE SOLUTION: Viewport-based reveal instead of scroll progress
import { useInView } from "framer-motion";
import IceBergSvg from "../Svg/IceBerg";
import MobileIceBerg from "../Svg/MobileIceBerg";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

const IceBerg = ({ sections }) => {
  const sectionRef = useRef(null);
  const svgContainerRef = useRef(null);
  const [revealedCircles, setRevealedCircles] = useState(new Set());
  const solutionsData = Array?.isArray(sections?.details)
    ? sections?.details.map((detail, index) => ({
        ...defaultSolutionsData[index], // Use default coordinates and styling
        ...detail, // Override with any custom data from sections
      }))
    : defaultSolutionsData;

  console.log(sections, "SECTIONS");
  const circlesForSVG = solutionsData.map((solution, index) => ({
    ...solution,
    revealed: revealedCircles.has(index),
  }));

  // Set up scroll tracking for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const newRevealed = new Set();
      solutionsData.forEach((_, index) => {
        const threshold = ((index + 1) / solutionsData.length) * 0.8;
        if (latest >= threshold) {
          newRevealed.add(index);
        }
      });

      // Only update if there's actually a change
      if (
        newRevealed.size !== revealedCircles.size ||
        ![...newRevealed].every((item) => revealedCircles.has(item))
      ) {
        setRevealedCircles(newRevealed);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, solutionsData.length]);

  return (
    <>
      <section
        ref={sectionRef}
        // Provides the scrollable area
        className="z-10 4min:h-[800vh] 4min:overflow-visible overflow-hidden bg-[#BEF9FD] max-w-[1920px] mx-auto w-full relative"
      >
        <div className="4min:sticky 4min:-top-[390px]  w-full">
          <div className="font-sora px-4 sm:px-6 md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto">
            <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 mb-12 sm:mb-16 lg:mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-start lg:items-center">
                {sections?.heading &&
                  (() => {
                    const words = sections.heading.split(" ");
                    return (
                      <div className="lg:space-y-3 sm:text-left text-center">
                        <motion.h2
                          className={`${headingStyle}  font-light text-black leading-tight`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          {words[0]}
                        </motion.h2>
                        <motion.h2
                          className={`${headingStyle}font-light text-black leading-tight`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <span className="font-bold">
                            {words.slice(1).join(" ")}
                          </span>
                        </motion.h2>
                      </div>
                    );
                  })()}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p
                    className={`${paragraphStyles} sm:text-left text-center  lg:text-md text-gray-700 leading-relaxed mt-4 lg:mt-0`}
                  >
                    {sections?.subHeading}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile Iceberg Background WITH Cards (No Scroll Reveal) */}
          <div ref={svgContainerRef} className="4min:hidden  relative w-full">
            <MobileIceBerg />
            {solutionsData.map((solution, index) => {
              // Calculate card position relative to the container
              const getCardPosition = () => {
                if (!solution.cx || !solution.cy) return { left: 0, top: 0 };
                const svgWidth = 1920;
                const svgHeight = 1562;
                const leftPercent = (solution.cx / svgWidth) * 100;
                const topPercent = (solution.cy / svgHeight) * 100;
                return {
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                };
              };
              const cardPosition = getCardPosition();

              return (
                <div
                  key={solution.id}
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: cardPosition.left,
                    top: cardPosition.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <AgenticCard
                    solution={solution}
                    index={index}
                    onClose={() => {}}
                  />
                </div>
              );
            })}
          </div>

          {/* Desktop Iceberg Background WITH Scroll-Reveal Circles */}
          <div
            ref={svgContainerRef}
            className="4min:block hidden relative w-full"
          >
            <IceBergSvg circles={circlesForSVG} />
            {solutionsData.map((solution, index) => (
              <ScrollRevealCircle
                key={solution.id}
                solution={solution}
                index={index}
                scrollYProgress={scrollYProgress}
                containerRef={svgContainerRef}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default IceBerg;
