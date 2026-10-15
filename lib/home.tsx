'use client';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { prefersStill } from '@/lib/motion';
import { copy, links, projects, site, studio, type Locale } from '@/lib/site';
import { ThemeToggle } from '@/lib/theme-toggle';
import { toolPath, tools } from '@/lib/tools';
import { useCopy } from '@/lib/use-copy';

// Gives an element its own part in the language switch animation, so it
// glides to its new place instead of jumping.
const part = (name: string) =>
  ({ viewTransitionName: name }) as React.CSSProperties;

// Renders text in both languages in the same spot and shows only the current
// one. The box always fits the longer text, so switching language never moves
// anything on the page. `block` wraps a whole block, such as a list, instead
// of a line of text. Pass `text` for plain text, or `children` for markup.
//
// The hidden language is drawn by CSS only (see Text), so readers that ignore
// CSS, such as bots, link previews and Reader view, see one language.
function Both({
  locale,
  block,
  text,
  children,
}: {
  locale: Locale;
  block?: boolean;
  text?: (l: Locale) => string;
  children?: (l: Locale, ghost: boolean) => React.ReactNode;
}) {
  const Tag = block ? 'div' : 'span';
  return (
    <Tag className={block ? 'both both-block' : 'both'}>
      {(['en', 'pt'] as const).map((l) => {
        const ghost = l !== locale;
        return (
          <Tag
            key={l}
            lang={copy[l].lang}
            className={ghost ? 'both-hidden' : undefined}
            aria-hidden={ghost || undefined}
          >
            {text ? <Text ghost={ghost}>{text(l)}</Text> : children?.(l, ghost)}
          </Tag>
        );
      })}
    </Tag>
  );
}

// Text for one language. In the hidden copy it lives in a data attribute and
// CSS draws it, so it takes the same space but is not part of the HTML text.
function Text({ ghost, children }: { ghost: boolean; children: string }) {
  return ghost ? <span className="ghost" data-text={children} /> : children;
}

// A small "brew" tag after a tool that copies its install command. Both
// labels share one grid cell, so the row never shifts when the label changes.
// The label not on show is drawn by CSS (see Text), like the hidden language.
function Brew({
  command,
  tool,
  locale,
  ghost,
}: {
  command: string;
  tool: string;
  locale: Locale;
  ghost: boolean;
}) {
  const { copied, copy: onCopy } = useCopy(command);
  const t = copy[locale].install;

  const labels = (
    <span aria-hidden="true">
      <span className={copied ? 'both-hidden' : undefined}>
        <Text ghost={ghost || copied}>brew</Text>
      </span>
      <span className={copied ? undefined : 'both-hidden'}>
        <Text ghost={ghost || !copied}>{t.copied}</Text>
      </span>
    </span>
  );

  // The hidden language gets the tag's shape only, not a second button.
  if (ghost) return <span className="brew">{labels}</span>;

  return (
    <>
      <button
        type="button"
        className="brew"
        onClick={onCopy}
        title={command}
        aria-label={`${t.label} ${tool}: ${command}`}
      >
        {labels}
      </button>
      <span className="sr-only" role="status">
        {copied ? t.copied : ''}
      </span>
    </>
  );
}

// A small "repo" link after a tool, to its source on GitHub. It is a link, not
// a button, so it stays on touch screens. The hidden language gets the shape
// only, like Brew.
function Repo({
  href,
  tool,
  locale,
  ghost,
}: {
  href: string;
  tool: string;
  locale: Locale;
  ghost: boolean;
}) {
  const t = copy[locale].repo;

  if (ghost)
    return (
      <span className="repo">
        <Text ghost>repo</Text>
      </span>
    );

  // The full name is for screen readers. It starts with the visible text, so
  // voice control ("click repo") still finds the link.
  return (
    <a className="repo" href={href}>
      repo
      <span className="sr-only">
        {' '}
        {t.before} {tool} {t.after}
      </span>
    </a>
  );
}

const localeOf = (path: string): Locale =>
  path.startsWith(copy.pt.path) ? 'pt' : 'en';

