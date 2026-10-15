import { ogAlt, ogSize, renderOg } from '@/lib/og';

export const dynamic = 'force-static';

export const alt = ogAlt.pt;
export const size = ogSize;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderOg('pt');
}
