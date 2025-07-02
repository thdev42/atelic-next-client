"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Mock images for demonstration
import davidImage from "../../../assets/David.png";
import AlvinImage from "../../../assets/AlvinHeib.png";
import BenImage from "../../../assets/Ben.png";
import RomanImage from "../../../assets/Roman.png";
import SimonImage from "../../../assets/Simon.png";

const teamMembers = [
  {
    name: "David Chalklen",
    title: "CTO",
    description:
      "David has over 20 years experience in AI/Tech. He's held Senior and Executive roles at Microsoft, Publicis, WPP, and has been a senior tech/strategy led for startups.",
    image: davidImage,
  },
  {
    name: "Alvin Heib",
    title: "CPO",
    description:
      "As Chief Product Officer, and one of the co-founders of Atelic, Alvin brings 15+ years of experience in AI, cloud, data, product strategy, and technical execution.",
    image: AlvinImage,
  },
  {
    name: "Ben Owen",
    title: "Founder & CEO",
    description:
      "The Atelic Founder & CEO has over 15 years' experience in enterprise digital/analytics, with a focus on AI adoption & transformation strategy.",
    image: BenImage,
  },
  {
    name: "Romain Picard",
    title: "Investor & Advisor",
    description:
      "Romain is an expert investor. Founder & ex-key CCO of Dataiku. Now active as a strategic advisor & investor for AI startups.",
    image: RomanImage,
  },
  {
    name: "Simon Williams",
    title: "Advisor",
    description:
      "Advisor to AI Founders. Simon has led Sales and GTM for top AI platforms, and helped scale multiple AI startups with a strategic network & vision.",
    image: SimonImage,
  },
];

