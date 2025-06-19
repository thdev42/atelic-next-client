"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectField } from "../SelectComp/SelectComp";

export const DecisionTree = () => {
  return (
    <section className="font-sora bg-[#1C1C1C] text-white max-w-[1920px] mx-auto w-full py-16">
      <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] mx-auto flex flex-col lg:flex-row justify-between gap-0">
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left mx-auto">
          <h2 className="2xl:text-[55px] text-3xl 2xl:leading-snug md:text-4xl font-light mb-4">
            Find The Right{" "}
            <span className="font-bold text-[#F02C2C]">AI Solution</span>
            <br />
            For Your Needs
          </h2>
          <p className="text-base 2xl:text-[22px] font-light leading-normal text-white/60 max-w-[580px] mb-4">
            Use our smart decision tool to discover which AI technologies best
            align with your business goals.
          </p>
        </div>

        <div className="font-sora w-full 2xl:max-w-[520px] lg:max-w-[480px] space-y-5">
          <form className="space-y-5">
            <SelectField
              placeholder="Which industry are you in?"
              options={[
                { value: "finance", label: "Finance" },
                { value: "healthcare", label: "Healthcare" },
                { value: "retail", label: "Retail" },
              ]}
            />
            <SelectField
              placeholder="I am a"
              options={[
                { value: "founder", label: "Founder" },
                { value: "cto", label: "CTO" },
                { value: "marketer", label: "Marketer" },
              ]}
            />
            <SelectField
              placeholder="My company employs..."
              options={[
                { value: "1-10", label: "1-10" },
                { value: "11-50", label: "11-50" },
                { value: "51-200", label: "51-200" },
              ]}
            />
            <SelectField
              placeholder="I am seeking support in..."
              options={[
                { value: "automation", label: "Automation" },
                { value: "analytics", label: "Analytics" },
                { value: "chatbots", label: "Chatbots" },
              ]}
            />

            <button
              type="submit"
              className="2xl:min-h-[80px] 2xl:text-[20px] w-full bg-[#F02C2C] text-white font-medium py-4 rounded-full hover:bg-[#e22323] transition"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
