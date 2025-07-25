import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "sonner";

const manrope = localFont({
  src: "./fonts/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Mastersel",
  description: "",
  icons: {
    icon: [
      {
        url: "/logo.svg", // Path to your SVG
        type: "image/svg+xml",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Mastersel",
    description: "",
    type: "website",
    images: [
      {
        url: "/opengraph-image-2.png", // Path to your Open Graph image
        width: 912,
        height: 397,
        alt: "Mastersel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mastersel",
    description: "",
    images: ["/opengraph-image-2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
