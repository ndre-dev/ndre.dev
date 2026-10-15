import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const colours = {
  bg: '#0b1526',
  fg: '#eef1f6',
  muted: '#9aa6ba',
  accent: '#ff6f91',
};

export async function loadFonts() {
  const [geist, geistMono] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/Geist-800.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/GeistMono-400.ttf')),
  ]);
  return [
    {
      name: 'Geist',
      data: geist,
      weight: 800 as const,
      style: 'normal' as const,
    },
    {
      name: 'Geist Mono',
      data: geistMono,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}

// The "a." mark used for the browser tab and home screen icons.
export function Mark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colours.bg,
        color: colours.fg,
        fontFamily: 'Geist',
        fontSize: size * 0.72,
        letterSpacing: -size * 0.04,
        paddingBottom: size * 0.08,
      }}
    >
      a<span style={{ color: colours.accent }}>.</span>
    </div>
  );
}
