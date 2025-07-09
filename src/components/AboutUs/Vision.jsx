import Image from "next/image";
import React from "react";
import VisionImage from "../../../assets/Vision.png";
import AtelicLogo from "../../../assets/AtelicLogoAbout.jpg"; // Replace with correct path
// import MissionBG from "../../../assets/mission-waves.png"; // If you have a background SVG/pattern

const Vision = () => {
  return (
    <>
      {/* --- Vision Section --- */}
      <section className="font-sora relative bg-white text-black w-full max-w-[1920px] mx-auto overflow-hidden py-12">
        {/* Background Box (Fixed Height & Centered) */}
        <div className="absolute inset-0 flex justify-center 2xl:px-[100px] items-center z-0 pointer-events-none">
          <div className="w-[90%] lg:h-[750px] bg-[#E8E8E8]"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch 2xl:px-[178px] mx-auto px-4 sm:px-6 xl:px-12">
          {/* LEFT: Image breaking outside the background box */}
          <div className="w-full lg:w-1/2 flex items-center justify-start py-8 relative">
            <div className="relative w-[1044px] max-w-[1044px] h-[670px] overflow-hidden 2xl:-ml-[177px]">
              <Image
                src={VisionImage}
                alt="Our Vision"
                fill
                className="object-cover scale-125 rounded-[20px]"
                priority
              />
            </div>
          </div>

          {/* RIGHT: Text Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-4 sm:px-10 md:px-14 xl:px-20 text-center lg:text-left">
            <div className="w-full max-w-[600px]">
              <h2 className="text-3xl sm:text-4xl 2xl:text-[60px] font-light mb-6 2xl:mb-14">
                Our <span className="font-semibold">Vision</span>
              </h2>
              <p className="text-black/60 2xl:text-[22px] font-light text-base xl:text-lg mb-7 2xl:leading-relaxed">
                Our Vision is to create value within the AI ecosystem by
                building success & trust with our customers.
              </p>
              <p className="text-black/60 2xl:text-[22px] font-light text-base xl:text-lg mb-6 2xl:leading-relaxed">
                Our purpose in this third wave of computing, is to be the best
                Enterprise grade AI solution provider in the world, focused on
                real customer ROI.
              </p>
              <button className="bg-[#F21B2A] hover:bg-red-700 transition text-white px-11 py-3 rounded-md text-sm sm:text-base">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission Section --- */}
      <section className="w-full bg-[#fdfdfd] text-black py-20 relative font-sora">
        <div className="2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center justify-between">
          {/* LEFT: Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-10">
            <div className="relative z-10 lg:space-y-12">
              <h2 className="text-3xl sm:text-4xl xl:text-5xl 2xl:text-[60px] font-light mb-9">
                Our <span className="font-semibold">Mission</span>
              </h2>
              <p className="text-black/60 text-base xl:text-lg 2xl:text-[22px] mb-9  mx-auto lg:mx-0 2xl:leading-normal font-light ">
                Our Mission is to simplify the complexity of AI, by providing
                real business solutions that help problem solve & drive ROI.
              </p>
              <button className="bg-[#F21B2A] hover:bg-red-700 transition text-white px-11 py-3 rounded-md text-sm sm:text-base">
                Read More
              </button>
            </div>

            {/* OPTIONAL: Background SVG Lines */}
            {/* <div className="absolute top-0 left-0 w-full h-full -z-10">
              <Image
                // src={MissionBG}
                alt="Mission Background"
                fill
                className="object-cover opacity-90"
              />
            </div> */}
          </div>

          {/* CENTER LINE: Gradient Divider */}
          <div
            className="hidden lg:block w-[2px] h-[300px] mx-10 border-l-2 border-solid"
            style={{
              borderImage:
                "linear-gradient(180deg, #FFBABF 0%, #F21B2A 60.76%, #FFC8CC 100%) 1",
            }}
          ></div>

          {/* RIGHT: Logo Image */}

          <div className="w-full lg:w-1/2 relative h-[300px] flex justify-center lg:justify-start mt-10 lg:mt-0">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-full max-w-[700px] h-full px-6 sm:px-10 lg:px-0">
              <Image
                src={AtelicLogo}
                alt="Atelic Logo"
                fill
                className="lg:object-cover object-none mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>
        <div className="2xl:px-[178px] md:px-12 lg:px-[100px] py-10">
          <div
            className=" mx-auto mt-16"
            style={{
              borderWidth: 1,
              borderColor: "black",
              opacity: 0.18,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Vision;
