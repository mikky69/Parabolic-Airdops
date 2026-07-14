import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdSlot } from "@/components/layout/AdSlot";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Parabolic Airdrop — Track Web3 Airdrops Before They End",
  description:
    "Discover, track, and act on legitimate Web3 airdrops. Step-by-step guides, real-time status, and a live community feed for every project.",
  icons: {
    icon: "/brand/parabolic-logo.jpg",
    apple: "/brand/parabolic-logo.jpg",
  },
  other: {
    "bitmedia-site-verification": "b1b511ce5d2891d4e39f35c5b0277708",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />

        <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <AdSlot slotKey="header_leaderboard" />
        </div>

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
