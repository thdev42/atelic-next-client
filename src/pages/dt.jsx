"use client";

import { useEffect, useState } from "react";
import ResultBg from "../../assets/ResultBg.jpg";
import { seekingSupport } from "@/data/data";
import OutputBot from "../../assets/OutputBot.png";
import OutputBg from "../../assets/OutputBg.png";
import Image from "next/image";
import { useBackground } from "@/context/BackgroundContext";
import { useRouter } from "next/router";
import ParticlesComp from "@/components/Particles/Particles";
import { useFormContext } from "@/context/FormContext";
import Footer from "@/components/Footer/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function FinalResult() {
  const { setIsShowNav, setBackground } = useBackground();
  const [step, setStep] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState(""); // selected id
  const [selectedGoal, setSelectedGoal] = useState(""); // selected subOption id
  const [outputText, setOutputText] = useState("");
  const [slideDirection, setSlideDirection] = useState(""); // "slide-left" or "slide-right"
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  //   console.log(data, "DATA");
  const router = useRouter();
  useEffect(() => {
    setBackground("#fdfdfd", "color");
    setIsShowNav(true);
  }, []);
  const { hydrateFromQuery } = useFormContext();

  const { industry, role, employees, support } = router.query;
  const [selectedCategoryObj, setSelectedCategoryObj] = useState(null);
  const [goalsStep2, setGoalsStep2] = useState([]);

  useEffect(() => {
    if (support) {
      const foundCategory = seekingSupport.find((cat) => cat.id === support);
      setSelectedCategoryObj(foundCategory || null);
      setSelectedCategory(support); // Set selectedCategory ID as well (for button selection)
      setGoalsStep2(foundCategory?.subOptions || []);
    }
  }, [support]);

  useEffect(() => {
    hydrateFromQuery(router.query); // Inject query into context
  }, [router.query]);
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
      toast.error("Please Select a Goal");
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
    router?.back();
  };
  const handleSubmit = () => {
    router?.push("appointment");
  };

  return (
    <section>
      <div
        className="p-9 font-sora  text-black flex justify-center px-4 relative overflow-hidden bg-cover bg-center"
        style={
          {
            // backgroundImage:
            //   step === 3 ? ` url(${OutputBg.src})` : ` url(${ResultBg.src})`,
            // backgroundColor: step === 3 && "#1B1B1B",
            // backgroundBlendMode: "lighten",
          }
        }
      >
        {!isTyping && !isLoading && <ParticlesComp />}
        <div
          className={`${
            step === 3 ? "" : "max-w-[1600px]"
          } w-full z-10 text-center transition-all duration-300 ease-in-out ${
            slideDirection === "slide-left"
              ? "transform -translate-x-full opacity-0"
              : slideDirection === "slide-right"
              ? "transform translate-x-full opacity-0"
              : "transform translate-x-0 opacity-100"
          }`}
        >
          {/* Step 1 */}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <h1 className="text-2xl md:text-2xl font-medium mb-10">
                {`Select ${selectedCategoryObj?.label} Support:`}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-7 gap-5 mb-10">
                {goalsStep2.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`py-4 min-h-[60px] px-3 rounded-full text-sm font-medium transition-all duration-200
               ${
                 selectedGoal === goal.id
                   ? "bg-gray-400 text-black border-white"
                   : "bg-[#E6E6E6] text-black border-white hover:bg-white hover:border-[#D3D3D3] hover:shadow-[2px_4px_4px_0px_#0000001C]"
               }
             `}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>

              <div className="flex w-full flex-col sm:flex-row justify-center gap-4  max-w-3xl mx-auto">
                <button
                  onClick={handleBack}
                  style={{
                    background: "rgba(51, 95, 134, 0.13)",
                    border: "1px solid rgba(51, 95, 134, 1)",
                    backdropFilter: "blur(19.2px)",
                    WebkitBackdropFilter: "blur(19.2px)",
                  }}
                  className="w-full sm:w-1/2 md:w-[250px] px-8 py-3 rounded-full text-[#335F86] transition-all duration-300 hover:bg-white/10"
                >
                  Back
                </button>

                <button
                  onClick={handleFinalSubmit}
                  className="w-full sm:w-1/2 md:w-[250px] px-8 py-3 rounded-full border border-white text-white bg-[#335F86] backdrop-blur-[19.2px] hover:bg-[#4477A3]"
                >
                  Submit
                </button>
              </div>
            </>
          )}

          {/* Step 3 - AI Loading & Result Screen */}
          {step === 3 && (
            <div className="w-full lg:max-h-[600px] 2xl:max-h-[700px] relative z-10">
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
                  <div className="hidden  3md:flex items-center justify-between animate-fadeIn">
                    {/* Left: AI Robot Image - Starting from very left */}
                    <div className="flex-shrink-0 flex items-end justify-start -mt-20 -ml-4">
                      <Image
                        src={OutputBot}
                        alt="AI Robot"
                        width={810}
                        height={1216}
                        className="object-contain object-bottom 
                   sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
                      />
                    </div>

                    {/* Right: Speech Bubble */}
                    <div className="flex flex-col justify-end mr-44 items-center pr-8 lg:pr-16">
                      <div
                        className="relative bg-[#E6E6E6] mb-5 text-black text-xl 2xl:text-2xl p-8 rounded-[50px] font-medium animate-slideInRight"
                        style={{ boxShadow: "2px 4px 8.7px 0px #00000030" }}
                      >
                        <p className="leading-relaxed">
                          We Recommend an agent that {displayedText}
                          {isTyping && <span className="animate-pulse">|</span>}
                        </p>

                        {/* Long speech bubble tail pointing left from bottom */}
                        <div className="absolute left-7 rotate-[-25deg] -bottom-3 transform -translate-x-full">
                          <div className="relative">
                            <div className="w-0 h-0 border-t-[60px] border-t-transparent border-b-[10px] border-b-transparent border-r-[70px] border-r-[#E6E6E6]"></div>
                          </div>
                        </div>
                      </div>
                      {!isTyping && (
                        <div className="mt-6 mb-52 flex justify-center">
                          <button
                            onClick={handleSubmit}
                            style={{
                              background: "#335F86",

                              backdropFilter: "blur(19.2px)",
                              WebkitBackdropFilter: "blur(19.2px)",
                            }}
                            className="text-white font-semibold text-xl py-5 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg animate-slideInUp"
                          >
                            Book an Appointment
                          </button>
                        </div>
                      )}

                      {/* Book Appointment Button - Outside speech bubble, below it */}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="3md:hidden flex -mt-20 overflow-hidden flex-col items-center justify-center h-full animate-fadeIn">
                    {/* Mobile: AI Robot Image */}
                    <div className="flex-shrink-0  mb-6">
                      <Image
                        src={OutputBot}
                        alt="AI Robot"
                        width={800}
                        height={600}
                        className="object-contain w-auto  max-h-[80vh] sm:max-h-[80vh]" // Much larger
                        priority
                      />
                    </div>

                    {/* Mobile: Speech Bubble */}
                    <div className="w-full max-w-md">
                      <div
                        className="relative bg-[#E6E6E6] text-black text-base p-6 rounded-3xl font-medium animate-slideInUp"
                        style={{ boxShadow: "2px 4px 8.7px 0px #00000030" }}
                      >
                        <p className="leading-relaxed text-center">
                          We Recommend an agent that {displayedText}
                          {isTyping && <span className="animate-pulse">|</span>}
                        </p>

                        {/* Mobile speech bubble tail pointing up to robot */}
                        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-[#E6E6E6]"></div>
                        </div>
                      </div>
                    </div>
                    {!isTyping && (
                      <div className="m-6 flex justify-center">
                        <button
                          onClick={handleSubmit}
                          style={{
                            background: "#335F86",

                            backdropFilter: "blur(19.2px)",
                            WebkitBackdropFilter: "blur(19.2px)",
                          }}
                          className="text-white font-semibold py-5 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg animate-slideInUp"
                        >
                          Book an Appointment
                        </button>
                      </div>
                    )}
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
      <Footer />
    </section>
  );
}
