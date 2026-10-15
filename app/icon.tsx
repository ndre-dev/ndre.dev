import { ImageResponse } from 'next/og';
import { loadFonts, Mark } from '@/lib/mark';

export const dynamic = 'force-static';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  return new ImageResponse(<Mark size={size.width} />, {
    ...size,
    fonts: await loadFonts(),
  });
}
