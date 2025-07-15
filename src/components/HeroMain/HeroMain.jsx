"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";

import { useBackground } from "@/context/BackgroundContext";
import { HeroDynamic } from "../HeroScreens/HeroScreens";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ParticlesComp from "../Particles/Particles";

const HeroSection = ({ scrollYSProgress, section }) => {
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { setBackground, setActiveHeroIndex, setSlideProgress, setFixedNav } =
    useBackground();
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const particlesLoaded = (container) => {
    console.log(container);
  };

  const particlesOptions = {
    autoPlay: true,
    background: {
      color: {
        // value: "#0d47a1",
      },
      image: "",
      position: "",
      repeat: "",
      size: "",
      opacity: 1,
    },
    backgroundMask: {
      composite: "destination-out",
      cover: {
        opacity: 1,
        color: {
          value: "",
        },
      },
      enable: false,
    },
    clear: true,
    defaultThemes: {},
    delay: 0,
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    detectRetina: true,
    duration: 0,
    fpsLimit: 120,
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: false,
          mode: "push",
        },
        onDiv: {
          selectors: {},
          enable: false,
          mode: {},
          // type: "circle",
        },
        onHover: {
          enable: true,
          mode: "grab",
          parallax: {
            enable: true,
            force: 60,
            smooth: 10,
          },
        },
        resize: {
          delay: 0.5,
          enable: true,
        },
      },
      modes: {
        trail: {
          delay: 1,
          pauseOnStop: false,
          quantity: 1,
        },
        attract: {
          distance: 200,
          duration: 0.4,
          easing: "ease-out-quad",
          factor: 1,
          maxSpeed: 50,
          speed: 1,
        },
        bounce: {
          distance: 200,
        },
        bubble: {
          distance: 100,
          duration: 9,
          mix: false,
          opacity: 0.8,
          size: 40,
          divs: {
            distance: 400,
            duration: 0.4,
            mix: false,
            selectors: {},
          },
        },
        connect: {
          distance: 80,
          links: {
            opacity: 0.5,
          },
          radius: 60,
        },
        grab: {
          distance: 400,
          links: {
            blink: false,
            consent: false,
            opacity: 1,
          },
        },
        push: {
          default: true,
          groups: [],
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
        repulse: {
          distance: 200,
          duration: 2,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad",
          divs: {
            distance: 400,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 20,
            easing: "ease-out-quad",
            selectors: {},
          },
        },
        slow: {
          factor: 3,
          radius: 200,
        },
        particle: {
          replaceCursor: false,
          pauseOnStop: false,
          stopDelay: 0,
        },
        light: {
          area: {
            gradient: {
              start: {
                value: "#ffffff",
              },
              stop: {
                value: "#000000",
              },
            },
            radius: 1000,
          },
          shadow: {
            color: {
              value: "#000000",
            },
            length: 2000,
          },
        },
      },
    },
    manualParticles: [],
    particles: {
      bounce: {
        horizontal: {
          value: 1,
        },
        vertical: {
          value: 1,
        },
      },
      collisions: {
        absorb: {
          speed: 2,
        },
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
        enable: false,
        maxSpeed: 0,
        mode: "bounce",
        overlap: {
          enable: false,
          retries: 0,
        },
      },
      color: {
        value: "#f02c2c",
        animation: {
          h: {
            count: 0,
            enable: false,
            speed: 0,
            decay: 0,
            delay: 0,
            sync: true,
            offset: 0,
          },
          s: {
            count: 0,
            enable: false,
            speed: 0,
            decay: 0,
            delay: 0,
            sync: true,
            offset: 0,
          },
          l: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            delay: 0,
            sync: true,
            offset: 0,
          },
        },
      },
      effect: {
        close: true,
        fill: true,
        options: {},
        type: {},
      },
      groups: [],
      move: {
        angle: {
          offset: 0,
          value: 0,
        },
        attract: {
          distance: 0,
          enable: false,
          rotate: {
            x: 3000,
            y: 3000,
          },
        },
        center: {
          x: 50,
          y: 50,
          mode: "percent",
          radius: 0,
        },
        decay: 0,
        distance: {},
        direction: "none",
        drift: 0,
        enable: true,
        gravity: {
          acceleration: 9.81,
          enable: true,
          inverse: true,
          maxSpeed: 0.7,
        },
        path: {
          clamp: true,
          delay: {
            value: 0,
          },
          enable: false,
          options: {},
        },
        outModes: {
          default: "out",
          bottom: "out",
          left: "out",
          right: "out",
          top: "out",
        },
        random: false,
        size: false,
        speed: 0.8,
        spin: {
          acceleration: 0,
          enable: false,
        },
        straight: false,
        trail: {
          enable: false,
          length: 10,
          fill: {},
        },
        vibrate: false,
        warp: false,
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
        limit: {
          mode: "delete",
          value: 0,
        },
        value: 50,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.5,
        },
        animation: {
          count: 10,
          enable: true,
          speed: 3,
          decay: 0,
          delay: 0,
          sync: false,
          mode: "auto",
          startValue: "random",
          destroy: "none",
        },
      },
      reduceDuplicates: false,
      shadow: {
        blur: 0.7,
        color: {
          value: "#6ac0e9",
        },
        enable: false,
        offset: {
          x: 0,
          y: 0,
        },
      },
      shape: {
        close: true,
        fill: true,
        options: {},
        type: "square",
      },
      size: {
        value: {
          min: 1,
          max: 10,
        },
        animation: {
          count: 0,
          enable: true,
          speed: 20,
          decay: 0,
          delay: 0,
          sync: false,
          mode: "auto",
          startValue: "random",
          destroy: "none",
        },
      },
      stroke: {
        width: 0,
      },
      zIndex: {
        value: 0,
        opacityRate: 1,
        sizeRate: 1,
        velocityRate: 1,
      },
      destroy: {
        bounds: {},
        mode: "none",
        split: {
          count: 1,
          factor: {
            value: 3,
          },
          rate: {
            value: {
              min: 4,
              max: 9,
            },
          },
          sizeOffset: true,
          particles: {},
        },
      },
      roll: {
        darken: {
          enable: false,
          value: 0,
        },
        enable: false,
        enlighten: {
          enable: false,
          value: 0,
        },
        mode: "horizontal",
        speed: 25,
      },
      tilt: {
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          decay: 0,
          sync: false,
        },
        direction: "clockwise",
        enable: false,
      },
      twinkle: {
        lines: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
        particles: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
      },
      wobble: {
        distance: 5,
        enable: false,
        speed: {
          angle: 50,
          move: 10,
        },
      },
      life: {
        count: 0,
        delay: {
          value: 0,
          sync: false,
        },
        duration: {
          value: 0,
          sync: false,
        },
      },
      rotate: {
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          decay: 0,
          sync: false,
        },
        direction: "clockwise",
        path: false,
      },
      orbit: {
        animation: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          delay: 0,
          sync: false,
        },
        enable: false,
        opacity: 1,
        rotation: {
          value: 45,
        },
        width: 1,
      },
      links: {
        blink: false,
        color: {
          value: "#f02c2c",
        },
        consent: false,
        distance: 150,
        enable: true,
        frequency: 1,
        opacity: 0.4,
        shadow: {
          blur: 5,
          color: {
            value: "#000",
          },
          enable: false,
        },
        triangles: {
          enable: false,
          frequency: 1,
        },
        width: 1,
        warp: false,
      },
      repulse: {
        value: 0,
        enabled: false,
        distance: 1,
        duration: 1,
        factor: 1,
        speed: 1,
      },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    responsive: [],
    smooth: false,
    style: {},
    themes: [],
    zLayers: 100,
    key: "parallax",
    name: "Parallax",
  };
  // const particlesOptions = {
  //   fullScreen: { enable: false },
  //   background: {
  //     color: {
  //       value: "transparent",
  //     },
  //   },
  //   fpsLimit: 120,
  //   particles: {
  //     number: {
  //       value: 80,
  //       density: {
  //         enable: true,
  //         value_area: 800,
  //       },
  //     },
  //     color: {
  //       value: "#F02C2C",
  //     },
  //     shape: {
  //       type: "circle",
  //     },
  //     opacity: {
  //       value: 0.5,
  //       random: true,
  //     },
  //     size: {
  //       value: 3,
  //       random: true,
  //     },
  //     move: {
  //       enable: true,
  //       speed: 1,
  //       direction: "none",
  //       outModes: {
  //         default: "out",
  //       },
  //     },
  //     links: {
  //       enable: true,
  //       distance: 150,
  //       color: "#F02C2C",
  //       opacity: 0.4,
  //       width: 1,
  //     },
  //   },
  //   interactivity: {
  //     events: {
  //       onHover: {
  //         enable: true,
  //         mode: "repulse",
  //       },
  //       onClick: {
  //         enable: true,
  //         mode: "push",
  //       },
  //       resize: true,
  //     },
  //     modes: {
  //       repulse: {
  //         distance: 100,
  //         duration: 0.4,
  //       },
  //       push: {
  //         quantity: 4,
  //       },
  //     },
  //   },
  //   detectRetina: true,
  // };
  const heroDataArray = section?.details || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width =
        typeof window !== "undefined"
          ? window.visualViewport?.width || window.innerWidth
          : 1024;
      setIsMobile(width < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax motion transforms
  const sectionY = useTransform(
    scrollYSProgress,
    [0, 1],
    isMobile ? [0, 0] : [90, -50]
  );
  const backgroundY = useTransform(
    scrollYSProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-50%"]
  );
  const robotY = useTransform(
    scrollYSProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-30%"]
  );
  const textY = useTransform(
    scrollYSProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-90%"]
  );

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeSection < heroDataArray.length - 1) {
      setActiveSection(activeSection + 1);
    }
    if (isRightSwipe && activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && activeSection > 0) {
        setActiveSection(activeSection - 1);
      }
      if (e.key === "ArrowRight" && activeSection < heroDataArray.length - 1) {
        setActiveSection(activeSection + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  useEffect(() => {
    const currentSlide = heroDataArray[activeSection];
    const bgColor = currentSlide?.bgColor || "#e9e9e9";
    setBackground(bgColor);
    setActiveHeroIndex(activeSection);
    setSlideProgress && setSlideProgress(activeSection);
  }, [
    activeSection,
    heroDataArray,
    setBackground,
    setActiveHeroIndex,
    setSlideProgress,
  ]);

  const goToSlide = (newIndex) => {
    if (newIndex < 0 || newIndex >= heroDataArray.length) return;
    setActiveSection(newIndex);
  };

  const activeSlideData = heroDataArray[activeSection];
  const isDark = activeSlideData?.theme === "dark";

  return (
    <motion.section
      ref={sectionRef}
      // style={{ y: isMobile ? 0 : sectionY, willChange: "transform" }}
      className={`overflow-y-visible ${
        isMobile ? "relative" : "sticky top-0"
      } max-w-[1920px]  mx-auto w-full  2xl:py-5 transition-all duration-1000 ease-in-out z-0`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Vertical Numbers */}
      <div className=" font-poppins hidden z-50 lg:flex flex-col gap-4 2xl:ml-20 xl:ml-10 ml-10 items-center absolute left-0 lg:top-1/3 xl:top-1/2 top-1/3 -translate-y-1/2">
        {heroDataArray.map((_, idx) => (
          <div
            key={idx}
            className={`relative cursor-pointer transition-all duration-300 ${
              idx === activeSection ? "w-14 h-14" : "w-11 h-11"
            } flex items-center justify-center`}
            onClick={() => goToSlide(idx)}
          >
            <span
              className={`text-sm font-semibold z-10 transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            {idx === activeSection && (
              <motion.span
                className={`absolute w-14 h-14 rounded-full border-[2px] rotate-[45deg] border-t-transparent transition-colors duration-300 ${
                  isDark ? "border-white" : "border-black"
                }`}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Slide Component */}
      {isMobile ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            // initial={{ opacity: 0, x: 100 }}
            // animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <HeroDynamic
              heroData={activeSlideData}
              sectionY={sectionY}
              backgroundY={backgroundY}
              robotY={robotY}
              textY={textY}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={activeSection}>
            <ParticlesComp />
            <HeroDynamic
              heroData={activeSlideData}
              sectionY={sectionY}
              backgroundY={backgroundY}
              robotY={robotY}
              textY={textY}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Slide Indicators */}
      <div className="absolute lg:hidden bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 items-center z-20">
        {heroDataArray.map((_, idx) => {
          const isActive = idx === activeSection;
          return (
            <motion.button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: isActive ? "21px" : "9px",
                height: isActive ? "21px" : "9px",
                borderWidth: isActive ? 1 : 0,
                borderColor: isActive
                  ? isDark
                    ? "#ffffff"
                    : "#335F86"
                  : "transparent",
              }}
              initial={false}
              animate={{
                width: isActive ? "21px" : "9px",
                height: isActive ? "21px" : "9px",
                borderWidth: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className={`rounded-full ${
                  isActive
                    ? isDark
                      ? "bg-white"
                      : "bg-[#335F86]"
                    : isDark
                    ? "bg-white hover:bg-gray-300"
                    : "bg-[#335F86] hover:bg-gray-400"
                }`}
                style={{ width: "9px", height: "9px" }}
                initial={false}
                animate={{
                  backgroundColor: isActive
                    ? isDark
                      ? "#ffffff"
                      : "#335F86"
                    : isDark
                    ? "#ffffff"
                    : "#335F86",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes floatUpDown {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </motion.section>
  );
};

export default HeroSection;
