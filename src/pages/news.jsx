import AiInsights from "@/components/News/AiInsights";
import Blogs from "@/components/News/Blogs";
import NewsHero from "@/components/News/NewsHero";
import React from "react";

const news = () => {
  return (
    <div>
      <NewsHero />
      <AiInsights />
      <Blogs />
    </div>
  );
};

export default news;
