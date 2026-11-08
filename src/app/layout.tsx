import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PortfolioTracker } from "@/components/analytics/PortfolioTracker";

export const viewport: Viewport = {
  themeColor: "#050817",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saimon-portfolio-psi.vercel.app"),
  title: "Saimon Rana Magar | Digital Creator & Developer",
  description:
    "Explore the creative work, AI filmmaking experiments, video editing, web development, and digital projects of Saimon Rana Magar.",
  keywords: [
    "Saimon Rana Magar",
    "Digital Creator",
    "Developer",
    "AI Filmmaking",
    "Video Editing",
    "Web Development",
    "Creative Direction",
    "Nepal",
    "BudgetMandu",
    "Google Flow",
    "Adobe Premiere Pro",
    "CapCut",
    "Discord Bot Development",
    "Python Automation",
    "Next.js Developer",
  ],
  authors: [{ name: "Saimon Rana Magar" }],
  creator: "Saimon Rana Magar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saimon-portfolio-psi.vercel.app/",
    title: "Saimon Rana Magar | Digital Creator & Developer",
    description:
      "Explore the creative work, AI filmmaking experiments, video editing, web development, and digital projects of Saimon Rana Magar.",
    siteName: "Saimon Rana Magar Portfolio",
    images: [
      {
        url: "/saimon-portrait.png",
        width: 1200,
        height: 630,
        alt: "Saimon Rana Magar — Digital Creator & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saimon Rana Magar | Digital Creator & Developer",
    description:
      "Explore the creative work, AI filmmaking experiments, video editing, web development, and digital projects of Saimon Rana Magar.",
    images: ["/saimon-portrait.png"],
    creator: "@shymoneyyyyyy",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#050817] text-[#F5F7FF] antialiased selection:bg-[#2563EB] selection:text-white min-h-screen relative font-sans">
        <PortfolioTracker />
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
