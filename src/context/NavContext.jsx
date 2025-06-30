// context/BackgroundContext.js
import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavProvider = ({ children }) => {
  const [isShowNav, setIsShowNav] = useState(true);

  const value = {
    isShowNav,
    setIsShowNav,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNav = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
