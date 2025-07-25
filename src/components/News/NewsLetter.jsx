import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import AppointmentBg from "../../../assets/Appointmentbg.png";
import { formatHeading } from "../Partners/Partners";

const NewsLetter = ({ sections }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    industry: "",
  });

  const [errors, setErrors] = useState({});

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const isHeadingInView = useInView(headingRef, {
    once: false,
    margin: "-50px",
  });
  const isFormInView = useInView(formRef, { once: false, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Enhanced parallax transforms with smoother reverse motion
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["100%", "-200%"]);
  const formY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  // Enhanced form field animations with reverse parallax
  const rawFirstNameX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["-300px", "-150px", "0px", "0px", "150px", "300px"]
  );
  const rawLastNameX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["300px", "150px", "0px", "0px", "-150px", "-300px"]
  );
  const rawEmailX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["-600px", "-300px", "0px", "0px", "300px", "600px"]
  );
  const rawPhoneX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["400px", "200px", "0px", "0px", "-200px", "-400px"]
  );
  const rawIndustryX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["-400px", "-200px", "0px", "0px", "200px", "400px"]
  );
  const rawSubmitX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["-400px", "-200px", "0px", "0px", "200px", "400px"]
  );

  // Additional Y-axis transforms for more dynamic movement
  const firstNameY = useTransform(scrollYProgress, [0, 0.3], ["50px", "0px"]);
  const lastNameY = useTransform(scrollYProgress, [0, 0.3], ["-50px", "0px"]);
  const emailY = useTransform(scrollYProgress, [0, 0.4], ["30px", "0px"]);
  const phoneY = useTransform(scrollYProgress, [0, 0.4], ["-30px", "0px"]);
  const industryY = useTransform(scrollYProgress, [0, 0.4], ["40px", "0px"]);
  const submitY = useTransform(scrollYProgress, [0, 0.4], ["60px", "0px"]);

  // Opacity transforms for fade effects
  const formOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 1,
  };

  const firstNameX = useSpring(rawFirstNameX, springConfig);
  const lastNameX = useSpring(rawLastNameX, springConfig);
  const emailX = useSpring(rawEmailX, springConfig);
  const phoneX = useSpring(rawPhoneX, springConfig);
  const industryX = useSpring(rawIndustryX, springConfig);
  const submitX = useSpring(rawSubmitX, springConfig);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.industry) {
      newErrors.industry = "Please select an industry";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      alert("Appointment request submitted successfully!");
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        industry: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#e5e5e5] z-10 font-sora overflow-hidden max-w-[1920px] mx-auto w-full pt-10 relative "
    >
      {/* Background overlay for opacity with parallax */}
      <motion.div
        className="will-change-transform 2xl:mt-10 absolute inset-0 bg-[#e5e5e5] opacity-75 z-0"
        style={{
          backgroundImage: `url(${AppointmentBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          opacity: 0.25,
          y: backgroundY,
        }}
      ></motion.div>

      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto text-center relative z-10">
        <h1
          ref={headingRef}
          className="will-change-transform 2xl:text-[60px] text-4xl md:text-5xl font-light mb-0"
          // style={{ y: textY }}
          // initial={{ opacity: 0, x: -100 }}
          // animate={
          //   isHeadingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -200 }
          // }
          // transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {formatHeading(sections?.heading)}
        </h1>

        <motion.div
          ref={formRef}
          className="will-change-transform max-w-[800px] 2xl:max-w-[1007px] mx-auto"
          style={{
            y: formY,
            opacity: formOpacity,
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        >
          <div className="will-change-transform rounded-[50px] p-8 md:p-12">
            <motion.div
              className="will-change-transform grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={isFormInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.div
                className="space-y-5"
                style={{
                  x: firstNameX,
                  y: firstNameY,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full 2xl:px-6 2xl:h-[80px] 2xl:text-[22px] text-base px-5 py-5 rounded-[50px] border-2 transition-colors focus:outline-none focus:ring-0 ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm text-left">
                    {errors.firstName}
                  </p>
                )}
              </motion.div>

              <motion.div
                className="space-y-5"
                style={{
                  x: lastNameX,
                  y: lastNameY,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full 2xl:px-6 2xl:h-[80px] 2xl:text-[22px] text-base px-5 py-5 rounded-[50px] border-2 transition-colors focus:outline-none focus:ring-0 ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm text-left">
                    {errors.lastName}
                  </p>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              className="will-change-transform space-y-5 mb-8"
              style={{
                x: emailX,
                y: emailY,
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={
                isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full 2xl:px-6 2xl:h-[80px] 2xl:text-[22px] text-base px-5 py-5 rounded-[50px] border-2 transition-colors focus:outline-none focus:ring-0 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Title"
              />
              {errors.email && (
                <p className="text-red-500 text-sm text-left">{errors.email}</p>
              )}
            </motion.div>

            <motion.div
              className="will-change-transform space-y-5 mb-8"
              style={{
                x: phoneX,
                y: phoneY,
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={
                isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full 2xl:px-6 2xl:h-[80px] 2xl:text-[22px] text-base px-5 py-5 rounded-[50px] border-2 transition-colors focus:outline-none focus:ring-0 ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Email Address"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm text-left">{errors.phone}</p>
              )}
            </motion.div>

            <motion.div
              className="will-change-transform space-y-5 mb-8"
              style={{
                x: industryX,
                y: industryY,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full 2xl:px-6 2xl:h-[80px] 2xl:text-[22px] text-base px-5 py-5 rounded-[50px] border-2 transition-colors focus:outline-none focus:ring-0 ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Company"
              />
              {errors.industry && (
                <p className="text-red-500 text-sm text-left">
                  {errors.industry}
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="will-change-transform space-y-5 mb-8"
              style={{
                x: industryX,
                // y: industryY,
              }}
              // initial={{ opacity: 0, y: 50 }}
              // animate={
              //   isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              // }
              // transition={{ duration: 0.3, delay: 0.3 }}
              whileTap={{ scale: 0.98 }}
              // whileHover={{ scale: 1.02 }}
            >
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  x: submitX,
                  y: submitY,
                }}
                className="will-change-transform w-full bg-[#335F86] text-white font-semibold 2xl:px-6 2xl:h-[80px] 2xl:text-[22px] text-base px-5 py-5 rounded-[50px]"
              >
                Submit Now
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetter;
