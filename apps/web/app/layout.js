import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { AppProviders } from "@/components/shell/AppProviders.js";
import { ThemeScript } from "@/components/shell/ThemeScript.js";
import { getHomeContent } from "@/lib/content";

/** OFL 1.1 — UI body */
const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  adjustFontFallback: true,
});

/** OFL 1.1 — editorial display (Direction B guardrail) */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: true,
});

/** OFL 1.1 — metadata / labels */
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

export default async function RootLayout({ children }) {
  const { profile, experience } = await getHomeContent();
  const primaryRole = experience[0]?.role;
  const introLine = primaryRole
    ? `${profile.location} · ${primaryRole}`
    : profile.location;

  return (
    <html
      lang="en"
      className={`${source.variable} ${instrument.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <AppProviders introLine={introLine}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter email="techshashwat5@gmail.com" />
        </AppProviders>
      </body>
    </html>
  );
}
