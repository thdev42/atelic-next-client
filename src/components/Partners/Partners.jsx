"use client";
import React from "react";
import Image from "next/image";

// Assets
import BgShape from "../../../assets/PartnerBg.png";
import Aws from "../../../assets/Aws.png";
import Google from "../../../assets/Google.png";
import IBM from "../../../assets/IBM.png";
import Microsoft from "../../../assets/Microsoft.png";
import Nvidia from "../../../assets/Nvidia.png";

export const Partners = () => {
  const logos = [Aws, Google, IBM, Microsoft, Nvidia];

  return (
    <section className="bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-10 lg:py-20 relative overflow-hidden">
      {/* Background Shape */}
      <div className="absolute left-0 bottom-0 z-0 translate-y-[40%] sm:translate-y-[50%]">
        <Image
          src={BgShape}
          alt="Decorative shape"
          className="w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] object-contain pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto w-full">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl 2xl:text-4xl font-semibold text-black mb-10 font-sora">
          Our Global Partners
        </h2>

        {/* Infinite Scroll */}
        <div className="overflow-hidden w-full">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="inline-flex items-center justify-center my-3 px-8 py-4 min-w-[287px] h-[165.39px] bg-[rgba(233,233,233,1)] border border-[rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-white hover:shadow-[3px_4px_9.4px_1px_rgba(0,0,0,0.14)]"
                // style={{
                //   backgroundColor: "rgba(233, 233, 233, 1)",
                //   border: "1px solid rgba(0, 0, 0, 0.18)",
                // }}
              >
                <Image
                  src={logo}
                  alt={`partner-${idx}`}
                  className="h-[65px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
