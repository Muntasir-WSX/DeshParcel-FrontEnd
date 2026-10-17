import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeshParcel - Logistics & Co.",
  description: "Courier & Logistics Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        jetbrainsMonoHeading.variable,
      )}
    >
      <body
        className="min-h-full flex flex-col bg-background bg-[#070b19] text-foreground"
        suppressHydrationWarning={true}
      >
        <SmoothScrollProvider>
          <main className="flex-1">{children}</main>
          <Toaster position="bottom-right" richColors theme="light" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
