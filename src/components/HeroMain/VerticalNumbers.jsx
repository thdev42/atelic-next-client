"use client";
import React from "react";
import { motion } from "framer-motion";
import { useBackground } from "@/context/BackgroundContext";

const VerticalNumbers = ({
  items,
  activeIndex,
  onItemClick,
  className = "",
  position = "left",
  size = "default",
}) => {
  const { slideProgress, activeHeroIndex } = useBackground();

  const sizeConfig = {
    small: {
      active: "w-10 h-10",
      inactive: "w-8 h-8",
      text: "text-xs",
      borderSize: "w-10 h-10",
    },
    default: {
      active: "w-14 h-14",
      inactive: "w-11 h-11",
      text: "text-sm",
      borderSize: "w-14 h-14",
    },
    large: {
      active: "w-16 h-16",
      inactive: "w-12 h-12",
      text: "text-base",
      borderSize: "w-16 h-16",
    },
  };

  const config = sizeConfig[size];

  const getColorRGB = () => {
    if (typeof slideProgress === "number") {
      const progress = Math.max(0, Math.min(2, slideProgress));
      let r, g, b;

      if (progress <= 1) {
        r = g = b = 0;
      } else {
        const transitionFactor = (progress - 1) / 1;
        const smoothFactor = Math.pow(transitionFactor, 0.8);
        r = g = b = Math.round(255 * smoothFactor);
      }

      return `rgb(${r}, ${g}, ${b})`;
    }

    return activeHeroIndex === 2 ? "rgb(255,255,255)" : "rgb(0,0,0)";
  };

  const getBorderColorStyle = () => {
    const baseColor = getColorRGB();

    return {
      borderLeftColor: baseColor,
      borderRightColor: baseColor,
      borderBottomColor: baseColor,
      borderTopColor: "transparent",
      transition: "border-color 0s ease-out",
    };
  };

  return (
    <div
      className={`font-poppins hidden xl:flex flex-col gap-4 items-center absolute top-1/2 -translate-y-1/2 z-40 ${
        position === "left"
          ? "left-0 2xl:ml-20 xl:ml-10 ml-0"
          : "right-0 2xl:mr-20 xl:mr-10 mr-0"
      } ${className}`}
    >
      {items.map((item, idx) => {
        const isActive = idx === activeIndex;

        return (
          <div
            key={item.id || idx}
            className={`relative cursor-pointer transition-all duration-300 ${
              isActive ? config.active : config.inactive
            } flex items-center justify-center`}
            onClick={() => onItemClick && onItemClick(idx)}
          >
            {/* Text with smooth color transition */}
            <span
              className={`${config.text} font-semibold z-10 ${
                isActive ? "scale-110" : "scale-100"
              } transition-all duration-300`}
              style={{
                color: getColorRGB(),
                transition: "color 0s ease-out",
              }}
            >
              {item.label || (idx + 1 < 10 ? `0${idx + 1}` : idx + 1)}
            </span>

            {/* Border circle for active item */}
            {isActive && (
              <motion.div
                className={`absolute rounded-full border-[2px] rotate-[45deg] ${config.borderSize}`}
                style={getBorderColorStyle()}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{
                  duration: 0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VerticalNumbers;
