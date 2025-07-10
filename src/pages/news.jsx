import Footer from "@/components/Footer/Footer";
import AiInsights from "@/components/News/AiInsights";
import Blogs from "@/components/News/Blogs";
import NewsHero from "@/components/News/NewsHero";
import NewsLetter from "@/components/News/NewsLetter";
import React from "react";

const news = () => {
  return (
    <div>
      <NewsHero />
      <AiInsights />
      <Blogs />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default news;
