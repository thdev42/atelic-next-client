"use client";

import React from "react";
import Image from "next/image";
import David from "../../../assets/DavidTeam.png";
import Alvin from "../../../assets/AlvinTeam.png";
import Ben from "../../../assets/BenTeam.png";
import Romain from "../../../assets/RomanTeam.png";
import Jhon from "../../../assets/JhonTeam.png";
import Emma from "../../../assets/Emma.jpg";
import Marcus from "../../../assets/Marcus.jpg";
import Julia from "../../../assets/Julia.jpg";
import Ryan from "../../../assets/Ryan.jpg";
import { formatHeading } from "../Partners/Partners";
import { API_BASE_URL } from "@/config/config";
const teamMembers = [
  {
    name: "Ben Owen",
    title: "Founder & CEO",
    image: Ben,
    description:
      "The Atelic Founder & CEO Has Over 25 Years' Experience In Enterprise Organizations, With A Focus On Data, AI Architecture & Infrastructure Readiness. As An Executive At IBM MEA, He Successfully Launched The WatsonX Product In The GCC, Leading $XXM Of ARR & Implementations. His Experience Spans Roles At AWS, SAP And Is The Founder Of 3 Previous Startups, 2 Of Which Have Had Successful Exits. He Is A Keynote Speaker On The Topic Of AI Integrations And Implementation.",
  },
  {
    name: "Romain Picard",
    title: "CTO",
    image: Romain,
    description:
      "Jane brings 20+ years of tech leadership in global cloud and AI organizations including Google Cloud and Microsoft Azure. She's passionate about scaling intelligent platforms and driving innovation in enterprise software.",
  },
  {
    name: "Alvin Heib",
    title: "Chief Marketing Officer",
    image: Alvin,
    description:
      "Alex is a seasoned marketing executive with experience across multiple unicorn startups. His expertise lies in digital brand strategy, user acquisition and go-to-market scaling.",
  },
  {
    name: "Simon Williams",
    title: "Chief Operating Officer",
    image: Jhon,
    description:
      "Emily leads operational excellence and strategic execution, ensuring cross-functional collaboration. She’s held leadership roles at Oracle and IBM in the past decade.",
  },
  {
    name: "David Chalklen",
    title: "VP of Engineering",
    image: David,
    description:
      "Michael heads the engineering team, blending product vision with technical depth. Formerly at AWS and Tesla AI Labs, he’s known for pushing scalable cloud systems.",
  },
];

const OurTeam = ({ sections }) => {
  const teamMembers = Array.isArray(sections?.teamMembers)
    ? sections?.teamMembers
    : [];

  return (
    <section className="font-sora relative bg-[#f3f0f1] text-black w-full max-w-[1920px] mx-auto overflow-hidden py-16">
      <div className="2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 gap-12">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-[60px] font-light text-center mb-16">
          {sections?.heading?.map((word, index) => (
            <span key={word.id} style={{ color: word.color }}>
              {word.text}
              {word.breakAfter ? <br /> : " "}
            </span>
          ))}
        </h2>

        <div className="space-y-24">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              } items-center gap-10`}
            >
              {/* Image */}
              <div
                className={`w-full lg:w-1/2 flex ${
                  index % 2 !== 0 ? "justify-end" : "justify-start"
                } md:mx-auto`}
              >
                <div className="relative w-full max-w-[614px] aspect-[614/582]">
                  <img
                    src={`${API_BASE_URL}${member?.image?.url}`}
                    alt={member?.name}
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {member?.name}
                </h3>
                <p className="text-sm text-gray-500 py-4">{member?.title}</p>
                <p className="text-black/80 text-base xl:text-lg 2xl:text-[22px] mb-9  mx-auto lg:mx-0 2xl:leading-relaxed font-light">
                  {member?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
