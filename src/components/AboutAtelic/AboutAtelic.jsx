"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Mock images (ensure paths are correct)
import davidImage from "../../../assets/David.png";
import AlvinImage from "../../../assets/AlvinHeib.png";
import BenImage from "../../../assets/Ben.png";
import RomanImage from "../../../assets/Roman.png";
import SimonImage from "../../../assets/Simon.png";
import { API_BASE_URL } from "@/config/config";

// const teamMembers = [
//   {
//     name: "David Chalklen",
//     title: "CTO",
//     description:
//       "David has over 20 years experience in AI/Tech. He's held Senior and Executive roles at Microsoft, Publicis, WPP, and has been a senior tech/strategy led for startups.",
//     image: davidImage,
//   },
//   {
//     name: "Alvin Heib",
//     title: "CPO",
//     description:
//       "As Chief Product Officer, and one of the co-founders of Atelic, Alvin brings 15+ years of experience in AI, cloud, data, product strategy, and technical execution.",
//     image: AlvinImage,
//   },
//   {
//     name: "Ben Owen",
//     title: "Founder & CEO",
//     description:
//       "The Atelic Founder & CEO has over 15 years' experience in enterprise digital/analytics, with a focus on AI adoption & transformation strategy.",
//     image: BenImage,
//   },
//   {
//     name: "Romain Picard",
//     title: "Investor & Advisor",
//     description:
//       "Romain is an expert investor. Founder & ex-key CCO of Dataiku. Now active as a strategic advisor & investor for AI startups.",
//     image: RomanImage,
//   },
//   {
//     name: "Simon Williams",
//     title: "Advisor",
//     description:
//       "Advisor to AI Founders. Simon has led Sales and GTM for top AI platforms, and helped scale multiple AI startups with a strategic network & vision.",
//     image: SimonImage,
//   },
// ];

