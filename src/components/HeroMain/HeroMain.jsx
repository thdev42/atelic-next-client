// components/HeroSection.jsx
import Image from "next/image";
import Robot from "../../../assets/AtelicRobot.png";
import BgPattern from "../../../assets/HeroWebRight.png";

const HeroSection = () => {
  return (
    <section className="py-10 lg:py-5 2xl:py-20 relative overflow-hidden">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-row w-full ">
          {/* Vertical Index */}
          {/* <div className="hidden md:flex flex-col items-center gap-6 pr-6">
            {[1, 2, 3, 4].map((num, idx) => (
              <div
                key={num}
                className={`text-sm font-semibold text-[#7E7E7E] ${
                  idx === 0
                    ? "relative text-black"
                    : "hover:text-black cursor-pointer"
                }`}
              >
                {num < 10 ? `0${num}` : num}
                {idx === 0 && (
                  <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 border border-black rounded-full" />
                )}
              </div>
            ))}
          </div> */}

          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-4xl font-sora font-normal text-black space-y-5 flex flex-col">
              <span>Simplifying AI.</span>
              <span>Building Trust.</span>
              <span className="text-[#F02C2C] font-bold">Delivering ROI.</span>
            </h1>

            <p className="font-sora text-gray-600 mt-6 max-w-lg">
              Atelic AI helps enterprises unlock real value from AI by solving
              complex challenges with secure, customized, industry-specific
              solutions.
            </p>

            <div className="font-poppins mt-8 flex gap-4 flex-wrap">
              <button className="text-xs  bg-[#0A3C66] text-white px-4 py-2 rounded-md hover:bg-[#082c4e]">
                Book a Consultation
              </button>
              <button className="text-xs bg-[#E5EAF0] text-[#0A3C66] px-4 py-2 rounded-md hover:bg-[#d3dbe3]">
                Explore Our Approach
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full relative">
          {/* Optional Pattern Background */}
          <Image
            src={BgPattern}
            alt="Background Pattern"
            className="absolute"
            // width="1290px"
          />
          <Image
            src={Robot}
            alt="AI Robot"
            className="w-full h-auto z-10 object-contain"
          />

          {/* Robot Image */}

          {/* Floating Stat Card Top Right */}
          <div className="font-poppins absolute  w-[210px] h-[170px] top-6 right-6 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4  flex flex-col justify-center">
            <p className="text-4xl font-normal text-black">30%</p>
            <p className="text-xs  font-thin text-black/60">
              of GenAI projects will be abandoned after proof{" "}
              <span className="underline cursor-pointer">Learn More</span>
            </p>
          </div>

          {/* Floating Stat Card Bottom Left */}
          <div className="font-poppins absolute w-[210px] h-[170px] bottom-6 left-0 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col justify-center">
            <p className="text-4xl font-normal text-black mb-2">42%</p>
            <p className="text-xs  font-thin text-black/60 leading-snug">
              of respondents don’t fully understand the benefits of AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
