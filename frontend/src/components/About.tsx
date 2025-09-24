"use client";

import { useState, useEffect, useRef } from "react";

interface AboutProps {
  onBookService?: (serviceName: string) => void;
}

export default function About({ onBookService }: AboutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Intersection Observer for scroll animations and video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Auto-play video when section becomes visible
          if (videoRef.current && isVideoLoaded) {
            videoRef.current.play().catch((error) => {
              console.log(
                "Autoplay blocked by browser, user interaction required"
              );
            });
          }
        } else {
          // Pause video when section is not visible
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVideoLoaded]);

  const handleBookService = () => {
    if (onBookService) {
      onBookService("General Appointment");
    } else {
      // Fallback: scroll to booking section if no callback provided
      document
        .getElementById("booking-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCallNow = () => {
    window.open("tel:9315673184", "_self");
  };

  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
    // Try to autoplay when video data is loaded
    if (videoRef.current && isVisible) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay blocked by browser");
      });
    }
  };

  // Color scheme matching your Services section
  const sectionBg = isDarkMode ? "bg-black" : "bg-white";
  const titleColor = isDarkMode ? "text-white" : "text-black";
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const cardBg = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";

  return (
    <section
      ref={sectionRef}
      className={`py-12 md:py-20 ${sectionBg} transition-colors duration-300 overflow-hidden relative`}
      id="about"
    >
      <div className="container mx-auto px-4">
        {/* Animated Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${titleColor}`}>
            About <span className="text-pink-600">Madhuri Salon</span>
          </h2>
          <div className="w-24 h-1 bg-pink-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Welcome Message with Animation */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div
              className={`p-6 md:p-8 rounded-2xl ${cardBg} border ${borderColor} shadow-lg`}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-xl md:text-2xl">💖</span>
                </div>
                <h3 className={`text-xl md:text-2xl font-bold ${titleColor}`}>
                  Welcome to Madhuri Salon
                </h3>
              </div>

              <p className={`text-base md:text-lg mb-4 ${textColor}`}>
                Where{" "}
                <span className="text-pink-600 font-semibold">
                  Beauty Meets Elegance & Convenience!
                </span>
              </p>

              <p className={`mb-4 md:mb-6 text-sm md:text-base ${textColor}`}>
                At Madhuri Salon, we believe beauty isn&apos;t just about
                looking good—it&apos;s about feeling confident, radiant, and
                unstoppable! ✨ Whether it&apos;s a special event, a casual
                pamper day, or a complete makeover, we are here to bring out
                your best self.
              </p>

              <p className={`text-sm md:text-base ${textColor}`}>
                Step into a world where luxury meets comfort, and beauty meets
                care. Whether at our modern salon or in the comfort of your
                home, Madhuri Salon is your ultimate beauty destination! 🏡💇‍♀️
              </p>
            </div>

            {/* Why Choose Us - Animated Cards */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h4
                className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center ${titleColor}`}
              >
                🌟 Why Choose Madhuri Salon? 🌟
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {[
                  {
                    icon: "💇‍♀️",
                    title: "Dual Experience",
                    desc: "Salon or Home service options",
                  },
                  {
                    icon: "💎",
                    title: "Expert Team",
                    desc: "Professional beauticians",
                  },
                  {
                    icon: "🌸",
                    title: "Premium Products",
                    desc: "Safe & effective results",
                  },
                  {
                    icon: "🎯",
                    title: "Personalized Solutions",
                    desc: "Customized for you",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 md:p-4 rounded-lg ${cardBg} border ${borderColor} transition-transform duration-300 hover:scale-105`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl md:text-2xl mr-2 md:mr-3">
                        {item.icon}
                      </span>
                      <div>
                        <h5
                          className={`font-semibold text-sm md:text-base ${titleColor}`}
                        >
                          {item.title}
                        </h5>
                        <p className={`text-xs md:text-sm ${textColor}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Video & CTA with Animation */}
          <div
            className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Video Section */}
            <div
              className={`rounded-2xl overflow-hidden shadow-lg ${borderColor} border`}
            >
              <div className="relative">
                {/* Video Player */}
                <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-br from-pink-400 to-purple-600">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={handleVideoLoadedData}
                  >
                    <source src="contact.mp4" type="video/mp4" />
                    <source src="/contact.mp4" type="video/mp4" />
                    <source src="/contact.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs md:text-sm">
                  🎬 Salon Experience
                </div>
              </div>

              <div className={`p-4 md:p-6 ${cardBg}`}>
                <h3
                  className={`text-lg md:text-xl font-bold mb-2 md:mb-3 ${titleColor}`}
                >
                  Experience Madhuri Salon ✨
                </h3>
                <p className={`text-sm md:text-base ${textColor} mb-3 md:mb-4`}>
                  Watch our premium salon facilities and luxurious environment
                  in this seamless video tour.
                </p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {[
                    "Luxury Interior",
                    "Professional Equipment",
                    "Hygienic Environment",
                    "Comfortable Seating",
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Services List */}
            <div
              className={`p-6 md:p-8 rounded-2xl ${cardBg} border ${borderColor} shadow-lg`}
            >
              <h4
                className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center ${titleColor}`}
              >
                💅 Our Services Include
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {[
                  "Haircare: Haircuts, styling, coloring, treatments",
                  "Skincare: Facials, anti-aging therapies, glow treatments",
                  "Nails: Manicure, pedicure, nail art, hand & foot care",
                  "Waxing & Threading: Smooth, flawless results",
                  "Makeup & Bridal Packages: Look stunning for any occasion",
                  "Home Service Packages: Professional beauty at your convenience",
                ].map((service, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-pink-600 mr-2 mt-0.5 text-sm">•</span>
                    <span className={`text-xs md:text-sm ${textColor}`}>
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Madhuri Magic Section */}
            <div
              className={`p-6 md:p-8 rounded-2xl bg-gradient-to-r from-pink-600 to-pink-500 text-white text-center shadow-lg transition-all duration-1000 delay-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                🌈 Experience the Madhuri Magic! 🌈
              </h4>

              <p className="mb-4 md:mb-6 opacity-95 text-sm md:text-base">
                Whether you visit us or book a home service, we promise a
                luxurious, relaxing, and unforgettable beauty experience. At
                Madhuri Salon, beauty is not just a service—it&apos;s a feeling,
                an experience, and a transformation!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <button
                  onClick={handleBookService}
                  className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold transition-colors duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  💖 Book Appointment
                </button>
                <button
                  onClick={handleCallNow}
                  className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  📞 Call Now
                </button>
              </div>

              <p className="mt-4 md:mt-6 text-pink-200 font-semibold text-sm md:text-base">
                Your comfort, your beauty, our expertise. That&apos;s the
                Madhuri promise!
              </p>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements - Reduced for mobile */}
        <div
          className={`absolute top-10 left-5 w-12 h-12 md:top-20 md:left-10 md:w-20 md:h-20 bg-pink-200 rounded-full opacity-20 blur-xl transition-all duration-2000 ${
            isVisible ? "opacity-30" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-10 right-5 w-16 h-16 md:bottom-20 md:right-10 md:w-32 md:h-32 bg-pink-300 rounded-full opacity-20 blur-xl transition-all duration-2000 delay-500 ${
            isVisible ? "opacity-30" : "opacity-0"
          }`}
        ></div>
      </div>
    </section>
  );
}
