import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const displaySerif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Startup Playbooks Report — Australia | Curiosity Centre",
  description:
    "A qualitative + quantitative assessment of startup performance in Australia, with practical operator playbooks and benchmarks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${displaySerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
