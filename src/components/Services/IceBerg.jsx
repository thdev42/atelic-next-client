import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="font-sora w-[413px] h-[117px] rounded-[66.5px] flex items-center px-6 bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={onClose}
    >
      <div
        className="w-[75px] h-[75px] rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-light"
        style={{ backgroundColor: solution.circleColor || "#0B2341" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="ml-6 text-left">
        <h3 className="text-[18px] font-semibold text-black mb-1">
          {solution.title}
        </h3>
        <p className="text-[15px] text-black leading-relaxed whitespace-pre-line">
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
      {showCard && (
        <div
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
            onClose={() => setShowCard(false)}
          />
        </div>
      )}
    </>
  );
};

// ALTERNATIVE SOLUTION: Viewport-based reveal instead of scroll progress
import { useInView } from "framer-motion";
import IceBergSvg from "../Svg/IceBerg";

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
        className="z-10 4min:h-[500vh] 4min:overflow-visible overflow-hidden bg-[#BEF9FD] max-w-[1920px] mx-auto w-full relative"
      >
        <div className="4min:sticky 4min:-top-96  w-full">
          <div className="font-sora px-4 sm:px-6 md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto">
            <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 mb-12 sm:mb-16 lg:mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-start lg:items-center">
                {sections?.heading &&
                  (() => {
                    const words = sections.heading.split(" ");
                    return (
                      <div className="space-y-3">
                        <motion.h2
                          className="text-3xl sm:text-4xl md:text-[41px] 2xl:text-6xl font-light text-black leading-tight"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          {words[0]}
                        </motion.h2>
                        <motion.h2
                          className="text-3xl sm:text-4xl md:text-[41px] 2xl:text-6xl font-light text-black leading-tight"
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
                  <p className="2xl:text-[18px] lg:text-md text-gray-700 leading-relaxed mt-4 lg:mt-0">
                    {sections?.subHeading}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Iceberg Background with Scroll-Reveal Circles */}
          <div ref={svgContainerRef} className="relative w-full">
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
