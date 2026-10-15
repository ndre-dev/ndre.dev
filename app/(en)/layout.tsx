import { metadataFor, RootHtml } from '@/lib/root';

export { viewport } from '@/lib/root';
export const metadata = metadataFor('en');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootHtml locale="en">{children}</RootHtml>;
}
