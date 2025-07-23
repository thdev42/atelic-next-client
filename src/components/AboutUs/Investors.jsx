import React from "react";
import AtelicLogo from "../../../assets/Atelic-logo.png"; // ✅ Your import
import { formatHeading } from "../Partners/Partners";

const Investors = ({ sections }) => {
  return (
    <section className="font-sora relative bg-white w-full max-w-[1920px] mx-auto overflow-hidden py-16">
      <div className="2xl:px-[178px] md:px-12 lg:px-[100px] md:mx-auto xs:px-0">
        <div
          className="
            relative 
            w-full 
            max-w-[1564px] 
            md:min-h-[393px]
            min-h-[303px]
            mx-auto 
            text-white 
            flex 
            flex-col 
            items-center 
            justify-center 
            text-center 
            px-6 sm:px-10 lg:px-20 
            bg-gradient-to-r from-[#8F000A] to-[#F21B2A] 
            md:rounded-tl-[45px] 
            md:rounded-br-[45px]
            rounded-tl-[85px] 
            rounded-br-[85px]
            z-10
            overflow-hidden
          "
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 z-10">
            {formatHeading(sections?.heading)}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-3 z-10">
            {sections?.subHeading}
          </p>
          <p className="text-base sm:text-lg lg:text-xl z-10">
            Email: <span className="font-bold">{sections?.email}</span>
          </p>

          {/* ✅ Actual Logo at bottom-right */}
          <div className="absolute  bottom-0 -right-56 md:bottom-0 md:-right-72  sm:bottom-0 sm:-right-64 lg:-bottom-5 lg:-right-[380px] w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 2xl:w-80">
            <img
              src={AtelicLogo.src}
              style={{ scale: 3.8 }}
              alt="Atelic Logo"
              className="w-full h-auto  opacity-30 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Optional mesh background */}
    </section>
  );
};

export default Investors;
