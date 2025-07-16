import React from "react";
import SVGComponent from "../Svg";

const RegionalPartners = () => {
  return (
    <section className="relative bg-[#00172B] max-w-[1920px] mx-auto w-full py-16 lg:py-32 overflow-hidden">
      {/* Blur element only on top-right */}
      <div className="absolute top-[-500px] right-[-300px] w-[1175px] h-[1175px] bg-[rgba(26,53,186,1)] blur-[1200px] z-0" />

      {/* Foreground content */}
      <div className="relative z-10 px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto w-full flex flex-col items-center justify-center text-center">
        <div className="font-raleway mb-16 space-y-8 max-w-5xl">
          {/* Tag */}
          <div className="inline-block 2xl:text-[22px] text-white px-5 py-2 rounded-full border border-[#F21B2A] bg-[rgba(242,27,42,0.17)] text-sm">
            Quantum Ai Innovation
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl 2xl:text-[60px] font-light text-white leading-tight">
            Regional <span className="font-bold">Partners</span>
          </h2>

          {/* Description */}
          <p className="opacity-80 text-sm sm:text-base 2xl:text-[22px] leading-relaxed text-gray-300 mx-auto">
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
