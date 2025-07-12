"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Amanda from "../../../assets/Amanda.jpg";
import Richard from "../../../assets/Richard.jpg";
import Natalie from "../../../assets/Natalie.jpg";
import James from "../../../assets/James.jpg";
import Lena from "../../../assets/Lena.jpg";
import Victor from "../../../assets/Victor.jpg";

import InstagramIcon from "../../../assets/Insta.png";
import LinkedinIcon from "../../../assets/Linkedin.png";
import XIcon from "../../../assets/Twitter.png";
import { API_BASE_URL } from "@/config/config";

const iconMap = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
};

const advisors = [
  {
    name: "Dr. Amanda Fields",
    title: "Tech Strategy Advisor",
    description:
      "With over 20 years in AI and enterprise systems, Amanda provides strategic direction for emerging tech innovation.",
    image: Amanda,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "Richard Voss",
    title: "Finance & Growth Advisor",
    description:
      "A seasoned VC partner, Richard helps guide financial planning and long-term growth strategies.",
    image: Richard,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "Natalie Chen",
    title: "Product & UX Advisor",
    description:
      "Former Head of Design at a Fortune 500 firm, Natalie offers deep insight into user experience and product development.",
    image: Natalie,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "James Ortega",
    title: "Global Expansion Advisor",
    description:
      "With a background in international business, James advises on scaling operations and entering new markets.",
    image: James,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "Lena Hoffman",
    title: "Legal & Compliance Advisor",
    description:
      "An expert in tech law and regulatory compliance, Lena ensures we grow with integrity and trust.",
    image: Lena,
    socials: ["instagram", "linkedin", "x"],
  },
  {
    name: "Victor Raymond",
    title: "Innovation & R&D Advisor",
    description:
      "A thought leader in emerging technologies, Victor guides our research and development strategy to stay ahead of the curve.",
    image: Victor,
    socials: ["instagram", "linkedin", "x"],
  },
];

export const Advisors = ({ sections }) => {
  const advisors = Array.isArray(sections?.teamMembers)
    ? sections?.teamMembers
    : [];

  return (
    <section className="font-sora relative bg-[#E8E8E8] text-black w-full max-w-[1920px] mx-auto overflow-hidden py-16">
      <div className="2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 text-left">
        <h2 className="text-4xl md:text-5xl font-light">
          Our <span className="font-bold">Advisors</span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-3xl">
          Our advisors bring decades of industry knowledge and strategic
          insight. They help us navigate challenges and scale with confidence.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisors.map((advisor, index) => (
            <motion.div
              key={index}
              whileHover={{ backgroundColor: "#ffffff" }}
              className="w-full max-w-[496px] h-[319px]  bg-[#E8E8E8] border border-black/50 hover:border-white hover:shadow-md rounded-[29px] p-6 mx-auto flex flex-col items-start justify-start text-left transition-all duration-100"
            >
              <div className="w-full flex items-center justify-between mb-4">
                <img
                  src={`${API_BASE_URL}${advisor?.image?.url}`}
                  alt={advisor?.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div className="flex gap-3">
                  {advisor.icons.map((social, i) => (
                    <a className="cursor-pointer">
                      <img
                        key={i}
                        src={`${API_BASE_URL}${social?.logo?.url}`}
                        alt={social}
                        width={26}
                        height={26}
                        className="opacity-100 mix-blend-luminosity hover:opacity-100 transition-opacity duration-200"
                      />
                    </a>
                  ))}
                </div>
              </div>
              <h3 className="font-medium text-lg mt-1">{advisor.name}</h3>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                {advisor.title}
              </p>
              <p className="text-sm text-gray-700 mt-3">
                {advisor.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
