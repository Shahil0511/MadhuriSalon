"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

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

  // Smooth scroll function (same as Header)
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle navigation click (same as Header)
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  // Handle service booking (same as About section)
  const handleBookService = () => {
    scrollToSection("contact");
  };

  // Handle call now (same as About section)
  const handleCallNow = () => {
    window.open("tel:+919315673184", "_self");
  };

  const footerBg = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const titleColor = isDarkMode ? "text-white" : "text-black";
  const hoverColor = "hover:text-pink-600";

  const quickLinks = [
    { name: "Home", href: "home" },
    { name: "Services", href: "services" },
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
    { name: "Gallery", href: "gallery" },
    { name: "Testimonials", href: "testimonials" },
  ];

  const services = [
    "Mini Glow Up",
    "Classic Clean-Up & Bleach",
    "Facial & Wax Combo",
    "Radiant Fruit Package",
    "Luxury Hand & Foot Care",
    "Deluxe Beauty Package",
    "Ultimate Relaxation",
    "Oxy Therapy Special",
    "D-Tan Detox",
    "Premium Sara Facial & Care",
  ];

  const contactInfo = [
    { icon: "🏠", text: "123 Beauty Street, Gaur City, GC 12345" },
    { icon: "📱", text: "+91 9315673184" },
    { icon: "✉️", text: "hello@madhurisalon.com" },
    { icon: "🕒", text: "Mon-Sun: 9:00 AM - 9:00 PM" },
  ];

  const socialLinks = [
    { icon: "📷", name: "Instagram", href: "#" },
    { icon: "👍", name: "Facebook", href: "#" },
    { icon: "💼", name: "LinkedIn", href: "#" },
    { icon: "🐦", name: "Twitter", href: "#" },
  ];

  return (
    <footer className={`${footerBg} transition-colors duration-300`}>
      {/* Main Footer Content */}
      <div className={`border-b ${borderColor}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-lg font-bold">M</span>
                </div>
                <h3 className={`text-2xl font-bold ${titleColor}`}>
                  Madhuri <span className="text-pink-600">Salon</span>
                </h3>
              </div>

              <p className={`${textColor} mb-6 leading-relaxed`}>
                Where beauty meets elegance & convenience! Experience premium
                salon services at our luxurious space or in the comfort of your
                home.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-white dark:bg-gray-800 border ${borderColor} flex items-center justify-center text-lg transition-all duration-300 hover:bg-pink-600 hover:text-white hover:scale-110 shadow-sm`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links - Updated with smooth scrolling */}
            <div>
              <h4 className={`text-lg font-semibold mb-6 ${titleColor}`}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`${textColor} ${hoverColor} transition-colors duration-200 flex items-center group w-full text-left`}
                    >
                      <span className="w-2 h-2 bg-pink-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services - Updated with smooth scrolling */}
            <div>
              <h4 className={`text-lg font-semibold mb-6 ${titleColor}`}>
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.slice(0, 6).map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={handleBookService}
                      className={`${textColor} ${hoverColor} transition-colors duration-200 flex items-center group text-left w-full`}
                    >
                      <span className="text-pink-600 mr-2">•</span>
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className={`text-lg font-semibold mb-6 ${titleColor}`}>
                Contact Info
              </h4>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-lg mt-1">{item.icon}</span>
                    <span className={`${textColor} leading-relaxed`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services Banner - Updated buttons */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-white text-center lg:text-left mb-4 lg:mb-0">
              <h4 className="text-xl font-bold mb-1">✨ Limited Time Offer!</h4>
              <p className="opacity-95">
                Get 20% off on your first home service booking
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleBookService}
                className="bg-white text-pink-600 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Now
              </button>
              <button
                onClick={handleCallNow}
                className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-6 py-2 rounded-full font-semibold transition-all duration-300"
              >
                Call: +91 9315673184
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={`py-6 ${isDarkMode ? "bg-black" : "bg-gray-100"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className={`text-sm ${textColor} mb-4 md:mb-0`}>
              <p>
                © {currentYear} Madhuri Salon. All rights reserved. | Made with
                💖 for beautiful you
              </p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className={`${textColor} ${hoverColor} transition-colors duration-200`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`${textColor} ${hoverColor} transition-colors duration-200`}
              >
                Terms of Service
              </Link>
              <Link
                href="/cancellation"
                className={`${textColor} ${hoverColor} transition-colors duration-200`}
              >
                Cancellation Policy
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center mt-6 space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span className={textColor}>100% Hygienic</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">⭐</span>
              <span className={textColor}>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-500">🏠</span>
              <span className={textColor}>Home Service Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-500">💎</span>
              <span className={textColor}>Premium Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Call Button (replaced WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleCallNow}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-300 transform hover:scale-110 animate-bounce"
          title="Call Now"
        >
          📞
        </button>
      </div>
    </footer>
  );
}
