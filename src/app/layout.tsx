import type { Metadata } from "next";
import { ToastProvider } from "@/components";

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
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
