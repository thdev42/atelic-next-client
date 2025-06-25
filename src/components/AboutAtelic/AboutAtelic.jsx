"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

// Mock images for demonstration
import davidImage from "../../../assets/David.png";
import AlvinImage from "../../../assets/AlvinHeib.png";
import BenImage from "../../../assets/Ben.png";
import RomanImage from "../../../assets/Roman.png";
import SimonImage from "../../../assets/Simon.png";

const teamMembers = [
  {
    name: "David Chalklen",
    title: "CTO",
    description:
      "David has over 20 years experience in AI/Tech. He's held Senior and Executive roles at Microsoft, Publicis, WPP, and has been a senior tech/strategy led for startups.",
    image: davidImage,
  },
  {
    name: "Alvin Heib",
    title: "CPO",
    description:
      "As Chief Product Officer, and one of the co-founders of Atelic, Alvin brings 15+ years of experience in AI, cloud, data, product strategy, and technical execution.",
    image: AlvinImage,
  },
  {
    name: "Ben Owen",
    title: "Founder & CEO",
    description:
      "The Atelic Founder & CEO has over 15 years' experience in enterprise digital/analytics, with a focus on AI adoption & transformation strategy.",
    image: BenImage,
  },
  {
    name: "Romain Picard",
    title: "Investor & Advisor",
    description:
      "Romain is an expert investor. Founder & ex-key CCO of Dataiku. Now active as a strategic advisor & investor for AI startups.",
    image: RomanImage,
  },
  {
    name: "Simon Williams",
    title: "Advisor",
    description:
      "Advisor to AI Founders. Simon has led Sales and GTM for top AI platforms, and helped scale multiple AI startups with a strategic network & vision.",
    image: SimonImage,
  },
];

