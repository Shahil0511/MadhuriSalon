"use client";

import { useState, useEffect, useRef } from "react";

interface ContactProps {
  onBookService?: (serviceName: string) => void;
}

export default function Contact({ onBookService }: ContactProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Reduced threshold for mobile
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions
          console.log("Autoplay blocked");
        });
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleBookService = (serviceName: string) => {
    if (onBookService) {
      onBookService(serviceName);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
  };

  // Color scheme matching your theme
  const sectionBg = isDarkMode ? "bg-black" : "bg-white";
  const titleColor = isDarkMode ? "text-white" : "text-black";
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const cardBg = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const inputBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const inputBorder = isDarkMode ? "border-gray-600" : "border-gray-300";

  return (
    <section
      ref={sectionRef}
      className={`py-12 md:py-20 ${sectionBg} transition-colors duration-300 overflow-visible min-h-screen`} // Changed to overflow-visible and added min-h-screen
      id="contact"
    >
      <div className="container mx-auto px-4">
        {/* Animated Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${titleColor}`}>
            Get In <span className="text-pink-600">Touch</span>
          </h2>
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto ${textColor} px-4`}
          >
            Ready to transform your look? Contact us today and let us create
            something beautiful together!
          </p>

          <div className="w-24 h-1 bg-pink-600 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side - Contact Form & Info */}
          <div
            className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Contact Form */}
            <div
              className={`p-6 md:p-8 rounded-2xl ${cardBg} border ${borderColor} shadow-lg`}
            >
              <h3
                className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${titleColor}`}
              >
                Send us a Message 💌
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${textColor}`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${inputBorder} ${inputBg} transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm md:text-base`}
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${textColor}`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${inputBorder} ${inputBg} transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm md:text-base`}
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${inputBorder} ${inputBg} transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm md:text-base`}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${inputBorder} ${inputBg} transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm md:text-base`}
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Service Interested In
                  </label>
                  <select
                    className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${inputBorder} ${inputBg} transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm md:text-base`}
                  >
                    <option>Select a service</option>
                    <option>Mini Glow Up</option>
                    <option>Classic Clean-Up & Bleach</option>
                    <option>Facial & Wax Combo</option>
                    <option>Radiant Fruit Package</option>
                    <option>Luxury Hand & Foot Care</option>
                    <option>Deluxe Beauty Package</option>
                    <option>Ultimate Relaxation</option>
                    <option>Oxy Therapy Special</option>
                    <option>D-Tan Detox</option>
                    <option>Premium Sara Facial & Care</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Message
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border ${inputBorder} ${inputBg} transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm md:text-base`}
                    placeholder="Tell us about your beauty needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  📧 Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div
              className={`p-6 md:p-8 rounded-2xl ${cardBg} border ${borderColor} shadow-lg`}
            >
              <h3
                className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${titleColor}`}
              >
                Contact Information 📞
              </h3>

              <div className="space-y-3 md:space-y-4">
                {[
                  {
                    icon: "🏠",
                    title: "Salon Address",
                    content: "123 Beauty Street, Glamour City, GC 12345",
                    sub: "Visit our luxurious salon space",
                  },
                  {
                    icon: "📱",
                    title: "Phone & WhatsApp",
                    content: "+91 9315673184",
                    sub: "Call or message for appointments",
                  },
                  {
                    icon: "✉️",
                    title: "Email Address",
                    content: "hello@madhurisalon.com",
                    sub: "We reply within 2 hours",
                  },
                  {
                    icon: "🕒",
                    title: "Working Hours",
                    content: "Mon-Sun: 9:00 AM - 9:00 PM",
                    sub: "Home services available 24/7",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-xl md:text-2xl flex-shrink-0">
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      {" "}
                      {/* Added to prevent text overflow */}
                      <h4
                        className={`font-semibold text-sm md:text-base ${titleColor} truncate`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`font-medium text-xs md:text-sm ${textColor} break-words`}
                      >
                        {item.content}
                      </p>
                      <p className={`text-xs ${textColor} opacity-80`}>
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Video & Map */}
          <div
            className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-500 ${
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
                <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
                  {isVideoPlaying ? (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                    >
                      <source src="/contact.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-center text-white px-4">
                      <button
                        onClick={handleVideoPlay}
                        className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                      >
                        <svg
                          className="w-8 h-8 md:w-12 md:h-12"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <p className="mt-3 md:mt-4 text-base md:text-lg font-semibold">
                        Watch Our Salon Tour
                      </p>
                      <p className="text-xs md:text-sm opacity-90">
                        Click to play the video
                      </p>
                    </div>
                  )}
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
                  Take a virtual tour of our premium salon facilities and see
                  why clients love our luxurious atmosphere and professional
                  services.
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

            {/* Quick Booking CTA */}
            <div
              className={`p-6 md:p-8 rounded-2xl bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg`}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                🚀 Quick Booking
              </h3>
              <p className="mb-4 md:mb-6 opacity-95 text-sm md:text-base">
                Do not wait! Book your appointment now and get 10% off on your
                first service.
              </p>

              <div className="space-y-3 md:space-y-4">
                <button
                  onClick={() => handleBookService("Quick Booking - Call")}
                  className="w-full bg-white text-pink-600 hover:bg-gray-100 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  📞 Call Now to Book
                </button>
                <button
                  onClick={() => handleBookService("Quick Booking - WhatsApp")}
                  className="w-full border-2 border-white text-white hover:bg-white hover:text-pink-600 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base"
                >
                  💬 WhatsApp Instant Booking
                </button>
              </div>

              <div className="mt-4 md:mt-6 p-2 md:p-3 bg-white/10 rounded-lg text-center">
                <p className="text-sm">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</p>
                <p className="text-xs mt-1">
                  Rated 4.9/5 by 500+ happy clients
                </p>
              </div>
            </div>

            {/* Social Media & Follow */}
            <div
              className={`p-4 md:p-6 rounded-2xl ${cardBg} border ${borderColor} shadow-lg`}
            >
              <h3
                className={`text-lg md:text-xl font-bold mb-3 md:mb-4 ${titleColor}`}
              >
                Follow Our Journey 🌸
              </h3>
              <p className={`text-sm md:text-base ${textColor} mb-3 md:mb-4`}>
                See our latest work, offers, and beauty tips on social media.
              </p>

              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {[
                  { icon: "📷", name: "Instagram", handle: "@madhurisalon" },
                  { icon: "👍", name: "Facebook", handle: "Madhuri Salon" },
                  { icon: "💼", name: "LinkedIn", handle: "Madhuri Salon" },
                  { icon: "🐦", name: "Twitter", handle: "@madhuribeauty" },
                ].map((social, index) => (
                  <div
                    key={index}
                    className="p-2 md:p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-xl md:text-2xl block mb-1">
                      {social.icon}
                    </span>
                    <span
                      className={`text-xs md:text-sm font-medium ${titleColor} block`}
                    >
                      {social.name}
                    </span>
                    <span className={`text-xs ${textColor} block truncate`}>
                      {social.handle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements - Reduced for mobile */}
        <div
          className={`absolute top-10 left-2 w-12 h-12 md:top-1/4 md:left-5 md:w-16 md:h-16 bg-pink-200 rounded-full opacity-20 blur-xl transition-all duration-2000 ${
            isVisible ? "opacity-30" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-10 right-2 w-16 h-16 md:bottom-1/3 md:right-5 md:w-24 md:h-24 bg-pink-300 rounded-full opacity-20 blur-xl transition-all duration-2000 delay-500 ${
            isVisible ? "opacity-30" : "opacity-0"
          }`}
        ></div>
      </div>
    </section>
  );
}
