import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Timecode } from '@/components/Timecode';
import { PhotoFrame } from '@/components/PhotoFrame';
import { Footer } from '@/components/Footer';
import { getCases } from '@/lib/content';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

const PORTFOLIO_TITLE = 'Portfólio';
const PORTFOLIO_DESCRIPTION =
  'Vídeos institucionais, branding e fotografia corporativa produzidos pela Evis Produtora para empresas de todo o Brasil, de Belém para o país inteiro.';

export const metadata: Metadata = {
  title: PORTFOLIO_TITLE,
  description: PORTFOLIO_DESCRIPTION,
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: `${SITE_URL}/portfolio`,
    siteName: SITE_NAME,
    title: `${PORTFOLIO_TITLE} | ${SITE_NAME}`,
    description: PORTFOLIO_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PORTFOLIO_TITLE} | ${SITE_NAME}`,
    description: PORTFOLIO_DESCRIPTION,
  },
};

export default function PortfolioPage() {
  const cases = getCases();

  return (
    <>
      <Nav />

      <main className="mx-auto flex w-full max-w-[1240px] flex-col gap-10 px-6 py-14 sm:px-14 sm:py-20">
        <div className="flex flex-col gap-6">
          <Timecode numero="00:00" rotulo="Portfólio" />
          <h1 className="max-w-[18ch] font-(--font-display) text-3xl font-bold leading-[1.02] tracking-[-0.03em] text-(--color-cream) sm:text-[54px]">
            Trabalhos que já entregamos.
          </h1>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <li key={caseItem.slug}>
              <Link
                href={`/portfolio/${caseItem.slug}`}
                className="group flex flex-col gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-amber)"
              >
                <PhotoFrame
                  src={caseItem.capa}
                  alt={`Capa do case: ${caseItem.titulo}`}
                  aspectRatio="4:3"
                />

                <div className="flex flex-col gap-1">
                  <span className="font-(--font-mono) text-[11px] uppercase tracking-[0.18em] text-(--color-amber)">
                    {caseItem.categoria}
                  </span>
                  <h2 className="font-(--font-display) text-lg font-bold tracking-tight text-(--color-cream) transition-colors group-hover:text-(--color-amber)">
                    {caseItem.cliente}
                  </h2>
                  <span className="font-(--font-body) text-sm text-(--color-muted)">
                    {caseItem.setor}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}
