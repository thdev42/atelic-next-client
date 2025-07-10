import Footer from "@/components/Footer/Footer";
import { Partners } from "@/components/Partners/Partners";
import Differentiation from "@/components/PartnersSection/Differentiation";
import PartnersHero from "@/components/PartnersSection/PartnersHero";
import Specialism from "@/components/PartnersSection/Specialism";
import React from "react";

const partners = () => {
  return (
    <div>
      <PartnersHero />
      <Partners partners={true} />
      <Differentiation />
      <Specialism />
      <Footer />
    </div>
  );
};

export default partners;
