import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Amazon Toner Remanufacturing Portal",
  description: "Amazon Toner Remanufacturing Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