const AboutAtelic = () => {
  const [visibleElements, setVisibleElements] = useState({
    header: false,
    paragraph: false,
    cards: [],
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-50px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementType = entry.target.getAttribute("data-reveal");
          const elementIndex = entry.target.getAttribute("data-index");

          if (elementType === "header") {
            setVisibleElements((prev) => ({ ...prev, header: true }));
          } else if (elementType === "paragraph") {
            setVisibleElements((prev) => ({ ...prev, paragraph: true }));
          } else if (elementType === "card") {
            setVisibleElements((prev) => ({
              ...prev,
              cards: [...prev.cards, parseInt(elementIndex)],
            }));
          }
        }
      });
    }, observerOptions);

    // Observe header
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // Observe paragraph
    if (paragraphRef.current) {
      observer.observe(paragraphRef.current);
    }

    // Observe cards
    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="z-10 font-sora overflow-hidden bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-16"
    >
      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px]">
        {/* Heading + Paragraph with different scroll reveal animations */}
        <div className="md:flex justify-between items-start md:space-x-10 2xl:mb-16 mb-12">
          {/* Header with slide-in from left and rotation */}
          <h2
            ref={headerRef}
            data-reveal="header"
            className={`2xl:text-[60px] text-3xl md:text-4xl font-semibold whitespace-nowrap transform transition-all duration-1200 ease-out ${
              visibleElements.header
                ? "translate-x-0 opacity-100 rotate-0"
                : "-translate-x-20 opacity-0 -rotate-12"
            }`}
          >
            About{" "}
            <span
              className={`text-[#ED254E] inline-block transform transition-all duration-800 ease-bounce delay-0 hover:scale-110 ${
                visibleElements.header
                  ? "scale-100 rotate-0"
                  : "scale-0 rotate-180"
              }`}
            >
              Atelic
            </span>
          </h2>

          {/* Paragraph with typewriter effect */}
          <p
            ref={paragraphRef}
            data-reveal="paragraph"
            className={`2xl:text-[22px] text-gray-600 mt-4 md:mt-0 max-w-3xl transform transition-all duration-1000 ease-out delay-0 ${
              visibleElements.paragraph
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-8 opacity-0 blur-sm"
            }`}
          >
            Founded by a team of seasoned AI, cloud, and data experts, Atelic AI
            was created to cut through the noise and hype of generic AI
            solutions. We exist to deliver true business value through
            context-aware, ROI-driven implementations that solve real-world
            problems — not just pilot experiments.
          </p>
        </div>

        {/* Team Cards with different scroll reveal effects */}
        <div className="flex flex-wrap 2xl:gap-y-10 gap-5 justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              data-reveal="card"
              data-index={index}
              className={`group w-[395px] h-[734px] lg:w-[395px] lg:h-[734px] 2xl:w-[495px] 2xl:h-[834px] pt-8 px-6 text-center  rounded-t-[400px] transition-all duration-700 hover:shadow-xl flex flex-col items-center bg-white hover:bg-gradient-to-b hover:from-[#F21B2A] hover:to-[#335F86] hover:text-white hover:scale-105 hover:-translate-y-2 transform ${
                visibleElements.cards.includes(index)
                  ? getCardAnimationClass(index)
                  : getCardInitialClass(index)
              }`}
              style={{
                transitionDelay: `${index * 0.3}ms`,
                animation: visibleElements.cards.includes(index)
                  ? `cardFloat 3s ease-in-out ${1.5 + index * 0.3}s infinite`
                  : "none",
              }}
            >
              <div
                className={`w-[344px] h-[344px] lg:w-[344px] lg:h-[344px] 2xl:w-[444px] 2xl:h-[444px] rounded-full overflow-hidden border-[5px] border-white transition-all duration-500 group-hover:border-opacity-80 group-hover:shadow-2xl ${
                  visibleElements.cards.includes(index)
                    ? "scale-100 rotate-0"
                    : "scale-0 rotate-45"
                }`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={444}
                  height={444}
                  className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-6 mb-4">
                <h3
                  className={`text-xl 2xl:text-[36px] font-bold mb-2 delay-0 group-hover:transform group-hover:scale-105 ${
                    visibleElements.cards.includes(index)
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  {member.name}
                </h3>
                <p
                  className={`text-md 2xl:text-[18px] mt-14 font-extralight leading-relaxed mb-6 delay-0 `}
                >
                  {member.description}
                </p>
              </div>
              <button
                className={`w-[186px] h-[47px] rounded-[23.5px] font-medium text-sm transition-all duration-400 delay-0 delay-600 bg-[#335F86] text-white group-hover:bg-white group-hover:text-[#335F86] hover:transform hover:scale-110 hover:shadow-lg ${
                  visibleElements.cards.includes(index)
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-75"
                }`}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes cardFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%) rotate(-15deg);
            opacity: 0;
          }
          100% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          0% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(50px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes flipIn {
          0% {
            transform: rotateY(-90deg) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg) scale(1);
            opacity: 1;
          }
        }

        .ease-bounce {
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </section>
  );
};

// Helper functions for different card animations
const getCardAnimationClass = (index) => {
  const animations = [
    "translate-y-0 opacity-100 scale-100 rotate-0", // Default slide up
    "translate-x-0 opacity-100 scale-100 rotate-0", // Slide from left
    "translate-y-0 opacity-100 scale-100 rotate-0", // Zoom in
    "translate-x-0 opacity-100 scale-100 rotate-0", // Slide from right
    "translate-y-0 opacity-100 scale-100 rotate-0", // Flip in
  ];
  return animations[index % animations.length];
};

const getCardInitialClass = (index) => {
  const initialStates = [
    "translate-y-16 opacity-0 scale-95 rotate-3", // Slide up with rotation
    "-translate-x-16 opacity-0 scale-95 -rotate-6", // Slide from left with rotation
    "translate-y-12 opacity-0 scale-75 rotate-12", // Zoom with rotation
    "translate-x-16 opacity-0 scale-95 rotate-6", // Slide from right with rotation
    "translate-y-20 opacity-0 scale-90 -rotate-12", // Different slide up
  ];
  return initialStates[index % initialStates.length];
};

export default AboutAtelic;
