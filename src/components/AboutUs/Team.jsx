import Image from "next/image";
import React, { useState, useEffect } from "react";
// import Alvin from "../../../assets/Alvin.png";
// import Ben from "../../../assets/Ben (2).png";
// import Romain from "../../../assets/Romain.png";
// import Emma from "../../../assets/Emma.jpg";
// import Marcus from "../../../assets/Marcus.jpg";
// import Julia from "../../../assets/Julia.jpg";
// import Ryan from "../../../assets/Ryan.jpg";

import LinkedinLogo from "../../../assets/AboutLinkedin.png";
import { API_BASE_URL } from "@/config/config";
import BgPattern1 from "../../../assets/WebServices.png";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

export default function TeamSection({ sections }) {
  console.log(sections, "TEAM SECTION");
  const teamMembers = Array.isArray(sections?.teamMembers)
    ? sections?.teamMembers
    : [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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

    if (isLeftSwipe && currentSlide < teamMembers.length - 1) {
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
    <section className="w-full bg-[#fdfdfd] text-black font-sora overflow-hidden">
      <div className="2xl:px-[178px] relative md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 py-5 sm:py-20">
        <div className="absolute top-[600px] 2xl:block hidden -right-56">
          <Image
            src={BgPattern1}
            alt="Background Pattern"
            width={930}
            className="min-h-screen object-contain"
            // height={713}
          />
        </div>
        {/* Heading + Description */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-6 mb-16">
          {/* Left: Paragraph */}
          <p
            className={`text-gray-700 max-w-3xl ${paragraphStyles} leading-relaxed  text-center md:text-left lg:text-left`}
          >
            {sections?.subHeading}
          </p>

          {/* Right: Heading */}
          <h2
            className={`${headingStyle} font-bold whitespace-nowrap text-right lg:text-right`}
          >
            {sections?.heading?.map((word, index) => (
              <span key={word.id} style={{ color: word.color }}>
                {word.text}
                {word.breakAfter ? <br /> : " "}
              </span>
            ))}
          </h2>
        </div>

        {/* Cards Grid / Mobile Slider */}
        {isMobile ? (
          // Mobile Slider
          <div className="mb-5 sm:mb-16">
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {teamMembers.map((member, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="flip-card-mobile w-full max-w-[479px] mx-auto h-full">
                      <div className="flip-inner-mobile relative w-full h-full">
                        <div className="flip-front-mobile absolute w-full h-full bg-[#E2E2E2] p-6 shadow-md text-center flex flex-col">
                          <div className="space-y-4 flex flex-col justify-center items-center">
                            <div className="w-28 h-28 rounded-full overflow-hidden">
                              <img
                                src={`${API_BASE_URL}${member?.image?.url}`}
                                alt={member.name}
                                // width={40}
                                // height={40}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <h3 className="text-lg font-semibold text-black">
                              {member.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {member.title}
                            </p>

                            <a
                              href={member?.linkedInUrl || "#"}
                              {...(member?.linkedInUrl && {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              })}
                            >
                              <Image
                                // key={key}
                                // src={`${API_BASE_URL}${social?.logo?.url}`}
                                src={`${API_BASE_URL}${member?.icons?.logo?.url}`}
                                alt="Social Icon"
                                width={42}
                                height={42}
                              />
                            </a>

                            <p className="mb-4">{member.description}</p>
                          </div>
                        </div>

                        {/* Back */}
                        {/* <div className="flip-back-mobile absolute w-full h-full  p-6 overflow-hidden shadow-md text-[15px] 2xl:text-[17px] text-gray-800 leading-relaxed rounded-[20px] flex flex-col justify-center items-center text-center">
                          {member.icons && (
                            <div className="flex gap-4 mt-2"></div>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-blue-600 scale-110"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Desktop Grid (unchanged)
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 mb-16 justify-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flip-card w-full max-w-[479px] mx-auto min-h-[410px] cursor-pointer"
              >
                <div className="flip-inner relative w-full h-full">
                  {/* Front */}
                  <div className="flip-front absolute w-full h-full bg-[#E2E2E2] p-6 shadow-md text-center flex flex-col justify-center items-center">
                    <div className="space-y-4 flex flex-col justify-center items-center">
                      <div className="w-40 h-40 rounded-full overflow-hidden">
                        <img
                          src={`${API_BASE_URL}${member?.image?.url}`}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <h3 className="text-lg font-semibold text-black">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600">{member.title}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="flip-back absolute  w-full h-full bg-white p-6 overflow-hidden shadow-md text-[15px] 2xl:text-[17px] text-gray-800 leading-relaxed rounded-[20px] flex flex-col justify-center items-center text-center">
                    <p className="mb-4">{member.description}</p>

                    {member.icons && (
                      <div className="flex gap-4 mt-2">
                        <a
                          href={member?.linkedInUrl || "#"}
                          {...(member?.linkedInUrl && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                        >
                          <Image
                            src={`${API_BASE_URL}${member?.icons?.logo?.url}`}
                            alt="Social Icon"
                            width={42}
                            height={42}
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        /* Desktop flip card styles (unchanged) */
        @media (min-width: 768px) {
          .flip-card {
            perspective: 1000px;
          }

          .flip-inner {
            transition: transform 0.8s;
            transform-style: preserve-3d;
          }

          .flip-card:hover .flip-inner {
            transform: rotateY(180deg);
          }

          .flip-front,
          .flip-back {
            backface-visibility: hidden;
            border-radius: 20px;
          }

          .flip-back {
            transform: rotateY(180deg);
          }
        }

        /* Mobile styles - no flip animation */
        @media (max-width: 767px) {
          .flip-card-mobile {
            perspective: none;
          }

          .flip-inner-mobile {
            transform-style: flat;
          }

          .flip-front-mobile,
          .flip-back-mobile {
            backface-visibility: visible;
            border-radius: 20px;
            position: relative;
          }

          .flip-back-mobile {
            transform: none;
            margin-top: 20px;
          }
        }
      `}</style>
    </section>
  );
}
