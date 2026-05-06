"use client";
import dynamic from "next/dynamic";

// These sections use scroll/window APIs and must be client-only
const Stats = dynamic(() => import("./Stats"), { ssr: false });
const ThreePaths = dynamic(() => import("./ThreePaths"), { ssr: false });
const Engagement = dynamic(() => import("./Engagement"), { ssr: false });

export default function ClientSections() {
  return (
    <>
      <Stats />
      <ThreePaths />
      <Engagement />
    </>
  );
}
