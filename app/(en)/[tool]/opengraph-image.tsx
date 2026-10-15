import { ogSize, renderToolOg, toolOgAlt } from '@/lib/og';
import { toolParams } from '@/lib/tool-page';
import { findTool } from '@/lib/tools';

export const dynamic = 'force-static';
export const generateStaticParams = toolParams;

export const alt = toolOgAlt.en;
export const size = ogSize;
export const contentType = 'image/png';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const tool = findTool((await params).tool);
  if (!tool) throw new Error('Unknown tool');
  return renderToolOg('en', tool);
}
