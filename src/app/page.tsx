"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ThreePaths from "./components/ThreePaths";
import Footer from "./components/Footer";

const Engagement = dynamic(() => import("./components/Engagement"));
const Quote = dynamic(() => import("./components/Quote"));
const Blog = dynamic(() => import("./components/Blog"));

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", background: "var(--bg-color)" }}>
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
