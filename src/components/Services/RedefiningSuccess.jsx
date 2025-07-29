import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Group1 from "../../../assets/Group1.png";
import { formatHeading } from "../Partners/Partners";
import { API_BASE_URL } from "@/config/config";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

const cardData = [
  {
    id: "01",
    icon: Group1,
    text: "Sales teams that aren't industry experts selling agents that won't work for me",
  },
  {
    id: "02",
    icon: Group1,
    text: "Our data is still silo'd & are unsure of how we can optimize AI performance with the data we have.",
  },
  {
    id: "03",
    icon: Group1,
    text: "We don't have total trust in the potential hallucinations, nor the on-premise requirements to ensure our security is paramount when working with AI Technology.",
  },
  {
    id: "04",
    icon: Group1,
    text: "We are still working with a Franken-Stack of SaaS, Cloud, OTA or legacy systems that won't integrate.",
  },
  {
    id: "05",
    icon: Group1,
    text: "If I do this technology change now, what's to stop it becoming redundant within a year? Isn't the pace of change too quick.",
  },
];

export const RedefiningSuccess = ({ sections }) => {
  const cardData = Array?.isArray(sections?.deatils) ? sections?.deatils : [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  const totalSlides = cardData.length;

  // Touch handlers for mobile swipe
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
    <section className="bg-[#f3f3f3] max-w-[1920px] mx-auto w-full sm:py-10 py-10 relative overflow-hidden">
      <div className="font-sora sm:mt-10 px-4 text-black sm:px-8 md:px-12 lg:px-[100px] 2xl:px-[178px] mx-auto">
        {/* Header Section */}
        <div className="mx-auto max-w-5xl text-center">
          <h1 className={`${headingStyle} font-normal`}>
            {formatHeading(sections?.heading)}
          </h1>
          <p
            className={`lg:max-w-3xl 2xl:max-w-none ${paragraphStyles} lg:leading-loose mt-4 leading-relaxed mx-auto`}
          >
            {sections?.subHeading}
          </p>
        </div>

        {/* Card Section - Desktop Grid (unchanged) */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 2xl:py-14 py-10 justify-items-center">
          {cardData.map((item, index) => (
            <div
              key={index}
              className="group w-full max-w-[499px] 2xl:min-h-[367px] bg-white rounded-md shadow-sm transition-all duration-300 hover:bg-[#335F86] text-black hover:text-white relative flex flex-col justify-between items-center text-center px-5 py-7 2xl:px-6 2xl:py-8"
            >
              {/* Card Number */}
              <span className="absolute top-4 right-4 text-lg font-light">
                0{index + 1}
              </span>

              {/* Icon Section */}
              <div className="group flex flex-col items-center flex-shrink-0">
                <div className="w-[124px] h-[124px] max-w-[90px] 2xl:max-w-none flex items-center justify-center transition-colors duration-300 rounded-full relative">
                  {/* Default image */}
                  <img
                    src={`${API_BASE_URL}${item?.image?.url}`}
                    alt={`icon-${item.id}`}
                    width={124}
                    height={124}
                    className="absolute inset-0 object-contain group-hover:opacity-0 transition-opacity duration-300"
                  />

                  {/* Hover image */}
                  <img
                    src={`${API_BASE_URL}${item?.hoverImage?.url}`}
                    alt={`icon-hover-${item.id}`}
                    width={124}
                    height={124}
                    className="absolute inset-0 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="w-20 h-[3px] mt-4 bg-[#335F86] group-hover:bg-white transition-colors duration-300" />
              </div>

              {/* Text Section */}
              <div className="flex-1 flex items-center justify-center">
                <p className="2xl:text-[16px] lg:text-[15px] text-[14px] font-light leading-loose mt-3">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider Section */}
        <div className="sm:hidden 2xl:py-14 ">
          {/* Slider Container */}
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={sliderRef}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {cardData.map((item, index) => (
                <div key={index} className="w-full mt-6 flex-shrink-0 px-2">
                  <div className="group w-full max-w-[499px] 2xl:min-h-[367px] bg-white rounded-md shadow-sm transition-all duration-300 hover:bg-[#335F86] text-black hover:text-white relative flex flex-col justify-between items-center text-center px-5 py-7 2xl:px-6 2xl:py-8 mx-auto">
                    {/* Card Number */}
                    <span className="absolute top-4 right-4 text-lg font-light">
                      0{index + 1}
                    </span>

                    {/* Icon Section */}
                    <div className="group flex flex-col items-center flex-shrink-0">
                      <div className="w-[124px] h-[124px] max-w-[90px] 2xl:max-w-none flex items-center justify-center transition-colors duration-300 rounded-full relative">
                        {/* Default image */}
                        <img
                          src={`${API_BASE_URL}${item?.image?.url}`}
                          alt={`icon-${item.id}`}
                          width={124}
                          height={124}
                          className="absolute inset-0 object-contain group-hover:opacity-0 transition-opacity duration-300"
                        />

                        {/* Hover image */}
                        <img
                          src={`${API_BASE_URL}${item?.hoverImage?.url}`}
                          alt={`icon-hover-${item.id}`}
                          width={124}
                          height={124}
                          className="absolute inset-0 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>

                      <div className="w-20 h-[3px] mt-4 bg-[#335F86] group-hover:bg-white transition-colors duration-300" />
                    </div>

                    {/* Text Section */}
                    <div className="flex-1 flex items-center justify-center">
                      <p className="2xl:text-[16px] lg:text-[15px] text-[14px] font-light leading-loose mt-3">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center mt-6 px-4">
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {cardData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? "bg-[#335F86]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
