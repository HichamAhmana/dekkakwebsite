"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ThreePaths from "./components/ThreePaths";
import Engagement from "./components/Engagement";
import Blog from "./components/Blog";
import Quote from "./components/Quote";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)" }}>
      <Navbar />
      <Hero />
      <Stats />
      <ThreePaths />
      <Engagement />
      <Quote />
      <Blog />
      <Footer />
    </main>
  );
}
