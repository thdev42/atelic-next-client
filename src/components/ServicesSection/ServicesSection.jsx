"use client";
import { useEffect } from "react";
import Image from "next/image";
import Iceberg from "../../../assets/servicesiceberg.png";
import AOS from "aos";
// import "aos/dist/aos.css";
import { Parallax } from "react-scroll-parallax";
import { API_BASE_URL } from "@/config/config";
const formatHeading = (text) => {
  if (!text) return null;

  const words = text.trim().split(" ");
  if (words.length === 0) return null;

  const lastWord = words.pop();
  const rest = words.join(" ");

  return (
    <>
      {rest}
      <br />
      <span className="font-bold">{lastWord}</span>
    </>
  );
};
export default function ServicesSection({ data }) {
  console.log(data, "DATA");
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: true,
  //     offset: 100,
  //   });
  // }, []);

  return (
    <section className="z-10 font-sora overflow-hidden bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-16 min-h-screen relative">
      {/* <Parallax speed={10}> */}
      <div className="px-4 sm:px-8 2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="block sm:hidden">
            {/* Mobile version without parallax */}
            <div className="space-y-14 relative">
              {/* Mobile background image - only visible on mobile */}
              <div
                className="sm:hidden absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: `url(${API_BASE_URL}${data?.image?.url})`,
                  zIndex: -1,
                }}
              ></div>

              {/* Heading with fade-in */}
              <div
                className="space-y-4 relative z-10"
                // data-aos="fade-up"
              >
                <h2 className="text-3xl sm:text-4xl md:text-[41px] 2xl:text-6xl font-light text-black">
                  {formatHeading(data?.heading)}
                </h2>
              </div>

              {/* Paragraph from left */}
              <p
                className="text-black text-base 2xl:text-[22px] font-light sm:text-lg 2xl:leading-9 relative z-10"
                // data-aos="fade-right"
                // data-aos-delay="200"
              >
                {data?.subHeading}
              </p>

              {/* Button from left */}
              <button
                className="bg-[#335F86] hover:bg-slate-700 text-[16px] text-white px-9 2xl:w-[200px] py-3 rounded-[8px] font-light transition-colors duration-200 relative z-10"
                // data-aos="fade-right"
                // data-aos-delay="400"
              >
                {data?.primaryButton}
              </button>
            </div>
          </div>

          {/* Desktop version with parallax */}
          <Parallax speed={20} className="hidden sm:block">
            <div className="space-y-14 relative">
              {/* Mobile background image - only visible on mobile */}
              <div
                className="sm:hidden absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                  backgroundImage: `url(${API_BASE_URL}${data?.image?.url})`,
                  zIndex: -1,
                }}
              ></div>

              {/* Heading with fade-in */}
              <div
                className="space-y-4 relative z-10"
                // data-aos="fade-up"
              >
                <h2 className="text-4xl sm:text-5xl 2xl:text-[60px] lg:text-6xl font-light text-black">
                  {formatHeading(data?.heading)}
                </h2>
              </div>

              {/* Paragraph from left */}
              <p
                className="text-black text-base 2xl:text-[22px] font-light sm:text-lg 2xl:leading-9 relative z-10"
                // data-aos="fade-right"
                // data-aos-delay="200"
              >
                {data?.subHeading}
              </p>

              {/* Button from left */}
              <button
                className="bg-[#335F86] hover:bg-slate-700 text-[16px] text-white px-9 2xl:w-[200px] py-3 rounded-[8px] font-light transition-colors duration-200 relative z-10"
                // data-aos="fade-right"
                // data-aos-delay="400"
              >
                {data?.primaryButton}
              </button>
            </div>
          </Parallax>

          {/* Right Column - Image from right */}
          {/* <Parallax speed={30} translateX={["150px", "0px"]}> */}
          <div className=" sm:flex hidden justify-center lg:justify-end">
            <div className="relative">
              <div
                className="relative p-8 aspect-square flex items-center justify-center"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div className="relative">
                  <img
                    src={`${API_BASE_URL}${data?.image?.url}`}
                    alt="AI Solutions Visualization - Digital iceberg showing visible AI solutions above and complex infrastructure below"
                    width={1024}
                    height={1024}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          {/* </Parallax> */}
        </div>

        <div
          style={{ borderWidth: 1, opacity: 0.15 }}
          className="mt-36 w-full border-1 border-black"
        ></div>
      </div>
      {/* </Parallax> */}
    </section>
  );
}
