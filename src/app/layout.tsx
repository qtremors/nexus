
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarsBackground from "@/components/StarsBackground";
import Voyager from "@/components/Voyager";
import BodyClassManager from "@/components/BodyClassManager";

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
        <BodyClassManager />
        <StarsBackground />
        <Voyager/>
        {children}
      </body>
    </html>
  );
}
