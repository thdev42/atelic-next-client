import Image from "next/image";
import React from "react";
// import Alvin from "../../../assets/Alvin.png";
// import Ben from "../../../assets/Ben (2).png";
// import Romain from "../../../assets/Romain.png";
// import Emma from "../../../assets/Emma.jpg";
// import Marcus from "../../../assets/Marcus.jpg";
// import Julia from "../../../assets/Julia.jpg";
// import Ryan from "../../../assets/Ryan.jpg";

import LinkedinLogo from "../../../assets/AboutLinkedin.png";
import { API_BASE_URL } from "@/config/config";
import BgPattern1 from "../../../assets/WebServices.png";
import { headingStyle, paragraphStyles } from "@/styles/globalStyles";

export default function TeamSection({ sections }) {
  const teamMembers = Array.isArray(sections?.teamMembers)
    ? sections?.teamMembers
    : [];

  return (
    <section className="w-full bg-[#fdfdfd] text-black font-sora overflow-hidden">
      <div className="2xl:px-[178px] relative md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 py-20">
        <div className="absolute top-[600px] 2xl:block hidden -right-56">
          <Image
            src={BgPattern1}
            alt="Background Pattern"
            width={930}
            className="min-h-screen object-contain"
            // height={713}
          />
        </div>
        {/* Heading + Description */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-6 mb-16">
          {/* Left: Paragraph */}
          <p
            className={`text-gray-700 max-w-3xl ${paragraphStyles} leading-relaxed text-left lg:text-left`}
          >
            {sections?.subHeading}
          </p>

          {/* Right: Heading */}
          <h2
            className={`${headingStyle} font-bold whitespace-nowrap text-right lg:text-right`}
          >
            {sections?.heading?.map((word, index) => (
              <span key={word.id} style={{ color: word.color }}>
                {word.text}
                {word.breakAfter ? <br /> : " "}
              </span>
            ))}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flip-card w-full max-w-[479px] min-w-[390px] mx-auto min-h-[410px] cursor-pointer"
            >
              <div className="flip-inner relative w-full h-full">
                {/* Front */}
                <div className="flip-front absolute w-full h-full bg-[#E2E2E2] p-6 shadow-md text-center flex flex-col justify-center items-center">
                  <div className="space-y-4 flex flex-col justify-center items-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden">
                      <img
                        src={`${API_BASE_URL}${member?.image?.url}`}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-black">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600">{member.title}</p>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-back absolute  w-full h-full bg-white p-6 overflow-hidden shadow-md text-[15px] 2xl:text-[17px] text-gray-800 leading-relaxed rounded-[20px] flex flex-col justify-center items-center text-center">
                  <p className="mb-4">{member.description}</p>

                  {member.icons && (
                    <div className="flex gap-4 mt-2">
                      {member.icons.map((social, key) => (
                        <Image
                          key={key}
                          src={`${API_BASE_URL}${social?.logo?.url}`}
                          alt="Social Icon"
                          width={42}
                          height={42}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
