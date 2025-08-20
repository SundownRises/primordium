import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
import Silk from './components/ui/silk';
import { ThirdwebProvider } from "thirdweb/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Primordium - Own Your Data, Get Rewarded",
  description: "With Primordium, you can now be in the ownership of when and where your data gets used, and get paid for its usage. Using 0G storage and 0G-AI technology.",
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        {/* Background Silk Component */}
        <ThirdwebProvider> 
        <div className="fixed inset-0 -z-10">
          <Silk
            speed={5}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
        
        {/* Foreground Content */}
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}