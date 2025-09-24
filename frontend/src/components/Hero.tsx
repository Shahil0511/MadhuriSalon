"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showImage, setShowImage] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    service: "",
  });

  // Video handling
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoError = () => {
      console.log("Video error - switching to image");
      setShowImage(true);
      setIsVideoLoading(false);
    };

    const handleVideoCanPlay = () => {
      console.log("Video can play");
      setIsVideoLoading(false);
    };

    const handleVideoEnd = () => {
      console.log("Video ended - switching to image");
      setShowImage(true);
    };

    if (videoElement) {
      videoElement.addEventListener("error", handleVideoError);
      videoElement.addEventListener("canplay", handleVideoCanPlay);
      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        videoElement.removeEventListener("error", handleVideoError);
        videoElement.removeEventListener("canplay", handleVideoCanPlay);
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, []);

  // Auto-show content after a short delay
  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 500);

    // Fallback if video doesn't load
    const fallbackTimer = setTimeout(() => {
      if (isVideoLoading) {
        console.log("Video loading timeout - switching to image");
        setShowImage(true);
        setIsVideoLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(fallbackTimer);
    };
  }, [isVideoLoading]);

  const handleBookAppointment = () => {
    setShowBookingForm(true);
  };

  const handleExploreServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format the message for WhatsApp
    const message = `New Appointment Booking:%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0ALocation: ${formData.location}%0AService: ${formData.service}%0A%0AFrom Madhuri Salon Website`;

    // Your WhatsApp number (replace with actual number)
    const whatsappNumber = "9315673184"; // Example number

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    // Reset form
    setFormData({
      name: "",
      phone: "",
      location: "",
      service: "",
    });

    // Close form after submission
    setShowBookingForm(false);
  };

  const closeForm = () => {
    setShowBookingForm(false);
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeForm();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showBookingForm) {
        closeForm();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [showBookingForm]);

  return (
    <>
      {/* Booking Modal */}
      {showBookingForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  Book Appointment
                </h3>
                <button
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-light transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Fill the details and we&apos;ll contact you shortly
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-colors"
                >
                  <option value="">Select Service Type</option>
                  <option value="Salon Service">Salon Service</option>
                  <option value="Home Service - Noida">
                    Home Service - Noida
                  </option>
                  <option value="Home Service - Ghaziabad">
                    Home Service - Ghaziabad
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Service *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-colors"
                >
                  <option value="">Select a Service</option>
                  <option value="Hair Styling">Hair Styling</option>
                  <option value="Hair Coloring">Hair Coloring</option>
                  <option value="Skin Care">Skin Care</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Hair Treatments">Hair Treatments</option>
                  <option value="Nail Care">Nail Care</option>
                  <option value="Facial">Facial</option>
                  <option value="Waxing">Waxing</option>
                  <option value="Threading">Threading</option>
                  <option value="Bleach">Bleach</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
                >
                  📱 Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[550px] max-h-[750px] overflow-hidden">
        {/* Loading Spinner */}
        {isVideoLoading && !showImage && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Video Background */}
        {!showImage && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop={false}
          >
            <source src="/hero1.mp4" type="video/mp4" />
            <source src="/hero.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Image Fallback */}
        {showImage && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/hero-fallback.jpg"
              alt="Madhuri Salon"
              fill
              priority
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className={`max-w-4xl mx-auto px-4 text-center text-white transition-all duration-700 ${
              isContentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Madhuri <span className="text-pink-400">Salon</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              Where Beauty Meets Elegance & Style
            </p>
            <p className="text-lg mb-6 opacity-80 max-w-2xl mx-auto">
              Experience premium beauty treatments in a luxurious atmosphere.
            </p>

            {/* Added Official Service Info */}
            <p className="text-base md:text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              ✅ Officially Offering{" "}
              <span className="text-pink-400 font-semibold">Home Service</span>{" "}
              in <span className="font-medium">Noida & Ghaziabad</span>
              <br />✅{" "}
              <span className="text-pink-400 font-semibold">
                Salon Service
              </span>{" "}
              at our premium studio
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookAppointment}
                className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors font-medium text-lg"
              >
                Book Appointment
              </button>
              <button
                onClick={handleExploreServices}
                className="px-8 py-3 border border-white/60 hover:border-white text-white rounded-full transition-colors font-medium text-lg"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="text-white text-center">
            <span className="text-sm">Scroll down</span>
            <svg
              className="w-5 h-5 mx-auto mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
