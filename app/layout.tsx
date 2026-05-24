import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gear Sales Vitrine",
    template: "%s",
  },
  description: "Vitrine pública de lojas no Gear Sales.",
  metadataBase: process.env.NEXT_PUBLIC_VITRINE_URL
    ? new URL(process.env.NEXT_PUBLIC_VITRINE_URL)
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
