import React from "react";
import IceBergImage from "../../../assets/iceberg-tech.png";
import IceBergBg from "../../../assets/red-pattern-bg.png";
import Image from "next/image";
export const Services = () => {
  return (
    <section className=" max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative bg-gray-100 px-6 lg:px-8">
      {/* Background Pattern - positioned in bottom right */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-100">
        <Image
          src={IceBergBg}
          alt=""
          //   width={1184}
          //   height={900}
          fill
          //   className="object-contain object-bottom-right"
        />
      </div>

      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] relative mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* How we work heading */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gray-400"></div>
              <span className="text-gray-600 text-sm font-medium">
                How we work
              </span>
            </div>

            {/* Main heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Services & <span className="text-red-500">Solutions</span>
            </h2>

            {/* Description paragraphs */}
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Our SaaS² model flips the script by solving the 5 most common AI
                adoption barriers: siloed data, untrustworthy outputs, stack
                incompatibility, lack of expertise, and fear of rapid
                obsolescence.
              </p>

              <p>
                Atelic AI goes beyond traditional software — we provide
                pre-built agentic AI accelerators tailored to specific
                industries like Energy, Financial Services, and Healthcare.
              </p>
            </div>

            {/* CTA Button */}
            <button
              className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-md font-medium"
              size="lg"
            >
              Meet The Founders
            </button>
          </div>

          {/* Right Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Image
                src={IceBergImage}
                alt="AI Technology Iceberg Illustration"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
