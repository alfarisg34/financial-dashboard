import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ExpirationReminderBanner } from "@/components/ExpirationReminderBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinTrack | Premium Dashboard Keuangan",
  description: "Budgeting & Financial Tracking Dashboard",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/dollar.png', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full dark antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col selection:bg-blue-500 selection:text-white">
        <ThemeProvider>
          <ExpirationReminderBanner />
          {children}
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
