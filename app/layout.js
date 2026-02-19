import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CASPer Prep by TSA | The Success Architect",
  description:
    "Master the CASPer exam with proven frameworks, expert strategies, and structured practice. The CASPer Expert Strategy Course v2.0 by The Success Architect.",
  keywords: [
    "CASPer prep",
    "CASPer exam",
    "CASPer course",
    "CASPer strategy",
    "CASPer practice",
    "TSA",
    "The Success Architect",
    "medical school prep",
    "dental school prep",
    "CASPer test preparation",
    "situational judgment test",
  ],
  openGraph: {
    title: "CASPer Prep by TSA | Expert Strategy Course v2.0",
    description:
      "Stop guessing. Start scoring in the top quartile. 7 modules, expert video tutorials, 40+ high-impact ideas, and practice scenarios with sample answers.",
    siteName: "CASPer Prep by TSA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CASPer Prep by TSA | Expert Strategy Course v2.0",
    description:
      "The structured, strategy-first CASPer preparation course built for future healthcare professionals.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body text-ink bg-surface-cream min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
