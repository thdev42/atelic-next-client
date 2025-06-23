import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Partners } from "@/components/Partners/Partners";
import { DecisionTree } from "@/components/DecisionTree/DecisionTree";
import AboutAtelic from "@/components/Services/Services";
import Footer from "@/components/Footer/Footer";
// import { AboutAt } from "@/components/Services/Services";
const Section = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className=""
      style={{
        // scale: isMobile ? 1 : scale,
        // rotate: isMobile ? 0 : rotate,
        willChange: "transform",
        transformStyle: "preserve-3d", // Better GPU rendering
        backfaceVisibility: "hidden", // Prevent flickering in some browsers
      }}
    >
      <Partners />
      <DecisionTree />
      {/* <Services /> */}
      <AboutAtelic />
      <Footer />
    </motion.div>
  );
};

export default Section;
