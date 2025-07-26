import React, { useEffect } from "react";
import { HeroPartners } from "../HeroScreens/HeroScreens";
import { useBackground } from "@/context/BackgroundContext";

const PartnersHero = ({ sections }) => {
  const { setBackground, fixedNav, setFixedNav } = useBackground();

  useEffect(() => {
    setBackground("#FDFDFD");
    setFixedNav(true);
    return () => {
      setFixedNav(false);
    };
  }, []);
  return (
    <div>
      <HeroPartners data={sections} />
    </div>
  );
};

export default PartnersHero;
