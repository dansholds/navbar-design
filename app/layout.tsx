import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Geist } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/content";
import { ORG, WEBSITE, graph } from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist",
});

const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fragment-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: {
    icon: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/icon-dark.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fefefe",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${fragmentMono.variable}`}>
      <body>
        <JsonLd data={graph(WEBSITE, ORG)} />
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="660c5c91-daa8-4210-8e9d-d214b57063c8"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
