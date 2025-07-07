import {
  HeroComponent1,
  HeroServices,
} from "@/components/HeroScreens/HeroScreens";
import HowWeWork from "@/components/Services/HowWeWork";
import OurSolutions from "@/components/Services/OurSolutions";
import { RedefiningSuccess } from "@/components/Services/RedefiningSuccess";
import { ServicesHero } from "@/components/Services/ServicesHero";
import { useBackground } from "@/context/BackgroundContext";
import React from "react";

const Services = () => {
  const { setBackground, setIsDark } = useBackground();

  setBackground("#00172B");
  setIsDark(true);
  return (
    <section className="">
      <ServicesHero />
      <HowWeWork />
      <OurSolutions />
      <RedefiningSuccess />
    </section>
  );
};

export default Services;
