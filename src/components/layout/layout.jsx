import { ParallaxProvider } from "react-scroll-parallax";
import { BackgroundProvider, useBackground } from "@/context/BackgroundContext";
import Navbar from "../Nav/Navbar";
import { Toaster } from "react-hot-toast";
import { NavProvider, useNav } from "@/context/NavContext";
import { LoaderProvider } from "@/context/useLoader";
import { useEffect, useState } from "react";
import { fetchNavbarsData } from "@/lib/api/navbar";
import { fetchUpdatedAt } from "@/lib/updatedAt";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@/config/config";
import { FormProvider } from "@/context/FormContext";

const Layout = ({ children }) => {
  const { background, backgroundType, isShowNav, setLoading } = useBackground();

  console.log(background, "BACKGROUND");

  const [navLinks, setNavLinks] = useState([]);

  let cached = null;

  const getNavbarSections = async () => {
    const latestUpdatedAt = await fetchUpdatedAt("navbar");
    const cachedPage = cached?.content?.data?.[0];

    if (!cached || cachedPage?.updatedAt !== latestUpdatedAt) {
      try {
        const res = await fetchNavbarsData();
        const fetchedLinks = res?.data?.[0] || [];
        setNavLinks(fetchedLinks);
      } catch (err) {
        console.error("Navbar fetch error:", err);
        if (cached?.content?.data?.[0]) {
          setNavLinks(cached.content.data?.[0]);
        }
      }
    }
  };

  // Load from cache first
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        cached = JSON.parse(localStorage.getItem("navbars") || "null");
      } catch (e) {
        console.warn("Error parsing navbar cache:", e);
      }

      if (cached?.content?.data?.[0]) {
        setNavLinks(cached.content.data?.[0]);
      }
    }

    getNavbarSections();
  }, []);

  // Generate background styles based on type
  const getBackgroundStyles = () => {
    if (!background) return { background: "red" };

    if (backgroundType == "image") {
      return {
        backgroundImage: `url(${API_BASE_URL}${background})`,
        // backgroundSize: "contain",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundAttachment: "scroll",
      };
    } else {
      // backgroundType === "color" or default
      return { background: background };
    }
  };

  return (
    <main className="min-h-screen text-black" style={getBackgroundStyles()}>
      <ParallaxProvider>
        {isShowNav && <Navbar data={navLinks} />}
        {children}
      </ParallaxProvider>
    </main>
  );
};

const LayoutWrapper = ({ children }) => (
  <BackgroundProvider>
    <NavProvider>
      <LoaderProvider>
        <FormProvider>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <Layout>{children}</Layout>
        </FormProvider>
      </LoaderProvider>
    </NavProvider>
  </BackgroundProvider>
);

export default LayoutWrapper;
