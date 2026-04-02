import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Arihant Rawat",
  description:
    "Arihant Rawat - CS + Applied Mathematics @ USC. Machine Learning, Data Engineering, Computer Vision.",
  keywords: ["Arihant Rawat", "USC", "Machine Learning", "Computer Science", "Portfolio"],
  authors: [{ name: "Arihant Rawat" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Arihant Rawat",
    description: "CS + Applied Mathematics @ USC. Building AI systems that serve people.",
    url: "https://arihant-portfolio.vercel.app",
    siteName: "Arihant Rawat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arihant Rawat",
    description: "CS + Applied Mathematics @ USC. Building AI systems that serve people.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Preload critical above-the-fold assets */}
        <link rel="preload" href="/assets/ArihantAtBeachUSCHoodie.jpg" as="image" />
        <link rel="preload" href="/assets/icons/contacts_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/appstore_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/applemusic_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/settings_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/photos_ios.png" as="image" />
        <link rel="preload" href="/assets/icons/spotify.png" as="image" />
        <link rel="preload" href="/assets/icons/github.webp" as="image" />
        <link rel="preload" href="/assets/icons/linkedin.jpg" as="image" />
      </head>
      <body>{children}  <Analytics />
</body>
    </html>
  );
}


