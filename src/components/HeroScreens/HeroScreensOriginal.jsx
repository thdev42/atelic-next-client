"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

// Import all your images - you'll need to add these
// import Robot1 from "../../../assets/AtelicRobot.png";
// import Robot2 from "../../../assets/Robot2.png";
// import Robot3 from "../../../assets/Robot3.png";
// import Robot4 from "../../../assets/Robot4.png";
// import BgPattern1 from "../../../assets/HeroWebRight1.png";
// import BgPattern2 from "../../../assets/HeroWebRight2.png";
// import BgPattern3 from "../../../assets/HeroWebRight3.png";
// import BgPattern4 from "../../../assets/HeroWebRight4.png";
import Robot1 from "../../../assets/AtelicRobot.png";
import BgPattern1 from "../../../assets/HeroWebRight1.png";
import AiChip from "../../../assets/AiChip (2).png";

export const HeroComponent1 = ({ sectionY, backgroundY, robotY, textY }) => (
  <motion.section
    className="max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden min-h-[600px] lg:min-h-[700px] 2xl:min-h-[800px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
      <motion.div
        className="absolute right-0 top-0 translate-x-1/2 2xl:translate-x-1/4 hidden lg:block z-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
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
          className="space-y-5 2xl:space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-black space-y-5 2xl:space-y-10 flex flex-col">
            {["Simplifying AI.", "Building Trust.", "Delivering ROI."].map(
              (text, i) => (
                <motion.span
                  key={i}
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
    className="max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden min-h-[600px] lg:h-[650px] 2xl:h-[730px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
      <motion.div
        className="absolute right-0 -top-32 translate-x-1/2 2xl:translate-x-1/4 hidden lg:block z-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
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
          className="space-y-5 2xl:space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-black flex flex-col space-y-3 2xl:space-y-6">
            {["Simplifying AI.", "Building Trust.", "Delivering ROI."].map(
              (text, i) => (
                <motion.span
                  key={i}
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
            className="2xl:text-[22px] text-base font-sora 2xl:leading-normal text-gray-600 mt-8 2xl:mt-12 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Atelic AI helps enterprises unlock real value from AI by solving
            complex challenges with secure, customized, industry-specific
            solutions.
          </motion.p>

          <motion.div
            className="font-poppins mt-10 flex gap-4 flex-wrap"
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
          <div className="block lg:hidden">
            <Image src={AiChip} alt="AI Robot" className="w-full " />
          </div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

// Hero Component 3 - Innovation Focus
export const HeroComponent3 = ({ sectionY, backgroundY, robotY, textY }) => {
  return (
    <motion.section
      className="max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden min-h-[600px] lg:min-h-[700px] 2xl:min-h-[800px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
        <motion.div
          className="absolute right-0 top-0 translate-x-1/2 2xl:translate-x-1/4 hidden lg:block z-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
            className="space-y-5 2xl:space-y-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-black flex flex-col space-y-3 2xl:space-y-6">
              {["Simplifying AI.", "Building Trust.", "Delivering ROI."].map(
                (text, i) => (
                  <motion.span
                    key={i}
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
              className="2xl:text-[22px] text-base font-sora 2xl:leading-normal text-gray-600 mt-8 2xl:mt-12 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Atelic AI helps enterprises unlock real value from AI by solving
              complex challenges with secure, customized, industry-specific
              solutions.
            </motion.p>

            <motion.div
              className="font-poppins mt-10 flex gap-4 flex-wrap"
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
            <Image src={Robot1} alt="AI Robot" className="w-full" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{ animation: "floatUpDown 11s ease-in-out infinite" }}
              className="font-poppins absolute w-[210px] h-[170px] 2xl:w-[240px] 2xl:h-[190px] bottom-0 left-0 2xl:bottom-40 2xl:-left-20 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col"
            >
              <p className="text-4xl 2xl:text-[50px] font-normal text-black 2xl:mt-2 mb-2">
                42%
              </p>
              <p className="text-xs 2xl:text-[16px] mt-2 font-thin text-black/60 leading-snug">
                of respondents don't fully understand the benefits of AI.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Hero Component 4 - Results Focus
export const HeroComponent4 = ({ sectionY, backgroundY, robotY, textY }) => (
  <>
    <div className="absolute right-0 top-0 translate-x-1/4 hidden lg:block">
      <div className="w-[1282px] h-[915px] bg-gradient-to-br from-orange-100/30 to-red-200/30 rounded-full blur-3xl">
        {/* <Image src={BgPattern4} alt="Background Pattern" width={1282} height={915} /> */}
      </div>
    </div>

    <div className="relative z-10 px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="flex flex-row w-full">
        <motion.div style={{ y: textY }}>
          <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-black space-y-5 2xl:space-y-10 flex flex-col">
            <span>Accelerating Success.</span>
            <span>Driving Results.</span>
            <span className="text-[#F59E0B] font-bold">
              Measuring Value<span className="text-black font-bold">.</span>
            </span>
          </h1>

          <p className="2xl:text-[22px] text-base font-sora 2xl:leading-normal text-gray-600 mt-6 2xl:mt-14 max-w-lg">
            Experience the power of AI that delivers tangible results through
            our proven methodology and industry-leading expertise in machine
            learning.
          </p>

          <div className="font-poppins mt-8 flex gap-4 flex-wrap">
            <button className="text-xs 2xl:text-[16px] bg-[#F59E0B] text-white px-6 py-4 rounded-md hover:bg-[#D97706] transition-all duration-300">
              Measure Results
            </button>
            <button className="text-xs 2xl:text-[16px] bg-[#FFFBEB] text-[#F59E0B] px-6 py-4 rounded-md hover:bg-[#FEF3C7] transition-all duration-300">
              Success Stories
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ y: robotY }}
        className="w-full relative flex justify-end"
      >
        <div className="relative w-full lg:max-w-[600px] max-w-[500px]">
          <div className="w-full h-auto z-10 object-contain">
            <div className="w-full aspect-square bg-gradient-to-br from-orange-200/50 to-red-300/50 rounded-3xl flex items-center justify-center">
              <div className="text-8xl">📊</div>
              {/* <Image src={Robot4} alt="Results Robot" className="w-full h-auto z-10 object-contain" /> */}
            </div>
          </div>

          <div
            style={{ animation: "floatUpDown 11s ease-in-out infinite" }}
            className="font-poppins absolute xs:w-[180px] xs:h-[140px] w-[210px] h-[170px] 2xl:w-[240px] 2xl:h-[190px] top-6 -right-6 lg:top-14 lg:-right-6 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col"
          >
            <p className="text-4xl 2xl:text-[50px] font-normal 2xl:mt-2 mb-2 text-black">
              24/7
            </p>
            <p className="text-xs 2xl:text-[16px] mt-2 font-thin text-black/60 leading-snug">
              AI monitoring and optimization services
            </p>
          </div>

          <div
            style={{ animation: "floatUpDown 11s ease-in-out infinite" }}
            className="font-poppins absolute w-[210px] h-[170px] 2xl:w-[240px] 2xl:h-[190px] bottom-0 left-0 2xl:bottom-40 2xl:-left-20 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col"
          >
            <p className="text-4xl 2xl:text-[50px] font-normal text-black 2xl:mt-2 mb-2">
              99%
            </p>
            <p className="text-xs 2xl:text-[16px] mt-2 font-thin text-black/60 leading-snug">
              uptime guarantee for all deployed solutions
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </>
);
