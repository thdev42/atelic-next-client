// context/BackgroundContext.js
import { createContext, useContext, useState, useCallback } from "react";

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [background, setBackground] = useState("#e9e9e9");
  const [backgroundType, setBackgroundType] = useState("color"); // "color" or "image"
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isShowNav, setIsShowNav] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [fixedNav, setFixedNav] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Enhanced setBackground function to handle both colors and images
  const setBackgroundValue = useCallback((value, type = "color") => {
    setBackground(value);
    setBackgroundType(type);
  }, []);

  const updateSlideProgress = useCallback((progress) => {
    setSlideProgress(progress);
  }, []);

  const value = {
    background,
    backgroundType,
    isTransitioning,
    setIsTransitioning,
    setBackground: setBackgroundValue,
    isDark,
    setIsDark,
    activeHeroIndex,
    setActiveHeroIndex,
    slideProgress,
    setSlideProgress,
    updateSlideProgress,
    isShowNav,
    setIsShowNav,
    fixedNav,
    setFixedNav,
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
