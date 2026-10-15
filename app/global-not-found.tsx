import type { Metadata } from 'next';
import Link from 'next/link';
import { RootHtml } from '@/lib/root';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `404 · ndre.dev`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootHtml locale="en">
      <div className="page">
        <header className="bar">
          <Link href="/">ndre.dev</Link>
        </header>
        <main className="intro">
          <h1 className="name">
            404<span className="dot">.</span>
          </h1>
          {/* Both languages, since a 404 can come from either page. */}
          <p className="tagline">
            nothing here. <Link href="/">back to {site.handle}</Link>
            <br />
            <span lang="pt-BR">
              nada aqui. <Link href="/pt-br">voltar para {site.handle}</Link>
            </span>
          </p>
        </main>
      </div>
    </RootHtml>
  );
}
