import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GearUp 🏋️ | Instant Sports & Outdoor Equipment Rental Marketplace",
  description: "Rent premium sports equipment, mountain bikes, camping gear, paddle boards, and snowboards instantly with secure payments and verified providers.",
  keywords: ["sports rental", "gear rental", "mountain bike rental", "tent rental", "gearup", "outdoor equipment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased`}>
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
