"use client";

import React, { useState, useEffect } from "react";
import Aws from "../../../assets/Aws1.png";
import googlecloud from "../../../assets/googlecloud.png";
import openstack from "../../../assets/Openstack.png";
import VmWare from "../../../assets/VmWare.png";
import Azure from "../../../assets/Azure.png";
import { formatHeading } from "../Partners/Partners";
import { API_BASE_URL } from "@/config/config";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";
import CloudSpecialism from "../Svg/Specialism";

const Specialism = ({ sections }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabs = Array?.isArray(sections?.tabs) ? sections?.tabs : [];

  // Handle tab change with transition
  const handleTabChange = (index) => {
    if (index === activeTab) return;

    setIsTransitioning(true);

    // Small delay to allow fade out animation
    setTimeout(() => {
      setActiveTab(index);
      setIsTransitioning(false);
    }, 150);
  };

  console.log(sections, "ASASSA");

  return (
    <section className="bg-[#E8E8E8] max-w-[1920px] mx-auto w-full py-8 sm:py-10 lg:py-12 xl:py-16 relative overflow-hidden">
      <div className="font-raleway px-4 sm:px-6 md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto text-center">
        <h2
          className={`md:text-left mt-7 ${headingStyle} font-medium text-black leading-tight`}
        >
          {formatHeading(sections?.heading)}
        </h2>
        <p
          className={`md:text-left mx-auto ${paragraphStyles} text-black 2xl:leading-relaxed pt-9 lg:mt-0`}
        >
          {sections?.subHeading}
        </p>
        <p
          className={`md:text-left font-semibold ${paragraphStyles} mt-6 text-[#333]`}
        >
          {sections?.buttonHeading}
        </p>

        <div className="lg:block hidden">
          <div className="flex justify-center pt-20 flex-wrap gap-3 2xl:gap-0 relative z-0">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => handleTabChange(index)}
                className={`w-full max-w-[170px] sm:max-w-[200px] md:max-w-[210px] h-[52px] sm:h-[58px] md:h-[62px] border text-sm sm:text-base font-medium transition-all duration-300 2xl:-ml-[10px] relative z-0 rounded-[10px] ${
                  activeTab === index
                    ? "bg-[#336699] text-white z-10"
                    : "bg-[#D9D9D9] text-[#333] border-gray-300 -z-10"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Desktop Icons with transition */}
          <div
            className={`mt-10 flex gap-16 justify-center transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {tabs[activeTab]?.tools?.map((tool, i) => {
              const imageSize = tool?.webImageSize;

              return (
                <div
                  key={`${activeTab}-${i}`} // Unique key with tab index
                  className="lg:my-16 w-[120px] h-[120px] flex-shrink-0 sm:w-[140px] sm:h-[140px] lg:w-[140px] lg:h-[140px] 2xl:w-[180px] 2xl:h-[180px] rounded-full bg-white shadow-[2px_2px_9.9px_-1px_#00000021] flex items-center justify-center transform transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={`${API_BASE_URL}${tool?.logo?.url}`}
                    alt={`icon-${i}`}
                    width={imageSize}
                    height={imageSize}
                    className="transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden block">
          <div className="flex justify-center flex-wrap gap-3 2xl:gap-0 relative z-0 py-10">
            {tabs.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => handleTabChange(index)}
                className={`w-full max-w-[140px] sm:max-w-[200px] md:max-w-[210px] h-[52px] sm:h-[58px] md:h-[62px] border text-sm sm:text-base font-medium transition-all duration-300 2xl:-ml-[10px] relative z-0 rounded-[10px] ${
                  activeTab === index
                    ? "bg-[#336699] text-white z-10"
                    : "bg-[#D9D9D9] text-[#333] border-gray-300 -z-10"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Mobile CloudSpecialism with transition */}
          <div
            className={`transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="max-w-[700px] mx-auto">
              <CloudSpecialism key={activeTab} tab={tabs[activeTab]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialism;
