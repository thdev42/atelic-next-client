import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import IceBergBg from "../../../assets/IceBerg2.png";
import DashedCircle from "../DashedCircle/DashedCircle";

// Solutions data array - Perfect for Strapi integration
const solutionsData = [
  {
    id: 1,
    title: "AGENTIC VP's",
    description: "Industry Specific LEAD Agents\ntailored to use cases.",
    bgColor: "#ffffff",
    circleColor: "#0B2341",
    position:
      "absolute left-[15%] top-[10%] sm:top-[15%] md:top-[18%] 2xl:left-[20%] 7md:left-[17%] 6md:left-[10%] 5md:left-[4%]",
    dashColor: "#335F86",
  },
  {
    id: 2,
    title: "AI CONSULTING",
    description: "Expert guidance for AI\nintegration and strategy.",
    bgColor: "#ffffff",
    circleColor: "#2D5016",
    position:
      "absolute right-[5%] top-[20%] sm:right-[8%] sm:top-[25%] md:right-[12%] md:top-[25%] 2xl:top-[25%] 2xl:right-[20%] 7md:right-[15%] 6md:right-[10%] 5md:right-[8%]",
    dashColor: "#335F86",
  },
  {
    id: 4,
    title: "AUTOMATION SUITE",
    description: "Complete workflow automation\nfor business processes.",
    bgColor: "#ffffff",
    circleColor: "#8B4513",
    position:
      "absolute left-[15%] top-[90%] sm:left-[14%] sm:top-[0%] md:left-[10%] md:top-[44%] 2xl:left-[18%] 7md:left-[17%] 6md:left-[10%] 5md:left-[4%]",
    dashColor: "#ffffff",
  },
  {
    id: 3,
    title: "DATA ANALYTICS",
    description: "Advanced analytics and\ninsights for decision making.",
    bgColor: "#ffffff",
    circleColor: "#6B2C91",
    position:
      "absolute right-[5%] top-[30%] sm:right-[8%] sm:top-[37%] md:right-[12%] md:top-[37%] 2xl:top-[37%] 2xl:right-[23%] 7md:right-[19%] 6md:right-[14%] 5md:right-[10%]",
    dashColor: "#ffffff",
  },
  {
    id: 5,
    title: "DATA ANALYTICS",
    description: "Advanced analytics and\ninsights for decision making.",
    bgColor: "#ffffff",
    circleColor: "#6B2C91",
    position:
      "absolute right-[5%] top-[53%] sm:right-[8%] sm:top-[53%] md:right-[12%] md:top-[53%] 2xl:top-[53%] 2xl:right-[26%] 7md:right-[22%] 6md:right-[17%] 5md:right-[13%]",
    dashColor: "#ffffff",
  },
  {
    id: 6,
    title: "AUTOMATION SUITE",
    description: "Complete workflow automation\nfor business processes.",
    bgColor: "#ffffff",
    circleColor: "#8B4513",
    position:
      "absolute left-[15%] top-[63%] sm:left-[14%] sm:top-[63%] md:left-[10%] md:top-[63%] 2xl:left-[27%] 7md:left-[22%] 6md:left-[15%] 5md:left-[10%]",
    dashColor: "#ffffff",
  },
  {
    id: 7,
    title: "AUTOMATION SUITE",
    description: "Complete workflow automation\nfor business processes.",
    bgColor: "#ffffff",
    circleColor: "#8B4513",
    position:
      "absolute left-[15%] top-[80%] sm:left-[14%] sm:top-[80%] md:left-[10%] md:top-[80%] 2xl:left-[48%] 7md:left-[48%] 6md:left-[48%] 5md:left-[48%]",
    dashColor: "#ffffff",
  },
];

const AgenticCard = ({ solution, onClose, index }) => {
  const isOdd = index % 2 === 1;
  const slideDirection = isOdd
    ? "animate-slide-in-from-left"
    : "animate-slide-in-from-right";

  return (
    <div
      className={`font-sora w-[413px] h-[117px] rounded-[66.5px] flex items-center px-6 transition-all duration-500 ease-in-out shadow-md cursor-pointer hover:shadow-lg ${slideDirection}`}
      style={{ backgroundColor: solution.bgColor }}
      onClick={onClose}
    >
      <div
        className={`w-[75px] h-[75px] rounded-full flex items-center justify-center flex-shrink-0 text-white text-2xl font-light shadow-[0_0_0_8px_rgba(11,35,65,0.1)]`}
        style={{ backgroundColor: solution.circleColor }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="ml-6 text-left leading-loose">
        <h3 className="text-[18px] font-semibold text-black">
          {solution.title}
        </h3>
        <p className="text-[15px] text-black leading-loose whitespace-pre-line">
          {solution.description}
        </p>
      </div>
    </div>
  );
};

const ScrollRevealCircle = ({
  solution,
  index,
  scrollYProgress,
  solutionsData,
}) => {
  const totalSolutions = solutionsData.length;

  const start = index / totalSolutions;
  const end = start + 0.4;

  // Always keep end within scrollYProgress 0–1 range
  const safeEnd = Math.min(end, 0.98);
  const revealThreshold = Math.min(start + 0.25, 0.97); // reveal earlier if needed

  const cardOpacity = useTransform(scrollYProgress, [start, safeEnd], [0, 1]);
  const cardScale = useTransform(scrollYProgress, [start, safeEnd], [0.8, 1]);
  const cardY = useTransform(scrollYProgress, [start, safeEnd], [80, 0]);

  const [currentProgress, setCurrentProgress] = useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setCurrentProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const isRevealed = currentProgress >= revealThreshold;

  return (
    <div className={solution.position}>
      {isRevealed ? (
        <motion.div
          style={{
            opacity: cardOpacity,
            scale: cardScale,
            y: cardY,
          }}
        >
          <AgenticCard index={index} solution={solution} />
        </motion.div>
      ) : (
        <DashedCircle
          color={solution.dashColor}
          number={String(index + 1).padStart(2, "0")}
        />
      )}
    </div>
  );
};

// ALTERNATIVE SOLUTION: Viewport-based reveal instead of scroll progress
import { useInView } from "framer-motion";

const IceBerg = ({ sections }) => {
  const sectionRef = useRef(null);
  const solutionsData = Array?.isArray(sections?.details)
    ? sections?.details
    : [];

  console.log(sections, "SECTIONS");

  // Set up scroll tracking for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

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
          <div
            className="min-h-[1562px] w-full relative bg-cover bg-center 4md:hidden"
            style={{ backgroundImage: `url(${IceBergBg.src})` }}
          >
            {/* Scroll-based reveal circles */}
            {solutionsData.map((solution, index) => (
              <ScrollRevealCircle
                key={solution.id || index}
                solution={solution}
                index={index}
                scrollYProgress={scrollYProgress}
                solutionsData={solutionsData}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default IceBerg;
