import type { Metadata } from "next";
import Script from "next/script";
import { CursorOverlay } from "./components/CursorOverlay";
import { RouteAnimationSync } from "./components/RouteAnimationSync";
import "./globals.css";

export const metadata: Metadata = {
  title: "36Soma Runners",
  description:
    "36Soma Runners — running collective from Kraljevo. Shared training sessions, race days, and community-first energy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className="is-loading" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/media/342A2254.webp" type="image/webp" />
        <link rel="preload" as="image" href="/media/IMG_6212.webp" type="image/webp" />
        <link rel="preload" as="image" href="/media/night-pace.webp" type="image/webp" />
      </head>
      <body suppressHydrationWarning>
        <CursorOverlay />
        <RouteAnimationSync />
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
