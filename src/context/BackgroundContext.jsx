// context/BackgroundContext.js
import { createContext, useContext, useState, useCallback } from "react";

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [background, setBackground] = useState("#e9e9e9");
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isShowNav, setIsShowNav] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const updateSlideProgress = useCallback((progress) => {
    setSlideProgress(progress);
  }, []);

  const value = {
    background,
    isDark,
    setIsDark,
    setBackground,
    activeHeroIndex,
    setActiveHeroIndex,
    slideProgress,
    setSlideProgress,
    updateSlideProgress,
    isShowNav,
    setIsShowNav,
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
