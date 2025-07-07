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

  useEffect(() => {
    if (textRef.current) {
      const textElement = textRef.current;
      const textWidth = textElement.scrollWidth;
      const textHeight = textElement.scrollHeight;

      // Calculate required dimensions based on text size
      const minSize = Math.max(textWidth * 1.8, textHeight * 3.5, 222); // Minimum 222px
      const newRadius = (minSize - 12) / 2; // Account for stroke width

      setDimensions({
        width: minSize,
        height: minSize,
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
    <div className="font-sora flex flex-col items-center text-center">
      {/* Container with fixed height for alignment */}
      <div
        className="flex items-center justify-center"
        style={{ height: "300px", width: "300px" }}
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
              className="2xl:text-[46px] lg:text-[36px] text-[36px] font-medium text-black"
              style={{ visibility: "visible" }}
            >
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Description below */}
      <div className="max-w-[400px] px-2">
        <p className="mt-4 text-center 2xl:text-[16px] text-sm text-gray-700 leading-snug break-words">
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
      <Image src={separatorImg} />
    </div>
  );
}

const HowWeWork = () => {
  return (
    <>
      <section className="bg-white max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden">
        <div className="mt-14 px-4 text-black sm:px-8 md:px-12 xl:px-[178px] mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-start justify-between gap-4 lg:gap-8 h-full">
            <CircleProgress
              percentage={30}
              label="30%"
              description="30% of GenAI projects will be abandoned after proof of concept by the end of 2025, due to poor data quality, inadequate risk controls, escalating costs or unclear business value"
            />
            <SeparatorImage />
            <CircleProgress
              percentage={42}
              label="42%"
              description="42% of respondents don't fully understand the benefits of AI & struggle to identify use cases in the workplace"
            />
            <SeparatorImage />
            <CircleProgress
              percentage={77}
              label="77%"
              description="77% of executives surveyed said that true benefits of AI will be recognized when built on trust"
            />
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center">
            <CircleProgress
              percentage={30}
              label="30%"
              description="30% of GenAI projects will be abandoned after proof of concept by the end of 2025, due to poor data quality, inadequate risk controls, escalating costs or unclear business value"
            />
            {/* <SeparatorImage /> */}
            <CircleProgress
              percentage={42}
              label="42%"
              description="42% of respondents don't fully understand the benefits of AI & struggle to identify use cases in the workplace"
            />
            {/* <SeparatorImage /> */}
            <CircleProgress
              percentage={77}
              label="77%"
              description="77% of executives surveyed said that true benefits of AI will be recognized when built on trust"
            />
          </div>
          <div
            style={{
              borderWidth: 1,
              borderColor: "black",
              opacity: 0.2,
              marginTop: 90,
            }}
          />
        </div>

        {/* New Our Solutions Section */}
      </section>
      <section className="bg-white z-10 font-sora overflow-hidden mx-auto">
        <div className="px-4 sm:px-8 md:px-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="flex justify-center 2xl:justify-start">
              <div className="relative">
                <div
                  className=""
                  //   style={{ backgroundColor: "#D9D9D9" }}
                >
                  <div className="relative">
                    <Image
                      src={BenHowWork}
                      alt="AI Solutions Visualization - Digital iceberg showing visible AI solutions above and complex infrastructure below"
                      width={738}
                      height={695}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-5 ">
              {/* Heading with fade-in */}
              <div className="space-y-4">
                {/* <h2 className="text-4xl sm:text-5xl 2xl:text-[60px] lg:text-6xl font-light text-black"></h2> */}
                <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-light text-black -mt-2">
                  How We <span className="font-bold">Work</span>
                </h2>

                <p className="2xl:text-[26px] md:text-xl text-lg 2xl:leading-loose font-semibold">
                  Without the right data, context & expertise, even the most
                  advanced tools fail to deliver real business value...
                </p>
              </div>

              {/* Paragraph from left */}
              <p className="text-black text-base 2xl:text-[18px] font-normal sm:text-lg 2xl:leading-loose">
                “SaaS² flips the traditional model. Instead of just delivering
                software, we provide pre-built Al agents & accelerators tailored
                to specific industries. In the case of Atelic, we decided to
                start with Energy, Financial Services, Healthcare, & the Public
                Sector. But are quickly scaling to meet the challenges of other
                verticals, including Healthcare, Travel, Real Estate & More...”
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
