import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// import Image from "next/image";
import Blogs1 from "../../../assets/Blogs1.jpg";
import Blogs2 from "../../../assets/Blogs2.jpg";
import Blogs3 from "../../../assets/Blogs3.jpg";
import icon from "../../../assets/icon.png";
import { API_BASE_URL } from "@/config/config";

const blogData = [
  {
    id: 1,
    title: "Tackling Bias & Hallucinations in AI",
    category: "Information Technology",
    description:
      "Large Language Models (LLMs) have revolutionized the way machines understand and generate human language.",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    image: Blogs1,
    avatar: icon,
  },
  {
    id: 2,
    title: "Tackling Bias & Hallucinations in AI",
    category: "Information Technology",
    description:
      "Large Language Models (LLMs) have revolutionized the way machines understand and generate human language.",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    image: Blogs2,
    avatar: icon,
  },
  {
    id: 3,
    title: "Tackling Bias & Hallucinations in AI",
    category: "Information Technology",
    description:
      "Large Language Models (LLMs) have revolutionized the way machines understand and generate human language.",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    image: Blogs3,
    avatar: icon,
  },
  {
    id: 4,
    title: "Tackling Bias & Hallucinations in AI",
    category: "Information Technology",
    description:
      "Large Language Models (LLMs) have revolutionized the way machines understand and generate human language.",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    image: Blogs1,
    avatar: icon,
  },
  {
    id: 5,
    title: "Tackling Bias & Hallucinations in AI",
    category: "Information Technology",
    description:
      "Large Language Models (LLMs) have revolutionized the way machines understand and generate human language.",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    image: Blogs2,
    avatar: icon,
  },
  {
    id: 6,
    title: "Tackling Bias & Hallucinations in AI",
    category: "Information Technology",
    description:
      "Large Language Models (LLMs) have revolutionized the way machines understand and generate human language.",
    author: "Olivia Rhye",
    date: "20 Jan 2022",
    image: Blogs3,
    avatar: icon,
  },
];

const Blogs = ({ sections }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const blogData = Array?.isArray(sections?.details) ? sections?.details : [];

  // Update slides to show based on screen size
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1); // Mobile: 1 slide
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2); // Tablet: 2 slides
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(2); // Large screens: 2 slides
      } else {
        setSlidesToShow(3); // Extra large screens: 3 slides
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - slidesToShow < 0
        ? Math.max(0, blogData.length - slidesToShow)
        : prev - slidesToShow
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + slidesToShow >= blogData.length ? 0 : prev + slidesToShow
    );
  };

  const visibleSlides = blogData.slice(
    currentIndex,
    currentIndex + slidesToShow
  );

  // Check if buttons should be disabled
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + slidesToShow >= blogData.length;

  return (
    <section className="font-raleway relative bg-[#f3f0f1] text-black w-full max-w-[1920px] mx-auto overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="px-4 sm:px-6 md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8">
          Our <span className="font-bold text-black">Blogs</span>
        </h2>

        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 lg:-left-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md transition-all duration-200 flex items-center justify-center -ml-4 sm:-ml-5 ${
              isPrevDisabled
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-white hover:bg-gradient-to-br hover:from-[#F21B2A] hover:to-[#335F86] hover:scale-110 group"
            }`}
            disabled={isPrevDisabled}
          >
            <ChevronLeft
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isPrevDisabled
                  ? "text-gray-500"
                  : "text-black group-hover:text-white"
              }`}
            />
          </button>

          {/* Slides Container */}
          <div className="flex gap-3 sm:gap-4 lg:gap-6 justify-center overflow-hidden px-6 sm:px-8">
            {visibleSlides.map((item) => (
              <div
                key={item.id}
                className="flex-1 min-w-0 w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[492px] shadow-[0px_4px_6px_-2px_#10182808,0px_12px_16px_-4px_#10182814] bg-white rounded-xl overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[492/240] w-full overflow-hidden">
                  <img
                    src={`${API_BASE_URL}${item.image.url}`}
                    alt={item?.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 lg:p-5 flex flex-col gap-2 flex-1">
                  <p className="text-xs sm:text-sm text-purple-700 font-medium">
                    {item?.category}
                  </p>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 line-clamp-2">
                    {item?.title} <sup className="text-xs">↗</sup>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 flex-1">
                    {item?.description}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-2 mt-auto pt-2 sm:pt-4">
                    <img
                      src={`${API_BASE_URL}${item?.avatar?.url}`}
                      alt={item?.author}
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gray-300 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                        {item?.author}
                      </p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className={`absolute right-0 lg:-right-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[0px_4px_60px_0px_#00000008] backdrop-blur-md transition-all duration-200 flex items-center justify-center -mr-4 sm:-mr-5 ${
              isNextDisabled
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-white hover:bg-gradient-to-br hover:from-[#F21B2A] hover:to-[#335F86] hover:scale-110 group"
            }`}
            disabled={isNextDisabled}
          >
            <ChevronRight
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isNextDisabled
                  ? "text-gray-500"
                  : "text-black group-hover:text-white"
              }`}
            />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-2 justify-center items-center pt-8 mb-8">
          {Array.from({
            length: Math.ceil(blogData.length / slidesToShow),
          }).map((_, index) => {
            const isActive = Math.floor(currentIndex / slidesToShow) === index;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * slidesToShow)}
                className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive && "w-[21px] h-[21px] border-[#335F86]"
                }`}
                style={{ borderWidth: 1 }}
              >
                <div
                  className={`rounded-full ${
                    isActive ? "bg-[#335F86]" : "bg-[#335F86] hover:bg-gray-400"
                  } w-[9px] h-[9px]`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
