import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "هندسة سوهاج بتتخرج",
  description: "استمارة حجز تيشيرت حفلة التخرج",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body dir="rtl" className={`${alexandria.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
