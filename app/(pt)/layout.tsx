import { metadataFor, RootHtml } from '@/lib/root';

export { viewport } from '@/lib/root';
export const metadata = metadataFor('pt');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootHtml locale="pt">{children}</RootHtml>;
}
