import type { Metadata } from "next";
import { Share_Tech_Mono, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Mercer | Senior Security Engineer",
  description:
    "Protecting organizations through offensive security, threat intelligence, and proactive defense strategies.",
  keywords: [
    "Security Engineer",
    "Penetration Testing",
    "Red Team",
    "Incident Response",
    "OSCP",
    "CEH",
    "Cloud Security",
  ],
  authors: [{ name: "Alex Mercer" }],
  robots: "index, follow",
  openGraph: {
    title: "Alex Mercer | Senior Security Engineer",
    description:
      "Protecting organizations through offensive security, threat intelligence, and proactive defense strategies.",
    type: "website",
    url: "https://mercersecurity.com",
    images: ["https://mercersecurity.com/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Mercer | Senior Security Engineer",
    description: "Offensive security, threat intelligence, and proactive defense.",
    images: ["https://mercersecurity.com/og-image.jpg"],
  },
  themeColor: "#05080a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${shareTechMono.variable} ${rajdhani.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-dark text-text antialiased">{children}</body>
    </html>
  );
}
