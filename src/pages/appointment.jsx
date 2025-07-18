"use client";

import { useEffect, useState } from "react";
// import OutputBot from "../../assets/OutputBot.png";
import OutputBg from "../../assets/OutputBg.png";
import OutputBot from "../../assets/RobotAppointment.png";
import Image from "next/image";
import { useBackground } from "@/context/BackgroundContext";
import Footer from "@/components/Footer/Footer";
import ParticlesComp from "@/components/Particles/Particles";

export default function FinalResult() {
  const [step, setStep] = useState(3);
  const { setIsShowNav, setBackground } = useBackground();
  const [slideDirection, setSlideDirection] = useState(""); // "slide-left" or "slide-right"

  useEffect(() => {
    // setIsShowNav(false);
    setBackground("#fdfdfd", "color");
  }, []);

  return (
    <section>
      <div
        className="lg:max-h-[600px] xl:max-h-[700px] 2xl:max-h-[800px]  p-9 font-sora h-full text-white flex items-center justify-center px-4 relative overflow-hidden bg-cover bg-center"
        style={{
          // backgroundImage: ` url(${OutputBg.src})`,
          backgroundColor: step === 3 && "#fdfdfd",
          backgroundBlendMode: "lighten",
        }}
      >
        <ParticlesComp />
        <div
          className={`${""} w-full z-50 text-center transition-all duration-300 ease-in-out ${
            slideDirection === "slide-left"
              ? "transform -translate-x-full opacity-0"
              : slideDirection === "slide-right"
              ? "transform translate-x-full opacity-0"
              : "transform translate-x-0 opacity-100"
          }`}
        >
          <div className="w-full relative">
            {/* Desktop Layout */}
            <div className="z-50 hidden lg:flex items-center justify-center animate-fadeIn">
              {/* Left: AI Robot Image - Starting from very left */}
              <div className=" flex-shrink-0 flex">
                <Image
                  src={OutputBot}
                  alt="AI Robot"
                  width={800}
                  // height={1216}
                  className="object-contain object-bottom 
                   sm:max-w-sm md:max-w-xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-max"
                />
              </div>

              {/* Right: Speech Bubble */}
              <div className="flex pr-8 lg:pr-16 w-full 2xl:max-w-4xl  max-w-2xl">
                <form className="text-black p-8 rounded-[50px] min-w-[500px] w-full space-y-6">
                  <h2 className="text-black  text-left md:text-2xl py-10 lg:text-3xl 2xl:text-[40px] font-semibold">
                    Book An Appointment
                  </h2>

                  <div className="flex flex-col md:flex-row gap-6">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full bg-[#EFEFEF] border border-[#C8C8C8] 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] transition-colors focus:outline-none focus:ring-0"
                    />
                    <input
                      type="tel"
                      placeholder="Phone No"
                      className="w-full bg-[#EFEFEF] border border-[#C8C8C8] 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] transition-colors focus:outline-none focus:ring-0"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-[#EFEFEF] border border-[#C8C8C8] 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] transition-colors focus:outline-none focus:ring-0"
                  />

                  <input
                    type="text"
                    placeholder="Industry"
                    className="w-full bg-[#EFEFEF] border border-[#C8C8C8] 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] transition-colors focus:outline-none focus:ring-0"
                  />

                  <button
                    type="submit"
                    className="w-full text-white 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] border-2 transition-colors focus:outline-none focus:ring-0"
                    style={{
                      background: "#335F86",
                      border: "3px solid #FFFFFF",
                      backdropFilter: "blur(19.2px)",
                      WebkitBackdropFilter: "blur(19.2px)", // For Safari
                    }}
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden flex flex-col items-center justify-center h-full animate-fadeIn">
              <div className="w-full px-4 mt-8">
                <form className="text-black p-6 rounded-3xl w-full max-w-md mx-auto space-y-4">
                  <h2 className=" text-black text-3xl font-semibold text-center">
                    Book An Appointment
                  </h2>

                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-[#EFEFEF] border border-[#C8C8C8] px-5 py-4 rounded-[50px] text-base focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone No"
                    className="w-full bg-[#EFEFEF] border border-[#C8C8C8] px-5 py-4 rounded-[50px] text-base focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-[#EFEFEF] border border-[#C8C8C8] px-5 py-4 rounded-[50px] text-base focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Industry"
                    className="w-full bg-[#EFEFEF] border border-[#C8C8C8] px-5 py-4 rounded-[50px] text-base focus:outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="w-full text-white font-semibold px-5 py-4 rounded-[50px] text-base"
                    style={{
                      background: "#335F86",
                      border: "3px solid #FFFFFF",
                      backdropFilter: "blur(19.2px)",
                      WebkitBackdropFilter: "blur(19.2px)",
                    }}
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }

          .animate-slideInRight {
            animation: slideInRight 0.6s ease-out 0.3s both;
          }

          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out 0.3s both;
          }

          /* Blinking cursor animation */
          @keyframes blink {
            0%,
            50% {
              opacity: 1;
            }
            51%,
            100% {
              opacity: 0;
            }
          }

          .animate-pulse {
            animation: blink 1s infinite;
          }
        `}</style>
      </div>
      <Footer />
    </section>
  );
}
