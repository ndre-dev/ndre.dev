import { ImageResponse } from 'next/og';
import { colours, loadFonts } from '@/lib/mark';
import { copy, site, type Locale } from '@/lib/site';
import type { Tool } from '@/lib/tools';

// The share image. Each language has its own copy at its own path.
export const ogSize = { width: 1200, height: 630 };

export const ogAlt: Record<Locale, string> = {
  en: `${site.name}, developer in Manchester.`,
  pt: `${site.name}, dev em Manchester.`,
};

export async function renderOg(locale: Locale) {
  const t = copy[locale];
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: colours.bg,
        color: colours.fg,
        padding: '64px 80px 80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: 16,
          borderBottom: `2px solid ${colours.fg}`,
          fontFamily: 'Geist Mono',
          fontSize: 24,
          color: colours.muted,
        }}
      >
        <span>ndre.dev</span>
        <span>{t.location}</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Geist',
            fontSize: 260,
            lineHeight: 0.82,
            letterSpacing: -15,
          }}
        >
          {site.handle}
          <span style={{ color: colours.accent }}>.</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Geist Mono',
            fontSize: 36,
            whiteSpace: 'nowrap',
            color: colours.muted,
          }}
        >
          {t.tagline}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}

export const toolOgAlt: Record<Locale, string> = {
  en: 'The tool name and what it does, on ndre.dev.',
  pt: 'O nome da ferramenta e o que ela faz, no ndre.dev.',
};

// The share image for a tool page: the tool name with its note under it.
export async function renderToolOg(locale: Locale, tool: Tool) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: colours.bg,
        color: colours.fg,
        padding: '64px 80px 80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: 16,
          borderBottom: `2px solid ${colours.fg}`,
          fontFamily: 'Geist Mono',
          fontSize: 24,
          color: colours.muted,
        }}
      >
        <span>ndre.dev</span>
        <span>{copy[locale].toolsLabel}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Geist',
            fontSize: 200,
            lineHeight: 0.82,
            letterSpacing: -12,
          }}
        >
          {tool.name}
          <span style={{ color: colours.accent }}>.</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Geist Mono',
            fontSize: 36,
            color: colours.muted,
          }}
        >
          {tool.note[locale]}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}
