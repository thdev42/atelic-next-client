import React from "react";
import Image from "next/image";
import cube1 from "../../../assets/Cube1.png";
import cube2 from "../../../assets/Cube2.png";
import cube3 from "../../../assets/Cube3.png";
import { formatHeading } from "../Partners/Partners";
import { API_BASE_URL } from "@/config/config";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

// const features = [
//   {
//     id: "01",
//     icon: cube1,
//     text: "We are experts at listening & bring big ideas. We work backwards from customer needs with Industry subject matter experts who understands the business.",
//   },
//   {
//     id: "02",
//     icon: cube2,
//     text: "Our MVPs are pre-built Atelic 'Supervisory' Agents that operate across Oil, Gas, Financial Services & the Public Sector.",
//   },
//   {
//     id: "03",
//     icon: cube3,
//     text: "We are building a revolutionary enterprise ready new foundation for trust, providing cryptographic levers & blockchain resilience that secure transactions.",
//   },
// ];

const OurSolutions = ({ sections }) => {
  const features = Array?.isArray(sections?.details) ? sections?.details : [];
  return (
    <section className="bg-[#EBEBEB] max-w-[1920px] mx-auto w-full py-8 sm:py-10 lg:py-12 xl:py-16 relative overflow-hidden">
      <div className="font-sora px-8 sm:px-[100px] md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto">
        {/* Title Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 mb-12 sm:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-start lg:items-center">
            <div>
              <h2
                className={`${headingStyle} font-medium text-black leading-tight`}
              >
                {/* Our <span className="font-bold">Solutions</span> */}
                {formatHeading(sections?.heading)}
              </h2>
            </div>
            <div>
              <p
                className={`${paragraphStyles} text-black leading-relaxed mt-4 lg:mt-0`}
              >
                {sections?.subHeading}
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-6 2xl:gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="group relative w-full bg-white md:bg-transparent transition-all duration-300 border border-transparent hover:bg-white rounded-[10px]"
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
              <div className="relative z-10 p-6 sm:p-7 md:p-8 h-full flex flex-col items-center justify-center text-center md:items-start md:justify-start md:text-left">
                {/* Top Icon */}
                <div className="flex justify-start sm:justify-center md:justify-start mb-8 sm:mb-10 md:mb-12 lg:mb-14">
                  <img
                    src={`${API_BASE_URL}${feature?.image?.url}`}
                    alt="Solution Icon"
                    className="max-w-[90px] 2xl:max-w-[130px]  object-contain"
                  />
                </div>

                {/* Index number - only on hover */}
                <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-2xl 2xl:text-4xl font-medium text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  0{index + 1}
                </div>

                {/* Text Content */}
                <div className="flex-1 flex flex-col justify-end sm:justify-center md:justify-end">
                  <p
                    className={`2xl:text-[16px] lg:text-[15px] text-[14px] text-gray-700 leading-relaxed sm:max-w-[390px] md:max-w-none`}
                  >
                    {feature.text}
                    <span className="underline ml-1 cursor-pointer hover:text-[#F21B2A] transition-colors duration-200">
                      Read More
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSolutions;
