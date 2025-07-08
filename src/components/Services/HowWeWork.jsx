"use client";

import React, { useEffect, useRef, useState } from "react";

import separatorImg from "../../../assets/separator.png";
import BenHowWork from "../../../assets/BenHowWork.png";
import Image from "next/image";

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
          baseSize = 222;
        } else if (window.innerWidth >= 1280) {
          // xl
          baseSize = 200;
        } else if (window.innerWidth >= 1024) {
          // lg
          baseSize = 180;
        } else if (window.innerWidth >= 768) {
          // md
          baseSize = 170;
        } else if (window.innerWidth >= 640) {
          // sm
          baseSize = 180;
        } else {
          // xs
          baseSize = 170;
        }

        // Calculate required dimensions based on text size
        const minSize = Math.max(textWidth * 1.8, textHeight * 3.5, baseSize);

        // Ensure it doesn't exceed container width but maintain minimum size
        const maxSize = Math.max(Math.min(minSize, containerWidth - 20), 170);

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
        className="flex items-center justify-center"
        style={{
          height: "300px",
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
              className="2xl:text-[46px] xl:text-[40px] lg:text-[36px] md:text-[32px] sm:text-[28px] text-[24px] font-medium text-black"
              style={{ visibility: "visible" }}
            >
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Description below */}
      <div className="max-w-[400px] px-2">
        <p className="mt-4 text-center 2xl:text-[16px] lg:text-[14px] md:text-[13px] text-sm text-gray-700 leading-snug break-words">
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
        className="2xl:w-auto xl:w-[150px] lg:w-[140px] md:w-[50px] w-[40px] h-auto object-contain"
        alt="Separator"
      />
    </div>
  );
}

const HowWeWork = () => {
  return (
    <>
      <section className="bg-white max-w-[1920px] mx-auto w-full py-8 lg:py-12 xl:py-16 2xl:py-20 relative overflow-hidden">
        <div className="px-4 sm:px-6 md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto">
          {/* Desktop Layout - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-start justify-between gap-6 xl:gap-8 2xl:gap-12 h-full">
            <div className="flex-1 max-w-[320px] xl:max-w-[340px] 2xl:max-w-[380px]">
              <CircleProgress
                percentage={30}
                label="30%"
                description="30% of GenAI projects will be abandoned after proof of concept by the end of 2025, due to poor data quality, inadequate risk controls, escalating costs or unclear business value"
              />
            </div>
            <div className="flex-shrink-0">
              <SeparatorImage />
            </div>
            <div className="flex-1 max-w-[320px] xl:max-w-[340px] 2xl:max-w-[380px]">
              <CircleProgress
                percentage={42}
                label="42%"
                description="42% of respondents don't fully understand the benefits of AI & struggle to identify use cases in the workplace"
              />
            </div>
            <div className="flex-shrink-0">
              <SeparatorImage />
            </div>
            <div className="flex-1 max-w-[320px] xl:max-w-[340px] 2xl:max-w-[380px]">
              <CircleProgress
                percentage={77}
                label="77%"
                description="77% of executives surveyed said that true benefits of AI will be recognized when built on trust"
              />
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-8">
            <CircleProgress
              percentage={30}
              label="30%"
              description="30% of GenAI projects will be abandoned after proof of concept by the end of 2025, due to poor data quality, inadequate risk controls, escalating costs or unclear business value"
            />
            <div className="flex justify-center">
              <div className="w-full max-w-[200px] h-[1px] bg-gray-300"></div>
            </div>
            <CircleProgress
              percentage={42}
              label="42%"
              description="42% of respondents don't fully understand the benefits of AI & struggle to identify use cases in the workplace"
            />
            <div className="flex justify-center">
              <div className="w-full max-w-[200px] h-[1px] bg-gray-300"></div>
            </div>
            <CircleProgress
              percentage={77}
              label="77%"
              description="77% of executives surveyed said that true benefits of AI will be recognized when built on trust"
            />
          </div>

          {/* Separator line */}
          <div className="w-full h-[1px] bg-black opacity-20 mt-12 lg:mt-16 xl:mt-20 2xl:mt-24" />
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="bg-white z-10 font-sora overflow-hidden mx-auto relative">
        <div className="px-4 sm:px-8 md:px-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Image (Absolute Positioned) */}
            <div className="flex justify-center 2xl:justify-start lg:relative lg:min-h-[600px] xl:min-h-[650px] 2xl:min-h-[695px]">
              <div className="relative lg:absolute lg:-left-8 xl:-left-12 2xl:-left-16 lg:top-0 lg:z-10 lg:w-[600px] xl:w-[650px] 2xl:w-[738px] lg:h-[600px] xl:h-[650px] 2xl:h-[695px]">
                <Image
                  src={BenHowWork}
                  alt="AI Solutions Visualization - Digital iceberg showing visible AI solutions above and complex infrastructure below"
                  width={738}
                  height={695}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-5 lg:relative lg:z-0 lg:ml-8 xl:ml-12 2xl:ml-16">
              {/* Heading with fade-in */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-light text-black -mt-2">
                  How We <span className="font-bold">Work</span>
                </h2>

                <p className="lg:leading-loose 2xl:text-[26px] md:text-xl text-lg 2xl:leading-loose font-semibold">
                  Without the right data, context & expertise, even the most
                  advanced tools fail to deliver real business value...
                </p>
              </div>

              {/* Paragraph from left */}
              <p className="text-black 2xl:text-[18px] lg:text-sm lg:leading-loose font-normal 2xl:leading-loose">
                "SaaS² flips the traditional model. Instead of just delivering
                software, we provide pre-built Al agents & accelerators tailored
                to specific industries. In the case of Atelic, we decided to
                start with Energy, Financial Services, Healthcare, & the Public
                Sector. But are quickly scaling to meet the challenges of other
                verticals, including Healthcare, Travel, Real Estate & More..."
              </p>

              {/* Button from left */}
              <button className="bg-[#335F86] hover:bg-slate-700 text-[16px] text-white px-9 2xl:w-[200px] py-3 rounded-[8px] font-light transition-colors duration-200">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowWeWork;
