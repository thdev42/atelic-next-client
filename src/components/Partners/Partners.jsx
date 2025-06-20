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
    <section
      className="max-w-[1920px] mx-auto w-full py-10 lg:py-20 relative overflow-hidden"
      style={{
        backgroundColor: "#f3f3f3",
        backgroundAttachment: typeof window !== 'undefined' && window.innerWidth <= 768 ? 'scroll' : 'fixed',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Background Image Left - Now part of fixed background */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: `url(${BgShape.src})`,
          backgroundPosition: "-420px 20px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1184px 900px",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="relative z-10 px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto w-full">
        <h2 className="text-center py-10 text-2xl md:text-3xl 2xl:text-[60px] font-normal text-black mb-10 font-sora">
          Our Global <span className="font-extrabold">Partners</span>
        </h2>

        <div className="overflow-hidden w-full">
          <div className="flex gap-8 animate-marquee whitespace-nowrap" style={{ willChange: 'transform' }}>
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="inline-flex items-center justify-center my-3 px-8 py-4 min-w-[287px] h-[165.39px] bg-[rgba(233,233,233,0.95)] backdrop-blur-sm border border-[rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-white hover:shadow-[3px_4px_9.4px_1px_rgba(0,0,0,0.14)]"
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
