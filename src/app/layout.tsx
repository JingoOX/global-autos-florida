import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Autos Florida LLC | Autos seminuevos y broker de subastas en Kissimmee, FL",
  description:
    "Compra, cambia o financia tu próximo auto en Global Autos Florida LLC. +500 autos entregados en Kissimmee, Florida. Broker de subastas Copart, IAA y Manheim.",
  keywords: [
    "autos seminuevos Kissimmee",
    "broker de subastas Florida",
    "Copart",
    "IAA",
    "Manheim",
    "financiamiento autos Florida",
    "Global Autos Florida",
  ],
  authors: [{ name: "Global Autos Florida LLC" }],
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='6' y='6' width='20' height='20' rx='3' transform='rotate(45 16 16)' fill='%23FFCE00'/%3E%3Ctext x='16' y='21' font-size='11' font-weight='900' text-anchor='middle' fill='%230A0A0A' font-family='Arial'%3EGA%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "Global Autos Florida LLC | Kissimmee, Florida",
    description:
      "Compra, cambia o financia tu próximo auto. +500 autos entregados. Broker de subastas Copart, IAA y Manheim.",
    type: "website",
    locale: "es_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
