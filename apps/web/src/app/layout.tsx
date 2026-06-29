import type { Metadata } from "next";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doka | Premium Print-on-Demand",
  description: "Modern Print-on-Demand platform where you can discover, customize, and order premium products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <TopNav />
          <main className="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
