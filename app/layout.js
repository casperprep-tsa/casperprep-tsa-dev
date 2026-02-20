import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://casperpreptsa.com"),
  title: {
    default: "CASPer Prep by TSA | The Success Architect",
    template: "%s | CASPer Prep by TSA",
  },
  description:
    "Master the CASPer exam with proven frameworks, expert strategies, and structured practice. The CASPer Expert Strategy Course v2.0 by The Success Architect.",
  keywords: [
    "CASPer prep",
    "CASPer exam",
    "CASPer course",
    "CASPer strategy",
    "CASPer practice",
    "CASPer test preparation",
    "TSA",
    "The Success Architect",
    "medical school prep",
    "dental school prep",
    "nursing school prep",
    "situational judgment test",
    "CASPer tips",
    "CASPer frameworks",
    "CASPer top quartile",
  ],
  authors: [{ name: "The Success Architect" }],
  creator: "The Success Architect",
  publisher: "The Success Architect",
  openGraph: {
    title: "CASPer Prep by TSA | Expert Strategy Course v2.0",
    description:
      "Stop guessing. Start scoring in the top quartile. 7 modules, expert video tutorials, 40+ high-impact ideas, and practice scenarios with sample answers.",
    siteName: "CASPer Prep by TSA",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CASPer Prep by TSA — Expert Strategy Course v2.0",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CASPer Prep by TSA | Expert Strategy Course v2.0",
    description:
      "The structured, strategy-first CASPer preparation course built for future healthcare professionals.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="font-body text-ink bg-surface-cream min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}