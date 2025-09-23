import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Service from "@/components/Service";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Service />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
