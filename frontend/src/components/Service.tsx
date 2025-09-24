"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Services() {
  const [, setActiveCard] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const services = [
    {
      id: 1,
      title: "Mini Glow Up",
      description:
        "A quick and refreshing package for a clean and bright look.",
      image: "/miniglowup.jpeg",
      features: [
        "Mini Facial",
        "Hand Wax",
        "Eyebrow Shaping",
        "Upper Lip",
        "Forehead Threading",
      ],
      price: "₹299",
    },
    {
      id: 2,
      title: "Classic Clean-Up & Bleach",
      description:
        "Basic yet effective cleansing and brightening treatment for the face.",
      image: "/bleach.jpeg",
      features: ["Face Clean-up", "Face Bleach", "Threading Work"],
      price: "₹599",
    },
    {
      id: 3,
      title: "Facial & Wax Combo",
      description:
        "A perfect combination of skin rejuvenation and hair removal for arms and legs.",
      image: "/wax.jpeg",
      features: [
        "Facial",
        "Full Arms Wax",
        "Half Legs Wax",
        "Eyebrow",
        "Upper Lip",
      ],
      price: "₹899",
    },
    {
      id: 4,
      title: "Radiant Fruit Package",
      description:
        "A natural treatment using fruit-based products for a radiant glow and smooth skin.",
      image: "/fruit.jpeg",
      features: [
        "Threading Work",
        "Fruit Bleach",
        "Fruit Facial",
        "Full Arms & Half Legs Wax",
      ],
      price: "₹1,199",
    },
    {
      id: 5,
      title: "Luxury Hand & Foot Care",
      description:
        "Pamper your hands and feet with a spa, manicure, and pedicure.",
      image: "/nails.jpeg",
      features: [
        "Hand Spa",
        "Manicure",
        "Pedicure",
        "Eyebrow",
        "Upper Lip",
        "Forehead",
      ],
      price: "₹1,299",
    },
    {
      id: 6,
      title: "Deluxe Beauty Package",
      description:
        "A comprehensive package for full-body grooming and relaxation.",
      image: "/dulex.jpeg",
      features: [
        "Facial",
        "Hair Spa",
        "Hand Wax",
        "Hand Spa",
        "Eyebrow",
        "Upper Lip",
        "Forehead Threading",
      ],
      price: "₹1,599",
    },
    {
      id: 7,
      title: "Ultimate Relaxation",
      description:
        "The ultimate package featuring a head massage for complete relaxation and beauty.",
      image: "/relax.jpeg",
      features: [
        "Facial",
        "Head Hot Oil Massage",
        "Hand Wax",
        "Hand Spa",
        "Pedicure",
        "Eyebrow",
        "Upper Lip",
      ],
      price: "₹1,699",
    },
    {
      id: 8,
      title: "Oxy Therapy Special",
      description:
        "An advanced treatment using oxygen-based products for deep cleansing and brightening.",
      image: "/oxy.jpeg",
      features: ["Threading Work", "Oxy Bleach", "Oxy Facial", "Arms Wax"],
      price: "₹1,499",
    },
    {
      id: 9,
      title: "D-Tan Detox",
      description:
        "Specialized treatment to remove tan and rejuvenate the skin.",
      image: "/dtan.jpeg",
      features: ["Threading Work", "D-Tan", "D-Tan Facial"],
      price: "₹999",
    },
    {
      id: 10,
      title: "Premium Sara Facial & Care",
      description:
        "A premium package featuring the Sara facial along with full grooming.",
      image: "/sara.jpeg",
      features: [
        "Threading Work",
        "Fruit Bleach",
        "Lotus/Sara Facial",
        "Manicure",
        "Pedicure",
      ],
      price: "₹1,899",
    },
  ];

  const handleBookService = () => {
    document
      .getElementById("booking-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Black, White, Pink colors only
  const sectionBg = isDarkMode ? "bg-black" : "bg-white";
  const cardBg = isDarkMode ? "bg-black" : "bg-white";
  const cardShadow = "shadow-lg"; // simple shadow for both themes
  const cardHoverShadow = "shadow-xl";
  const titleColor = isDarkMode ? "text-white" : "text-black";
  const descriptionColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const featureBg = "bg-pink-50"; // pink for features
  const featureText = "text-pink-600";
  const priceBg = "bg-pink-600 text-white";
  const ctaGradient = "from-pink-600 to-pink-500";

  return (
    <section
      className={`py-20 ${sectionBg} transition-colors duration-300`}
      id="services"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${titleColor}`}>
            Our <span className="text-pink-600">Services</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${descriptionColor}`}>
            Discover our comprehensive range of beauty services designed to
            enhance your natural beauty.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`${cardBg} rounded-2xl ${cardShadow} overflow-hidden hover:${cardHoverShadow} transition-all duration-300 transform hover:-translate-y-2`}
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/services/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${priceBg}`}
                >
                  {service.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>
                  {service.title}
                </h3>
                <p className={`mb-4 ${descriptionColor}`}>
                  {service.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {service.features.map((feature, index) => (
                    <span
                      key={index}
                      className={`${featureBg} ${featureText} px-2 py-1 rounded-md text-xs font-medium`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleBookService}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Book Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div
            className={`bg-gradient-to-r ${ctaGradient} rounded-2xl p-8 text-white`}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready for a Transformation?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Book a consultation and let our experts create the perfect look
              for you.
            </p>
            <button
              onClick={handleBookService}
              className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
