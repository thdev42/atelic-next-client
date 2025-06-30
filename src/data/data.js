import {
  customerServiceAndSupport,
  financeAndPayroll,
  hrAndRecruitment,
  itSecurityAndTechnology,
  legalAndCompliance,
  logisticsAndSupplyChain,
  projectAndResourceManagement,
  salesAndMarketing,
} from "./subOptions";

export const seekingSupport = [
  {
    id: "legal-compliance",
    label: "Legal & Compliance",
    subOptions: legalAndCompliance,
  },
  {
    id: "sales-marketing",
    label: "Sales & Marketing",
    subOptions: salesAndMarketing,
  },
  {
    id: "hr-recruitment",
    label: "HR & Recruitment",
    subOptions: hrAndRecruitment,
  },
  {
    id: "finance-payroll",
    label: "Finance & Payroll",
    subOptions: financeAndPayroll,
  },
  {
    id: "logistics-supply",
    label: "Logistics & Supply Chain",
    subOptions: logisticsAndSupplyChain,
  },
  {
    id: "project-resource",
    label: "Proj & Resource Mgmt",
    subOptions: projectAndResourceManagement,
  },
  {
    id: "customer-service",
    label: "Customer Service & Support",
    subOptions: customerServiceAndSupport,
  },
  {
    id: "it-security",
    label: "IT, Security & Technology Systems",
    subOptions: itSecurityAndTechnology,
  },
  { id: "other", label: "Other" },
];
