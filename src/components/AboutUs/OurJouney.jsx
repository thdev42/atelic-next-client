import React from "react";
import Image from "next/image";
import OurJourneyImage from "../../../assets/OurJourney.png";
import { formatHeading } from "../Partners/Partners";
import { API_BASE_URL } from "@/config/config";

const OurJourney = ({ sections }) => {
  return (
    <section className="font-sora relative bg-[#f3f0f1] text-black w-full max-w-[1920px] mx-auto overflow-hidden">
      <div className=" 2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 gap-12">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* LEFT COLUMN */}
          <div className="z-10">
            <h2 className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-[60px] font-light">
              {formatHeading(sections?.heading)}
            </h2>
            <p className="text-black/80 text-base xl:text-lg 2xl:text-[22px] mb-9  mx-auto lg:mx-0 2xl:leading-relaxed font-light mt-9">
              {sections?.subHeading}
            </p>
            <button className="bg-[#F21B2A] hover:bg-red-700 transition text-white px-11 py-3 rounded-md text-sm sm:text-base">
              {sections?.primaryButton}
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="z-10 mix-blend-darken w-full flex justify-center md:justify-end">
            <div className="w-[130%] sm:w-[140%] md:w-[160%] lg:w-[180%] xl:w-[200%] max-w-none -ml-12 md:-ml-24 lg:-ml-32 xl:-ml-40">
              <img
                src={`${API_BASE_URL}${sections?.image?.url}`}
                alt="Journey Illustration"
                className="w-full h-auto bg-blend-darken mix-blend-darken"
                // priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
