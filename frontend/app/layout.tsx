import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BidWise RTB Engine",
  description: "Real-Time Bidding Optimization Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
