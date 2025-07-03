import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import FooterLogo from "../../../assets/FooterLogo (2).png";
import LinkedInLogo from "../../../assets/linkedin 1.png";

export default function Footer() {
  return (
    <footer className=" bg-[#212121] max-w-[1920px] text-white py-12 px-4">
      <div className="max-w-screen-3xl mx-auto px-4 sm:px-8 md:px-12 2xl:px-44">
        {/* Logo Section */}
        <div className="flex justify-center py-16">
          <Image
            src={FooterLogo || "/placeholder.svg"}
            alt="Atelic Logo"
            width={247.69}
            height={105}
            className="object-cover"
          />
        </div>

        {/* Wrapper that controls full width same as nav links */}
        <div className="w-full flex items-center justify-center mb-20">
          {/* This container defines the width of both nav links and icons section */}
          <div className="max-w-screen-xl w-full">
            {" "}
            {/* Match width to nav links area */}
            {/* Navigation Links */}
            <div className="w-full font-sora font-thin text-white flex flex-wrap justify-center md:justify-between items-center mb-14">
              {[
                "Home",
                "About Us",
                "Our Services",
                "Partners",
                "News",
                "Enquire",
                "Our Work",
              ].map((text, index, arr) => (
                <div key={text} className="flex items-center">
                  <Link
                    href="#"
                    className="2xl:text-[24px] text-sm lg:text-base px-2 sm:px-4 lg:px-6 2xl:px-9 transition-colors relative"
                  >
                    {text}
                  </Link>
                  {index !== arr.length - 1 && (
                    <div className="w-px h-7 bg-[#636363]"></div>
                  )}
                </div>
              ))}
            </div>
            {/* Icon + Phone Number */}
            <div className="flex justify-between items-center mb-6 px-2 sm:px-4 lg:px-6 2xl:px-9 transition-colors relative">
              {/* LinkedIn Icon */}
              <Link
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Image
                  src={LinkedInLogo}
                  alt="LinkedIn Logo"
                  className="w-[38px] h-[38px]"
                />
              </Link>

              {/* Phone Number */}
              <div className="text-gray-300 text-sm lg:text-base 2xl:text-[24px]">
                <span className="font-medium">Phone:</span>{" "}
                <Link
                  href="tel:+971505188431"
                  className="transition-colors hover:text-white"
                >
                  +971 50 518 8431
                </Link>
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
        </div>
      </div>
    </footer>
  );
}
