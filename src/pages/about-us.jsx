"use client";

import { Advisors } from "@/components/AboutUs/Advisors";
import Investors from "@/components/AboutUs/Investors";
import OurJourney from "@/components/AboutUs/OurJouney";
import OurTeam from "@/components/AboutUs/OurTeam";
import TeamSection from "@/components/AboutUs/Team";
import Vision from "@/components/AboutUs/Vision";
import Footer from "@/components/Footer/Footer";
import { HeroAboutUs } from "@/components/HeroScreens/HeroScreens";
import React from "react";

const AboutUsHero = () => {
  return (
    <section>
      <HeroAboutUs />
      <Vision />
      <TeamSection />
      <OurJourney />
      <OurTeam />
      <Advisors />
      <Investors />
      <Footer />
    </section>
  );
};

export default AboutUsHero;
