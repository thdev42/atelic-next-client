import React, { useState, useEffect, useRef } from "react";

import Image from "next/image";
import cube1 from "../../../assets/Cube1.png";
import cube2 from "../../../assets/Cube2.png";
import cube3 from "../../../assets/Cube3.png";
import { formatHeading } from "../Partners/Partners";
import { API_BASE_URL } from "@/config/config";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

const features = [
  {
    id: "01",
    icon: cube1,
    text: "Meet the customer and understand the problematic areas to address.",
  },
  {
    id: "02",
    icon: cube2,
    text: "Build Business Objectives (with KPIs) we could achieve together.",
  },
  {
    id: "03",
    icon: cube3,
    text: "Translate Business Objective into Technical Objectives.",
  },
  {
    id: "04",
    icon: cube1,
    text: "Meet the customer and understand the problematic areas to address.",
  },
  {
    id: "05",
    icon: cube2,
    text: "Build Business Objectives (with KPIs) we could achieve together.",
  },
  {
    id: "06",
    icon: cube3,
    text: "Translate Business Objective into Technical Objectives.",
  },
];

const Differentiation = ({ sections }) => {
  const features = Array?.isArray(sections?.details) ? sections?.details : [];

  // Mobile slider states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  const totalSlides = features.length;
  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slide for mobile
  useEffect(() => {
    if (!isMobile || features.length === 0) return;

    // const interval = setInterval(() => {
    //   setCurrentSlide((prev) => (prev + 1) % features.length);
    // }, 4000);

    // return () => clearInterval(interval);
  }, [isMobile, features.length]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }

    setTouchEnd(0);
    setTouchStart(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-8 sm:py-10 lg:py-12 xl:py-16 relative overflow-hidden">
      <div className="font-sora px-4 sm:px-6 md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto">
        {/* Title Section */}
        <div className="font-raleway mt-8 sm:mt-12 md:mt-16 lg:mt-20 mb-12 sm:mb-16 lg:mb-20">
          <div className="mx-auto text-center lg:items-center">
            <div>
              <h2
                className={`${headingStyle} font-medium text-black leading-tight`}
              >
                {formatHeading(sections?.heading)}
              </h2>
            </div>
            <div>
              <p
                className={`max-w-5xl mx-auto ${paragraphStyles} text-black 2xl:leading-relaxed pt-9 lg:mt-0`}
              >
                {sections?.subHeading}
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="relative">
          {/* Mobile Slider */}
          {isMobile ? (
            <div className="relative overflow-hidden">
              <div
                ref={sliderRef}
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {features.map((feature, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <div className="group relative w-full bg-white transition-all duration-300 border border-transparent rounded-[10px]">
                      {/* Gradient Border - Always visible on mobile */}
                      <div
                        className="absolute inset-0 rounded-[10px] p-[1px] transition-opacity duration-300 pointer-events-none z-0"
                        style={{
                          background:
                            "linear-gradient(130.05deg, #F21B2A 10.37%, #335F86 49.51%, #F21B2A 94.03%)",
                        }}
                      >
                        <div className="w-full h-full rounded-[10px] bg-white"></div>
                      </div>

                      {/* Card Content */}
                      <div className="relative z-10 p-6 sm:p-7 h-full flex flex-col">
                        {/* Top Icon */}
                        <div className="flex justify-start mb-8 sm:mb-10">
                          <img
                            src={`${API_BASE_URL}${feature?.image?.url}`}
                            alt="Solution Icon"
                            className="max-w-[90px] object-contain"
                          />
                        </div>

                        {/* Index number - Always visible on mobile */}
                        <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-2xl font-medium text-black z-20">
                          0{index + 1}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 flex flex-col justify-end">
                          <p className="text-[14px] text-gray-700 leading-relaxed">
                            {feature.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 mb-1 ${
                      index === currentSlide
                        ? "bg-[#F21B2A] scale-110"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Desktop Grid - Original Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-6 2xl:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative w-full bg-transparent transition-all duration-300 border border-transparent hover:bg-white rounded-[10px]"
                >
                  {/* Gradient Border */}
                  <div
                    className="absolute inset-0 rounded-[10px] p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                    style={{
                      background:
                        "linear-gradient(130.05deg, #F21B2A 10.37%, #335F86 49.51%, #F21B2A 94.03%)",
                    }}
                  >
                    <div className="w-full h-full rounded-[10px] bg-white"></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-6 sm:p-7 md:p-8 h-full flex flex-col">
                    {/* Top Icon */}
                    <div className="flex justify-start mb-8 sm:mb-10 md:mb-12 lg:mb-14">
                      <img
                        src={`${API_BASE_URL}${feature?.image?.url}`}
                        alt="Solution Icon"
                        className="max-w-[90px] 2xl:max-w-none object-contain"
                      />
                    </div>

                    {/* Index number - only on hover */}
                    <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-2xl 2xl:text-4xl font-medium text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      0{index + 1}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 flex flex-col justify-end">
                      <p className=" 2xl:text-[16px] lg:text-[15px] text-[14px] text-gray-700 leading-relaxed">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
