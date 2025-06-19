import { createContext, useContext, useState } from "react";

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [background, setBackground] = useState("#ffffff");
  const [activeHeroIndex, setActiveHeroIndex] = useState(0); // 🆕

  return (
    <BackgroundContext.Provider
      value={{ background, setBackground, activeHeroIndex, setActiveHeroIndex }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);
