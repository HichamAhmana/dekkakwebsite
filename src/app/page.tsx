"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const Stats = dynamic(() => import("./components/Stats"), { ssr: false });
const ThreePaths = dynamic(() => import("./components/ThreePaths"), { ssr: false });
const Engagement = dynamic(() => import("./components/Engagement"), { ssr: false });
const Quote = dynamic(() => import("./components/Quote"), { ssr: false });
const Blog = dynamic(() => import("./components/Blog"), { ssr: false });

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", background: "var(--bg-color)", overflowX: "clip" }}>
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
