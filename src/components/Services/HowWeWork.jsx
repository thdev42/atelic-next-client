"use client";

import React, { useEffect, useRef, useState } from "react";

import separatorImg from "../../../assets/separator.png";
import BenHowWork from "../../../assets/BenHowWork.png";
import Image from "next/image";

function CircleProgress({ percentage, label, description }) {
  const [dimensions, setDimensions] = useState({
    width: 200,
    height: 200,
    radius: 90,
  });
  const circumference = 2 * Math.PI * dimensions.radius;

  const [offset, setOffset] = useState(circumference);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const textElement = textRef.current;
      const textWidth = textElement.scrollWidth;
      const textHeight = textElement.scrollHeight;

      // Responsive sizing based on screen size
      const minSize = Math.max(textWidth * 1.5, textHeight * 3, 180);
      const maxSize = window.innerWidth < 1024 ? 220 : 240; // Smaller on mobile/tablet
      const finalSize = Math.min(minSize, maxSize);
      const newRadius = (finalSize - 12) / 2;

      setDimensions({
        width: finalSize,
        height: finalSize,
        radius: newRadius,
      });
    }
  }, [label]);

  useEffect(() => {
    const circumference = 2 * Math.PI * dimensions.radius;
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(circumference);
    setTimeout(() => setOffset(progressOffset), 300);
  }, [percentage, dimensions.radius]);

  const center = dimensions.width / 2;

  return (
    <div className="font-sora flex flex-col items-center text-center w-full max-w-[280px] mx-auto">
      {/* Container with responsive height */}
      <div className="flex items-center justify-center w-full h-[250px] sm:h-[280px] lg:h-[300px]">
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
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-medium text-black"
              style={{ visibility: "visible" }}
            >
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Description below */}
      <div className="w-full max-w-[280px] px-2">
        <p className="mt-2 text-center text-sm lg:text-base xl:text-[16px] text-gray-700 leading-snug break-words">
          {description}
        </p>
      </div>
    </div>
  );
}

function SeparatorImage() {
  return (
    <div className="flex items-center justify-center h-[250px] sm:h-[280px] lg:h-[300px] w-full max-w-[80px] mx-auto">
      <Image
        src={separatorImg}
        alt="Separator"
        className="w-auto h-auto max-h-[200px] object-contain"
      />
    </div>
  );
}

const HowWeWork = () => {
  return (
    <>
      <section className="bg-white max-w-[1920px] mx-auto w-full py-8 lg:py-12 xl:py-16 relative overflow-hidden">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[178px] mx-auto">
          {/* Desktop Layout - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-start justify-between gap-6 xl:gap-8 2xl:gap-12 h-full">
            <div className="flex-1 max-w-[320px]">
              <CircleProgress
                percentage={30}
                label="30%"
                description="30% of GenAI projects will be abandoned after proof of concept by the end of 2025, due to poor data quality, inadequate risk controls, escalating costs or unclear business value"
              />
            </div>
            <div className="flex-shrink-0">
              <SeparatorImage />
            </div>
            <div className="flex-1 max-w-[320px]">
              <CircleProgress
                percentage={42}
                label="42%"
                description="42% of respondents don't fully understand the benefits of AI & struggle to identify use cases in the workplace"
              />
            </div>
            <div className="flex-shrink-0">
              <SeparatorImage />
            </div>
            <div className="flex-1 max-w-[320px]">
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
          <div className="w-full h-[1px] bg-black opacity-20 mt-12 lg:mt-16 xl:mt-20" />
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="bg-white max-w-[1920px] z-10 font-sora overflow-hidden mx-auto py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[178px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] xl:grid-cols-[40%_60%] 2xl:grid-cols-[35%_65%] gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 items-center">
            {/* Left Column - Image */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-[500px] sm:max-w-[600px] md:max-w-[650px] lg:max-w-none">
                <Image
                  src={BenHowWork}
                  alt="AI Solutions Visualization - Digital iceberg showing visible AI solutions above and complex infrastructure below"
                  width={738}
                  height={695}
                  priority
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-0 sm:space-y-0 md:space-y-0 lg:space-y-0 2xl:space-y-12 order-1 lg:order-2 max-w-[800px] lg:max-w-full">
              {/* Heading */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-4 xl:space-y-5 2xl:space-y-6">
                <h2 className="text-3xl lg:text-4xl 2xl:text-[60px] font-light text-black leading-tight lg:leading-tight xl:leading-tight 2xl:leading-tight max-w-[600px] lg:max-w-full">
                  How We <span className="font-bold">Work</span>
                </h2>

                <p className="text-sm lg:text-lg 2xl:text-[26px] font-semibold text-black leading-relaxed xl:leading-relaxed 2xl:leading-loose max-w-[650px] lg:max-w-full">
                  Without the right data, context & expertise, even the most
                  advanced tools fail to deliver real business value...
                </p>
              </div>

              {/* Description paragraph */}
              <div className="pt-2 sm:pt-3 md:pt-4 lg:pt-2 xl:pt-3 2xl:pt-4">
                <p className="text-xs  md:text-xs 2xl:text-[18px] font-normal text-black leading-relaxed lg:leading-relaxed xl:leading-relaxed 2xl:leading-loose max-w-[700px] lg:max-w-full">
                  "SaaS² flips the traditional model. Instead of just delivering
                  software, we provide pre-built Al agents & accelerators
                  tailored to specific industries. In the case of Atelic, we
                  decided to start with Energy, Financial Services, Healthcare,
                  & the Public Sector. But are quickly scaling to meet the
                  challenges of other verticals, including Healthcare, Travel,
                  Real Estate & More..."
                </p>
              </div>

              {/* Button */}
              <div className="pt-4 sm:pt-5 md:pt-6 lg:pt-4 xl:pt-5 2xl:pt-6">
                <button className="bg-[#335F86] hover:bg-slate-700 text-white text-xs  2xl:text-base px-6 sm:px-7 md:px-8 lg:px-6 xl:px-8 2xl:px-9 py-3 sm:py-3 md:py-3 lg:py-2.5 xl:py-3 2xl:py-3 rounded-lg font-light transition-colors duration-200 w-full sm:w-auto 2xl:min-w-[200px]">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowWeWork;
