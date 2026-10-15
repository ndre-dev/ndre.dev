import type { MetadataRoute } from 'next';
import { copy, site } from '@/lib/site';
import { themeColour } from '@/lib/theme';

export const dynamic = 'force-static';

// Lets phones save the page to the home screen with the right name and icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ndre.dev`,
    short_name: 'ndre.dev',
    description: copy.en.description,
    start_url: '/',
    display: 'browser',
    background_color: themeColour.dark,
    theme_color: themeColour.dark,
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
