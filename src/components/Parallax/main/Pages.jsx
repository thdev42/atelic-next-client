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

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={container} className="relative h-[200vh]">
      <HeroSection scrollYProgress={scrollYProgress} />
      <Section scrollYProgress={scrollYProgress} />
    </main>
  );
};

export default HomePage;
