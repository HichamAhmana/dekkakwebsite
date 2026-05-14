import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ClientSections from "./components/ClientSections";

// Dynamically imported — splits into separate JS chunks, avoids chunk-loading race
const Quote = dynamic(() => import("./components/Quote"));
const Blog = dynamic(() => import("./components/Blog"));
const CTABanner = dynamic(() => import("./components/CTABanner"));

export const metadata: Metadata = {
  title: "Mohamed Dekkak | Investor & Philanthropist",
  description:
    "Official website of Mohamed Dekkak — Chairman of Adgeco Group, global investor and philanthropist across UAE, Morocco and Europe.",
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
      <CTABanner />
      <Footer />
    </main>
  );
}
