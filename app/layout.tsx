import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

export const metadata: Metadata = {
  title: "Arihant Rawat",
  description:
    "Arihant Rawat - CS + Applied Mathematics @ USC. Machine Learning, Data Engineering, Computer Vision.",
  keywords: ["Arihant Rawat", "USC", "Machine Learning", "Computer Science", "Portfolio"],
  authors: [{ name: "Arihant Rawat" }],
  icons: {
    icon: withBasePath("/favicon.png"),
    apple: withBasePath("/favicon.png"),
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
        <link rel="icon" href={withBasePath("/favicon.png")} type="image/png" />
        <link rel="shortcut icon" href={withBasePath("/favicon.png")} type="image/png" />
        <link rel="apple-touch-icon" href={withBasePath("/favicon.png")} />
        {/* Preload critical above-the-fold assets */}
        <link rel="preload" href={withBasePath("/assets/ArihantAtBeachUSCHoodie.jpg")} as="image" />
        <link rel="preload" href={withBasePath("/assets/icons/contacts_ios.png")} as="image" />
        <link rel="preload" href={withBasePath("/assets/icons/appstore_ios.png")} as="image" />
        <link rel="preload" href={withBasePath("/assets/icons/applemusic_ios.png")} as="image" />
        <link rel="preload" href={withBasePath("/assets/icons/settings_ios.png")} as="image" />
        <link rel="preload" href={withBasePath("/assets/icons/photos_ios.png")} as="image" />
        <link rel="preload" href={withBasePath("/assets/icons/spotify.png")} as="image" />
        <link rel="preload" href={withBasePath("/assets/icons/github.webp")} as="image" />
        <link rel="preload" href={withBasePath("/assets/icons/linkedin.jpg")} as="image" />
      </head>
      <body>{children}  <Analytics />
</body>
    </html>
  );
}


