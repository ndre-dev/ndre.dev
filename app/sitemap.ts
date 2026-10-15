import type { MetadataRoute } from 'next';
import { copy, site, type Locale } from '@/lib/site';
import { toolPath, tools } from '@/lib/tools';

export const dynamic = 'force-static';

const url = (path: string) => (path === '/' ? site.url : `${site.url}${path}`);

// One entry per page in each language, each pointing at both languages.
const both = (path: (locale: Locale) => string) => {
  const languages = { en: url(path('en')), 'pt-BR': url(path('pt')) };
  return (['en', 'pt'] as const).map((locale) => ({
    url: url(path(locale)),
    alternates: { languages },
  }));
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...both((locale) => copy[locale].path),
    ...tools.flatMap((tool) => both((locale) => toolPath(locale, tool.slug))),
  ];
}
