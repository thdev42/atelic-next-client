import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Partners } from "@/components/Partners/Partners";
import { DecisionTree } from "@/components/DecisionTree/DecisionTree";
import { Services } from "@/components/Services/Services";
const Section = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.div style={{ scale, rotate }}>
      <Partners />
      <DecisionTree />
      <Services />
    </motion.div>
  );
};

export default Section;
