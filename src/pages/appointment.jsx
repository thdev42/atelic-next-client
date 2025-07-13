"use client";

import { useEffect, useState } from "react";
// import OutputBot from "../../assets/OutputBot.png";
import OutputBg from "../../assets/OutputBg.png";
import OutputBot from "../../assets/RobotAppointment.png";
import Image from "next/image";
import { useBackground } from "@/context/BackgroundContext";

export default function FinalResult() {
  const [step, setStep] = useState(3);
  const { setIsShowNav } = useBackground();
  const [slideDirection, setSlideDirection] = useState(""); // "slide-left" or "slide-right"

  useEffect(() => {
    setIsShowNav(false);
  }, []);

  return (
    <div
      className="p-9 font-sora min-h-screen text-white flex items-center justify-center px-4 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: ` url(${OutputBg.src})`,
        backgroundColor: step === 3 && "#1B1B1B",
        backgroundBlendMode: "lighten",
      }}
    >
      <div
        className={`${""} w-full z-10 text-center transition-all duration-300 ease-in-out ${
          slideDirection === "slide-left"
            ? "transform -translate-x-full opacity-0"
            : slideDirection === "slide-right"
            ? "transform translate-x-full opacity-0"
            : "transform translate-x-0 opacity-100"
        }`}
      >
        <div className="w-full h-screen relative z-10">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between animate-fadeIn">
            {/* Left: AI Robot Image - Starting from very left */}
            <div className="flex-shrink-0 flex items-end justify-start -ml-4">
              <Image
                src={OutputBot}
                alt="AI Robot"
                width={810}
                height={1216}
                className="object-contain object-bottom 
                   sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-max"
              />
            </div>

            {/* Right: Speech Bubble */}
            <div className="flex justify-end  items-center pr-8 lg:pr-16 w-full max-w-2xl">
              <form className=" text-black p-8 rounded-[50px] shadow-2xl w-full space-y-6">
                <h2 className="text-white text-left text-2xl font-semibold">
                  Book An Appointment
                </h2>

                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-6 py-4 rounded-[50px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-base"
                  />
                  <input
                    type="tel"
                    placeholder="Phone No"
                    className="w-full px-6 py-4 rounded-[50px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-base"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 rounded-[50px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-base"
                />

                <input
                  type="text"
                  placeholder="Industry"
                  className="w-full px-6 py-4 rounded-[50px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-base"
                />

                <button
                  type="submit"
                  className="w-full text-white font-semibold px-6 py-4 rounded-[50px] text-base transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.19)",
                    border: "3px solid rgba(255, 255, 255, 1)",
                    backdropFilter: "blur(19.2px)",
                    WebkitBackdropFilter: "blur(19.2px)", // for Safari support
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
              <form className=" text-black p-6 rounded-3xl shadow-2xl w-full max-w-md mx-auto space-y-4">
                <h2 className="text-xl text-white font-semibold text-center">
                  Book An Appointment
                </h2>

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-5 py-4 rounded-[50px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-base"
                />
                <input
                  type="tel"
                  placeholder="Phone No"
                  className="w-full px-5 py-4 rounded-[50px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-base"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-5 py-4 rounded-[50px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-base"
                />
                <input
                  type="text"
                  placeholder="Industry"
                  className="w-full px-5 py-4 rounded-[50px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-base"
                />
                <button
                  type="submit"
                  className="w-full text-white font-semibold px-5 py-4 rounded-[50px] text-base"
                  style={{
                    background: "rgba(255, 255, 255, 0.19)",
                    border: "3px solid rgba(255, 255, 255, 1)",
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
  );
}
