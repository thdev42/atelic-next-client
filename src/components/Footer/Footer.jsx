import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import FooterLogo from "../../../assets/FooterLogo (2).png";

export default function Footer() {
  return (
    <footer className="bg-[#212121] max-w-[1920px] h-[750px] text-white py-12 px-4">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-12">
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

        {/* Navigation Links - Centered */}
        <div className="font-sora font-thin text-white flex flex-wrap justify-center items-center mb-8">
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
                className="2xl:text-[24px] text-sm lg:text-base px-2 sm:px-4 2xl:px-12 lg:px-6 transition-colors relative whitespace-nowrap"
              >
                {text}
              </Link>
              {index !== arr.length - 1 && (
                <div className="w-px h-4 bg-white"></div>
              )}
            </div>
          ))}
        </div>

        {/* Icons and Phone - Simple approach with calculated margins */}
        <div
          className="flex justify-between items-center mb-6"
          style={{
            marginLeft: "calc(50% - 45vw)",
            marginRight: "calc(50% - 45vw)",
            width: "90vw",
            maxWidth: "1200px",
          }}
        >
          {/* LinkedIn Icon */}
          <Link
            href="#"
            className="text-blue-400 hover:text-blue-300 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 2xl:w-8 2xl:h-8" />
          </Link>

          {/* Phone Number */}
          <div className="text-gray-300 text-sm lg:text-base 2xl:text-[24px] whitespace-nowrap">
            <span className="font-medium">Phone:</span>{" "}
            <Link
              href="tel:+971505188431"
              className="transition-colors hover:text-white"
            >
              +971 50 518 8431
            </Link>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-600 mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2025 Atelic.ai - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
