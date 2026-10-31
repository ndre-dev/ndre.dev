// Everything the page says lives here, in English and Brazilian Portuguese.
// Keep past and current employers and their clients generic: name no
// agencies, contracts or client brands, in either language.

export type Locale = 'en' | 'pt';

export const site = {
  url: 'https://ndre.dev',
  name: 'Andre Guglielmi',
  handle: 'andre',
};

type Copy = {
  lang: string;
  path: string;
  ogLocale: string;
  tagline: string;
  location: string;
  title: string;
  description: string;
  studioNote: string;
  linksLabel: string;
  projectsLabel: string;
  toolsLabel: string;
  install: { copied: string; label: string };
  repo: { before: string; after: string };
  theme: { toLight: string; toDark: string };
  switchTo: { label: string; short: string; lang: string; href: string };
};

export const copy: Record<Locale, Copy> = {
  en: {
    lang: 'en',
    path: '/',
    ogLocale: 'en_GB',
    tagline: 'makes things',
    location: 'manchester, uk',
    title: `${site.name} · developer in Manchester`,
    description: `${site.name}, developer in Manchester. Runs Dobrigado, a Shopify studio.`,
    studioNote: 'my shopify studio in manchester',
    linksLabel: 'Links',
    projectsLabel: 'Projects',
    toolsLabel: 'small tools',
    install: {
      copied: 'copied',
      label: 'Copy the install command for',
    },
    repo: { before: 'Source code for', after: 'on GitHub' },
    theme: { toLight: 'light', toDark: 'dark' },
    switchTo: {
      label: 'Português',
      short: 'pt',
      lang: 'pt-BR',
      href: '/pt-br',
    },
  },
  pt: {
    lang: 'pt-BR',
    path: '/pt-br',
    ogLocale: 'pt_BR',
    tagline: 'faz coisas',
    location: 'manchester, reino unido',
    title: `${site.name} · dev em Manchester`,
    description: `${site.name}, dev em Manchester. À frente da Dobrigado, um estúdio de Shopify.`,
    studioNote: 'meu estúdio shopify, manchester',
    linksLabel: 'Links',
    projectsLabel: 'Projetos',
    toolsLabel: 'ferramentas',
    install: {
      copied: 'copiado',
      label: 'Copiar o comando de instalação do',
    },
    repo: { before: 'Código do', after: 'no GitHub' },
    theme: { toLight: 'claro', toDark: 'escuro' },
    switchTo: { label: 'English', short: 'en', lang: 'en', href: '/' },
  },
};

type Link = { label: string; short: string; href: string };

// LinkedIn shows once its URL is set. X can join later.
const linkedin = 'https://www.linkedin.com/in/andreguglielmi';

// Shown in the footer, in this order.
export const links: Link[] = [
  // Andre's own address on this domain.
  { label: 'a@ndre.dev', short: 'email', href: 'mailto:a@ndre.dev' },
  { label: 'GitHub', short: 'gh', href: 'https://github.com/ndre-dev' },
  { label: 'LinkedIn', short: 'in', href: linkedin },
  // Andre's Shopify work history, on the studio site.
  {
    label: 'Work history',
    short: 'work',
    href: 'https://www.dobrigado.com/andre',
  },
].filter((link) => link.href);

export const studio = {
  name: 'Dobrigado',
  href: 'https://www.dobrigado.com',
};

// What Andre is working on now. Names stay the same in both languages; only
// the notes change.
type Project = { name: string; note: Record<Locale, string>; href: string };

export const projects: Project[] = [
  {
    name: 'fancy it',
    note: {
      en: 'booking links for small businesses, soon',
      pt: 'links de reserva para negócios, em breve',
    },
    href: 'https://www.dobrigado.com/fancy-it',
  },
  {
    name: 'pqp',
    note: {
      en: 'open-source voice and text chat',
      pt: 'chat de voz e texto open source',
    },
    href: 'https://pqp.gg',
  },
];
