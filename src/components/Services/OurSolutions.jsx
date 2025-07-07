import React from "react";
import Image from "next/image";
import cube from "../../../assets/cube-group.png";

const features = [
  {
    id: "01",
    icon: cube,
    text: "We are experts at listening & bring big ideas. We work backwards from customer needs with Industry subject matter experts who understands the business.",
  },
  {
    id: "02",
    icon: cube,
    text: "Our MVPs are pre-built Atelic 'Supervisory' Agents that operate across Oil, Gas, Financial Services & the Public Sector.",
  },
  {
    id: "03",
    icon: cube,
    text: "We are building a revolutionary enterprise ready new foundation for trust, providing cryptographic levers & blockchain resilience that secure transactions.",
  },
];

const OurSolutions = () => {
  return (
    <section className="bg-[#EBEBEB] max-w-[1920px] mx-auto w-full py-10 relative overflow-hidden">
      <div className="font-sora md:mt-20 px-4 text-black sm:px-8 md:px-12 xl:px-[178px] mx-auto">
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-medium text-black">
              Our <span className="font-bold">Solutions</span>
            </h2>
          </div>
          <div>
            <p className="text-base md:text-lg text-gray-700">
              Our Solution is to simplify the complexity of Artificial
              Intelligence, by providing problem solving and real business
              solutions...
            </p>
          </div>
        </div>

        {/* Cards */}
        <section className="flex flex-wrap justify-center gap-5 pt-16">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative w-full sm:w-[48%] xl:w-[32%] max-w-[518px] lg:h-[373px] p-6 md:p-8 transition-all duration-300 border border-transparent hover:bg-white"
            >
              {/* Gradient Border */}
              <div
                className="absolute inset-0 rounded-[10px] p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  background:
                    "linear-gradient(130.05deg, #F21B2A 10.37%, #335F86 49.51%, #F21B2A 94.03%)",
                }}
              >
                <div className="w-full h-full rounded-[10px] bg-white"></div>
              </div>

              {/* Top Icon */}
              <div className="flex justify-start relative z-10">
                <Image src={feature.icon} alt="Icon" className="mb-14" />
              </div>

              {/* Index number only on hover */}
              <div className="absolute top-5 right-5 text-4xl font-semibold text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                {feature.id}
              </div>

              {/* Text */}
              <p className="text-sm md:text-[16px] text-gray-700 leading-relaxed relative z-10">
                {feature.text}
                <span className="underline ml-1 cursor-pointer">Read More</span>
              </p>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default OurSolutions;
