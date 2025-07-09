import Image from "next/image";
import React from "react";
import Alvin from "../../../assets/Alvin.png";
import Ben from "../../../assets/Ben (2).png";
import Romain from "../../../assets/Romain.png";
import Emma from "../../../assets/Emma.jpg";
import Marcus from "../../../assets/Marcus.jpg";
import Julia from "../../../assets/Julia.jpg";
import Ryan from "../../../assets/Ryan.jpg";

import LinkedinLogo from "../../../assets/AboutLinkedin.png";
const teamMembers = [
  {
    name: "David Marshall",
    title: "SVP of Marketing",
    description:
      "David has over 20 years’ experience in AdTech, MarTech Sales with companies such as Yahoo!, Publicis, WPP...",
    img: "/images/david.jpg",
    linkedin: true,
  },
  {
    name: "Alvin Heib",
    title: "CPO",
    description: "Same description as David...",
    img: Alvin,
    linkedin: true,
  },
  {
    name: "Ben Owen",
    title: "Founder & CEO",
    description: "Same description as David...",
    img: Ben,
    linkedin: true,
  },
  {
    name: "Romain Picard",
    title: "Investor & Advisor",
    description: "Same description as David...",
    img: Romain,
    linkedin: true,
  },
  {
    name: "Emma Collins",
    title: "COO",
    description: "Same description as David...",
    img: Emma,
    linkedin: true,
  },
  {
    name: "Marcus Reid",
    title: "CMO",
    description: "Same description as David...",
    img: Marcus,
    linkedin: true,
  },
  {
    name: "Julia Bennett",
    title: "Head of Design",
    description: "Same description as David...",
    img: Julia,
    linkedin: true,
  },
  {
    name: "Ryan Blake",
    title: "Lead Software Engineer",
    description: "Same description as David...",
    img: Ryan,
    linkedin: true,
  },
];

export default function TeamSection() {
  return (
    <section className="w-full bg-[#fdfdfd] text-black font-sora">
      <div className="2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 pb-9">
        {/* Heading + Description */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-6 mb-16">
          {/* Left: Paragraph */}
          <p className="text-gray-700 max-w-3xl text-base leading-relaxed text-left lg:text-left">
            Founded by a team of seasoned AI, cloud, and data experts, Atelic AI
            was created to cut through the noise and hype of generic AI
            solutions. <em>We exist to deliver true business value</em> through
            context-aware, ROI-driven implementations that solve real-world
            problems — not just pilot experiments.
          </p>

          {/* Right: Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold whitespace-nowrap text-right lg:text-right">
            Team <span className="text-black">Atelic</span>
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
                    <Image
                      src={member.img}
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
                  {member.linkedin && (
                    <div className="absolute top-4 right-4 z-20">
                      <Image
                        src={LinkedinLogo}
                        alt="LinkedIn"
                        width={42}
                        height={42}
                      />
                    </div>
                  )}
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
