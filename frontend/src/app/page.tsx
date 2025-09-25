"use client";

import { useState } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import Portpholio from "@/components/Portpholio";

export default function Home() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowBookingForm(true);
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
    setSelectedService("");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="overflow-hidden">
        <section id="home">
          <Hero
            showBookingForm={showBookingForm}
            selectedService={selectedService}
            onCloseForm={handleCloseForm}
            onBookService={handleBookService}
          />
        </section>
        <section id="services">
          <Service onBookService={handleBookService} />
        </section>
        <section id="about">
          <About onBookService={handleBookService} />
        </section>
        <section id="portpholio">
          <Portpholio />
        </section>
        <section id="contact">
          <Contact onBookService={handleBookService} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
