import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProvider from "@/components/provider/AppProvider";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

interface RootLayoutProps {
  modal?: React.ReactNode;
  children?: React.ReactNode;
}

export default function RootLayout({
  modal,
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/icons/sprite.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          {children}
          {modal}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
