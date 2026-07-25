import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';
import { organizationSchema, professionalServiceSchema, websiteSchema } from '@/lib/schema';
import { company, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Childress Painting | Commercial Painting Contractor — Dallas–Fort Worth',
    template: '%s | Childress Painting',
  },
  description:
    'Commercial painting, industrial coatings, new construction, and facility repaint programs across Dallas–Fort Worth and Texas. Built for general contractors, developers, and facility teams.',
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  formatDetection: { telephone: true, address: false, email: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: company.name,
    locale: 'en_US',
    url: siteUrl,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0d1b2a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Webfonts are loaded from Google Fonts with a preconnect and
          `display=swap`, and globals.css declares a metric-matched fallback so
          the swap does not shift layout.

          If you prefer zero third-party requests, self-host instead:
            import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
          then apply the generated className to <html> and delete these tags.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font --
            The linked rule targets the Pages Router. In the App Router this
            <link> lives in the single root layout, so it loads once for the
            whole site rather than per page. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] bg-red px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-white"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main">{children}</main>

        <Footer />

        <JsonLd data={[organizationSchema(), professionalServiceSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
