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

  if (!dataFetched) return <Loader />;

  return (
    <div ref={container}>
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
