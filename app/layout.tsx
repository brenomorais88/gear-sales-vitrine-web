import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gear Sales Vitrine",
  description: "Vitrine web Gear Sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
