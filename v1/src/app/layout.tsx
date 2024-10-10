import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Open Docs",
  description: "Real Time Editor made Using Nextjs + TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="w-full h-[100%]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full bg-white dark:bg-white bg-blue-500`}
      >
        <Toaster richColors/>
        {children}
      </body>
    </html>
  );
}
