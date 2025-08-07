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
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const blogData = Array?.isArray(sections?.details) ? sections?.details : [];

  // Update slides to show based on screen size
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
        setIsMobile(false);
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(2);
        setIsMobile(false);
      } else {
        setSlidesToShow(3);
        setIsMobile(false);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev - slidesToShow < 0
        ? Math.max(0, blogData.length - slidesToShow)
        : prev - slidesToShow
    );
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev + slidesToShow >= blogData.length ? 0 : prev + slidesToShow
    );
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex + slidesToShow < blogData.length) {
      nextSlide();
    }
    if (isRightSwipe && currentIndex > 0) {
      prevSlide();
    }
  };

  const visibleSlides = blogData.slice(
    currentIndex,
    currentIndex + slidesToShow
  );

  // Check if buttons should be disabled
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + slidesToShow >= blogData.length;

  return (
    <section className="font-raleway relative bg-[#f3f0f1] text-black w-full max-w-[1920px] mx-auto overflow-hidden pb-16">
      <div className="lg:px-[100px] 2xl:px-[178px] mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl xl:text-5xl 2xl:text-[60px] font-normal mb-6 sm:mb-16">
          Our <span className="font-bold text-black">Blogs</span>
        </h2>

        <div className="relative">
          {/* Previous Button - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 sm:left-4 md:left-8 lg:left-2 xl:-left-5 2xl:-left-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md transition-all duration-200 flex items-center justify-center ${
              isMobile ? "hidden" : ""
            } ${
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

          {/* Slides Container with touch support */}
          <div
            className={`flex gap-3 sm:gap-4 lg:gap-6 max-w-none justify-center overflow-hidden px-4 sm:px-16 md:px-20 lg:px-16 xl:px-12 2xl:px-8 transition-all duration-300 ease-in-out ${
              isTransitioning ? "transform" : ""
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              touchAction: isMobile ? "pan-y" : "auto",
              userSelect: "none",
            }}
          >
            {visibleSlides.map((item) => (
              <div
                key={item?.id}
                className={`flex-1 min-w-0 w-full max-w-none sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[492px] shadow-[0px_4px_6px_-2px_#10182808,0px_12px_16px_-4px_#10182814] bg-white rounded-xl overflow-hidden flex flex-col transform transition-all duration-300 ease-in-out ${
                  isTransitioning
                    ? "scale-95 opacity-90"
                    : "scale-100 opacity-100"
                }`}
              >
                <a
                  href={`/news/blogs/${item?.handle}`}
                  className="cursor-pointer"
                >
                  <div>
                    {/* Image */}
                    <div className="aspect-[492/240] w-full overflow-hidden">
                      <img
                        src={`${API_BASE_URL}${item?.image?.url}`}
                        alt={item?.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        draggable={false}
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
                          draggable={false}
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
                </a>
              </div>
            ))}
          </div>

          {/* Next Button - Hidden on mobile */}
          <button
            onClick={nextSlide}
            className={`absolute right-2 sm:right-4 md:right-8 lg:right-2 xl:-right-5 2xl:-right-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[0px_4px_60px_0px_#00000008] backdrop-blur-md transition-all duration-200 flex items-center justify-center ${
              isMobile ? "hidden" : ""
            } ${
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
        {blogData.length > 0 && (!isNextDisabled || !isPrevDisabled) && (
          <div className="flex gap-2 justify-center items-center pt-9">
            {Array.from({
              length: Math.ceil(blogData.length / slidesToShow),
            }).map((_, index) => {
              const isActive =
                Math.floor(currentIndex / slidesToShow) === index;
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
                      isActive
                        ? "bg-[#335F86]"
                        : "bg-[#335F86] hover:bg-gray-400"
                    } w-[9px] h-[9px]`}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Dots Indicator */}
      </div>
    </section>
  );
};

export default Blogs;
