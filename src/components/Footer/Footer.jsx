// import Image from "next/image";
// import Link from "next/link";
// import { Linkedin } from "lucide-react";
// import FooterLogo from "../../../assets/FooterLogo (2).png";
// import LinkedInLogo from "../../../assets/linkedin 1.png";
// import { useEffect, useState } from "react";
// import { fetchFootersData } from "@/lib/api/footer";
// import { fetchFooterUpdatedAt, fetchUpdatedAt } from "@/lib/updatedAt";
// import { API_BASE_URL } from "@/config/config";

// export default function Footer() {
//   const [footer, setFooter] = useState([]);

//   let cached = null;

//   const getNavbarSections = async () => {
//     const latestUpdatedAt = await fetchFooterUpdatedAt();
//     const cachedPage = cached?.content?.data?.[0];

//     if (!cached || cachedPage?.updatedAt !== latestUpdatedAt) {
//       try {
//         const res = await fetchFootersData();
//         const fetchedLinks = res?.data?.[0] || [];
//         setFooter(fetchedLinks);
//       } catch (err) {
//         console.error("Navbar fetch error:", err);
//         if (cached?.content?.data?.[0]) {
//           setFooter(cached.content.data?.[0]);
//         }
//       }
//     }
//   };

//   // Load from cache first
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       try {
//         cached = JSON.parse(localStorage.getItem("footers") || "null");
//       } catch (e) {
//         console.warn("Error parsing navbar cache:", e);
//       }

//       if (cached?.content?.data?.[0]) {
//         setFooter(cached.content.data?.[0]);
//       }
//     }

//     getNavbarSections();
//   }, []);

//   console.log(`${API_BASE_URL}${footer?.image?.url}}`, "FOOTER");
//   return (
//     <footer className=" bg-[#212121] max-w-[1920px] text-white py-12 px-4">
//       <div className="max-w-screen-3xl mx-auto px-4 sm:px-8 md:px-12 2xl:px-44">
//         {/* Logo Section */}
//         <div className="flex justify-center py-16">
//           <a href="/">
//             <img
//               src={`${API_BASE_URL}${footer?.image?.url}`}
//               alt="Atelic Logo"
//               width={247.69}
//               height={105}
//               className="object-cover"
//             />
//           </a>
//         </div>

//         {/* Wrapper that controls full width same as nav links */}
//         <div className="w-full flex items-center justify-center mb-20">
//           {/* This container defines the width of both nav links and icons section */}
//           <div className="max-w-screen-xl w-full">
//             {" "}
//             {/* Match width to nav links area */}
//             {/* Navigation Links */}
//             <div className="w-full font-sora font-thin text-white flex flex-wrap justify-center md:justify-between items-center mb-14">
//               {footer?.details?.map((text, index, arr) => (
//                 <div key={text} className="flex items-center">
//                   <a
//                     href={`${text?.link}`}
//                     className="2xl:text-[24px] text-sm lg:text-lg px-2 sm:px-4 lg:px-9 transition-colors relative"
//                   >
//                     {text?.text}
//                   </a>
//                   {index !== arr.length - 1 && (
//                     <div className="w-px h-7 bg-[#636363] mx-2 sm:mx-4 lg:mx-9"></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             {/* Icon + Phone Number */}
//             <div className="flex justify-between items-center mb-6 px-2 sm:px-4  lg:px-9 transition-colors relative">
//               {/* LinkedIn Icon */}
//               {footer?.icons?.map((icon, i) => (
//                 <a
//                   href="#"
//                   className="text-blue-400 hover:text-blue-300 transition-colors"
//                   aria-label="LinkedIn"
//                 >
//                   <img
//                     src={`${API_BASE_URL}${icon?.logo?.url}`}
//                     alt="LinkedIn Logo"
//                     className="w-[38px] h-[38px]"
//                   />
//                 </a>
//               ))}

//               {/* Phone Number */}
//               <div className="text-gray-300 text-sm lg:text-base 2xl:text-[24px]">
//                 <span className="font-medium">Phone:</span>{" "}
//                 <Link
//                   href="tel:+971505188431"
//                   className="transition-colors hover:text-white"
//                 >
//                   {footer?.Phone}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Separator Line */}
//         <div className="border-t border-gray-600 mb-9"></div>

//         <div className="2xl:text-[24px] text-base font-sora text-center">
//           <p className="2xl:text-[24px] font-light text-white text-base">
//             Copyright © {new Date().getFullYear()} Atelic.AI – All rights
//             reserved – Privacy Policy
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import FooterLogo from "../../../assets/FooterLogo (2).png";
import LinkedInLogo from "../../../assets/linkedin 1.png";
import { useEffect, useState } from "react";
import { fetchFootersData } from "@/lib/api/footer";
import { fetchFooterUpdatedAt, fetchUpdatedAt } from "@/lib/updatedAt";
import { API_BASE_URL } from "@/config/config";

export default function Footer() {
  const [footer, setFooter] = useState([]);

  let cached = null;

  const getNavbarSections = async () => {
    const latestUpdatedAt = await fetchFooterUpdatedAt();
    const cachedPage = cached?.content?.data?.[0];

    if (!cached || cachedPage?.updatedAt !== latestUpdatedAt) {
      try {
        const res = await fetchFootersData();
        const fetchedLinks = res?.data?.[0] || [];
        setFooter(fetchedLinks);
      } catch (err) {
        console.error("Navbar fetch error:", err);
        if (cached?.content?.data?.[0]) {
          setFooter(cached.content.data?.[0]);
        }
      }
    }
  };

  // Load from cache first
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        cached = JSON.parse(localStorage.getItem("footers") || "null");
      } catch (e) {
        console.warn("Error parsing navbar cache:", e);
      }

      if (cached?.content?.data?.[0]) {
        setFooter(cached.content.data?.[0]);
      }
    }

    getNavbarSections();
  }, []);

  console.log(`${API_BASE_URL}${footer?.image?.url}}`, "FOOTER");
  return (
    <footer className=" bg-[#212121] max-w-[1920px] text-white py-12 px-4">
      <div className="max-w-screen-3xl mx-auto px-4 sm:px-8 md:px-12 2xl:px-44">
        {/* Logo Section */}
        <div className="flex justify-center mb-16">
          <a href="/">
            <img
              src={`${API_BASE_URL}${footer?.image?.url}`}
              alt="Atelic Logo"
              width={247.69}
              height={105}
              className="object-cover"
            />
          </a>
        </div>

        {/* Wrapper that controls full width same as nav links */}
        <div className="w-full flex items-center justify-center mb-8 sm:mb-14">
          {/* This container defines the width of both nav links and icons section */}
          <div className="max-w-screen-xl w-full">
            {" "}
            {/* Match width to nav links area */}
            {/* Navigation Links */}
            <div className="w-full font-sora font-thin text-white mb-8 sm:mb-14">
              <div className="flex flex-wrap justify-center items-center gap-y-4">
                {footer?.details?.map((text, index, arr) => (
                  <div key={text} className="flex items-center">
                    <a
                      href={`${text?.link}`}
                      className="2xl:text-[24px] text-sm lg:text-lg px-2  transition-colors relative whitespace-nowrap"
                    >
                      {text?.text}
                    </a>
                    {index !== arr.length - 1 && (
                      <div className="w-px h-7 bg-[#636363] mx-2 sm:mx-4 lg:mx-9 hidden sm:block"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Icon + Phone Number + Email */}
            <div className="flex justify-between items-center mb-6 px-2 sm:px-4  lg:px-9 transition-colors relative">
              {/* LinkedIn Icon */}
              {footer?.icons?.map((icon, i) => (
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <img
                    src={`${API_BASE_URL}${icon?.logo?.url}`}
                    alt="LinkedIn Logo"
                    className="w-[38px] h-[38px]"
                  />
                </a>
              ))}

              {/* Phone Number and Email */}
              <div className="text-gray-300 text-sm lg:text-base 2xl:text-[24px]">
                {/* Phone Number */}
                <div className="mb-2">
                  <span className="font-medium">Phone:</span>{" "}
                  <Link
                    href="tel:+971505188431"
                    className="transition-colors hover:text-white"
                  >
                    {footer?.Phone}
                  </Link>
                </div>
                {/* Email Address */}
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  <Link
                    href={`mailto:${footer?.email || "contact@atelic.ai"}`}
                    className="transition-colors hover:text-white"
                  >
                    {footer?.email || "contact@atelic.ai"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-600 mb-9"></div>

        <div className="2xl:text-[24px] text-base font-sora text-center">
          <p className="2xl:text-[24px] font-light text-white text-base">
            Copyright © {new Date().getFullYear()} Atelic.AI – All rights
            reserved – Privacy Policy
          </p>
          <p className="2xl:text-[20px] lg:text-[14px] md:text-[14px] text-[12.7px] mt-3 font-light text-white text-base">
            Design & Developed By{" "}
            <a
              className="cursor-pointer hover:underline"
              target="_black"
              href="https://collabez.ae/"
            >
              CollabEz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
