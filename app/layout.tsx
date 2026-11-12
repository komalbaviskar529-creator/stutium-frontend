  import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Stutium | Corporate gifts, calendars and custom prints",
  description: "Personalised corporate gifts, calendars, diaries and print-on-demand items.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Header />
        <CategoryNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}