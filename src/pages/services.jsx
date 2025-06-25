import {
  HeroComponent1,
  HeroServices,
} from "@/components/HeroScreens/HeroScreens";
import { ServicesHero } from "@/components/ServicesHero/ServicesHero";
import { useBackground } from "@/context/BackgroundContext";
import React from "react";

const Services = () => {
  const { setBackground, setIsDark } = useBackground();

  setBackground("#00172B");
  setIsDark(true);
  return (
    <section className="max-w-[1920px] mx-auto h-screen 2xl:h-[800px] lg:h-[600px] w-full overflow-hidden">
      <ServicesHero />
    </section>
  );
};

export default Services;
