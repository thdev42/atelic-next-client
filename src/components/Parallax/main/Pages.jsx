import HeroSection from "@/components/HeroMain/HeroMain";
import React, { useEffect, useRef, useState } from "react";
import Section from "./Section";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";
import AnimatedPageManager from "./Transition";

const HomePage = () => {
  const container = useRef();
  const [showHero, setShowHero] = useState(true);
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="relative">
      {showHero && <HeroSection scrollYSProgress={scrollYProgress} />}
      <AnimatedPageManager
        scrollYProgress={scrollYProgress}
        showHero={setShowHero}
      />
    </main>
  );
};

export default HomePage;
