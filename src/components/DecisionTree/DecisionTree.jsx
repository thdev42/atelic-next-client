"use client";

import React, { useState } from "react";
import { SelectField } from "../SelectComp/SelectComp";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export const DecisionTree = ({ onComplete, data }) => {
  const router = useRouter();

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

  const [modalState, setModalState] = useState({
    isOpen: false,
    field: "",
    value: "",
  });

  const handleChange = (key, value) => {
    if (value === "other") {
      setModalState({
        isOpen: true,
        field: key,
        value: "",
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
      // Clear custom value if not selecting other
      setCustomValues((prev) => ({
        ...prev,
        [key]: "",
      }));
    }
  };

  const handleModalSave = () => {
    if (!modalState.value.trim()) {
      toast.error("Please enter a value");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [modalState.field]: "other",
    }));

    setCustomValues((prev) => ({
      ...prev,
      [modalState.field]: modalState.value.trim(),
    }));

    setModalState({
      isOpen: false,
      field: "",
      value: "",
    });

    toast.success("Custom option saved!");
  };

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      field: "",
      value: "",
    });
  };

  const getFieldLabel = (field) => {
    const labels = {
      industry: "Industry",
      role: "Role",
      employees: "Company Size",
      support: "Support Area",
    };
    return labels[field] || field;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { industry, role, employees, support } = formData;

    if (!industry || !role || !employees || !support) {
      toast.error("Please fill in all fields before proceeding.");
      return;
    }

    // Prepare final data with custom values where applicable
    const finalData = {
      industry: industry === "other" ? customValues.industry : industry,
      role: role === "other" ? customValues.role : role,
      employees: employees === "other" ? customValues.employees : employees,
      support: support === "other" ? customValues.support : support,
    };

    router.push({
      pathname: "/dt",
      query: finalData,
    });

    // onComplete(finalData);
  };

  const selectFields = [
    {
      key: "industry",
      placeholder: "Which industry are you in?",
      options: [
        { value: "energy-utilities", label: "Energy & Utilities" },
        { value: "financial-services", label: "Financial Services" },
        { value: "public-sector", label: "Public Sector" },
        { value: "healthcare", label: "Healthcare" },
        { value: "aviation-travel", label: "Aviation & Travel" },
        { value: "tourism-hospitality", label: "Tourism & Hospitality" },
        { value: "hotels-fnb", label: "Hotels / F&B" },
        { value: "real-estate", label: "Real Estate" },
        { value: "security-services", label: "Security Services" },
        { value: "legal-services", label: "Legal Services" },
        { value: "supply-chain-logistics", label: "Supply Chain & Logistics" },
        { value: "it-software", label: "IT & Software" },
        { value: "other", label: "Other" },
      ],
    },
    {
      key: "role",
      placeholder: "I am a",
      options: [
        { value: "cto", label: "CTO" },
        { value: "cio", label: "CIO" },
        { value: "cfo", label: "CFO" },
        { value: "cmo", label: "CMO" },
        { value: "coo", label: "COO" },
        { value: "ceo", label: "CEO" },
        { value: "svp-vp", label: "SVP / VP" },
        { value: "director", label: "Director of..." },
        { value: "manager", label: "Manager of..." },
        { value: "head", label: "Head of..." },
        { value: "other", label: "Other..." },
      ],
    },
    {
      key: "employees",
      placeholder: "My company employs...",
      options: [
        { value: "1-10", label: "1 to 10" },
        { value: "10-50", label: "10 to 50" },
        { value: "50-100", label: "50 to 100" },
        { value: "100-500", label: "100 to 500" },
        { value: "500-1000", label: "500 to 1000" },
        { value: "1000+", label: "1000+" },
      ],
    },
    {
      key: "support",
      placeholder: "I am seeking support in...",
      options: [
        { value: "legal-compliance", label: "Legal & Compliance" },
        { value: "sales-marketing", label: "Sales & Marketing" },
        { value: "hr-recruitment", label: "HR & Recruitment" },
        { value: "finance-payroll", label: "Finance & Payroll" },
        { value: "logistics-supply", label: "Logistics & Supply Chain" },
        { value: "project-resource", label: "Proj & Resource Mgmt" },
        { value: "customer-service", label: "Customer Service & Support" },
        { value: "it-security", label: "IT, Security & Technology Systems" },
        { value: "other", label: "Other" },
      ],
    },
  ];

  return (
    <section className="z-10 relative font-sora overflow-hidden bg-[#1C1C1C] text-white max-w-[1920px] mx-auto w-full py-16">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className="px-4 sm:px-8 2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto flex flex-col lg:flex-row justify-between gap-0">
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left mx-auto">
          <h2 className="2xl:text-[55px] text-3xl 2xl:leading-snug md:text-4xl font-light mb-4">
            {data?.headings?.map(({ id, text, color, breakAfter }, idx) => (
              <span key={id || idx}>
                <span
                  className={color !== "default" ? "font-bold" : ""}
                  style={color !== "default" ? { color } : {}}
                >
                  {text}
                </span>
                {breakAfter && <br />}
              </span>
            ))}
          </h2>
          <p className="text-base 2xl:text-[22px] font-light leading-normal text-white/60 max-w-[580px] mb-4">
            Use our smart decision tool to discover which AI technologies best
            align with your business goals.
          </p>
        </div>

        <div className="font-sora w-full 2xl:max-w-[520px] lg:max-w-[480px] space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {selectFields.map(({ key, placeholder, options }) => (
              <SelectField
                key={key}
                placeholder={placeholder}
                value={formData[key]}
                onChange={(value) => handleChange(key, value)}
                options={options}
              />
            ))}

            <button
              type="submit"
              className="2xl:min-h-[80px] 2xl:text-[20px] w-full bg-[#F02C2C] text-white font-medium py-4 rounded-full hover:bg-[#e22323] transition"
            >
              Next
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2A2A2A] rounded-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-medium mb-4 text-white">
              Specify {getFieldLabel(modalState.field)}
            </h3>

            <input
              type="text"
              value={modalState.value}
              onChange={(e) =>
                setModalState((prev) => ({ ...prev, value: e.target.value }))
              }
              placeholder={`Enter your ${getFieldLabel(
                modalState.field
              ).toLowerCase()}...`}
              className="w-full p-3 bg-[#1C1C1C] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#F02C2C] transition-colors"
              autoFocus
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleModalClose}
                className="flex-1 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="flex-1 py-3 px-4 bg-[#F02C2C] text-white rounded-lg hover:bg-[#e22323] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
