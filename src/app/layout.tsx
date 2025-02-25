import type { Metadata } from "next";
import { Kanit as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import GoogleAnalytics from "./google-analytics";
import MicrosoftClarity from "./microsoft-clarity";
import { UserProvider } from "@/hooks/use-user";
import { HandleOnComplete } from "@/lib/router-events";
import { Toaster } from "@/components/ui/toaster";
import IsOnboardLayout from "@/components/layouts/is-onboard-layout";

const fontSans = FontSans({
  subsets: ["thai"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700"]
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
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <GoogleAnalytics />
        <MicrosoftClarity />
        <HandleOnComplete />
        <UserProvider>
          <IsOnboardLayout>{children}</IsOnboardLayout>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