export function Home({ locale: initial }: { locale: Locale }) {
  const [locale, setLocale] = useState(initial);
  const t = copy[locale];

  // Swap the language in place, with an animation, and update the address.
  // Each language still has its own page for links, reloads and search.
  function switchTo(next: Locale) {
    const update = () => {
      flushSync(() => setLocale(next));
      document.documentElement.lang = copy[next].lang;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', copy[next].description);
    };
    if (!document.startViewTransition || prefersStill()) return update();
    const root = document.documentElement;
    root.classList.add('lang-switching');
    const transition = document.startViewTransition(update);
    transition.ready.catch(() => {});
    transition.finished.finally(() => root.classList.remove('lang-switching'));
  }

  function onSwitch(event: React.MouseEvent<HTMLAnchorElement>) {
    // Let the browser handle new-tab and similar clicks.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    const next = localeOf(t.switchTo.href);
    history.pushState({ locale: next }, '', copy[next].path);
    switchTo(next);
  }

  // Back and forward between the two languages.
  useEffect(() => {
    function onPop() {
      const next = localeOf(location.pathname);
      if (next !== locale) switchTo(next);
    }
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  });

  return (
    <>
      <div className="page">
        <header className="bar">
          <span>ndre.dev</span>
          <div className="bar-links" style={part('bar-links')}>
            <a
              href={t.switchTo.href}
              onClick={onSwitch}
              hrefLang={t.switchTo.lang}
              lang={t.switchTo.lang}
            >
              {t.switchTo.short}
              <span className="sr-only"> {t.switchTo.label}</span>
            </a>
            <ThemeToggle labels={t.theme} />
          </div>
        </header>

        <main className="main">
          <section className="intro">
            <h1 className="name">
              {site.handle}
              <span className="dot">.</span>
            </h1>
            <p className="tagline" style={part('tagline')}>
              <Both locale={locale} text={(l) => copy[l].tagline} />
            </p>
          </section>

          <a className="studio" href={studio.href} style={part('studio')}>
            <span className="studio-text">
              {/* Plain images: the static export has no image optimiser. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="studio-logo on-dark"
                src="/dobrigado/dobrigado-logo-white-600.png"
                alt={studio.name}
                width={600}
                height={144}
              />
              {/* Not lazy: lazy loading starts the download late, and the logo
                  then pops in after the page has drawn. The file is small. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="studio-logo on-light"
                src="/dobrigado/dobrigado-logo-navy-600.png"
                alt={studio.name}
                width={600}
                height={144}
              />
              <span className="muted">
                <Both locale={locale} text={(l) => copy[l].studioNote} />
              </span>
            </span>
            <span className="studio-arrow" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </a>

          <ul className="projects" aria-label={t.projectsLabel}>
            {projects.map((project, i) => (
              <li
                key={project.name}
                className="project"
                style={
                  {
                    '--i': i,
                    viewTransitionName: `project-${i}`,
                  } as React.CSSProperties
                }
              >
                <a className="entry" href={project.href}>
                  <Both locale={locale}>
                    {(l, ghost) => (
                      <>
                        <span className="entry-name">
                          <Text ghost={ghost}>{project.name}</Text>
                        </span>
                        <span className="muted">
                          <Text ghost={ghost}>{` · ${project.note[l]}`}</Text>
                        </span>
                        <span className="entry-arrow" aria-hidden="true" />
                      </>
                    )}
                  </Both>
                </a>
              </li>
            ))}
          </ul>

          <section className="tools" style={part('tools')}>
            <h2 className="tools-label">
              <Both locale={locale} text={(l) => copy[l].toolsLabel} />
            </h2>
            {/* The whole list swaps at once. Each language lays out on its own,
                so a note that wraps in one language never leaves a blank line
                in the other. Nothing above the list moves. */}
            <Both locale={locale} block>
              {(l, ghost) => (
                <ul className="tools-list">
                  {tools.map((tool) => {
                    // The hidden copy has no real links, only their shape.
                    const Entry = ghost ? 'span' : 'a';
                    return (
                      <li key={tool.name}>
                        <Entry
                          className="entry"
                          href={ghost ? undefined : toolPath(l, tool.slug)}
                        >
                          <span className="entry-name">
                            <Text ghost={ghost}>{tool.name}</Text>
                          </span>
                          <span className="muted">
                            <Text ghost={ghost}>{` · ${tool.note[l]}`}</Text>
                          </span>
                          <span className="entry-arrow" aria-hidden="true" />
                        </Entry>
                        {tool.install && (
                          <Brew
                            command={tool.install}
                            tool={tool.name}
                            locale={l}
                            ghost={ghost}
                          />
                        )}
                        <Repo
                          href={tool.repo}
                          tool={tool.name}
                          locale={l}
                          ghost={ghost}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </Both>
          </section>
        </main>

        <footer className="foot" style={part('foot')}>
          <nav aria-label={t.linksLabel} className="foot-links">
            {links.map((link) => (
              // The full name is for screen readers. It starts with the visible
              // text, so voice control ("click gh") still finds the link.
              <a key={link.href} href={link.href}>
                {link.short}
                <span className="sr-only"> {link.label}</span>
              </a>
            ))}
          </nav>
          <span>
            <Both locale={locale} text={(l) => copy[l].location} />
          </span>
        </footer>
      </div>
    </>
  );
}
