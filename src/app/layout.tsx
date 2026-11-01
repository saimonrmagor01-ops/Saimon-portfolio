import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Saimon Rana Magar — Digital Creator & Developer",
  description:
    "Official portfolio of Saimon Rana Magar. Digital Creator & Developer exploring AI filmmaking, visual storytelling, and modern web technology. Based in Nepal.",
  keywords: [
    "Saimon Rana Magar",
    "Digital Creator",
    "Developer",
    "AI Filmmaker",
    "Content Creator",
    "Web Developer",
    "Nepal",
    "BudgetMandu",
    "Google Flow",
    "Adobe Premiere Pro",
    "CapCut",
    "Next.js Developer",
  ],
  authors: [{ name: "Saimon Rana Magar" }],
  creator: "Saimon Rana Magar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saimon.dev",
    title: "Saimon Rana Magar — Digital Creator & Developer",
    description:
      "I create. I develop. I bring ideas to life. AI Filmmaker, Content Creator and Web Developer based in Nepal.",
    siteName: "Saimon Rana Magar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saimon Rana Magar — Digital Creator & Developer",
    description:
      "AI Filmmaker, Content Creator and Web Developer exploring the intersection of creative cinema and code.",
    creator: "@saimon",
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
      <body className="bg-[#050505] text-[#f4f4f1] antialiased selection:bg-[#9fbdff] selection:text-[#050505] min-h-screen relative">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
