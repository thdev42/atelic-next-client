"use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import { DecisionTree } from "@/components/DecisionTree/DecisionTree";
// import HeroSection from "@/components/HeroMain/HeroMain";
// import { Partners } from "@/components/Partners/Partners";
// import { Services } from "@/components/Services/Services";

// export default function Home() {
//   const containerRef = useRef(null);

//   // Proper scroll configuration for parallax
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   // Much slower background parallax movement - reduced from 30% to 8%
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

//   // Individual section parallax effects with different speeds
//   const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-15%"]);
//   const partnersY = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "-10%"]);
//   const decisionTreeY = useTransform(
//     scrollYProgress,
//     [0.3, 0.7],
//     ["0%", "-12%"]
//   );
//   const servicesY = useTransform(scrollYProgress, [0.5, 1], ["0%", "-8%"]);

//   return (
//     <div ref={containerRef} className="relative">
//       {/* Fixed Parallax Background with slower movement */}
//       <motion.div
//         style={{ y }}
//         className="fixed inset-0 w-full h-[120vh] bg-gradient-to-br from-blue-50 to-indigo-100 -z-10"
//       />

//       {/* Hero Section with Parallax */}
//       <motion.div style={{ y: heroY }} className="relative z-10">
//         <HeroSection />
//       </motion.div>

//       {/* Stacked Sections */}
//       <div className="relative z-20 -mt-20">
//         {/* Partners Section with Parallax */}
//         <motion.div
//           style={{ y: partnersY }}
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className=""
//         >
//           <Partners />
//         </motion.div>

//         {/* Decision Tree Section with Parallax */}
//         <motion.div
//           style={{ y: decisionTreeY }}
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="hover:scale-105 transition-transform duration-300"
//         >
//           <DecisionTree />
//         </motion.div>

//         {/* Services Section with Parallax */}
//         <motion.div
//           style={{ y: servicesY }}
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           viewport={{ once: true }}
//           className="hover:scale-105 transition-transform duration-300"
//         >
//           <Services />
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { DecisionTree } from "@/components/DecisionTree/DecisionTree";
import HeroSection from "@/components/HeroMain/HeroMain";
import HomePage from "@/components/Parallax/main/Pages";
import { Partners } from "@/components/Partners/Partners";
import { Services } from "@/components/AboutAtelic/AboutAtelic";
import { fetchHomePageData } from "@/lib/api/home";

import { NextSeo } from "next-seo";
import Head from "next/head";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Atelic AI",
  url: "https://atelic.ai",
  logo: "https://atelic.com/images/logo.png",
  sameAs: [
    "https://www.linkedin.com/company/atelic",
    "https://twitter.com/atelic",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971 50 518 8431",
    contactType: "Contact Us",
    email: "info@atelic.ai",
  },
};
export default function Home() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </Head>
      <NextSeo
        title="Atelic AI"
        description="Atelic AI delivers innovative AI software, chatbots, and predictive analytics to help businesses automate, innovate, and grow."
        canonical="https://atelic.ai/"
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "artificial intelligence solutions, AI development, machine learning, AI automation, AI chatbots, predictive analytics, AI consulting, enterprise AI, data science, AI innovation",
          },
          { name: "robots", content: "index, follow" },
          { name: "author", content: "Atelic AI Team" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "revisit-after", content: "7 days" },
          { name: "rating", content: "General" },
          { name: "distribution", content: "global" },
          { name: "language", content: "English" },
          { name: "copyright", content: "© 2025 Atelic AI" },
          { name: "expires", content: "never" },
          { name: "generator", content: "Next.js & next-seo" },
          {
            name: "category",
            content: "Technology, Artificial Intelligence, Web Solutions",
          },
        ]}
        openGraph={{
          url: "https://atelic.ai/",
          title: "Atelic AI",
          description:
            "Atelic AI delivers innovative AI software, chatbots, and predictive analytics to help businesses automate, innovate, and grow.",
          images: [
            {
              url: "https://atelic.com/images/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Atelic AI Website Preview",
            },
          ],
          site_name: "Atelic AI",
          type: "website",
          locale: "en_US",
        }}
        twitter={{
          handle: "@atelic",
          site: "@atelic",
          cardType: "summary_large_image",
        }}
      />

      <HomePage />
    </>
  );
}
