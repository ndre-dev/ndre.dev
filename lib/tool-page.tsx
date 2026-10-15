// The page for one small tool. Each tool has an English page at /<slug> and a
// Portuguese one at /pt-br/<slug>. Unlike the home page, switching language
// opens the other page.

import type { Metadata } from 'next';
import { CopyCommand } from '@/lib/copy-command';
import { copy, links, site, type Locale } from '@/lib/site';
import { ThemeToggle } from '@/lib/theme-toggle';
import { toolCopy, toolPath, tools, type Tool } from '@/lib/tools';

export const toolParams = () => tools.map((tool) => ({ tool: tool.slug }));

const other = (locale: Locale): Locale => (locale === 'en' ? 'pt' : 'en');

export function toolMetadata(locale: Locale, tool: Tool): Metadata {
  const t = copy[locale];
  const title = `${tool.title} · ndre.dev`;
  const description = tool.about[locale][0];
  const path = toolPath(locale, tool.slug);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: toolPath('en', tool.slug),
        'pt-BR': toolPath('pt', tool.slug),
        'x-default': toolPath('en', tool.slug),
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'ndre.dev',
      locale: t.ogLocale,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

// Tells search engines what the tool is, in their structured format.
function ToolData({ locale, tool }: { locale: Locale; tool: Tool }) {
  const app = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.about[locale].join(' '),
    url: `${site.url}${toolPath(locale, tool.slug)}`,
    image: `${site.url}${tool.shot.src}`,
    applicationCategory: tool.category,
    operatingSystem: tool.platform,
    inLanguage: copy[locale].lang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
    author: { '@type': 'Person', name: site.name, url: site.url },
    sameAs: tool.repo,
  };
  // Escape "<" so the JSON can never close the script tag early.
  const json = JSON.stringify(app).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function ToolPage({ locale, tool }: { locale: Locale; tool: Tool }) {
  const t = copy[locale];
  const l = toolCopy[locale];
  const switchTo = other(locale);

  return (
    <>
      <ToolData locale={locale} tool={tool} />
      <div className="page">
        <header className="bar">
          <a href={t.path}>
            ndre.dev<span className="sr-only">. {l.home}</span>
          </a>
          <div className="bar-links">
            <a
              href={toolPath(switchTo, tool.slug)}
              hrefLang={copy[switchTo].lang}
              lang={copy[switchTo].lang}
            >
              {t.switchTo.short}
              <span className="sr-only"> {t.switchTo.label}</span>
            </a>
            <ThemeToggle labels={t.theme} />
          </div>
        </header>

        <main className="main">
          <section className="intro">
            <h1 className="name name-tool">
              {tool.name}
              <span className="dot">.</span>
            </h1>
            <p className="tagline">{tool.note[locale]}</p>
          </section>

          <div className="tool">
            <div className="tool-about">
              {tool.about[locale].map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            {/* A retina screenshot, drawn at half its pixel size. Plain image:
                the static export has no image optimiser. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="tool-shot"
              src={tool.shot.src}
              alt={tool.shot.alt[locale]}
              width={tool.shot.width}
              height={tool.shot.height}
              style={{ width: tool.shot.width / 2 }}
            />

            <section className="tool-part">
              <h2 className="tools-label">{l.install}</h2>
              {tool.install && (
                <>
                  <CopyCommand command={tool.install} labels={l} />
                  <p className="muted">{l.other}</p>
                </>
              )}
              {tool.steps && (
                <ol className="tool-steps">
                  {tool.steps[locale].map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              {tool.more && <p className="muted">{tool.more[locale]}</p>}
            </section>

            <section className="tool-part">
              <h2 className="tools-label">{l.needs}</h2>
              <p>{tool.needs[locale]}</p>
            </section>

            <section className="tool-part">
              <h2 className="tools-label">{l.links}</h2>
              <ul className="tools-list">
                <li>
                  <a className="entry" href={tool.repo}>
                    <span className="entry-name">{l.source}</span>
                    <span className="entry-arrow" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="entry" href={`${tool.repo}/releases/latest`}>
                    <span className="entry-name">{l.releases}</span>
                    <span className="entry-arrow" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </main>

        <footer className="foot">
          <nav aria-label={t.linksLabel} className="foot-links">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.short}
                <span className="sr-only"> {link.label}</span>
              </a>
            ))}
          </nav>
          <span>{t.location}</span>
        </footer>
      </div>
    </>
  );
}
