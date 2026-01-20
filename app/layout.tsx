import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/contexts/theme-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pedro Henrique | Full Stack Developer",
  description:
    "Portfolio de Pedro Henrique - Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e Node.js. Criando experiencias digitais modernas e performaticas.",
  keywords: [
    "desenvolvedor",
    "full stack",
    "react",
    "next.js",
    "typescript",
    "node.js",
    "portfolio",
  ],
  authors: [{ name: "Pedro Henrique" }],
  creator: "Pedro Henrique",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Pedro Henrique | Full Stack Developer",
    description:
      "Portfolio de Pedro Henrique - Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e Node.js.",
    siteName: "Pedro Henrique Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Henrique | Full Stack Developer",
    description:
      "Portfolio de Pedro Henrique - Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e Node.js.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