// A new, dedicated component for each card's animation logic (from first code)
const AnimatedTeamCard = ({
  member,
  index,
  teamMembers,
  scrollYProgress,
  getCardClasses,
  getImageClasses,
  getTitleClasses,
  getDescriptionClasses,
  getLearnMoreButtonClasses,
}) => {
  const totalMembers = teamMembers?.length;

  // Define the segment of the scroll progress that this card will react to.
  // We add a slight overlap for a smoother effect.
  const start = index / totalMembers;
  const end = start + (1 / totalMembers) * 1.5; // Multiply by 1.5 to make animation smoother

  // Changed from vertical (y: [100, 0]) to horizontal (x: [100, 0]) - coming from right
  const y = useTransform(scrollYProgress, [start, end], [300, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div style={{ y, opacity }} className={getCardClasses()}>
      <div className={getImageClasses()}>
        <Image
          src={`${API_BASE_URL}${member?.image?.url}`}
          alt={member?.name}
          width={member?.image?.width}
          height={member?.image?.height}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-6 flex-1 mb-4">
        <h3 className={getTitleClasses()}>{member?.name}</h3>
        <p className="text-[#ED254E] font-semibold mb-4 text-lg group-hover:text-white">
          {member?.title}
        </p>
        <p className={getDescriptionClasses()}>{member?.description}</p>
      </div>
      <button className={getLearnMoreButtonClasses()}>
        {member?.primaryButton}
      </button>
    </motion.div>
  );
};

const AboutAtelic = ({ data }) => {
  console.log(data, "Team Members");

  const teamMembers = Array.isArray(data?.teamMembers) ? data.teamMembers : [];

  // console.log(Array?.isArray(team) && team);
  const sectionRef = useRef(null);
  const [screenSize, setScreenSize] = useState("2xl");
  const [isMobile, setIsMobile] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [membersPerSlide, setMembersPerSlide] = useState(4);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef(null);

  // Your original responsive styling functions
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: "ease-out-cubic",
    });

    const handleResize = () => {
      const width =
        typeof window !== "undefined"
          ? window.visualViewport?.width || window.innerWidth
          : 1024;

      console.log("Viewport width:", width);

      const newScreenSize = getScreenSize(width);
      const newMembersPerSlide = getMembersPerSlide(width);
      const newIsMobile = width < 768;

      setScreenSize(newScreenSize);
      setMembersPerSlide(newMembersPerSlide);
      setIsMobile(newIsMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [membersPerSlide]);

  // Horizontal scroll functionality
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Only handle horizontal scroll on desktop
      if (isMobile) return;

      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isMobile]);

  // Set up the scroll tracking (from first code)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Navigation functions (from second code)
  const totalSlides = Math.ceil(teamMembers?.length / membersPerSlide);

  const getCurrentSlideMembers = () => {
    const startIndex = currentSlide * membersPerSlide;
    const endIndex = startIndex + membersPerSlide;
    return teamMembers?.slice(startIndex, endIndex);
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

  // Fixed styling functions with proper button positioning
  const getCardClasses = () => {
    const baseClasses =
      "group pt-4 px-6 text-center rounded-t-[400px] transition duration-200 flex flex-col items-center bg-white hover:bg-gradient-to-b hover:from-[#F21B2A] hover:to-[#335F86] hover:text-white relative overflow-visible";
    const hoverClasses = "hover:scale-105 hover:-translate-y-2";
    switch (screenSize) {
      case "mobile":
        return `${baseClasses} w-[260px] h-[530px] mx-auto`;
      case "md":
        return `${baseClasses} ${hoverClasses} w-[280px] h-[550px] pb-12`;
      case "lg":
        return `${baseClasses} ${hoverClasses} w-[260px] h-[500px] pb-12`;
      default:
        return `${baseClasses} ${hoverClasses} w-[350px] h-[647px] pb-12`;
    }
  };

  const getImageClasses = () => {
    const baseClasses =
      "flex-shrink-0 rounded-full overflow-hidden border-[5px] border-white transition-all duration-500 group-hover:border-opacity-80 group-hover:shadow-2xl";
    const hoverClasses = "group-hover:scale-100";
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
      return "absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[186px] h-[47px] rounded-[23.5px] font-medium text-sm transition-all duration-400 bg-[#335F86] text-white group-hover:bg-white group-hover:text-[#335F86] hover:transform hover:scale-110 hover:shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 z-50 pointer-events-auto cursor-pointer flex items-center justify-center";
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

  console.log(isMobile, "ISMOBILE");

  // Enhanced slide animation variants with smoother transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  // Desktop slide animation variants
  const desktopSlideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // On mobile, we use the slide functionality. On desktop, we use the scroll animation.
  if (isMobile) {
    return (
      <section
        className="z-10 font-sora overflow-hidden bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-16 min-h-screen relative"
        onTouchMove={handleTouchMove}
      >
        <div className="px-4 sm:px-8 2xl:px-[178px] md:px-12 lg:px-[100px]">
          <div className="md:flex justify-between items-start md:space-x-10 2xl:mb-16 mb-12">
            <h2
              className="2xl:text-[60px] text-3xl md:text-4xl font-semibold whitespace-nowrap"
              data-aos="fade-right"
            >
              {data?.heading?.map((part) => (
                <span key={part.id} style={{ color: part.color }}>
                  {part.text}
                  {part.breakAfter ? <br /> : " "}
                </span>
              ))}
            </h2>
            <p
              className="2xl:text-[22px] text-gray-600 mt-4 md:mt-0 max-w-3xl"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              {data?.subHeading}
            </p>
          </div>

          {/* Mobile Slide Animation */}
          <div className="relative overflow-hidden">
            <AnimatePresence
              initial={false}
              custom={slideDirection}
              mode="popLayout"
            >
              <motion.div
                key={currentSlide}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
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
                  <motion.div
                    key={`${currentSlide}-${index}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                    className="group pt-4 px-6 text-center rounded-t-[400px] transition duration-200 flex flex-col items-center bg-white hover:bg-gradient-to-b hover:from-[#F21B2A] hover:to-[#335F86] hover:text-white relative overflow-visible w-[260px] h-[530px] mx-auto"
                  >
                    <div className="flex-shrink-0 rounded-full overflow-hidden border-[5px] border-white transition-all duration-500 group-hover:border-opacity-80 group-hover:shadow-2xl w-[190px] h-[190px]">
                      <Image
                        src={`${API_BASE_URL}${member?.image?.url}`}
                        alt={member?.name}
                        width={member?.image?.width}
                        height={member?.image?.height}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="mt-6 flex-1 mb-4">
                      <h3 className="text-lg font-bold mb-2 flex-shrink-0">
                        {member.name}
                      </h3>
                      <p className="text-[#ED254E] font-semibold mb-4 text-lg group-hover:text-white">
                        {member.title}
                      </p>
                      <p className="text-sm font-extralight leading-relaxed mb-4 flex-grow overflow-hidden">
                        {member.description}
                      </p>
                    </div>
                    <button className="w-[160px] h-[40px] rounded-[20px] font-medium group-hover:bg-white group-hover:text-[#335F86] hover:transform hover:scale-110 hover:shadow-xl text-sm transition-all duration-300 bg-[#335F86] text-white mt-auto mb-4 mx-auto block hover:bg-white hover:text-black flex-shrink-0">
                      Learn More
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots for Mobile */}
          {totalSlides > 1 && (
            <div className="flex gap-2 justify-center items-center mt-8">
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
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
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
      </section>
    );
  }

  // Desktop JSX with the scroll-reveal effect + enhanced slide animations
  return (
    <section
      ref={sectionRef}
      className="z-10 font-sora overflow-visible bg-[#f3f3f3] max-w-[1920px] mx-auto w-full relative"
      style={{ height: "300vh" }} // Provides the scrollable area
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="sticky top-0 w-full min-h-screen py-0 flex flex-col overflow-visible">
        <div className="px-4 sm:px-8 2xl:px-[178px] md:px-12 lg:px-[100px] flex flex-col flex-grow h-full">
          <div className="md:flex justify-between items-start pt-10 md:space-x-10 2xl:mb-16 mb-12">
            <div className="relative">
              <h2 className="2xl:text-[60px] text-3xl md:text-4xl font-semibold whitespace-nowrap">
                {data?.heading?.map((part) => (
                  <span key={part.id} style={{ color: part.color }}>
                    {part.text}
                    {part.breakAfter ? <br /> : " "}
                  </span>
                ))}
              </h2>

              {/* Navigation Arrows below heading - Desktop only */}
              <motion.div
                className="flex items-center space-x-4 mt-6"
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
            </div>

            <p className="2xl:text-[22px] text-gray-600 mt-4 md:mt-0 max-w-3xl">
              {data?.subHeading}
            </p>
          </div>

          {/* Desktop: Enhanced slide animation with horizontal scroll */}
          <div
            ref={containerRef}
            className="flex-grow overflow-x-auto overflow-y-hidden relative"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div className="relative min-h-full flex items-center pb-16">
              <AnimatePresence
                initial={false}
                custom={slideDirection}
                mode="popLayout"
              >
                <motion.div
                  key={currentSlide}
                  custom={slideDirection}
                  variants={desktopSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 150, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    rotateY: { duration: 0.5 },
                  }}
                  className="flex flex-wrap gap-5 justify-center items-center w-full"
                  style={{ perspective: "1000px" }}
                >
                  {getCurrentSlideMembers().map((member, index) => (
                    <AnimatedTeamCard
                      key={`${currentSlide}-${member.name}`}
                      member={member}
                      teamMembers={teamMembers}
                      index={index}
                      scrollYProgress={scrollYProgress}
                      getCardClasses={getCardClasses}
                      getImageClasses={getImageClasses}
                      getTitleClasses={getTitleClasses}
                      getDescriptionClasses={getDescriptionClasses}
                      getLearnMoreButtonClasses={getLearnMoreButtonClasses}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Pagination Dots for Desktop */}
          {totalSlides > 1 && (
            <div className="flex gap-2 justify-center items-center pt-8 mb-8">
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
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
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
      </div>
    </section>
  );
};

export default AboutAtelic;
