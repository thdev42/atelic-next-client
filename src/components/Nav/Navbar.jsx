// components/Navbar.jsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Container from "../container/container";
import NavIcon from "../../../assets/AtelicNavLogo.png";
import MenuButton from "../../../assets/menu1.png";
import Image from "next/image";
import { Sora } from "next/font/google";
import { useBackground } from "@/context/BackgroundContext";
import { API_BASE_URL } from "@/config/config";
import Link from "next/link";

const Navbar = ({ data }) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    activeHeroIndex,
    slideProgress,
    isDark,
    fixedNav,
    isShowNav,
    setFixedNav,
  } = useBackground();
  console.log(isDark);
  const [textColor, setTextColor] = useState("text-black");

  const navLinks = Array?.isArray(data?.details) ? data?.details : [];

  console.log(navLinks, "NAV LINKS");
  console.log(router?.pathname, "PATHNAME");

  // Function to interpolate between colors
  const interpolateTextColor = (progress) => {
    // Define color stops for smooth transition
    // 0-1: black to black (first two slides)
    // 1-2: black to white (transition to dark slide)
    if (isDark) return "text-white";
    if (progress <= 1) {
      return "text-black";
    } else if (progress <= 2) {
      // Calculate transition factor between slide 1 and 2
      const transitionFactor = progress - 1;

      // Smooth transition from black to white
      if (transitionFactor < 0.3) {
        return "text-black";
      } else if (transitionFactor < 0.7) {
        return "text-gray-700";
      } else if (transitionFactor < 0.9) {
        return "text-gray-400";
      } else {
        return "text-white";
      }
    } else {
      return "text-white";
    }
  };

  // Update text color based on slide progress
  useEffect(() => {
    if (typeof slideProgress === "number") {
      const newTextColor = interpolateTextColor(slideProgress);
      setTextColor(newTextColor);
    } else if (activeHeroIndex !== undefined) {
      // Fallback to discrete color changes if slideProgress is not available
      const isDarkHero = activeHeroIndex === 2;
      setTextColor(isDarkHero ? "text-white" : "text-black");
    }
  }, [slideProgress, activeHeroIndex]);

  const getTextColorStyle = () => {
    if (isDark) {
      return {
        color: `rgb(255, 255, 255)`,
        transition: "color 0s ease-out",
      };
    }
    if (typeof slideProgress === "number") {
      const progress = Math.max(0, Math.min(2, slideProgress));

      let r, g, b;

      if (progress <= 1) {
        r = g = b = 0;
      } else {
        // Black to white transition
        const transitionFactor = (progress - 1) / 1;
        const smoothFactor = Math.pow(transitionFactor, 0.8);
        r = g = b = Math.round(255 * smoothFactor);
      }

      return {
        color: `rgb(${r}, ${g}, ${b})`,
        transition: "color 0.3s ease-out",
      };
    }

    return {
      color: `rgb(0, 0, 0)`,
      transition: "color 0.3s ease-out",
    };
  };

  // Toggle drawer
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close drawer when clicking on a link
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDrawerOpen &&
        !event.target.closest(".mobile-drawer") &&
        !event.target.closest(".menu-button")
      ) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDrawerOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  console.log(router?.pathname);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width =
        typeof window !== "undefined"
          ? window.visualViewport?.width || window.innerWidth
          : 1024;

      console.log("Viewport width:", width);

      const newIsMobile = width < 1024;

      setIsMobile(newIsMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isShowNav && data?.details && (
        <header className="w-full bg-transparent">
          <div
            className={`font-poppins ${
              isDark ? "bg-white" : "bg-[#252525] "
            } py-3 h-12 text-center my-auto ${
              isDark ? "text-black" : "text-white"
            } `}
          >
            Come see us at Gitex 2025
          </div>
          <nav
            className={`z-50 relative h-16 ${
              fixedNav
                ? "absolute mt-10 top-0 left-0 right-0 w-full"
                : "lg:pt-10 lg:pb-20 pt-10 pb-28"
            }`}
          >
            {" "}
            {/* Added fixed height and relative positioning */}
            <Container>
              <div className=" overflow-hidden sm:px-4 md:px-8 lg:px-[80px] 2xl:px-[160px] flex items-center justify-between w-full h-16 relative">
                {/* LEFT: Logo with absolute positioning */}
                <div
                  style={getTextColorStyle()}
                  className="relative cursor-pointer z-50"
                >
                  {data?.image?.url && (
                    <div className="2xl:max-w-[203px] max-w-[183px]">
                      <a className="" href="/">
                        <img
                          src={`${API_BASE_URL}${data?.image?.url}`}
                          alt="Logo"
                          className="object-contain z-50" // Maintain aspect ratio
                          style={{
                            filter:
                              (typeof slideProgress === "number" &&
                                slideProgress > 1.5) ||
                              isDark
                                ? "brightness(0) invert(1)" // Make logo white for dark background
                                : "none",
                            transition: "filter 0.3s ease-out",
                          }}
                        />
                      </a>
                    </div>
                  )}
                </div>

                {/* CENTER: Navigation Links - now truly centered */}
                <ul className="z-50 hidden flex-shrink-0 lg:flex 2xl:gap-5 lg:gap-1 2xl:text-[20px] lg:text-sm font-sora font-normal mx-auto">
                  {navLinks.map((link) => {
                    const isActive = router.pathname == link?.link;

                    return (
                      <li key={link.link}>
                        <Link
                          href={link.link}
                          className={`px-3 py-1 rounded-[20.5px] transition-all duration-200 ease-out ${
                            isActive
                              ? "bg-[#FFDDDD] border border-[rgba(242,27,42,0.26)] text-[#F21B2A]"
                              : "hover:text-primary"
                          }`}
                          style={!isActive ? getTextColorStyle() : {}}
                        >
                          {link.text}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* RIGHT: Menu Icon - positioned absolutely on the right */}
                <div className="lg:opacity-0 z-50 absolute right-4 sm:right-8 md:right-12 lg:right-[100px] 2xl:right-[178px] top-1/2 transform -translate-y-1/2">
                  <button
                    className="menu-button"
                    onClick={toggleDrawer}
                    disabled={!isMobile}
                  >
                    <Image
                      src={MenuButton}
                      alt="Menu"
                      width={32}
                      height={32}
                      className={`object-contain ${
                        !isMobile ? "opacity-50" : "opacity-100"
                      }`}
                      style={{
                        filter:
                          (typeof slideProgress === "number" &&
                            slideProgress > 1.5) ||
                          isDark
                            ? "brightness(0) invert(1)"
                            : "none",
                        transition: "filter 0.3s ease-out",
                      }}
                    />
                  </button>
                </div>
              </div>
            </Container>
          </nav>

          {/* Mobile Drawer Overlay */}
          {isDrawerOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={closeDrawer}
            />
          )}

          {/* Mobile Drawer */}
          <div
            className={`mobile-drawer fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <ul className="space-y-4">
                {navLinks.map((link) => {
                  const isActive = router.pathname == link?.link;

                  return (
                    <li key={link.link}>
                      <a
                        href={link.link}
                        onClick={closeDrawer}
                        className={`block px-4 py-3 rounded-[20.5px] transition-all duration-200 ease-out font-sora text-lg ${
                          isActive
                            ? "bg-[#FFDDDD] border border-[rgba(242,27,42,0.26)] text-[#F21B2A]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#F21B2A]"
                        }`}
                      >
                        {link.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
