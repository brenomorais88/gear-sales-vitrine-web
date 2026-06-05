import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_VITRINE_SITE_URL?.trim() || "https://gearsales.com.br"
  ),
  title: {
    default: "Vitrine Gear Sales",
    template: "%s",
  },
  description:
    "Confira os veículos disponíveis na vitrine. Veja fotos, detalhes e fale diretamente com a revenda.",
  openGraph: {
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
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
