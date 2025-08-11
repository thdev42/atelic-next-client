"use client";

import { useEffect, useState } from "react";
// import OutputBot from "../../assets/OutputBot.png";
import OutputBg from "../../assets/OutputBg.png";
import OutputBot from "../../assets/RobotAppointment.png";
import Image from "next/image";
import { useBackground } from "@/context/BackgroundContext";
import Footer from "@/components/Footer/Footer";
import ParticlesComp from "@/components/Particles/Particles";
import { NextSeo } from "next-seo";

export default function FinalResult() {
  const [step, setStep] = useState(3);
  const { setIsShowNav, setBackground } = useBackground();
  const [slideDirection, setSlideDirection] = useState(""); // "slide-left" or "slide-right"
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm() && agreedToPrivacy) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      // Add your form submission logic here
    }
  };

  useEffect(() => {
    // setIsShowNav(false);
    setBackground("#fdfdfd", "color");
  }, []);

  return (
    <section>
      <NextSeo
        title="Book an Appointment"
        description="Book an appointment with Atelic AI to explore cutting-edge artificial intelligence solutions tailored to your business needs. Schedule your consultation today."
        canonical="https://atelic.ai/appointment"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "book AI consultation, schedule AI meeting, AI solutions appointment, AI development consultation, artificial intelligence experts, AI consulting, business AI solutions, AI strategy session",
          },
          { name: "robots", content: "index, follow" },
          { name: "author", content: "Atelic AI Team" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "revisit-after", content: "7 days" },
          { name: "rating", content: "General" },
          { name: "distribution", content: "global" },
          { name: "language", content: "English" },
          { name: "copyright", content: "© 2025 Atelic AI" },
          { name: "expires", content: "never" },
          { name: "generator", content: "Next.js & next-seo" },
          {
            name: "category",
            content: "Technology, Artificial Intelligence, Appointment",
          },
        ]}
        openGraph={{
          url: "https://atelic.ai/appointment",
          title: "Book an Appointment",
          description:
            "Schedule your consultation with Atelic AI to discuss custom artificial intelligence solutions that fit your business needs.",
          images: [
            {
              url: "https://atelic.com/images/appointment-og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Book Appointment at Atelic AI",
            },
            {
              url: "https://atelic.com/images/consultation.jpg",
              width: 800,
              height: 600,
              alt: "AI Consultation Session",
            },
          ],
          site_name: "Atelic AI",
          type: "website",
          locale: "en_US",
        }}
        twitter={{
          handle: "@atelic",
          site: "@atelic",
          cardType: "summary_large_image",
        }}
      />

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
          className={`${""} w-full z-30 text-center transition-all duration-300 ease-in-out ${
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

              {/* Right: Appointment Form */}
              <div className="flex pr-8 lg:pr-16 w-full 2xl:max-w-4xl  max-w-2xl">
                <form
                  onSubmit={handleSubmit}
                  className="text-black p-8 rounded-[50px] min-w-[500px] w-full space-y-6"
                >
                  <h2 className="text-black  text-left md:text-2xl py-10 lg:text-3xl 2xl:text-[40px] font-semibold">
                    Book An Appointment
                  </h2>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full bg-[#EFEFEF] border-2 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] transition-colors focus:outline-none focus:ring-0 ${
                          errors.name
                            ? "border-red-500"
                            : "border-[#C8C8C8] focus:border-[#335F86]"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2 ml-4">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        type="tel"
                        placeholder="Phone No"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`w-full bg-[#EFEFEF] border-2 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] transition-colors focus:outline-none focus:ring-0 ${
                          errors.phone
                            ? "border-red-500"
                            : "border-[#C8C8C8] focus:border-[#335F86]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 ml-4">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full bg-[#EFEFEF] border-2 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] transition-colors focus:outline-none focus:ring-0 ${
                        errors.email
                          ? "border-red-500"
                          : "border-[#C8C8C8] focus:border-[#335F86]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2 ml-4">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex items-start gap-3 px-2">
                    <div className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        id="privacy-policy"
                        checked={agreedToPrivacy}
                        onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                        className="w-5 h-5 2xl:w-6 2xl:h-6 text-[#335F86] bg-white border-2 border-[#C8C8C8] rounded focus:ring-[#335F86] focus:ring-2 cursor-pointer"
                      />
                    </div>
                    <label
                      htmlFor="privacy-policy"
                      className="text-gray-700 2xl:text-lg text-sm leading-relaxed cursor-pointer select-none"
                    >
                      By Submitting Your Information You are Agreeing with Our{" "}
                      <span className="text-[#335F86] font-medium underline hover:text-[#2a4d6b] transition-colors cursor-pointer">
                        <a href="/privacy-policy">Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!agreedToPrivacy}
                    className={`w-full text-white 2xl:px-6 2xl:h-[80px] 2xl:text-[24px] text-base px-5 py-5 rounded-[50px] border-2 transition-all duration-300 focus:outline-none focus:ring-0 ${
                      agreedToPrivacy
                        ? "hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    style={{
                      background: agreedToPrivacy ? "#335F86" : "#9CA3AF",
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
            <div className="lg:hidden  flex flex-col items-center justify-center h-full animate-fadeIn">
              <div className="w-full px-4 mt-8">
                <form
                  onSubmit={handleSubmit}
                  className="text-black p-6 rounded-3xl w-full max-w-md mx-auto space-y-4"
                >
                  <h2 className=" text-black text-3xl font-semibold text-center">
                    Book An Appointment
                  </h2>

                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full bg-[#EFEFEF] border-2 px-5 py-4 rounded-[50px] text-base focus:outline-none transition-colors ${
                        errors.name
                          ? "border-red-500"
                          : "border-[#C8C8C8] focus:border-[#335F86]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 ml-4">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      type="tel"
                      placeholder="Phone No"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={`w-full bg-[#EFEFEF] border-2 px-5 py-4 rounded-[50px] text-base focus:outline-none transition-colors ${
                        errors.phone
                          ? "border-red-500"
                          : "border-[#C8C8C8] focus:border-[#335F86]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 ml-4">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full bg-[#EFEFEF] border-2 px-5 py-4 rounded-[50px] text-base focus:outline-none transition-colors ${
                        errors.email
                          ? "border-red-500"
                          : "border-[#C8C8C8] focus:border-[#335F86]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-4">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Privacy Policy Checkbox - Mobile */}
                  <div className="flex items-start gap-3 px-1">
                    <div className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        id="privacy-policy-mobile"
                        checked={agreedToPrivacy}
                        onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                        className="w-4 h-4 text-[#335F86] bg-white border-2 border-[#C8C8C8] rounded focus:ring-[#335F86] focus:ring-2 cursor-pointer"
                      />
                    </div>
                    <label
                      htmlFor="privacy-policy-mobile"
                      className="text-gray-700 text-xs leading-relaxed cursor-pointer select-none"
                    >
                      By Submitting Your Information You are Agreeing with Our{" "}
                      <span className="text-[#335F86] font-medium underline hover:text-[#2a4d6b] transition-colors cursor-pointer">
                        <a href="/privacy-policy">Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!agreedToPrivacy}
                    className={`w-full text-white font-semibold px-5 py-4 rounded-[50px] text-base transition-all duration-300 ${
                      agreedToPrivacy
                        ? "hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    style={{
                      background: agreedToPrivacy ? "#335F86" : "#9CA3AF",
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
