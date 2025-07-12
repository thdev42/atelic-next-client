"use client";
import React, { useRef } from "react";
import Image from "next/image";

// Assets
import BgShape from "../../../assets/PartnerBg.png";
import Aws from "../../../assets/Aws.png";
import Google from "../../../assets/Google.png";
import IBM from "../../../assets/IBM.png";
import Microsoft from "../../../assets/Microsoft.png";
import Nvidia from "../../../assets/Nvidia.png";
import { useScroll, motion, useTransform } from "framer-motion";
import { API_BASE_URL } from "@/config/config";

export const formatHeading = (text) => {
  if (!text) return null;

  const words = text.trim().split(" ");
  if (words.length === 0) return null;

  const lastWord = words.pop();
  const rest = words.join(" ");

  return (
    <>
      {rest} <span className="font-extrabold">{lastWord}</span>
    </>
  );
};

export const Partners = ({ partners, data }) => {
  const logos = Array?.isArray(data?.logos) ? data?.logos : [];
  // const logos = [Aws, Google, IBM, Microsoft, Nvidia];
  console.log(data, "partners");
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"], // Fixed offset values
  });

  // Fixed transform values - these were causing issues
  const sm = useTransform(scrollYProgress, [0, 1], [-200, 50]);
  const md = useTransform(scrollYProgress, [0, 1], [-120, 50]);
  // const lg = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <motion.section
      ref={container} // Added ref to section for scroll detection
      className={`will-change-transform max-w-[1920px] mx-auto w-full py-10 lg:py-20 relative overflow-hidden`}
      style={{
        backgroundColor: "#f3f3f3",
        // backgroundAttachment:
        //   typeof window !== "undefined" && window.innerWidth <= 768
        //     ? "scroll"
        //     : "fixed",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      }}
    >
      {/* Background Image Left */}
      <motion.div
        // style={{ y: sm }} // Added parallax to background
        className="overflow-hidden will-change-transform absolute inset-0 pointer-events-none select-none"
      >
        <div
          style={{
            backgroundImage: `url(${BgShape.src})`,
            backgroundPosition: "-420px 20px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1184px 900px",
            width: "100%",
            height: "100%",
          }}
        />
      </motion.div>

      <div className="overflow-hidden will-change-transform relative z-10 px-4 sm:px-8 2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto w-full">
        <motion.h2
          style={{ y: md }} // Changed from style={{ md }} to style={{ y: md }}
          className="text-center py-10 text-3xl sm:text-4xl md:text-[41px] 2xl:text-[60px]  font-medium text-black leading-tight mb-10 font-sora"
        >
          {formatHeading(data?.heading)}
        </motion.h2>

        <motion.div
          // style={{ y: lg }} // Added parallax to the logos section as well
          className="overflow-hidden w-full"
          style={{ y: sm }}
        >
          <motion.div
            className="flex gap-8 animate-marquee whitespace-nowrap"
            style={{ y: sm, willChange: "transform" }}
          >
            {Array.isArray(logos) &&
              [...logos, ...logos]?.map((logo, idx) => (
                <motion.div
                  key={idx}
                  alt={`partner-${idx}`}
                  className="inline-flex items-center justify-center my-3 px-8 py-4 min-w-[190px] h-[115.39px] sm:min-w-[207px] sm:h-[135.39px] lg:min-w-[287px] lg:h-[165.39px] bg-[rgba(233,233,233,0.95)] backdrop-blur-sm border border-[rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-white hover:shadow-[3px_4px_9.4px_1px_rgba(0,0,0,0.14)]"
                >
                  <img
                    src={`${API_BASE_URL}${logo?.logo?.url}`}
                    width={logo?.logo?.width}
                    height={logo?.logo?.height}
                    alt={`partner-${idx}`}
                    className="h-[65px] w-auto object-contain"
                  />
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
