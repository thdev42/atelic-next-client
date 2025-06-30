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
  console.log(data, "DATA");
  const selectedCategoryObj = seekingSupport.find(
    (cat) => cat.id === selectedCategory
  );

  const goalsStep2 = selectedCategoryObj?.subOptions || [];

  const handleSubmitStep1 = () => {
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = () => {
    if (!selectedGoal) {
      alert("Please select a business goal.");
      return;
    }

    const goalLabel = goalsStep2.find((g) => g.id === selectedGoal)?.show || "";
    setOutputText(goalLabel);
    // alert(
    //   `Selected Category: ${selectedCategoryObj?.label}\nGoal: ${goalLabel}`
    // );

    setStep(3);
  };

  return (
    <div
      className="p-9  font-sora min-h-screen text-white flex items-center justify-center px-4 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          step === 3 ? ` url(${OutputBg.src})` : ` url(${ResultBg.src})`,
        backgroundColor: step === 3 && "#1B1B1B",
        backgroundBlendMode: "lighten",
      }}
    >
      <div
        className={`${step === 3 ? "" : "max-w-6xl"} w-full z-10 text-center`}
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
                onClick={() => setStep(1)}
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

        {/* Step 3 - Final AI Result Screen */}
        {step === 3 && (
          <div className="w-full h-screen relative z-10">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between ">
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
                <div className="relative bg-white mb-96 text-black text-xl 2xl:text-2xl p-8 rounded-[50px] shadow-2xl font-medium">
                  <p className="leading-relaxed">{outputText}</p>

                  {/* Long speech bubble tail pointing left from bottom */}
                  <div className="absolute left-7 rotate-[-25deg] -bottom-3 transform -translate-x-full">
                    {/* Main tail triangle - longer and positioned at bottom */}
                    <div className="relative">
                      <div className="w-0 h-0 border-t-[60px] border-t-transparent border-b-[10px] border-b-transparent border-r-[70px] border-r-white"></div>
                      {/* Shadow for the tail */}
                      {/* <div className="absolute top-1 left-1 w-0 h-0 border-t-[40px] border-t-transparent border-b-[10px] border-b-transparent border-r-[60px] border-r-gray-300 -z-10"></div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden flex flex-col items-center justify-center h-full">
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
                <div className="relative bg-white text-black text-base p-6 rounded-3xl shadow-2xl font-medium">
                  <p className="leading-relaxed text-center">{outputText}</p>

                  {/* Mobile speech bubble tail pointing up to robot */}
                  <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
