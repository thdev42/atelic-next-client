import React, { useEffect } from "react";
import { HeroNews } from "../HeroScreens/HeroScreens";
import { useBackground } from "@/context/BackgroundContext";

const NewsHero = ({ sections }) => {
  const { setBackground, fixedNav, setFixedNav } = useBackground();

  console.log(sections, "SECTIONS");

  useEffect(() => {
    setBackground("#E9F7FF");
    setFixedNav(true);
  }, []);
  return (
    <div>
      <HeroNews data={sections} />
    </div>
  );
};

export default NewsHero;
