// Shared by the English and Portuguese root layouts. Each language has its
// own root layout so the <html lang> matches the page.

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { copy, links, site, studio, type Locale } from '@/lib/site';
import { themeColour, themeScript } from '@/lib/theme';
import '@/app/globals.css';

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '800'],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
});

const languages = {
  en: copy.en.path,
  'pt-BR': copy.pt.path,
  'x-default': copy.en.path,
};

export function metadataFor(locale: Locale): Metadata {
  const t = copy[locale];
  return {
    metadataBase: new URL(site.url),
    title: t.title,
    description: t.description,
    alternates: { canonical: t.path, languages },
    openGraph: {
      title: site.name,
      description: t.description,
      url: t.path,
      siteName: 'ndre.dev',
      locale: t.ogLocale,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

// Tells search engines who the page is about, in their structured format.
export function StructuredData({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: `${site.url}${t.path === '/' ? '' : t.path}`,
    description: t.description,
    jobTitle: locale === 'en' ? 'Developer' : 'Dev',
    homeLocation: { '@type': 'Place', name: 'Manchester, UK' },
    knowsLanguage: ['en', 'pt-BR'],
    email: 'mailto:a@ndre.dev',
    sameAs: links
      .filter((link) => link.href.startsWith('https://'))
      .map((link) => link.href),
    founder: { '@type': 'Organization', name: studio.name, url: studio.href },
  };
  // Escape "<" so the JSON can never close the script tag early.
  const json = JSON.stringify(person).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export const viewport: Viewport = {
  // The theme toggle updates this when a visitor picks light.
  themeColor: themeColour.dark,
};

export function RootHtml({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    // The theme script sets data-theme before React loads, so React must not
    // treat that attribute as a mismatch.
    <html
      lang={copy[locale].lang}
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      {/* App Router root layouts use a plain <head>; next/head is Pages Router only. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
