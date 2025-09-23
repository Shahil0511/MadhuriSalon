"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  initialTheme?: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ initialTheme = "light" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration and mount state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply theme on change
  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme, isMounted]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (isMounted) {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark";
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedTheme) {
        setTheme(savedTheme);
      } else if (systemPrefersDark) {
        setTheme("dark");
      }
    }
  }, [isMounted]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navigationItems = [
    { href: "/", label: "Home" },
    // { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <header className="h-16 lg:h-20 bg-white dark:bg-black">
        {/* Empty header for SSR */}
        <div className="h-16 lg:h-20" />
      </header>
    );
  }

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
          onClick={closeMenu}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg"
            : "bg-white dark:bg-black"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo - Improved for all screens */}
            <div className="flex-shrink-0 z-50">
              <Link
                href="/"
                className="flex items-center space-x-2 group"
                onClick={closeMenu}
              >
                <span className="text-2xl sm:text-3xl font-bold text-black dark:text-white transition-transform duration-200 group-hover:scale-105">
                  Madhuri
                  <span className="font-light text-pink-600 dark:text-pink-400">
                    Salon
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Improved spacing and hover effects */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium uppercase tracking-wider 
                           text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white 
                           transition-all duration-200 group"
                >
                  {item.label}
                  <span
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-pink-600 dark:bg-pink-400 
                                 transition-all duration-200 group-hover:w-4/5 group-hover:left-[10%]"
                  />
                </Link>
              ))}
            </nav>

            {/* Right Side Actions - Improved layout for all screens */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Theme Toggle - Better sizing */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 
                         transform hover:scale-110 active:scale-95"
                aria-label="Toggle theme"
              >
                <span className="text-lg sm:text-xl">
                  {theme === "light" ? "🌙" : "☀️"}
                </span>
              </button>

              {/* CTA Button - Better responsive sizing */}
              <button
                className="hidden lg:flex items-center px-4 py-2 sm:px-6 sm:py-2.5 border-2 
                           border-pink-600 dark:border-pink-400 text-sm sm:text-base font-semibold 
                           rounded-full text-pink-600 dark:text-pink-400 
                           hover:bg-pink-600 hover:text-white dark:hover:bg-pink-400 dark:hover:text-black
                           transition-all duration-200 transform hover:scale-105 active:scale-95
                           shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-800"
              >
                Book Now
              </button>

              {/* Mobile Menu Button - Improved animation */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200
                         transform hover:scale-110 active:scale-95"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                  <span
                    className={`absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out
                    ${
                      isMenuOpen
                        ? "rotate-45  top-1/2 -translate-y-1/2"
                        : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-full bg-current transition duration-200 ease-in-out
                    ${
                      isMenuOpen
                        ? "opacity-0"
                        : "opacity-100 top-1/2 -translate-y-1/2"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-full bg-current transform transition duration-300 ease-in-out
                    ${
                      isMenuOpen
                        ? "-rotate-45  top-1/2 -translate-y-1/2"
                        : "bottom-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Improved animation and spacing */}
          <div
            className={`lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-black 
                       shadow-2xl border-t border-gray-200 dark:border-gray-800
                       transform transition-all duration-300 ease-in-out overflow-hidden
            ${
              isMenuOpen
                ? "translate-y-0 opacity-100 max-h-96"
                : "-translate-y-4 opacity-0 max-h-0 pointer-events-none"
            }`}
          >
            <nav className="px-4 pt-4 pb-6 space-y-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-semibold text-gray-800 dark:text-gray-200 
                           hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600 dark:hover:text-pink-400
                           rounded-lg transition-all duration-200 transform hover:translate-x-2
                           border-l-4 border-transparent hover:border-pink-600 dark:hover:border-pink-400"
                  style={{
                    animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile CTA Button - Improved styling */}
              <div className="px-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  className="w-full flex justify-center items-center px-6 py-3.5 bg-pink-600 dark:bg-pink-400 
                            text-white dark:text-black text-base font-semibold rounded-full
                            hover:bg-pink-700 dark:hover:bg-pink-300 transform hover:scale-105 
                            active:scale-95 transition-all duration-200 shadow-lg"
                >
                  Book Appointment
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Add spacing for fixed header with proper sizing */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Header;
