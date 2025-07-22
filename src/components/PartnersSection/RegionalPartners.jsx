import React from "react";
import SVGComponent from "../Svg";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

const RegionalPartners = () => {
  return (
    <section className="relative bg-[#00172B] max-w-[1920px] mx-auto w-full py-16 lg:py-32 overflow-hidden">
      {/* Blur element only on top-right */}
      {/* <div className="absolute top-[-500px] right-[-300px] w-[1175px] h-[1175px] bg-[rgba(26,53,186,1)] blur-[1200px] z-0" /> */}

      {/* Foreground content */}
      <div className="relative z-10 px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto w-full flex flex-col items-center justify-center text-center">
        <div className="font-raleway mb-16 space-y-8 max-w-5xl">
          {/* Tag */}

          {/* Heading */}
          <h2 className={`${headingStyle} font-light text-white leading-tight`}>
            Regional <span className="font-bold">Partners</span>
          </h2>

          {/* Description */}
          <p
            className={`opacity-80 ${paragraphStyles}  leading-relaxed text-gray-300 mx-auto`}
          >
            As we continue to build our trust and deliverables with customers,
            vendors and partners, we are engaging with local networks that help
            us connect the best Global systems to local cultural and nuanced
            needs.
          </p>
        </div>

        <div className="w-full">
          <SVGComponent />
        </div>
      </div>
    </section>
  );
};

export default RegionalPartners;
