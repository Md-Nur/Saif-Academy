import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Nav/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalProvider from "@/provider/GlobalProvider";
import ClientLayout from "./client-layout";
import { ReactNode } from "react";
import { getMe } from "@/actions/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saif Academy - Excellence in English Education",
  description:
    "Premium English education for PEC, JSC, SSC, and HSC. Professional private tuition and academic guidance by Saifullah Sir.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getMe();
  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased">
        <GlobalProvider>
          <ClientLayout>
            <Navbar user={user} />
            <main className="min-h-screen relative overflow-hidden">
              {/* Background decorations */}
              <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-royal-blue/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-royal-gold/10 rounded-full blur-[120px]" />
              </div>
              {children}
            </main>
            <Footer />
          </ClientLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
