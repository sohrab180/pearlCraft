import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mypearlcraft -Best Pearl Jewelry Manufacturer in Delhi, India | Premium Handmade Pearl Ornaments",
  description: "Best Pearl Jewelry Manufacturer in Delhi, India | Premium Handmade Pearl Ornaments crafted with elegance, quality, and timeless designs for your unique style.",
  keywords: "jewelry, home decor, art, handcrafted jewelry, pearl jewelry, necklaces, earrings",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
       
    </html>
  );
}
