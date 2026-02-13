import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BidWise RTB",
  description: "Real-Time Bidding DSP Optimization Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
