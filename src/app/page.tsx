import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ClientSections from "./components/ClientSections";
// Quote and Blog are SSR-enabled so Google can crawl their content
import Quote from "./components/Quote";
import Blog from "./components/Blog";

export const metadata: Metadata = {
  title: "Mohamed Dekkak | Chairman of Adgeco Group, Investor & Philanthropist",
  description:
    "Official website of Mohamed Dekkak — Chairman & Founder of Adgeco Group, President of Gate One Properties, global investor, and philanthropist active across the UAE, Morocco, Spain, and beyond.",
  keywords: [
    "Mohamed Dekkak",
    "Adgeco Group chairman",
    "investor Abu Dhabi",
    "Moroccan businessman",
    "philanthropist UAE",
    "Gate One Properties",
    "Orchid Island Real Estate",
    "business Middle East",
    "business Morocco",
    "Anouar Association",
    "Arab Peace Corps Foundation",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", background: "var(--bg-color)", overflowX: "clip" }}>
      <Navbar />
      <Hero />
      <ClientSections />
      <Quote />
      <Blog />
      <Footer />
    </main>
  );
}
