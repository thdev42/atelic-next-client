"use client";

import { DecisionTree } from "@/components/DecisionTree/DecisionTree";
import HeroSection from "@/components/HeroMain/HeroMain";
import { Partners } from "@/components/Partners/Partners";
import { Services } from "@/components/Services/Services";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Partners />
      <DecisionTree />
      <Services />
    </>
  );
}
