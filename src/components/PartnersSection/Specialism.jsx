"use client";

import React, { useState } from "react";
import Aws from "../../../assets/Aws1.png";
import googlecloud from "../../../assets/googlecloud.png";
import openstack from "../../../assets/Openstack.png";
import VmWare from "../../../assets/VmWare.png";
import Azure from "../../../assets/Azure.png";
import { formatHeading } from "../Partners/Partners";
import { API_BASE_URL } from "@/config/config";

// const tabs = [
//   {
//     name: "Agility & DevOps",
//     tools: [googlecloud, openstack, VmWare, Aws, Azure],
//   },
//   {
//     name: "Cloud & Virtualisation",
//     tools: [VmWare, openstack, Aws, Azure, googlecloud],
//   },
//   {
//     name: "Big Data & AI",
//     tools: [openstack, googlecloud, Aws, Azure, VmWare],
//   },
// ];

const Specialism = ({ sections }) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = Array?.isArray(sections?.tabs) ? sections?.tabs : [];

  console.log(sections, "ASASSA");

  return (
    <section className="bg-[#E8E8E8] max-w-[1920px] mx-auto w-full py-8 sm:py-10 lg:py-12 xl:py-16 relative overflow-hidden">
      <div className="font-raleway px-4 sm:px-6 md:px-8 lg:px-[100px] 2xl:px-[178px] mx-auto text-center">
        <h2 className="mt-7 text-3xl sm:text-4xl md:text-[41px] 2xl:text-[60px] font-medium text-black leading-tight">
          {formatHeading(sections?.heading)}
        </h2>
        <p className="2xl:text-[22px] mx-auto lg:text-sm text-sm  text-black 2xl:leading-relaxed pt-9 lg:mt-0">
          {sections?.subHeading}
        </p>
        <p className="font-semibold 2xl:text-[22px] mt-6 text-[#333]">
          {sections?.buttonHeading}
        </p>

        <div className="flex justify-center  mt-6 flex-wrap gap-3 2xl:gap-0 relative z-0">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(index)}
              className={`w-full max-w-[170px]  sm:max-w-[200px] md:max-w-[210px] h-[52px] sm:h-[58px] md:h-[62px] border text-sm sm:text-base font-medium transition-all duration-300 2xl:-ml-[10px] relative z-0 rounded-[10px] ${
                activeTab === index
                  ? "bg-[#336699] text-white z-10"
                  : "bg-[#D9D9D9] text-[#333] border-gray-300 -z-10"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
          {tabs[activeTab]?.tools?.map((tool, i) => (
            <div
              key={i}
              className="lg:my-16 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] 2xl:w-[180px] 2xl:h-[180px] rounded-full bg-white shadow-[2px_2px_9.9px_-1px_#00000021] flex items-center justify-center"
            >
              <img
                src={`${API_BASE_URL}${tool?.logo?.url}`}
                alt={`icon-${i}`}
                className=" md:max-w-[100px] md:max-h-[100px] max-w-[80px] max-h-[80px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialism;
