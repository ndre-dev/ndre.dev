import { notFound } from 'next/navigation';
import { toolMetadata, ToolPage, toolParams } from '@/lib/tool-page';
import { findTool } from '@/lib/tools';

type Props = { params: Promise<{ tool: string }> };

// Only the listed tools get a page. Any other path is a 404.
export const dynamicParams = false;
export const generateStaticParams = toolParams;

export async function generateMetadata({ params }: Props) {
  const tool = findTool((await params).tool);
  return tool ? toolMetadata('pt', tool) : {};
}

export default async function Page({ params }: Props) {
  const tool = findTool((await params).tool);
  if (!tool) notFound();
  return <ToolPage locale="pt" tool={tool} />;
}
