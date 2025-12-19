import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title:
    "Mypearlcraft -Best Pearl Jewelry Manufacturer in Delhi, India | Premium Handmade Pearl Ornaments",
  description:
    "Best Pearl Jewelry Manufacturer in Delhi, India | Premium Handmade Pearl Ornaments crafted with elegance, quality, and timeless designs for your unique style.",
  keywords:
    "jewelry, home decor, art, handcrafted jewelry, pearl jewelry, necklaces, earrings",
  openGraph: {
    title: "Mypearlcraft - Premium Jewelry & Decor",
    description: "Shop luxury jewelry, decor, and art collections online.",
    url: "https://mypearlcraft.com",
    siteName: "Mypearlcraft",
    images: [
      {
        url: "https://mypearlcraft.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mypearlcraft Jewelry",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://mypearlcraft.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
        <Header />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
