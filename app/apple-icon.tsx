import { ImageResponse } from 'next/og';
import { loadFonts, Mark } from '@/lib/mark';

export const dynamic = 'force-static';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return new ImageResponse(<Mark size={size.width} />, {
    ...size,
    fonts: await loadFonts(),
  });
}
