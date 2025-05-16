import { Inter } from "next/font/google";
import { ToastProvider } from "@/components";
import { getCurrentSession } from "@/lib/auth/session.cached";
import { AppShell } from "@/modules/app-shell";

import type { Metadata } from "next";

import "@/app/globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Amazon Toner Remanufacturing Portal",
  description: "Amazon Toner Remanufacturing Portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getCurrentSession();

  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-gray-50">
        <ToastProvider>
          {session ? <AppShell>{children}</AppShell> : children}
        </ToastProvider>
      </body>
    </html>
  );
}