const AboutAtelic = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const paragraphY = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const springHeaderY = useSpring(headerY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const springParagraphY = useSpring(paragraphY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const springCardsY = useSpring(cardsY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [screenSize, setScreenSize] = useState("2xl");
  const [membersPerSlide, setMembersPerSlide] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0); // -1 for left, 1 for right

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const getMembersPerSlide = (width) => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    if (width < 1800) return 3;
    return 4;
  };

  const getScreenSize = (width) => {
    if (width < 768) return "mobile";
    if (width < 1024) return "md";
    if (width < 1536) return "lg";
    return "2xl";
  };

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newMembersPerSlide = getMembersPerSlide(width);
      const newScreenSize = getScreenSize(width);
      const newIsMobile = width < 768;

      setMembersPerSlide(newMembersPerSlide);
      setScreenSize(newScreenSize);
      setIsMobile(newIsMobile);

      if (newMembersPerSlide !== membersPerSlide) {
        setCurrentSlide(0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [membersPerSlide]);

  const totalSlides = Math.ceil(teamMembers.length / membersPerSlide);

  const getCurrentSlideMembers = () => {
    const startIndex = currentSlide * membersPerSlide;
    const endIndex = startIndex + membersPerSlide;
    return teamMembers.slice(startIndex, endIndex);
  };

  const handlePrevious = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const goToSlide = (slideIndex) => {
    if (slideIndex === currentSlide) return;

    setSlideDirection(slideIndex > currentSlide ? 1 : -1);
    setCurrentSlide(slideIndex);
  };

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;

    const touchDiff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      if (touchDiff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  const getCardClasses = () => {
    const baseClasses =
      "group pt-4 px-6 text-center rounded-t-[400px] transition-all duration-700 hover:shadow-xl flex flex-col items-center bg-white hover:bg-gradient-to-b hover:from-[#F21B2A] hover:to-[#335F86] hover:text-white transform relative overflow-visible";

    const hoverClasses = isMobile ? "" : "hover:scale-105 hover:-translate-y-2";

    switch (screenSize) {
      case "mobile":
        return `${baseClasses} ${hoverClasses} w-[260px] h-[530px] mx-auto`;
      case "md":
        return `${baseClasses} ${hoverClasses} w-[280px] h-[550px]`;
      case "lg":
        return `${baseClasses} ${hoverClasses} w-[260px] h-[500px]`;
      default:
        return `${baseClasses} ${hoverClasses} w-[350px] h-[647px]`;
    }
  };

  const getImageClasses = () => {
    const baseClasses =
      "flex-shrink-0 rounded-full overflow-hidden border-[5px] border-white transition-all duration-500 group-hover:border-opacity-80 group-hover:shadow-2xl";

    const hoverClasses = isMobile ? "" : "group-hover:scale-100";

    switch (screenSize) {
      case "mobile":
        return `${baseClasses} w-[190px] h-[190px]`;
      case "md":
        return `${baseClasses} ${hoverClasses} w-[160px] h-[160px]`;
      case "lg":
        return `${baseClasses} ${hoverClasses} w-[170px] h-[170px]`;
      default:
        return `${baseClasses} ${hoverClasses} w-[211px] h-[211px] 2xl:w-[311px] 2xl:h-[311px]`;
    }
  };

  const getLearnMoreButtonClasses = () => {
    if (isMobile) {
      return "w-[160px] h-[40px] rounded-[20px] font-medium group-hover:bg-white group-hover:text-[#335F86] hover:transform hover:scale-110 hover:shadow-xl text-sm transition-all duration-300 bg-[#335F86] text-white mt-auto mb-4 mx-auto block hover:bg-white hover:text-black flex-shrink-0";
    } else {
      return "flex-shrink-0 absolute -bottom-[23.5px] left-1/2 transform -translate-x-1/2 w-[186px] h-[47px] rounded-[23.5px] font-medium text-sm transition-all duration-400 bg-[#335F86] text-white group-hover:bg-white group-hover:text-[#335F86] hover:transform hover:scale-110 hover:shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 z-10";
    }
  };

  const getTitleClasses = () => {
    const hoverClasses = isMobile
      ? ""
      : "group-hover:transform group-hover:scale-110 transition-all duration-100";

    switch (screenSize) {
      case "mobile":
        return `text-lg font-bold mb-2 flex-shrink-0 ${hoverClasses}`;
      case "md":
        return `text-lg font-bold mb-2 ${hoverClasses}`;
      case "lg":
        return `text-xl font-bold mb-2 ${hoverClasses}`;
      default:
        return `text-xl 2xl:text-[26px] font-bold mb-2 ${hoverClasses}`;
    }
  };

  const getDescriptionClasses = () => {
    switch (screenSize) {
      case "mobile":
        return "text-sm font-extralight leading-relaxed mb-4 flex-grow overflow-hidden";
      case "md":
        return "text-sm font-extralight leading-relaxed mb-6";
      case "lg":
        return "text-sm font-extralight leading-relaxed mb-6";
      default:
        return "text-md 2xl:text-[16px] font-extralight leading-relaxed mb-6";
    }
  };

  // Slide animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section
      ref={sectionRef}
      className="z-10 font-sora overflow-hidden bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-16 min-h-screen relative"
      onMouseEnter={() => !isMobile && setShowArrows(true)}
      onMouseLeave={() => !isMobile && setShowArrows(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px]">
        {/* Header and Paragraph with Scroll Reveal */}
        <div className="md:flex justify-between items-start md:space-x-10 2xl:mb-16 mb-12 relative">
          {/* Header with AOS */}
          <motion.div style={{ y: springHeaderY }} className="relative z-20">
            <h2
              className="2xl:text-[60px] text-3xl md:text-4xl font-semibold whitespace-nowrap"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              About{" "}
              <span
                className="text-[#ED254E] inline-block"
                data-aos="zoom-in"
                data-aos-delay="300"
                data-aos-duration="800"
              >
                Atelic
              </span>
            </h2>

            {/* Navigation Arrows below heading - Desktop only */}
            {!isMobile && (
              <motion.div
                className="flex items-center space-x-4 mt-6"
                data-aos="fade-up"
                data-aos-delay="600"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: showArrows ? 1 : 0,
                  y: showArrows ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={handlePrevious}
                  className="w-[62px] h-[62px] bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                  whileHover={{
                    scale: 1.1,
                    backgroundImage:
                      "linear-gradient(150.45deg, #F21B2A 19.81%, #335F86 90.64%)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-600 group-hover:text-white transition-colors duration-300 relative z-10"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="w-[62px] h-[62px] bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                  whileHover={{
                    scale: 1.1,
                    backgroundImage:
                      "linear-gradient(150.45deg, #F21B2A 19.81%, #335F86 90.64%)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-600 group-hover:text-white transition-colors duration-300"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Paragraph with AOS */}
          <motion.div style={{ y: springParagraphY }} className="relative z-10">
            <p
              className="2xl:text-[22px] text-gray-600 mt-4 md:mt-0 max-w-3xl"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="1000"
            >
              Founded by a team of seasoned AI, cloud, and data experts, Atelic
              AI was created to cut through the noise and hype of generic AI
              solutions. We exist to deliver true business value through
              context-aware, ROI-driven implementations that solve real-world
              problems — not just pilot experiments.
            </p>
          </motion.div>
        </div>

        {/* Team Cards with Slide Animation */}
        <motion.div style={{ y: springCardsY }} className="relative">
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={currentSlide}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  handleNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  handlePrevious();
                }
              }}
              className="flex flex-wrap gap-5 justify-center"
            >
              {getCurrentSlideMembers().map((member, index) => (
                <div
                  key={`${currentSlide}-${index}`}
                  className={getCardClasses()}
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                  data-aos-duration="800"
                  style={{
                    animation: !isMobile
                      ? `cardFloat 6s ease-in-out ${
                          1.5 + index * 0.6
                        }s infinite`
                      : "none",
                  }}
                >
                  <div className={getImageClasses()}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      className={`object-cover w-full h-full transition-all duration-500 ${
                        !isMobile ? "group-hover:scale-110" : ""
                      }`}
                    />
                  </div>
                  <div className={`mt-6 flex-1 ${isMobile ? "mb-2" : "mb-4"}`}>
                    <h3 className={getTitleClasses()}>{member.name}</h3>
                    <p className="text-[#ED254E] font-semibold mb-4 text-lg group-hover:text-white">
                      {member.title}
                    </p>
                    <p className={getDescriptionClasses()}>
                      {member.description}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <button className={getLearnMoreButtonClasses()}>
                    Learn More
                  </button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Pagination Dots */}
        {totalSlides > 1 && (
          <div
            className={`flex gap-2 justify-center items-center ${
              isMobile ? "mt-8" : "mt-12"
            }`}
            data-aos="fade-up"
            data-aos-delay="800"
          >
            {Array.from({ length: totalSlides }, (_, index) => {
              const isActive = currentSlide === index;
              return (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                    isActive && "w-[21px] h-[21px] border-[#335F86]"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ borderWidth: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`rounded-full ${
                      isActive
                        ? "bg-[#335F86]"
                        : "bg-[#335F86] hover:bg-gray-400"
                    } w-[9px] h-[9px]`}
                  />
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes cardFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .ease-bounce {
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </section>
  );
};

export default AboutAtelic;
