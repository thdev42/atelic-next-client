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

export default function TeamSection({ sections }) {
  const teamMembers = Array.isArray(sections?.teamMembers)
    ? sections?.teamMembers
    : [];

  return (
    <section className="w-full bg-[#fdfdfd] text-black font-sora">
      <div className="2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 pb-9">
        {/* Heading + Description */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-6 mb-16">
          {/* Left: Paragraph */}
          <p className="text-gray-700 max-w-3xl text-base leading-relaxed text-left lg:text-left">
            {sections?.subHeading}
          </p>

          {/* Right: Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold whitespace-nowrap text-right lg:text-right">
            {sections?.heading?.map((word, index) => (
              <span key={word.id} style={{ color: word.color }}>
                {word.text}
                {word.breakAfter ? <br /> : " "}
              </span>
            ))}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flip-card w-full max-w-[379px] min-w-[270px] mx-auto min-h-[310px] cursor-pointer"
            >
              <div className="flip-inner relative w-full h-full">
                {/* Front */}
                <div className="flip-front absolute w-full h-full bg-[#E2E2E2] p-6 shadow-md text-center flex flex-col justify-center items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img
                      src={`${API_BASE_URL}${member?.image?.url}`}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.title}</p>
                  {member.icons &&
                    member?.icons?.map((social, key) => (
                      <div className="absolute top-4 right-4 z-20">
                        <Image
                          key={key}
                          src={`${API_BASE_URL}${social?.logo?.url}`}
                          alt="LinkedIn"
                          width={42}
                          height={42}
                        />
                      </div>
                    ))}
                </div>

                {/* Back */}
                <div className="flip-back absolute w-full h-full bg-white p-6 shadow-md text-sm text-gray-800 leading-relaxed overflow-y-auto rounded-[20px]">
                  {member.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
