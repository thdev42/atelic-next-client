"use client";

import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";

// Contexts
import { useBackground } from "@/context/BackgroundContext";

// API

// Components
import Loader from "@/components/Loader/Loader";
// import BlogDetails from "@/components/News/BlogDetails";
import Footer from "@/components/Footer/Footer";
import BlogPage from "@/components/News/Blog";
import { fetchNewsPageBlogsOnly } from "@/lib/api/blogs";
import { useRouter } from "next/router";

const SingleBlogPage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id, "BLOG ID");
  const container = useRef(null);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setIsDark, setSlideProgress } = useBackground();

  const fetchBlogById = async () => {
    try {
      const res = await fetchNewsPageBlogsOnly();

      const section = res?.data?.[0]?.section?.find(
        (s) => s.__component === "shared.blogs-news"
      );

      const blogItem = section?.details?.find((b) => b.id == id);

      if (blogItem) {
        setBlog(blogItem);
      } else {
        console.warn("Blog not found for id:", id);
      }
    } catch (err) {
      console.error("Failed to fetch blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogById();
    }
  }, [id]);

  // Setup background and lenis scroll
  useEffect(() => {
    setIsDark(false);
    setSlideProgress(0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (loading) return <Loader />;
  //   if (!blog) return <div>Blog not found.</div>;

  return (
    <div ref={container}>
      <BlogPage blog={blog} />

      <Footer />
    </div>
  );
};

export default SingleBlogPage;
