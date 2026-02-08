import type { Metadata } from "next";
import { Calistoga } from "next/font/google";
import "./globals.css";

const calistoga = Calistoga({
  weight: "400",
  variable: "--font-calistoga",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuzzFeed Weather | Worst & Best Weather in the World Right Now",
  description:
    "Which cities have the worst and best weather on Earth right now? We ranked 100+ cities so you don't have to go outside to find out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${calistoga.variable} antialiased`}>{children}</body>
    </html>
  );
}
