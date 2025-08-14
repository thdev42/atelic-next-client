import React, { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

export const CookiesBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner - Fixed at bottom center */}
      <div
        style={{ zIndex: 55 }}
        className="fixed bottom-6 font-sora left-4 right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-auto sm:max-w-lg bg-white rounded-xl shadow-2xl border animate-in slide-in-from-bottom-4"
      >
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Cookie className="w-4 h-4 text-orange-600" />
            </div>

            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                🍪 Atelic Use Cookies
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies to improve your experience and analyze site
                usage.Some cookies are essential, while others help us
                personalize content and improve our services.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDecline}
              className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Decline
            </button>

            <button
              onClick={handleAccept}
              className="flex-1 px-3 py-2 text-sm font-medium text-white rounded-lg hover:bg-red-700 transition-colors"
              style={{ backgroundColor: "#F02C2C" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e22323")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#F02C2C")}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesBanner;
