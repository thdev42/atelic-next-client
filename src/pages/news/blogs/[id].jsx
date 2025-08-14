"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";

// Contexts
import { useBackground } from "@/context/BackgroundContext";
import { useLoader } from "@/context/useLoader";

// Components
import Loader from "@/components/Loader/Loader";
import Footer from "@/components/Footer/Footer";
import BlogPage from "@/components/News/Blog";

// API
import { fetchNewsPageBlogsOnly } from "@/lib/api/blogs";
import { fetchUpdatedAt } from "@/lib/updatedAt";
import Head from "next/head";

const SingleBlogPage = () => {
  const container = useRef(null);
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);
  const { setIsDark, setSlideProgress } = useBackground();
  const { setLoading, setIsCached, setDataFetched, dataFetched } = useLoader();

  let cached = null;

  const fetchBlogData = async () => {
    const latestUpdatedAt = await fetchUpdatedAt("news");

    const cachedBlogPage = cached?.content?.data?.[0];
    const cachedDetails = cachedBlogPage?.section?.find(
      (s) => s.__component === "shared.blogs-news"
    )?.details;

    console.log(cachedDetails, "cachedDetails");
    const latestCachedBlog = cachedDetails?.find((b) => b?.handle === id);

    if (
      !cached ||
      cachedBlogPage?.updatedAt !== latestUpdatedAt ||
      !latestCachedBlog
    ) {
      try {
        setLoading(true);

        const res = await fetchNewsPageBlogsOnly(id);

        const details = res?.data?.[0]?.section?.find(
          (s) => s.__component === "shared.blogs-news"
        )?.details;

        const blogItem = details?.find((b) => b?.handle === id);

        if (blogItem) {
          setBlog(blogItem);
        } else {
          console.warn("No blog found for id:", id);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);

        if (latestCachedBlog) {
          setBlog(latestCachedBlog);
        }
      } finally {
        setLoading(false);
        setDataFetched(true);
      }
    } else {
      // Serve from cache
      setBlog(latestCachedBlog);
      setIsCached(true);
      setDataFetched(true);
    }
  };

  useEffect(() => {
    setIsDark(false);
    setSlideProgress(0);
    // const lenis = new Lenis();
    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!id) return;

    if (typeof window !== "undefined") {
      try {
        cached = JSON.parse(
          localStorage.getItem(`news-blogs-only_${id}`) || "null"
        );
      } catch (e) {
        console.warn("Error parsing blog cache:", e);
      }
    }

    fetchBlogData();
  }, [id]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atelic AI",
    url: `https://atelic.ai/blogs/${id}`,
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

  if (!dataFetched) return <Loader />;

  return (
    <div ref={container}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </Head>
      <NextSeo
        title={`${blog?.title}`}
        description={`${blog?.description}`}
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
      {blog ? (
        <BlogPage blog={blog} />
      ) : (
        <div className="text-center py-12">Blog not found.</div>
      )}
      <Footer />
    </div>
  );
};

export default SingleBlogPage;
