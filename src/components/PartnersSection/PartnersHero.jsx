import React, { useEffect } from "react";
import { HeroPartners } from "../HeroScreens/HeroScreens";
import { useBackground } from "@/context/BackgroundContext";

const PartnersHero = () => {
  const { setBackground, fixedNav, setFixedNav } = useBackground();

  useEffect(() => {
    setBackground("#FDFDFD");
    setFixedNav(true);
  }, []);
  return (
    <div>
      <HeroPartners />
    </div>
  );
};

export default PartnersHero;
