"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Portpholio = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsContentVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-900 overflow-hidden">
      {/* Glowing Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full items-center">
          <div className="lg:col-span-1">
            <div
              className={`transform transition-all duration-500 ${
                isContentVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-400/30">
                  <Image
                    src="/MamMom.jpeg"
                    alt="Beauty Stylist"
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23ec4899'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='white'%3EStylist Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Glowing Effect */}
                <div className="absolute -inset-4 bg-pink-400/20 blur-xl rounded-2xl transform group-hover:scale-105 transition duration-500" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div
              className={`transform transition-all duration-500 delay-200 ${
                isContentVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {/* Main Quote */}
              <div className="text-center lg:text-left">
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                  Beauty <span className="text-pink-400">Redefined</span>
                </h1>

                <blockquote className="text-2xl lg:text-3xl text-pink-200/90 italic leading-relaxed mb-8">
                  &quot;Glow anywhere with Madhuri Salon – Expert hair, skin,
                  and nail care at our salon or delivered to your doorstep.
                  <span className="text-pink-400 font-semibold">
                    {" "}
                    Your glamour, my passion.
                  </span>
                  &quot;
                </blockquote>

                {/* Stats */}
                <div className="flex justify-center lg:justify-start gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400">500+</div>
                    <div className="text-pink-200/80 text-sm">
                      Happy Clients
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400">5★</div>
                    <div className="text-pink-200/80 text-sm">
                      Rated Service
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400">7+</div>
                    <div className="text-pink-200/80 text-sm">Years Expert</div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition duration-300 shadow-2xl">
                  Book Your Glow Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-pink-400 text-center">
          <span className="text-sm">Scroll</span>
          <svg
            className="w-5 h-5 mx-auto mt-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Portpholio;
