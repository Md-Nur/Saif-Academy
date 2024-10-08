import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Footer";
import GlobalProvider from "@/provider/GlobalProvider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saif Academy - When teaching is an art, Learning is entertaining",
  description:
    "The objectives of Saif Academy are - 1. To teach academic English for PEC, JSC, SSC and HSC candidates 2. To teach basic English 3. To teach everyday English 4. To motivate the students and the guardians 5. To share  teaching experience",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Navbar />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
