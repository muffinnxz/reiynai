import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Reiyn AI",
  description:
    "เรียนเอไอแบบอินเทอร์แอคทีฟกับ Reiyn AI แพลตฟอร์มโอเพนซอร์สที่สามารถเรียนรู้และลองใช้งาน AI ต่าง ๆ ได้ในที่เดียว"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>{children}</body>
    </html>
  );
}
