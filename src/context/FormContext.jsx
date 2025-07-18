"use client";
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    industry: "",
    role: "",
    employees: "",
    support: "",
  });

  const [customValues, setCustomValues] = useState({
    industry: "",
    role: "",
    employees: "",
    support: "",
  });

  const predefinedOptions = {
    industry: [
      "energy-utilities",
      "financial-services",
      "public-sector",
      "healthcare",
      "aviation-travel",
      "tourism-hospitality",
      "hotels-fnb",
      "real-estate",
      "security-services",
      "legal-services",
      "supply-chain-logistics",
      "it-software",
    ],
    role: [
      "cto",
      "cio",
      "cfo",
      "cmo",
      "coo",
      "ceo",
      "svp-vp",
      "director",
      "manager",
      "head",
    ],
    employees: ["1-10", "10-50", "50-100", "100-500", "500-1000", "1000+"],
    support: [
      "legal-compliance",
      "sales-marketing",
      "hr-recruitment",
      "finance-payroll",
      "logistics-supply",
      "project-resource",
      "customer-service",
      "it-security",
    ],
  };

  // Hydrate form from router.query
  const hydrateFromQuery = (query) => {
    if (query?.industry || query?.role || query?.employees || query?.support) {
      const newFormData = { ...formData };
      const newCustomValues = { ...customValues };

      Object.keys(query).forEach((field) => {
        if (query[field] && predefinedOptions[field]) {
          const value = query[field];

          if (predefinedOptions[field].includes(value)) {
            newFormData[field] = value;
            newCustomValues[field] = "";
          } else {
            newFormData[field] = "other";
            newCustomValues[field] = value;
          }
        }
      });

      setFormData(newFormData);
      setCustomValues(newCustomValues);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        customValues,
        setCustomValues,
        hydrateFromQuery,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
