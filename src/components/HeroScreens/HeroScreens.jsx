"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import ServicesRobot from "../../../assets/ServicesRobot.png";

import Robot1 from "../../../assets/AtelicRobot.png";
import BgPattern1 from "../../../assets/HeroWebRight1.png";
import AiChip from "../../../assets/AiChip (2).png";
import Hero3Bg from "../../../assets/HeroBg3 (2).png";
import AboutUsHero from "../../../assets/AboutusHero.png";
import AtelicLogoHero4 from "../../../assets/AtelicLogoHero4.png";
import HeroBg4 from "../../../assets/Hero4BG.png";
import PartnersHero from "../../../assets/PartnersHero.jpg";
import NewsHero from "../../../assets/NewsHero.jpg";
import { API_BASE_URL } from "@/config/config";
import {
  headingStyle,
  headingStylesHeroMain,
  paragraphStyles,
} from "@/styles/globalStyles";
import { useBackground } from "@/context/BackgroundContext";

export const HeroComponent1 = ({ sectionY, backgroundY, robotY, textY }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden min-h-[600px] lg:min-h-[700px] 2xl:min-h-[800px] select-none"
  >
    <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
      <motion.div className="absolute right-0 top-0 translate-x-1/2 2xl:translate-x-1/4 hidden lg:block z-0">
        <div className="w-[1282px] h-[915px]">
          <Image
            src={BgPattern1}
            alt="Background Pattern"
            width={1282}
            height={915}
          />
        </div>
      </motion.div>
      <div className="flex flex-row w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5 2xl:space-y-10"
        >
          <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-black space-y-5 2xl:space-y-10 flex flex-col">
            {["Simplifying AI.", "Building Trust.", "Delivering ROI."].map(
              (text, i) => (
                <motion.span
                  key={i}
                  style={{ y: textY }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
                  className={
                    text.includes("ROI") ? "text-[#F02C2C] font-bold" : ""
                  }
                >
                  {text.includes("ROI") ? (
                    <>
                      <span className="text-[#F02C2C]">Delivering ROI</span>
                      <span className="text-black">.</span>
                    </>
                  ) : (
                    text
                  )}
                </motion.span>
              )
            )}
          </h1>

          <motion.p
            className="2xl:text-[22px] text-base font-sora 2xl:leading-normal text-gray-600 mt-6 2xl:mt-14 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            style={{ y: textY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Atelic AI helps enterprises unlock real value from AI by solving
            complex challenges with secure, customized, industry-specific
            solutions.
          </motion.p>

          <motion.div
            className="font-poppins mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              className="text-xs 2xl:text-[16px] bg-[#335F86] text-white px-6 py-4 rounded-md"
              whileHover={{ scale: 1.03, backgroundColor: "#082c4e" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Book a Consultation
            </motion.button>
            <motion.button
              className="text-xs 2xl:text-[16px] bg-[#E5EAF0] text-[#0A3C66] px-6 py-4 rounded-md"
              whileHover={{ scale: 1.03, backgroundColor: "#d3dbe3" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Explore Our Approach
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ y: robotY }}
        className="w-full relative flex justify-end"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative w-full 2xl:max-w lg:max-w-[600px] max-w-[500px]">
          <Image src={Robot1} alt="AI Robot" className="w-full " />

          <div
            style={{ animation: "floatUpDown 11s ease-in-out infinite" }}
            className="font-poppins absolute xs:w-[180px] xs:h-[140px] w-[210px] h-[170px] 2xl:w-[240px] 2xl:h-[190px] top-6 -right-6 lg:top-14 lg:-right-6 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col"
          >
            <p className="text-4xl 2xl:text-[50px] font-normal 2xl:mt-2 mb-2 text-black">
              30%
            </p>
            <p className="text-xs 2xl:text-[16px] mt-2 font-thin text-black/60 leading-snug">
              of GenAI projects will be abandoned after proof{" "}
              <span className="underline cursor-pointer">Learn More</span>
            </p>
          </div>

          <div
            style={{ animation: "floatUpDown 11s ease-in-out infinite" }}
            className="font-poppins absolute w-[210px] h-[170px] 2xl:w-[240px] 2xl:h-[190px] bottom-0 left-0 2xl:bottom-40 2xl:-left-20 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col"
          >
            <p className="text-4xl 2xl:text-[50px] font-normal text-black 2xl:mt-2 mb-2">
              42%
            </p>
            <p className="text-xs 2xl:text-[16px] mt-2 font-thin text-black/60 leading-snug">
              of respondents don't fully understand the benefits of AI.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);
export const HeroComponent2 = ({ sectionY, backgroundY, robotY, textY }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden min-h-[600px] lg:h-[650px] 2xl:h-[730px] select-none"
  >
    <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
      {/* Background Pattern */}
      <motion.div className="absolute right-0 -top-32 translate-x-1/2 2xl:translate-x-1/4 hidden lg:block z-10">
        <div className="w-[1282px] h-[915px]">
          <Image
            src={BgPattern1}
            alt="Background Pattern"
            width={1282}
            height={915}
          />
        </div>
      </motion.div>

      {/* AI Chip Image - Absolute positioned for breaking container */}
      <motion.div
        style={{ y: robotY }}
        className="hidden lg:block absolute right-0 top-20 z-10 -translate-x-2 sm:translate-x-0 md:translate-x-4 lg:translate-x-8 xl:translate-x-12 2xl:translate-x-16 translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-0"
      >
        <div className="2xl:max-w-[900px] xl:max-w-[700px] lg:max-w-[650px]">
          <Image src={AiChip} alt="AI Robot" className="" />
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="flex flex-row w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5 2xl:space-y-10"
        >
          <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-black space-y-5 2xl:space-y-10 flex flex-col">
            {["Simplifying AI.", "Building Trust.", "Delivering ROI."].map(
              (text, i) => (
                <motion.span
                  key={i}
                  style={{ y: textY }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
                  className={
                    text.includes("ROI") ? "text-[#F02C2C] font-bold" : ""
                  }
                >
                  {text.includes("ROI") ? (
                    <>
                      <span className="text-[#F02C2C]">Delivering ROI</span>
                      <span className="text-black">.</span>
                    </>
                  ) : (
                    text
                  )}
                </motion.span>
              )
            )}
          </h1>

          <motion.p
            className="2xl:text-[22px] text-base font-sora 2xl:leading-normal text-gray-600 mt-6 2xl:mt-14 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            style={{ y: textY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Atelic AI helps enterprises unlock real value from AI by solving
            complex challenges with secure, customized, industry-specific
            solutions.
          </motion.p>

          <motion.div
            className="font-poppins mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              className="text-xs 2xl:text-[16px] bg-[#335F86] text-white px-6 py-4 rounded-md"
              whileHover={{ scale: 1.03, backgroundColor: "#082c4e" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Book a Consultation
            </motion.button>
            <motion.button
              className="text-xs 2xl:text-[16px] bg-[#E5EAF0] text-[#0A3C66] px-6 py-4 rounded-md"
              whileHover={{ scale: 1.03, backgroundColor: "#d3dbe3" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Explore Our Approach
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Robot Motion Container - Hidden on smaller screens since image is absolute */}
      <motion.div
        style={{ y: robotY }}
        className="w-full relative flex justify-end"
      >
        <div className="relative w-full 2xl:max-w lg:max-w-[600px] max-w-[500px]">
          <div className="block lg:hidden">
            <Image src={AiChip} alt="AI Robot" className="w-full " />
          </div>
        </div>
      </motion.div>
    </div>

    {/* CSS for floating animation */}
    <style jsx>{`
      @keyframes floatUpDown {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    `}</style>
  </motion.section>
);
export const AnimatedHeading = ({
  headings = [],
  textY = 0,
  className = "",
}) => {
  return (
    <h1 className={`${className}`}>
      {headings.map((heading, index) => {
        const isAnimated = index !== 0;
        const commonStyle = {
          color: heading.color,
        };

        return isAnimated ? (
          <motion.span
            key={heading.id}
            style={{ ...commonStyle, y: textY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="font-bold"
          >
            {" " + heading.text}
          </motion.span>
        ) : (
          <span key={heading.id} style={commonStyle} className="font-light">
            {heading.text}
          </span>
        );
      })}
    </h1>
  );
};
export const AnimatedHeadingBoldLast = ({
  headings = [],
  textY = 0,
  className = "",
}) => {
  // No heading? Don't render
  if (!headings?.length) return null;

  const heading = headings[0]; // assuming only one object as per your API
  const words = heading.text.trim().split(" "); // split text into words
  const color = heading.color || "white";

  return (
    <h1 className={` ${className}`}>
      {words.map((word, index) => {
        const isLast = index === words.length - 1;

        return (
          <motion.span
            key={index}
            style={{
              color,
              fontWeight: isLast ? 700 : 300,
              y: textY,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            {word + " "}
          </motion.span>
        );
      })}
    </h1>
  );
};
// Hero Component 3 - Innovation Focus
export const HeroComponent3 = ({ sectionY, backgroundY, robotY, textY }) => (
  <section className="max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative min-h-[600px] lg:min-h-[700px] 2xl:min-h-[800px] select-none overflow-x-clip overflow-visible">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
      {/* Text Content with Better Responsive Width */}
      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] flex flex-row w-full lg:w-3/5 2xl:w-2/3">
        <motion.div style={{ y: textY }} className="w-full">
          <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-white space-y-5 2xl:space-y-10 flex flex-col">
            <span>Simplifying AI.</span>
            <span>Building Trust.</span>
            <span className="text-white font-bold">
              Delivering ROI<span className="text-white font-bold">.</span>
            </span>
          </h1>

          <p className="2xl:text-[22px] text-base font-sora 2xl:leading-normal text-gray-600 mt-6 2xl:mt-14 max-w-none 2xl:max-w-2xl">
            Atelic AI helps enterprises unlock real value from AI by solving
            complex challenges with secure, customized, industry-specific
            solutions.
          </p>

          <motion.div
            style={{ y: textY }}
            className="font-poppins mt-8 flex gap-4 flex-wrap"
          >
            <button className="text-xs 2xl:text-[16px] bg-[#335F86] text-white px-6 py-4 rounded-md hover:bg-[#082c4e] transition-all duration-300">
              Book a Consultation
            </button>
            <button className="text-xs 2xl:text-[16px] bg-[#E5EAF0] text-[#0A3C66] px-6 py-4 rounded-md hover:bg-[#d3dbe3] transition-all duration-300">
              Explore Our Approach
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Image with Better Responsive Width */}
      <motion.div
        style={{ y: robotY }}
        className="w-full lg:w-2/5 2xl:w-1/2 relative px-4 sm:px-8 md:px-12 lg:px-0 lg:mr-28"
      >
        <div className="relative w-full">
          <img
            src={Hero3Bg.src}
            alt="AI Robot"
            className="w-full 2xl:-mt-24 crisp-edges"
            style={{
              imageRendering: "pixelated",
              scale: 1.9,
            }}
          />
        </div>
      </motion.div>
    </div>
  </section>
);
export const HeroComponent4 = ({ sectionY, backgroundY, robotY, textY }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    // style={{ backgroundImage: `url(${HeroBg4.src})` }}
    className="max-w-[1920px] bg-red-500 mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden min-h-[600px] lg:min-h-[700px] 2xl:min-h-[800px] select-none"
  >
    <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
      <div className="flex flex-row w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5 2xl:space-y-10"
        >
          <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-black space-y-5 2xl:space-y-10 flex flex-col">
            {["Simplifying AI.", "Building Trust.", "Delivering ROI."].map(
              (text, i) => (
                <motion.span
                  key={i}
                  style={{ y: textY }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
                  className={
                    text.includes("ROI") ? "text-[#F02C2C] font-bold" : ""
                  }
                >
                  {text.includes("ROI") ? (
                    <>
                      <span className="text-[#F02C2C]">Delivering ROI</span>
                      <span className="text-black">.</span>
                    </>
                  ) : (
                    text
                  )}
                </motion.span>
              )
            )}
          </h1>

          <motion.p
            className="2xl:text-[22px] text-base font-sora 2xl:leading-normal text-gray-600 mt-6 2xl:mt-14 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            style={{ y: textY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Atelic AI helps enterprises unlock real value from AI by solving
            complex challenges with secure, customized, industry-specific
            solutions.
          </motion.p>

          <motion.div
            className="font-poppins mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              className="text-xs 2xl:text-[16px] bg-[#335F86] text-white px-6 py-4 rounded-md"
              whileHover={{ scale: 1.03, backgroundColor: "#082c4e" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Book a Consultation
            </motion.button>
            <motion.button
              className="text-xs 2xl:text-[16px] bg-[#E5EAF0] text-[#0A3C66] px-6 py-4 rounded-md"
              whileHover={{ scale: 1.03, backgroundColor: "#d3dbe3" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Explore Our Approach
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ y: robotY }}
        className="w-full relative flex justify-end"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative w-full 2xl:max-w lg:max-w-[600px] max-w-[500px]">
          <Image src={AtelicLogoHero4} alt="AI Robot" className="w-full " />
        </div>
      </motion.div>
    </div>
  </motion.section>
);

// Hero Component 4 - Results Focus

export const HeroServices = ({
  sectionY,
  backgroundY,
  robotY,
  textY,
  sections,
}) => {
  console.log(sections);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#00172B] max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden select-none"
    >
      <div className="px-4 sm:px-8 md:px-12 lg:px-[100px] 2xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 h-full">
        {/* Text Content Section */}
        <div className="w-full lg:min-w-[40%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 2xl:space-y-10"
          >
            <AnimatedHeadingBoldLast
              headings={sections?.headings}
              textY={textY}
              className={` font-sora leading-tight ${headingStyle}`}
            />

            <motion.p
              className={`text-base ${paragraphStyles} font-thin font-sora leading-relaxed 2xl:leading-loose text-white mt-6 2xl:mt-14`}
              initial={{ opacity: 0, y: 20 }}
              style={{ y: textY }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {sections?.subHeading}
            </motion.p>

            <motion.div
              className="font-poppins mt-8 flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                className="text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-[16px] bg-[#335F86] text-white px-6 py-4 rounded-md"
                whileHover={{ scale: 1.03, backgroundColor: "#082c4e" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {sections?.primaryButton}
              </motion.button>
              <motion.button
                className="text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-[16px] bg-[#E5EAF0] text-[#0A3C66] px-6 py-4 rounded-md"
                whileHover={{ scale: 1.03, backgroundColor: "#d3dbe3" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {sections?.secondaryButton}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          style={{ y: robotY }}
          className="mix-blend-lighten"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative 2xl:w-[1100px] lg:w-[900px] mix-blend-lighten scale-125 mt-12 sm:mt-0 sm:scale-100">
            <img
              // width={1104}
              // height={736}
              src={`${API_BASE_URL}${sections?.image?.url}`}
              alt="AI Robot"
              className="object-center"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export const HeroAboutUs = ({
  sectionY,
  backgroundY,
  robotY,
  textY,
  sections,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#E9E9E9] z-0 text-black  2xl:max-h-[750px] max-w-[1920px] mx-auto w-full relative overflow-hidden select-none"
    >
      <div className="px-4 sm:px-8 md:px-12 lg:px-[100px] 2xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
        {/* Text Content Section */}
        <div className="w-full lg:min-w-[50%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 2xl:space-y-10"
          >
            <AnimatedHeading
              headings={sections?.headings}
              textY={textY}
              className={`${headingStyle} font-sora leading-tight  `}
            />

            <motion.p
              className={`text-base 2xl:max-w-lg max-w-md ${paragraphStyles} font-light font-sora leading-relaxed 2xl:leading-loose text-black mt-6 2xl:mt-14`}
              initial={{ opacity: 0, y: 20 }}
              style={{ y: textY }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {sections?.subHeading}
            </motion.p>

            <motion.div
              className="font-poppins mt-8 flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                className="text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-[16px] bg-[#F21B2A] text-white px-6 py-4 rounded-md"
                whileHover={{ scale: 1.03, backgroundColor: "#082c4e" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {sections?.primaryButton}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <div className=" absolute lg:max-w-xl 2xl:max-w-none right-0 lg:block hidden overflow-hidden">
          <Image
            src={BgPattern1}
            alt="Background Pattern"
            width={930}
            className="min-h-screen object-contain"
            // height={713}
          />
        </div>

        {/* Image Section */}
        <motion.div
          style={{ y: robotY }}
          // className="mix-blend-lighten"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative 2xl:w-[872px] sm:mt-0 md:w-[600px] sm:scale-100">
            <img
              width={`${sections?.image?.width}`}
              height={`${sections?.image?.height}`}
              src={`${API_BASE_URL}${sections?.image?.url}`}
              alt="AI Robot"
              className="object-center"
            />
            <div
              style={{ animation: "floatUpDown 11s ease-in-out infinite" }}
              className="md:flex text-black hidden font-raleway absolute  xs:w-[180px] xs:h-[140px] w-[240px] h-[200px] 2xl:w-[280px] 2xl:h-[220px] bottom-40 left-0 lg:bottom-30 lg:left-0 md:bottom-20 md:left-20 2xl:bottom-56 2xl:left-28 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-7 2xl:px-9 py-4 leading-normal  flex-col"
            >
              <p className="text-5xl 2xl:text-[50px] font-normal text-black 2xl:mt-2 mb-2 2xl:mb-4">
                {sections?.stats?.percentage}
              </p>
              <p className="text-[14px] 2xl:text-[16px] mt-2 font-medium text-black/100 leading-snug">
                {sections?.stats?.description}
                <span className="underline cursor-pointer ml-1">
                  Learn More
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
export const AnimatedHeadingPartners = ({ headings = [], textY = 0 }) => {
  return (
    <h1 className={`font-light ${headingStyle} font-raleway leading-tight`}>
      {headings.map((heading, index) => {
        const isLast = index === headings.length - 1;
        const color = heading.color?.trim() || "black";

        const SpanComponent = (
          <motion.span
            key={heading.id}
            style={{ y: textY, color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className={`font-bold`}
          >
            {heading.text}
          </motion.span>
        );

        return (
          <span key={heading.id}>
            {index === 0 ? heading.text : SpanComponent}
            {heading.breakAfter ? <br /> : " "}
          </span>
        );
      })}
    </h1>
  );
};
export const HeroPartners = ({
  sectionY,
  backgroundY,
  robotY,
  textY,
  data,
}) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className=" text-black max-w-[1920px] z-0 mx-auto w-full relative overflow-hidden select-none"
  >
    <div className="px-4 sm:px-8 md:px-12 lg:px-[100px] 2xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
      {/* Text Content Section */}
      <div className="w-full z-50 pt-48 lg:min-w-[50%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5  2xl:space-y-10"
        >
          <AnimatedHeadingPartners headings={data?.headings} />

          <motion.p
            className={`text-base 2xl:max-w-2xl  max-w-2xl ${paragraphStyles} font-medium font-raleway leading-relaxed 2xl:leading-loose text-black mt-6 2xl:mt-14`}
            initial={{ opacity: 0, y: 20 }}
            style={{ y: textY }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {data?.subHeading}
          </motion.p>

          <motion.div
            className="font-raleway mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              className="text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-[16px] bg-[#F21B2A] text-white px-6 2xl:px-14 py-4 rounded-md"
              whileHover={{ scale: 1.03, backgroundColor: "#082c4e" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {data?.primaryButton}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        style={{ y: robotY }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div
          className="
    relative
    w-full
    sm:w-[500px]
    md:w-[600px]
    lg:w-[800px]
    xl:w-[1000px]
    2xl:w-[1308px]
    right-0
    sm:right-10
    md:right-16
    lg:right-24
    xl:right-32
    2xl:right-48
    scale-90
    sm:scale-95
    md:scale-100
    2xl:scale-100
  "
        >
          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

          {/* Actual Image */}
          <img
            src={`${API_BASE_URL}${data?.image?.url}`}
            alt="AI Robot"
            className="object-cover w-full h-auto relative z-0"
          />
        </div>
      </motion.div>
    </div>
  </motion.section>
);
export const HeroNews = ({ sectionY, backgroundY, robotY, textY, data }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" text-black max-w-[1920px] z-0 mx-auto w-full relative overflow-hidden select-none"
    >
      <div className="px-4 sm:px-8 md:px-12 lg:px-[100px] 2xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
        {/* Text Content Section */}
        <div className="w-full z-50 pt-48 lg:min-w-[50%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5  2xl:space-y-10"
          >
            <AnimatedHeading
              headings={data?.headings}
              className={`font-light ${headingStyle} font-raleway leading-tight`}
            />
            {/* <h1 className="text-4xl font-light sm:text-5xl lg:text-4xl 2xl:text-[60px] font-raleway leading-tight">
            Our
            <motion.span
              style={{ y: textY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * 0.3 }}
              className={"font-bold text-[#F21B2A]"}
            >
              {" "}
              News
            </motion.span>
          </h1> */}

            <motion.p
              className={`2xl:max-w-2xl  max-w-2xl ${paragraphStyles} font-medium font-raleway leading-relaxed 2xl:leading-loose text-black mt-6 2xl:mt-14`}
              initial={{ opacity: 0, y: 20 }}
              style={{ y: textY }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {data?.subHeading}
            </motion.p>

            <motion.div
              className="font-raleway mt-8 flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.button
                className="text-xs sm:text-sm lg:text-xs xl:text-sm 2xl:text-[16px] bg-[#F21B2A] text-white px-6 2xl:px-14 py-4 rounded-md"
                whileHover={{ scale: 1.03, backgroundColor: "#082c4e" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Explore Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          style={{ y: robotY }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            className="
   
    relative
    w-full
    sm:w-[500px]
    md:w-[600px]
    lg:w-[800px]
    xl:w-[1000px]
    2xl:w-[1308px]
    right-0
    sm:right-10
    md:right-16
    lg:right-24
    xl:right-32
    2xl:right-48
    scale-90
    sm:scale-95
    md:scale-100
    2xl:scale-100
  "
          >
            {/* 🔼 Top Gradient (existing) */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none hidden md:block" />

            {/* 🔼 Left Gradient (new) */}
            <div className="absolute top-0 left-0 h-full w-1/5 bg-gradient-to-r from-[#E9F7FF] to-transparent z-10 pointer-events-none" />

            {/* 🖼️ Actual Image */}
            <Image
              src={NewsHero}
              alt="AI Robot"
              className="object-cover w-full h-auto relative z-0"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
const parseHeadlines = (headliness) => {
  if (!headliness)
    return ["Simplifying AI.", "Building Trust.", "Delivering ROI."];

  // Handle both string with \n and array formats
  if (typeof headliness === "string") {
    return headliness.split("\\n").filter((line) => line.trim());
  }

  if (Array.isArray(headliness)) {
    return headliness;
  }

  // Fallback
  return ["Simplifying AI.", "Building Trust.", "Delivering ROI."];
};

// Smart image resolver
const resolveImageSrc = (imageData) => {
  if (!imageData) return null;

  // If it's already an imported image object
  if (imageData.src) return imageData;

  // If it's Strapi image data
  if (imageData.url) {
    return {
      src: `${API_BASE_URL}${imageData.url}`,
      width: imageData.width || 500,
      height: imageData.height || 500,
      alt: imageData.alternativeText || imageData.name || "Hero Image",
    };
  }

  return null;
};

// Enhanced Dynamic Hero Component
// Enhanced Dynamic Hero Component with Vertical Navigation
export const HeroDynamic = ({
  heroData,
  sectionY,
  backgroundY,
  robotY,
  textY,
  activeSection,
  hero,
  goToSlide = () => {},
  isDark = false,
}) => {
  const {
    heroType = "robot",
    theme = "light",
    bgColor = "#e9e9e9",
    heroImage,
    bgImage,
    headliness,
    subHeading,

    wholeHeroBg,
    primaryButtonText = "Book a Consultation",
    secondaryButtonText = "Explore Our Approach",
  } = heroData;

  const headlines = parseHeadlines(headliness);
  const mainImage = resolveImageSrc(heroImage);
  const backgroundImage = resolveImageSrc(bgImage);
  const { setIsDark } = useBackground();
  const isDarkTheme = theme === "dark" || isDark;
  const isRobot = heroType === "robot";
  const isChip = heroType === "chip";
  const isInnovation = heroType === "innovation";
  const isFullBg = heroType === "fullBg";

  useEffect(() => {
    if (isDarkTheme) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [isDarkTheme]);
  // Smart styling based on hero type and theme
  const getContainerStyles = () => {
    const baseStyles =
      "max-w-[1920px] mx-auto w-full 2xl:py-5 relative overflow-hidden select-none";

    if (isInnovation) {
      return `${baseStyles} lg:min-h-[500px] 2xl:min-h-[800px] overflow-x-clip overflow-visible`;
    }

    if (isChip) {
      return `${baseStyles}  lg:h-[650px] 2xl:h-[730px]`;
    }

    if (isFullBg) {
      return `${baseStyles} lg:min-h-[500px] 2xl:min-h-[800px]`;
    }

    return `${baseStyles}  lg:max-h-[600px] 2xl:max-h-[850px]`;
  };

  const getTextColor = () => {
    return isDarkTheme ? "text-white" : "text-black";
  };

  const getDescriptionColor = () => {
    return isDarkTheme ? "text-gray-300" : "text-gray-600";
  };

  // Dynamic background styling
  const getBackgroundStyles = () => {
    if (bgColor && bgColor.includes("gradient")) {
      return { background: bgColor };
    }
    return { backgroundColor: bgColor };
  };

  // Smart button styling based on theme
  const getButtonStyles = (isPrimary = true) => {
    const baseStyles =
      "text-xs 2xl:text-[16px] px-6 py-4 cursor-pointer z-50 rounded-md transition-all duration-300";

    if (isPrimary) {
      return `${baseStyles} bg-[#335F86] text-white hover:bg-[#082c4e]`;
    }

    return `${baseStyles} bg-[#E5EAF0] text-[#0A3C66] hover:bg-[#d3dbe3]`;
  };

  // Enhanced headline rendering with smart ROI detection
  const renderHeadline = (text, index) => {
    const isROILine = text.toLowerCase().includes("roi");
    const roiColor = isDarkTheme ? "text-white" : "text-[#F02C2C]";

    return (
      <motion.span
        key={index}
        style={{ y: textY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
        className={isROILine ? `${roiColor} font-bold` : getTextColor()}
      >
        {isROILine ? (
          <>
            <span className={roiColor}>Delivering ROI</span>
            <span className={getTextColor()}>.</span>
          </>
        ) : (
          text
        )}
      </motion.span>
    );
  };

  // Smart layout configuration
  const getLayoutConfig = () => {
    if (isInnovation) {
      return {
        textWidth: "w-full lg:w-3/4 2xl:w-2/3",
        imageWidth: "w-full lg:w-2/5 2xl:w-1/2",
        textPadding:
          "px-4 lg:pt-16 xl:pt-20 2xl:pt-36 sm:px-8 md:px-12 lg:px-[120px] 2xl:px-[178px]",
        imagePadding: "px-4 sm:px-8 md:px-12 lg:px-0 lg:mr-28",
        containerPadding: "",
      };
    }

    if (isFullBg) {
      return {
        textWidth: "w-full lg:w-3/4 2xl:w-2/3",
        imageWidth: "w-full lg:w-2/5 2xl:w-1/2",
        textPadding:
          "px-4 lg:pt-16 xl:pt-20 2xl:pt-36 sm:px-8 md:px-12 lg:px-[120px] 2xl:px-[178px]",
        imagePadding: "px-4 sm:px-8 md:px-12 lg:px-0 lg:mr-28",
        containerPadding: "",
      };
    }

    return {
      textWidth: "w-full",
      imageWidth: "w-full",
      textPadding: "",
      imagePadding: "",
      containerPadding: "px-4 sm:px-8 md:px-12 lg:px-[120px] 2xl:px-[178px]",
    };
  };

  const layoutConfig = getLayoutConfig();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={getContainerStyles()}
      style={getBackgroundStyles()}
    >
      {hero?.length > 0 && (
        <div className="font-poppins hidden z-50 lg:flex flex-col gap-4 2xl:ml-20 xl:ml-10 ml-10 items-center absolute left-0 top-1/2 -translate-y-1/2">
          {hero?.map((_, idx) => (
            <div
              key={idx}
              className={`relative cursor-pointer transition-all duration-300 ${
                idx === activeSection ? "w-14 h-14" : "w-11 h-11"
              } flex items-center justify-center`}
              onClick={() => goToSlide(idx)}
            >
              <span
                className={`text-sm font-semibold z-10 transition-colors duration-300 ${
                  isDarkTheme ? "text-white" : "text-black"
                }`}
              >
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
              {idx === activeSection && (
                <motion.span
                  className={`absolute w-14 h-14 rounded-full border-[2px] rotate-[45deg] border-t-transparent transition-colors duration-300 ${
                    isDarkTheme ? "border-white" : "border-black"
                  }`}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 45 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className={`${layoutConfig.containerPadding} mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 h-full`}
      >
        {/* Smart Background Pattern Rendering */}
        {backgroundImage && !isInnovation && !isFullBg && (
          <motion.div className="absolute right-0 top-0 translate-x-1/2 2xl:translate-x-1/4 hidden lg:block z-0">
            <div className="w-[1282px] h-[915px]">
              <Image
                src={backgroundImage.src}
                alt={backgroundImage.alt}
                width={backgroundImage.width}
                height={backgroundImage.height}
              />
            </div>
          </motion.div>
        )}

        {/* Enhanced Text Content */}
        <div
          className={`${layoutConfig.textPadding} z-30 flex flex-row ${layoutConfig.textWidth}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5  2xl:space-y-10"
          >
            {/* Dynamic Headlines */}
            <h1
              className={`${headingStylesHeroMain} font-sora font-normal ${getTextColor()} space-y-5 2xl:space-y-10 flex flex-col`}
            >
              {headlines.map((headline, index) =>
                renderHeadline(headline, index)
              )}
            </h1>

            {/* Description */}
            <motion.p
              className={`2xl:text-[22px] text-base font-sora 2xl:leading-normal ${getDescriptionColor()} mt-6 2xl:mt-14 ${
                isInnovation || isFullBg
                  ? "max-w-none 2xl:max-w-2xl"
                  : "max-w-lg"
              }`}
              initial={{ opacity: 0, y: 20 }}
              style={{ y: textY }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {subHeading}
            </motion.p>

            {/* Smart Button Rendering */}
            <motion.div
              className="font-poppins mt-8 flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={isInnovation || isFullBg ? { y: textY } : {}}
            >
              {isInnovation || isFullBg ? (
                <>
                  <button className={getButtonStyles(true)}>
                    {primaryButtonText}
                  </button>
                  <button className={getButtonStyles(false)}>
                    {secondaryButtonText}
                  </button>
                </>
              ) : (
                <>
                  <motion.button
                    className={getButtonStyles(true)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {primaryButtonText}
                  </motion.button>
                  <motion.button
                    className={getButtonStyles(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {secondaryButtonText}
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Smart Image Rendering Based on Hero Type */}
        {mainImage && (
          <>
            {/* Chip Type - Absolute Positioning */}
            {isChip && (
              <motion.div
                // style={{ y: robotY }}
                className="hidden lg:block absolute right-0 top-20 z-50 -translate-x-2 sm:translate-x-0 md:translate-x-4 lg:translate-x-8 xl:translate-x-12 2xl:translate-x-16 translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-0"
              >
                <div className="sm:block hidden 2xl:max-w-[900px] xl:max-w-[700px] lg:max-w-[650px]">
                  <Image
                    src={mainImage.src}
                    alt={mainImage.alt}
                    width={mainImage.width}
                    height={mainImage.height}
                    className=""
                  />
                </div>
              </motion.div>
            )}

            {/* Innovation Type - Custom Scaling */}
            {isInnovation && (
              <motion.div
                style={{ y: robotY }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`${layoutConfig.imageWidth} z-50 relative ${layoutConfig.imagePadding}`}
              >
                <div className="hidden lg:block relative w-full">
                  <img
                    src={mainImage.src}
                    alt={mainImage.alt}
                    className="w-full 2xl:-mt-24 crisp-edges"
                    style={{
                      imageRendering: "pixelated",
                      scale: 1.9,
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* FullBg Type - Custom Layout */}
            {isFullBg && (
              <motion.div
                style={{ y: robotY }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`${layoutConfig.imageWidth} z-50 relative ${layoutConfig.imagePadding}`}
              >
                <div className="hidden lg:block relative w-full flex justify-center">
                  <img
                    src={mainImage.src}
                    alt={mainImage.alt}
                    className="w-full max-w-[400px] 2xl:max-w-[500px] object-contain"
                  />
                </div>
              </motion.div>
            )}

            {/* Regular Image Container for Robot and other types */}
            {!isInnovation && !isFullBg && (
              <motion.div
                style={{ y: robotY }}
                className={`${layoutConfig.imageWidth} z-50 relative flex justify-end`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="hidden  lg:block relative w-full 2xl:max-w-none lg:max-w-[600px] max-w-[500px]">
                  {/* Show image for mobile on chip type, or always for robot type */}
                  {isRobot && (
                    <img
                      src={mainImage.src}
                      alt={mainImage.alt}
                      width={mainImage.width}
                      // height={mainImage.height}
                      className="w-full object-bottom"
                    />
                  )}

                  {isChip && (
                    <div className="block lg:hidden ">
                      <Image
                        src={mainImage.src}
                        alt={mainImage.alt}
                        width={mainImage.width}
                        height={mainImage.height}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Statistics Cards - Only for Robot Type */}
                  {isRobot && heroData.stats && heroData.stats.length > 0 && (
                    <>
                      {heroData?.stats.map((stat, index) => (
                        <div
                          key={stat.id}
                          style={{
                            animation: "floatUpDown 11s ease-in-out infinite",
                            animationDelay: `${index * 0.5}s`, // Stagger animation
                          }}
                          className={`z-50 font-poppins absolute xs:w-[180px] xs:h-[140px] w-[220px] h-[180px] 2xl:w-[240px] 2xl:h-[200px] 
          ${
            index === 0
              ? "top-6 -right-6 lg:top-14 xl:-right-6"
              : "bottom-0 left-0 lg:bottom-24 lg:-left-14 2xl:bottom-40 2xl:-left-20"
          } 
          bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col`}
                        >
                          <p className="text-5xl 2xl:text-[50px] font-normal 2xl:mt-2 mb-2 text-black">
                            {stat.percentage}
                          </p>
                          <p className="text-[14px] 2xl:text-[16px] mt-2 font-thin text-black/60 leading-snug">
                            {stat.description}
                            <span className="underline cursor-pointer ml-1">
                              Learn More
                            </span>
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* CSS Animation for Statistics Cards */}
      {isRobot && (
        <style jsx>{`
          @keyframes floatUpDown {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      )}
    </motion.section>
  );
};
