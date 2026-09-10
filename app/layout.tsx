import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soulfulhealingadventure.com"),
  title: "Soulful Healing Adventure | Retreat Registration",
  description:
    "Register for the Soulful Healing Adventure retreat in Rishikesh — a journey back to yourself.",
  openGraph: {
    title: "Soulful Healing Adventure",
    description:
      "A two-day retreat in Rishikesh, 14–15 November 2026 — yoga, sound healing, quiet trails, and good company.",
    url: "https://soulfulhealingadventure.com",
    siteName: "Soulful Healing Adventure",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soulful Healing Adventure",
    description:
      "A two-day retreat in Rishikesh, 14–15 November 2026 — yoga, sound healing, quiet trails, and good company.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory font-sans text-charcoal">
        {children}
      </body>
    </html>
  );
}
