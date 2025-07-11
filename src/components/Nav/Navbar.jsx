// components/Navbar.jsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Container from "../container/container";
import NavIcon from "../../../assets/AtelicNavLogo.png";
import MenuButton from "../../../assets/menu1.png";
import Image from "next/image";
import { Sora } from "next/font/google";
import { useBackground } from "@/context/BackgroundContext";

const Navbar = () => {
  const router = useRouter();
  const { activeHeroIndex, slideProgress, isDark, fixedNav, setFixedNav } =
    useBackground();
  console.log(isDark);
  const [textColor, setTextColor] = useState("text-black");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Our Services", path: "/services" },
    { name: "Partners", path: "/partners" },
    { name: "News", path: "/news" },
    { name: "Enquire", path: "/enquire" },
    { name: "Our Work", path: "/work" },
  ];

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
        transition: "color 0s ease-out",
      };
    }

    return {};
  };

  console.log(router?.pathname);

  return (
    <>
      <header className="w-full bg-transparent">
        <nav
          className={`z-50 ${
            fixedNav ? "absolute top-0 left-0 right-0 w-full" : ""
          }`}
        >
          {" "}
          {/* Conditional fixed positioning */}
          <Container>
            <div className=" px-4 overflow-hidden sm:px-8 md:px-12 lg:px-[100px] 2xl:px-[178px] flex items-center justify-between w-full relative">
              {/* LEFT: Logo with controlled height */}
              <div
                style={getTextColorStyle()}
                className=" flex-shrink-0 cursor-pointer"
              >
                <Image
                  src={NavIcon}
                  alt="Logo"
                  width={173} // Reduced from 173 to 120
                  // height={120} // Added fixed height
                  className="object-contain" // Maintain aspect ratio
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
              </div>

              {/* CENTER: Navigation Links */}
              <ul className="z-50 hidden flex-shrink-0 lg:flex 2xl:gap-5 lg:gap-1 2xl:text-[20px] lg:text-sm font-sora font-normal">
                {navLinks.map((link) => {
                  const isActive = router.pathname === link.path;

                  return (
                    <li key={link.path}>
                      <a
                        href={link.path}
                        className={`px-3 py-1 rounded-[20.5px] transition-all duration-200 ease-out ${
                          isActive
                            ? "bg-[#FFDDDD] border border-[rgba(242,27,42,0.26)] text-[#F21B2A]"
                            : "hover:text-primary"
                        }`}
                        style={!isActive ? getTextColorStyle() : {}}
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* RIGHT: Menu Icon */}
              <div className="z-50 flex-shrink-0">
                <button className="cursor-pointer">
                  <Image
                    src={MenuButton}
                    alt="Menu"
                    width={32} // Reduced from 38 to 32
                    height={32} // Added fixed height
                    className="object-contain"
                    style={{
                      filter:
                        (typeof slideProgress === "number" &&
                          slideProgress > 1.5) ||
                        isDark
                          ? "brightness(0) invert(1)" // Make menu icon white for dark background
                          : "none",
                      transition: "filter 0.3s ease-out",
                    }}
                  />
                </button>
              </div>
            </div>
          </Container>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
