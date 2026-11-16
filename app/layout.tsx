 import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Stutium | Corporate gifts, calendars and custom prints",
  description: "Personalised corporate gifts, calendars, diaries and print-on-demand items.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-surface font-sans antialiased">
        <Header />
        <CategoryNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}