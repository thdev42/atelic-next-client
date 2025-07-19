import React from "react";
import Image from "next/image";
import OurJourneyImage from "../../../assets/OurJourney.png";
import { formatHeading } from "../Partners/Partners";
import { API_BASE_URL } from "@/config/config";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

const OurJourney = ({ sections }) => {
  return (
    <section className="font-sora relative bg-[#f3f0f1] text-black w-full max-w-[1920px] mx-auto overflow-hidden">
      <div className=" 2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 gap-12">
        <div className="relative py-5 z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* LEFT COLUMN */}
          <div className="z-10 relative">
            {/* Mobile background image - only visible on mobile */}
            <div
              className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{
                backgroundImage: `url(${API_BASE_URL}${sections?.image?.url})`,
                zIndex: -1,
              }}
            ></div>

            <h2 className={`${headingStyle} font-light relative z-10`}>
              {formatHeading(sections?.heading)}
            </h2>
            <p
              className={`text-black/80 ${paragraphStyles} mb-9  mx-auto lg:mx-0 2xl:leading-relaxed font-light mt-9 relative z-10`}
            >
              {sections?.subHeading}
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden z-10 mix-blend-darken w-full md:flex justify-center md:justify-end">
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
