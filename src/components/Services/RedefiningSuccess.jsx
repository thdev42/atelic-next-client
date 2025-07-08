import React from "react";
import Image from "next/image";
import Group1 from "../../../assets/Group1.png";

const cardData = [
  {
    id: "01",
    icon: Group1,
    text: "Sales teams that aren't industry experts selling agents that won't work for me",
  },
  {
    id: "02",
    icon: Group1,
    text: "Our data is still silo'd & are unsure of how we can optimize AI performance with the data we have.",
  },
  {
    id: "03",
    icon: Group1,
    text: "We don't have total trust in the potential hallucinations, nor the on-premise requirements to ensure our security is paramount when working with AI Technology.",
  },
  {
    id: "04",
    icon: Group1,
    text: "We are still working with a Franken-Stack of SaaS, Cloud, OTA or legacy systems that won't integrate.",
  },
  {
    id: "05",
    icon: Group1,
    text: "If I do this technology change now, what's to stop it becoming redundant within a year? Isn't the pace of change too quick.",
  },
];

export const RedefiningSuccess = () => {
  return (
    <section className="bg-[#f3f3f3] max-w-[1920px] mx-auto w-full py-10 relative overflow-hidden">
      <div className="font-sora md:mt-10 px-4 text-black sm:px-8 md:px-12 lg:px-[100px] 2xl:px-[178px] mx-auto">
        {/* Header Section */}
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl sm:text-3xl md:text-[43px] 2xl:text-6xl font-normal">
            Redefining Success, <span className="font-bold">Together</span>
          </h1>
          <p className="lg:max-w-3xl 2xl:max-w-none lg:text-sm lg:leading-loose 2xl:text-[18px] mt-4 leading-relaxed mx-auto">
            Success for us, starts with understanding our clients & building on
            what the definition of success is for them. Time again we hear the
            same challenges, these include....
          </p>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 2xl:py-14 py-10  justify-items-center">
          {cardData.map((item, i) => (
            <div
              key={i}
              className="group w-full max-w-[499px] bg-white rounded-md shadow-sm transition-all duration-300 hover:bg-[#335F86] text-black hover:text-white relative flex flex-col justify-between items-center text-center px-5 py-7 2xl:px-6 2xl:py-8"
            >
              {/* Card Number */}
              <span className="absolute top-4 right-4 text-lg font-light">
                {item.id}
              </span>

              {/* Icon Section */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-[124px] h-[124px] max-w-[90px] 2xl:max-w-none flex items-center justify-center transition-colors duration-300 rounded-full">
                  <Image
                    src={item.icon}
                    alt={`icon-${item.id}`}
                    width={124}
                    height={124}
                  />
                </div>
                <div className="w-20 h-[3px] relative bg-[#335F86] group-hover:bg-white transition-colors duration-300 " />
              </div>

              {/* Text Section */}
              <div className="flex-1 flex items-center justify-center">
                <p className="2xl:text-[18px] text-[13px] font-light leading-relaxed mt-4">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
