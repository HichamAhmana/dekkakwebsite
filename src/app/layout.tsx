import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Cursor from "./components/Cursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mohamed Dekkak | Chairman, Investor, Philanthropist",
    template: "%s | Mohamed Dekkak",
  },
  description:
    "Official website of Mohamed Dekkak — Chairman & Founder of Adgeco Group, global investor, and philanthropist bridging the Middle East, Africa, and beyond.",
  keywords: [
    "Mohamed Dekkak",
    "Adgeco Group",
    "Abu Dhabi",
    "Marrakech",
    "philanthropist",
    "investor",
    "Anouar Association",
    "AmCham",
    "real estate UAE",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Mohamed Dekkak",
    title: "Mohamed Dekkak | Chairman, Investor, Philanthropist",
    description:
      "Official website of Mohamed Dekkak — Chairman & Founder of Adgeco Group, global investor, and philanthropist.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Dekkak | Chairman, Investor, Philanthropist",
    description:
      "Official website of Mohamed Dekkak — Chairman & Founder of Adgeco Group, global investor, and philanthropist.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        <ThemeProvider>
          {/* <Cursor /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
