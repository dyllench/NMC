import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovaMedix Custom",
  description:
    "Factory-direct compression garment supplier for global buyers, clinics, distributors and OEM partners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
