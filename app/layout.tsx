import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinTrack | Premium DashboardKeuangan",
  description: "Budgeting & Financial Tracking Dashboard",
  icons: {
    icon: '/dollar.png',
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
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
