"use client";

import React, { useEffect, useRef, useState } from "react";

import separatorImg from "../../../assets/separator.png";
import BenHowWork from "../../../assets/BenHowWork.png";
import Image from "next/image";
import { API_BASE_URL } from "@/config/config";
import { formatHeading } from "../Partners/Partners";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

function CircleProgress({ percentage, label, description }) {
  const [dimensions, setDimensions] = useState({
    width: 222,
    height: 222,
    radius: 105,
  });
  const circumference = 2 * Math.PI * dimensions.radius;

  const [offset, setOffset] = useState(circumference);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (textRef.current && containerRef.current) {
        const textElement = textRef.current;
        const textWidth = textElement.scrollWidth;
        const textHeight = textElement.scrollHeight;

        // Get container width to determine available space
        const containerWidth = containerRef.current.offsetWidth;

        // Calculate base size based on screen size
        let baseSize;
        if (window.innerWidth >= 1536) {
          // 2xl
          baseSize = 220;
        } else if (window.innerWidth >= 1280) {
          // xl
          baseSize = 190;
        } else if (window.innerWidth >= 1024) {
          // lg
          baseSize = 22;
        } else if (window.innerWidth >= 768) {
          // md
          baseSize = 22;
        } else if (window.innerWidth >= 640) {
          // sm
          baseSize = 22;
        } else {
          // xs
          baseSize = 22;
        }

        // Calculate required dimensions based on text size
        const minSize = Math.max(textWidth * 1.8, textHeight * 3.5, baseSize);

        // Ensure it doesn't exceed container width but maintain minimum size
        const maxSize = Math.max(Math.min(minSize, containerWidth - 20), 175);

        const newRadius = (maxSize - 12) / 2; // Account for stroke width

        setDimensions({
          width: maxSize,
          height: maxSize,
          radius: newRadius,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [label]);

  useEffect(() => {
    const circumference = 2 * Math.PI * dimensions.radius;
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(circumference);
    setTimeout(() => setOffset(progressOffset), 300);
  }, [percentage, dimensions.radius]);

  const center = dimensions.width / 2;

  return (
    <div
      className="font-sora flex flex-col items-center text-center"
      ref={containerRef}
    >
      {/* Container with responsive height for alignment */}
      <div
        className="flex items-center max-w-7xl justify-center 2xl:h-[300px] lg:h-[250px]"
        style={{
          // height: "300px",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <div
          className="relative"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <svg
            width={dimensions.width}
            height={dimensions.height}
            className="rotate-[-90deg] scale-y-[-1]"
          >
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={dimensions.radius}
              stroke="#e5e7eb"
              strokeWidth="2"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx={center}
              cy={center}
              r={dimensions.radius}
              stroke="#F21B2A"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="scaleX(-1)"
              style={{
                transition: "stroke-dashoffset 1s ease-in-out",
              }}
            />
          </svg>

          {/* Centered label inside the circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              ref={textRef}
              className="2xl:text-[46px] lg:text-[37px] md:text-[30px] sm:text-[28px] text-[24px] font-light text-black"
              style={{ visibility: "visible" }}
            >
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Description below */}
      <div className="max-w-[600px] px-2">
        <p className=" text-center 2xl:text-[16px] lg:text-[14px] md:text-[13px] lg:mt-0 mt-3 text-sm text-gray-700 leading-snug break-words">
          {description}
        </p>
      </div>
    </div>
  );
}

function SeparatorImage() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "300px" }}
    >
      <Image
        src={separatorImg}
        className="2xl:w-[180px] xl:w-[150px] lg:w-[140px] md:w-[50px] w-[40px] h-auto object-contain"
        alt="Separator"
      />
    </div>
  );
}

const HowWeWork = ({ sections }) => {
  const servicesProgress = sections?.[0];
  const servicesWork = sections?.[1];

  console.log(servicesProgress, "SERVICES PROGRESS");
  return (
    <>
      <section className="bg-white mx-auto w-full py-8  lg:py-12 xl:py-16 2xl:py-20 relative overflow-hidden">
        <div className="px-4 sm:px-6 md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-start justify-between gap-6 xl:gap-8 2xl:gap-12 h-full">
            {servicesProgress?.details?.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="flex-1 max-w-[220px] lg:max-w-[220px] 2xl:max-w-[380px]">
                  <CircleProgress
                    percentage={parseInt(item.percentage)}
                    label={item.percentage}
                    description={item.description}
                  />
                </div>
                {index < servicesProgress.details.length - 1 && (
                  <div className="flex-shrink-0">
                    <SeparatorImage />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {servicesProgress?.details?.map((item, index) => (
              <React.Fragment key={item.id}>
                <CircleProgress
                  percentage={parseInt(item.percentage)}
                  label={item.percentage}
                  description={item.description}
                />
              </React.Fragment>
            ))}
          </div>

          <div className="md:block hidden w-full h-[1px] bg-black opacity-20 mt-12 lg:mt-16 xl:mt-20 2xl:mt-24" />
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="bg-white z-10 font-sora overflow-hidden mx-auto relative">
        <div className="px-4 sm:px-8 md:px-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content - Shows first on mobile, second on lg+ */}
            <div className="space-y-5 lg:relative mb-5 md:mb-16 lg:z-0 lg:ml-8 xl:ml-12 2xl:ml-16 text-center mt-9 lg:mt-0  lg:text-left lg:order-2">
              {/* Heading with fade-in */}
              <div className="space-y-4">
                <h2 className={`${headingStyle} font-light text-black -mt-2`}>
                  {formatHeading(servicesWork?.heading)}
                </h2>

                <p
                  className={`lg:leading-loose ${paragraphStyles} 2xl:leading-loose font-semibold`}
                >
                  {servicesWork?.subHeading}
                </p>
              </div>

              {/* Paragraph from left */}
              <p
                className={`${paragraphStyles} text-black lg:leading-loose font-normal 2xl:leading-loose`}
              >
                {servicesWork?.description}
              </p>

              {/* Button from left */}
            </div>

            {/* Image - Shows second on mobile, first on lg+ */}
            <div className="flex justify-center 2xl:justify-start lg:relative lg:min-h-[600px] xl:min-h-[650px] 2xl:min-h-[695px] lg:order-1">
              <div className="relative lg:absolute lg:-left-8 xl:-left-12 2xl:-left-16 lg:top-0 lg:z-10 lg:w-[600px] xl:w-[650px] 2xl:w-[738px] lg:h-[600px] xl:h-[650px] 2xl:h-[695px] ">
                <img
                  src={`${API_BASE_URL}${servicesWork?.image?.url}`}
                  alt="AI Solutions Visualization - Digital iceberg showing visible AI solutions above and complex infrastructure below"
                  width={738}
                  height={695}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowWeWork;
