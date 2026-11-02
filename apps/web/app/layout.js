import {
  IBM_Plex_Mono,
  Libre_Franklin,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ThemeToggle } from "@/components/ThemeToggle";

const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
});

const display = Libre_Franklin({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shashwat Dwivedi — Backend engineer",
    template: "%s · Shashwat Dwivedi",
  },
  description:
    "Backend software engineer building distributed security systems and RAG/LLM applications.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Shashwat Dwivedi",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${source.variable} ${display.variable} ${mono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <main className="flex-1">{children}</main>
        <SiteFooter email="techshashwat5@gmail.com" />
      </body>
    </html>
  );
}
