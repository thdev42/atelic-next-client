"use client";

import { useState } from "react";
import ResultBg from "../../../assets/ResultBg.jpg";
import { seekingSupport } from "@/data/data";
import OutputBot from "../../../assets/OutputBot.png";
import OutputBg from "../../../assets/OutputBg.png";
import Image from "next/image";

export default function FinalResult({ data, onBack }) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(""); // selected id
  const [selectedGoal, setSelectedGoal] = useState(""); // selected subOption id
  const [outputText, setOutputText] = useState("");
  const [slideDirection, setSlideDirection] = useState(""); // "slide-left" or "slide-right"
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  console.log(data, "DATA");

  const selectedCategoryObj = seekingSupport.find(
    (cat) => cat.id === selectedCategory
  );

  const goalsStep2 = selectedCategoryObj?.subOptions || [];

  const handleStepChange = (newStep, direction) => {
    setSlideDirection(direction);
    setTimeout(() => {
      setStep(newStep);
      setSlideDirection("");
    }, 300);
  };

  const handleSubmitStep1 = () => {
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }
    handleStepChange(2, "slide-left");
  };

  const handleFinalSubmit = () => {
    if (!selectedGoal) {
      alert("Please select a business goal.");
      return;
    }

    // Start loading sequence
    setIsLoading(true);
    setLoadingProgress(0);
    handleStepChange(3, "slide-left");

    // Simulate AI processing with realistic loading messages
    const loadingMessages = [
      "Analyzing your requirements...",
      "Processing data with AI...",
      "Generating personalized recommendations...",
      "Finalizing your custom solution...",
    ];

    let messageIndex = 0;
    setLoadingText(loadingMessages[0]);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);

    const loadingInterval = setInterval(() => {
      messageIndex++;
      if (messageIndex < loadingMessages.length) {
        setLoadingText(loadingMessages[messageIndex]);
      }
    }, 1200);

    // Complete loading after 5-6 seconds
    setTimeout(() => {
      clearInterval(loadingInterval);
      clearInterval(progressInterval);
      setLoadingProgress(100);

      setTimeout(() => {
        const goalLabel =
          goalsStep2.find((g) => g.id === selectedGoal)?.show || "";
        setOutputText(goalLabel);
        setIsLoading(false);

        // Start typing animation
        setIsTyping(true);
        setDisplayedText("");

        let currentIndex = 0;
        const typingSpeed = 50; // milliseconds per character

        const typeText = () => {
          if (currentIndex < goalLabel.length) {
            setDisplayedText(goalLabel.substring(0, currentIndex + 1));
            currentIndex++;
            setTimeout(typeText, typingSpeed);
          } else {
            setIsTyping(false);
          }
        };

        // Start typing after a small delay
        setTimeout(typeText, 300);
      }, 500);
    }, 5500);
  };

  const handleBack = () => {
    handleStepChange(1, "slide-right");
  };

  return (
    <div
      className="p-9 font-sora min-h-screen text-white flex items-center justify-center px-4 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          step === 3 ? ` url(${OutputBg.src})` : ` url(${ResultBg.src})`,
        backgroundColor: step === 3 && "#1B1B1B",
        backgroundBlendMode: "lighten",
      }}
    >
      <div
        className={`${
          step === 3 ? "" : "max-w-6xl"
        } w-full z-10 text-center transition-all duration-300 ease-in-out ${
          slideDirection === "slide-left"
            ? "transform -translate-x-full opacity-0"
            : slideDirection === "slide-right"
            ? "transform translate-x-full opacity-0"
            : "transform translate-x-0 opacity-100"
        }`}
      >
        {/* Step 1 */}
        {step === 1 && (
          <>
            <h1 className="text-2xl md:text-2xl font-medium mb-10">
              I am seeking support in:
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-5 mb-10">
              {seekingSupport.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-4 rounded-full text-sm font-medium border border-white transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? "bg-gray-400 text-black"
                      : "bg-white text-black bg-transparent hover:bg-[#CACACA] hover:text-black"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmitStep1}
              className="max-w-xs w-full backdrop-blur-md bg-white/10 text-white px-12 py-4 rounded-full border border-white hover:bg-white/20 transition-all duration-300"
            >
              NEXT
            </button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h1 className="text-2xl md:text-2xl font-medium mb-10">
              {`Select ${selectedCategoryObj?.label} Support:`}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-5 mb-10">
              {goalsStep2.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`py-4 rounded-full text-sm font-medium border border-white transition-all duration-200 ${
                    selectedGoal === goal.id
                      ? "bg-[#CACACA] text-black"
                      : "bg-white text-black bg-transparent hover:bg-[#CACACA] hover:text-black"
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleBack}
                className="px-8 py-3 rounded-full border border-white text-white hover:bg-white/10"
              >
                Back
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-8 py-3 rounded-full border border-white bg-white/10 text-white hover:bg-white/20"
              >
                Submit
              </button>
            </div>
          </>
        )}

        {/* Step 3 - AI Loading & Result Screen */}
        {step === 3 && (
          <div className="w-full h-screen relative z-10">
            {isLoading ? (
              // Loading Screen with Bottom Progress Bar
              <>
                {/* Desktop Loading Layout */}
                <div className="hidden lg:flex items-center justify-center h-full relative">
                  {/* AI Robot Image - Centered */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={OutputBot}
                      alt="AI Robot"
                      width={810}
                      height={1216}
                      className="object-contain animate-pulse
                   sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-max"
                    />
                  </div>

                  {/* Bottom Progress Area */}
                  <div className="absolute bottom-0 left-0 right-0  backdrop-blur-sm  p-8">
                    <div className="max-w-2xl mx-auto text-center">
                      <div className="mb-6">
                        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-lg 2xl:text-xl font-medium">
                          {loadingText}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full rounded-full h-3 mb-4">
                        <div
                          className="bg-gradient-to-r from-black via-purple-600 to-violet-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${loadingProgress}%` }}
                        ></div>
                      </div>

                      {/* Progress Dots */}
                      <div className="flex justify-center space-x-2">
                        <div
                          className="w-3 h-3 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Loading Layout */}
                <div className="lg:hidden flex flex-col items-center justify-center h-full relative">
                  {/* Mobile: AI Robot Image */}
                  <div className="flex-shrink-0 mb-6 flex-1 flex items-center justify-center">
                    <Image
                      src={OutputBot}
                      alt="AI Robot"
                      width={800}
                      height={600}
                      className="object-contain w-auto max-h-[500px] animate-pulse"
                      priority
                    />
                  </div>

                  {/* Mobile: Bottom Progress Area */}
                  <div className="w-full bg-black/20 backdrop-blur-sm border-t border-white/10 p-6">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-white text-base font-medium px-4">
                          {loadingText}
                        </p>
                      </div>

                      {/* Mobile Progress Bar */}
                      <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                        <div
                          className="bg-gradient-to-r from-black via-purple-600 to-violet-500 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${loadingProgress}%` }}
                        ></div>
                      </div>

                      {/* Mobile Progress Dots */}
                      <div className="flex justify-center space-x-2">
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Final Result Screen (unchanged)
              <>
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
                  <div className="flex justify-end mr-44 items-center pr-8 lg:pr-16">
                    <div className="relative bg-white mb-96 text-black text-xl 2xl:text-2xl p-8 rounded-[50px] shadow-2xl font-medium animate-slideInRight">
                      <p className="leading-relaxed">
                        {displayedText}
                        {isTyping && <span className="animate-pulse">|</span>}
                      </p>

                      {/* Long speech bubble tail pointing left from bottom */}
                      <div className="absolute left-7 rotate-[-25deg] -bottom-3 transform -translate-x-full">
                        {/* Main tail triangle - longer and positioned at bottom */}
                        <div className="relative">
                          <div className="w-0 h-0 border-t-[60px] border-t-transparent border-b-[10px] border-b-transparent border-r-[70px] border-r-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex flex-col items-center justify-center h-full animate-fadeIn">
                  {/* Mobile: AI Robot Image */}
                  <div className="flex-shrink-0 mb-6">
                    <Image
                      src={OutputBot}
                      alt="AI Robot"
                      width={800}
                      height={600}
                      className="object-contain w-auto max-h-[700px]"
                      priority
                    />
                  </div>

                  {/* Mobile: Speech Bubble */}
                  <div className="w-full max-w-md">
                    <div className="relative bg-white text-black text-base p-6 rounded-3xl shadow-2xl font-medium animate-slideInUp">
                      <p className="leading-relaxed text-center">
                        We {displayedText}
                        {isTyping && <span className="animate-pulse">|</span>}
                      </p>

                      {/* Mobile speech bubble tail pointing up to robot */}
                      <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
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
