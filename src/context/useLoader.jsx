import React, { createContext, useContext, useState } from "react";
// import Loader from "../components/Loader";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        isCached,
        loading,
        setLoading,
        setIsCached,
        dataFetched,
        setDataFetched,
      }}
    >
      {children}
      {/* {!isCached && loading && <Loader />} */}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
