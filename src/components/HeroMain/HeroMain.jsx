// components/HeroSection.jsx
import Image from "next/image";
import Robot from "../../../assets/AtelicRobot.png";
import BgPattern from "../../../assets/HeroWebRight1.png";

const HeroSection = () => {
  return (
    <section className=" max-w-[1920px] mx-auto w-full py-10 lg:py-5 2xl:py-5 relative overflow-hidden">
      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex flex-row w-full ">
          <div className="font-poppins hidden xl:flex flex-col gap-4 2xl:ml-20 xl:ml-10 ml-0 items-center absolute left-0 top-1/2 -translate-y-1/2 z-20">
            {[1, 2, 3, 4].map((num, idx) => (
              <div
                key={num}
                className={`relative ${
                  idx === 0 ? "w-14 h-14" : "w-11 h-11"
                } flex items-center justify-center`}
              >
                <span className={`text-sm font-semibold z-10 ${"text-black"}`}>
                  {num < 10 ? `0${num}` : num}
                </span>

                {idx === 0 ? (
                  <span className="absolute w-14 h-14 rounded-full border-[2px] border-black rotate-[45deg] border-t-transparent"></span>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>

          <div>
            <h1 className="text-4xl 2xl:text-[60px] md:text-4xl font-sora font-normal text-black space-y-5 2xl:space-y-10 flex flex-col">
              <span>Simplifying AI.</span>
              <span>Building Trust.</span>
              <span className="text-[#F02C2C] font-bold">
                Delivering ROI<span className="text-black font-bold">.</span>{" "}
              </span>
            </h1>

            <p className="2xl:text-[22px] text-base font-sora 2xl:leading-normal text-gray-600 mt-6 2xl:mt-14 max-w-lg">
              Atelic AI helps enterprises unlock real value from AI by solving
              complex challenges with secure, customized, industry-specific
              solutions.
            </p>

            <div className="font-poppins mt-8 flex gap-4 flex-wrap">
              <button className="text-xs 2xl:text-[16px]  bg-[#335F86] text-white px-6 py-4 rounded-md hover:bg-[#082c4e]">
                Book a Consultation
              </button>
              <button className="text-xs 2xl:text-[16px]   bg-[#E5EAF0] text-[#0A3C66] px-6 py-4 rounded-md hover:bg-[#d3dbe3]">
                Explore Our Approach
              </button>
            </div>
          </div>
        </div>

        <div className="w-full relative flex justify-end">
          <div className="absolute right-0 top-0 2xl:w-full lg:w-[600px] h-full translate-x-1/4 ">
            <Image
              src={BgPattern}
              alt="Background Pattern"
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          </div>
          <div className="absolute right-0 top-0 h-full translate-x-15 hidden lg:block">
            <Image
              src={BgPattern}
              alt="Background Pattern"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative w-full lg:max-w-[600px] max-w-[500px]">
            <Image
              src={Robot}
              alt="AI Robot"
              className="w-full h-auto z-10 object-contain"
            />

            <div
              style={{ animation: "floatUpDown 5s ease-in-out infinite" }}
              className="font-poppins absolute xs:w-[180px] xs:h-[140px] w-[210px] h-[170px] 2xl:w-[240px] 2xl:h-[190px] top-6 -right-6 lg:top-14 lg:-right-6 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col "
            >
              <p className="text-4xl 2xl:text-[50px] font-normal 2xl:mt-2 mb-2 text-black">
                30%
              </p>
              <p className="text-xs 2xl:text-[16px] mt-2 font-thin text-black/60 leading-snug">
                of GenAI projects will be abandoned after proof{" "}
                <span className="underline cursor-pointer">Learn More</span>
              </p>
            </div>

            <div
              style={{ animation: "floatUpDown 5s ease-in-out infinite" }}
              className="font-poppins absolute w-[210px] h-[170px] 2xl:w-[240px] 2xl:h-[190px] bottom-0 left-0 2xl:bottom-40 2xl:-left-20 bg-white/40 rounded-[30px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] backdrop-blur-[10px] px-9 py-4 flex flex-col"
            >
              <p className="text-4xl 2xl:text-[50px] font-normal text-black 2xl:mt-2  mb-2">
                42%
              </p>
              <p className="text-xs 2xl:text-[16px] mt-2 font-thin text-black/60 leading-snug">
                of respondents don’t fully understand the benefits of AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
