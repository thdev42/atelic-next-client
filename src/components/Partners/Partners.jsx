import React from "react";
import BgShape from "../../../assets/PartnerBg.png";
import Image from "next/image";

export const Partners = () => {
  return (
    <section className="bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-10 lg:py-20 relative overflow-hidden">
      {/* LEFT BG SHAPE (OPTIONAL) */}
      {/* <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-60 h-60 bg-[#E8E8E8] rounded-full z-0"></div> */}
      <Image
        src={BgShape}
        alt="Background Shape"
        className="absolute -left-96 top-1/2 w-[900px] h-full z-0 object-cover bg-cover"
      />
      ;
      <div className="relative z-10 px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto w-full">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl 2xl:text-4xl font-semibold text-black mb-10 font-sora">
          Our Global Partners
        </h2>

        {/* Cards Row */}
        <div className="flex flex-wrap justify-center gap-7 max-w-full">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-white w-[250.56px] h-[165.39px] shadow-[0_4px_40px_rgba(0,0,0,0.05)] flex items-center justify-center"
            >
              <p className="text-gray-500 font-medium">Partner {item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
