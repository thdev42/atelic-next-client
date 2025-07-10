"use client";

import React from "react";
import Image from "next/image";
import Ai1 from "../../../assets/Ai1.jpg";
import Ai2 from "../../../assets/Ai2.jpg";
import Ai3 from "../../../assets/Ai3.jpg";

const teamMembers = [
  {
    name: "Next-Gen LLM's",
    // title: "Founder & CEO",
    image: Ai1,
    description:
      "There are ethical & security concerns with Al's application, but as Tech Target points out. there are issues such as bias - which may be hard to identify & remove- & hallucinations-when an Al engine provides a wrong answer.-WEF",
  },
  {
    name: "Agentic Solutions",
    // title: "CTO",
    image: Ai2,
    description:
      "Expect Al agents to play a significant role in software development & security. Future trends may include more sophisticated decision-making processes, integration with existing tools, & enhanced collaboration-GitHub",
  },
  {
    name: "Quantum Al Compute Power",
    // title: "Chief Marketing Officer",
    image: Ai3,
    description:
      "Will re-shape our world with the ability to analyze vast data, recognize complex patterns, & make predictions with a level of accuracy & speed that was previously thought impossible.Forbes",
  },
];

const AiInsights = () => {
  return (
    <section className="font-raleway relative bg-[#f3f0f1] text-black w-full max-w-[1920px] mx-auto overflow-hidden py-16">
      <div className="2xl:px-[178px] px-4 sm:px-6 xl:px-12 gap-12">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-[60px] font-light text-center mb-16">
          Our <span className="font-semibold">Team</span>
        </h2>

        <div className="space-y-24">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              } items-center gap-x-36`}
            >
              {/* Image */}
              <div
                className={`w-full lg:w-1/2 flex ${
                  index % 2 !== 0 ? "justify-end" : "justify-start"
                } md:mx-auto`}
              >
                <div className="relative w-full max-w-[770px] max-h-[498px] aspect-[614/582]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold md:mt-0 mt-6 text-gray-900">
                  {member.name}
                </h3>
                <div
                  className="mt-3"
                  style={{
                    borderWidth: 1,
                    borderColor: "red",
                    maxWidth: 40,
                  }}
                />
                <p className="text-sm text-gray-500 py-4">{member.title}</p>
                <p className="text-black/80 text-base xl:text-lg 2xl:text-[22px] mb-9  mx-auto lg:mx-0 2xl:leading-relaxed font-light">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiInsights;
