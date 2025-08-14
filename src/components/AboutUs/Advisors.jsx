"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Amanda from "../../../assets/Amanda.jpg";
import Richard from "../../../assets/Richard.jpg";
import Natalie from "../../../assets/Natalie.jpg";
import James from "../../../assets/James.jpg";
import Lena from "../../../assets/Lena.jpg";
import Victor from "../../../assets/Victor.jpg";

import InstagramIcon from "../../../assets/Insta.png";
import LinkedinIcon from "../../../assets/Linkedin.png";
import XIcon from "../../../assets/Twitter.png";
import { API_BASE_URL } from "@/config/config";

const iconMap = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
};

const advisors = [
  {
    name: "Dr. Amanda Fields",
    title: "Tech Strategy Advisor",
    description:
      "With over 20 years in AI and enterprise systems, Amanda provides strategic direction for emerging tech innovation.",
    image: Amanda,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "Richard Voss",
    title: "Finance & Growth Advisor",
    description:
      "A seasoned VC partner, Richard helps guide financial planning and long-term growth strategies.",
    image: Richard,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "Natalie Chen",
    title: "Product & UX Advisor",
    description:
      "Former Head of Design at a Fortune 500 firm, Natalie offers deep insight into user experience and product development.",
    image: Natalie,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "James Ortega",
    title: "Global Expansion Advisor",
    description:
      "With a background in international business, James advises on scaling operations and entering new markets.",
    image: James,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "Lena Hoffman",
    title: "Legal & Compliance Advisor",
    description:
      "An expert in tech law and regulatory compliance, Lena ensures we grow with integrity and trust.",
    image: Lena,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "Victor Raymond",
    title: "Innovation & R&D Advisor",
    description:
      "A thought leader in emerging technologies, Victor guides our research and development strategy to stay ahead of the curve.",
    image: Victor,
    socials: ["instagram", "linkedin", "x"],
  },
];

export const Advisors = ({ sections }) => {
  const advisors = Array.isArray(sections?.teamMembers)
    ? sections?.teamMembers
    : [];

  console.log(sections, "ABOUT US SECTION");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 75; // Increased threshold
    const isRightSwipe = distance < -75; // Increased threshold

    if (isLeftSwipe && currentSlide < advisors.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }

    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="font-sora relative bg-[#E8E8E8] text-black w-full max-w-[1920px] mx-auto overflow-hidden py-16">
      <div className="2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 text-left">
        <h2 className="text-4xl md:text-5xl font-light">
          {sections?.heading?.map((part, index) => (
            <span
              key={part.id || index}
              className={`${part.color === "black" ? "text-black" : ""} ${
                index === sections.heading.length - 1 ? "font-bold" : ""
              }`}
            >
              {part.text}
              {part.breakAfter ? <br /> : " "}
            </span>
          ))}
        </h2>

        <p className="text-gray-600 mt-4 max-w-3xl">{sections?.subHeading}</p>

        {/* Desktop Grid */}
        <div className="mt-16 hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisors.map((advisor, index) => (
            <motion.div
              key={index}
              whileHover={{ backgroundColor: "#ffffff" }}
              className="w-full max-w-[496px] h-auto bg-[#E8E8E8] border border-black/50 hover:border-white hover:shadow-md rounded-[29px] p-6 mx-auto flex flex-col items-start justify-start text-left transition-all duration-100"
            >
              <div className="space-y-5">
                <div className="w-full flex items-center justify-between mb-4">
                  <img
                    src={`${API_BASE_URL}${advisor?.image?.url}`}
                    alt={advisor?.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="flex gap-3">
                    <a
                      href={advisor?.linkedInUrl || "#"}
                      {...(advisor?.linkedInUrl && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      <img
                        src={`${API_BASE_URL}${advisor?.icons?.logo?.url}`}
                        // alt={social}
                        width={26}
                        height={26}
                        className="opacity-100 mix-blend-luminosity hover:opacity-100 transition-opacity duration-200"
                      />
                    </a>
                  </div>
                </div>
                <h3 className="font-medium text-lg mt-1">{advisor.name}</h3>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {advisor.title}
                </p>
                <p className="text-sm text-gray-700 mt-3">
                  {advisor.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="mt-16 lg:hidden">
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden"
          >
            <div
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {advisors.map((advisor, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="w-full max-w-[496px]  bg-white border border-white shadow-md rounded-[29px] p-6 mx-auto flex flex-col items-start justify-start text-left">
                    <div className="">
                      <div className="w-full flex items-center justify-between mb-4">
                        <img
                          src={`${API_BASE_URL}${advisor?.image?.url}`}
                          alt={advisor?.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                        <div className="flex gap-3">
                          <a
                            href={advisor?.linkedInUrl || "#"}
                            {...(advisor?.linkedInUrl && {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            })}
                          >
                            <img
                              src={`${API_BASE_URL}${advisor?.icons?.logo?.url}`}
                              // alt={social}
                              width={26}
                              height={26}
                              className="opacity-100 mix-blend-luminosity"
                            />
                          </a>
                        </div>
                      </div>
                      <h3 className="font-medium text-lg mt-1">
                        {advisor.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        {advisor.title}
                      </p>
                      <p className="text-sm text-gray-700 mt-3">
                        {advisor.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {advisors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-600 scale-110"
                      : "bg-gray-300"
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
