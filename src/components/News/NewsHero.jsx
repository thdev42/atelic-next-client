import React, { useEffect } from "react";
import { HeroNews } from "../HeroScreens/HeroScreens";
import { useBackground } from "@/context/BackgroundContext";

const NewsHero = () => {
  const { setBackground, fixedNav, setFixedNav } = useBackground();

  useEffect(() => {
    setBackground("#E9F7FF");
    setFixedNav(true);
  }, []);
  return (
    <div>
      <HeroNews />
    </div>
  );
};

export default NewsHero;
