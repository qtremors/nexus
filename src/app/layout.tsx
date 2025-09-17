// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarsBackground from "@/components/StarsBackground";
import BlackholeBackground from "@/components/BlackholeBackground";
import Blackhole2Background from "@/components/Blackhole2Background";
import PlanetBackground from "@/components/PlanetBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tremors Nexus",
  description: "Nexus of My Connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarsBackground />
        <BlackholeBackground />
        <Blackhole2Background/>
        {/* <PlanetBackground/> */}
        {children}
      </body>
    </html>
  );
}
