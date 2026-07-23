import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import "./globals.css";

// Display face — Clash Display (self-hosted, Fontshare OFL)
const clashDisplay = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

// Body face — General Sans (self-hosted, Fontshare OFL)
const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Mark Guanez — Full Stack Developer",
  description:
    "Portfolio of Mark Guanez. Modern, fast, and reliable web experiences — built with care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${generalSans.variable} ${clashDisplay.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="grain">
        <ThemeProvider>
          <SmoothScroll>
            <CursorGlow />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
