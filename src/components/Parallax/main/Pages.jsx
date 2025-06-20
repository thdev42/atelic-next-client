import HeroSection from "@/components/HeroMain/HeroMain";
import React, { useEffect, useRef } from "react";
import Section from "./Section";
import Lenis from "lenis";
import { useScroll } from "framer-motion";

const HomePage = () => {
  const container = useRef();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="relative h-[200vh]">
      <HeroSection scrollYSProgress={scrollYProgress} />
      <Section scrollYProgress={scrollYProgress} />
    </main>
  );
};

export default HomePage;
