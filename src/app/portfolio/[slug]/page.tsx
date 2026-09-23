import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Timecode } from '@/components/Timecode';
import { VideoFrame } from '@/components/VideoFrame';
import { PhotoFrame } from '@/components/PhotoFrame';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { Footer } from '@/components/Footer';
import { getCaseBySlug, getCases } from '@/lib/content';
import { MAX_PAGE_TITLE_LENGTH, META_DESCRIPTION_MAX_LENGTH, SITE_NAME, SITE_URL, truncateText } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { getBreadcrumbJsonLd, getVideoObjectJsonLd } from '@/lib/jsonld';

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCases().map((caseItem) => ({ slug: caseItem.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    return {};
  }

  const title = truncateText(caseItem.titulo, MAX_PAGE_TITLE_LENGTH);
  const description = truncateText(
    caseItem.desafio || caseItem.titulo,
    META_DESCRIPTION_MAX_LENGTH
  );
  const canonicalPath = `/portfolio/${caseItem.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `${SITE_URL}${canonicalPath}`,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

const FAMILIA_LABEL: Record<string, string> = {
  video: 'Vídeo',
  foto: 'Fotografia',
};

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    notFound();
  }

  const origem = `case-${caseItem.slug}`;
  const videoJsonLd = getVideoObjectJsonLd(caseItem);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { nome: 'Início', path: '/' },
    { nome: 'Portfólio', path: '/portfolio' },
    { nome: caseItem.titulo, path: `/portfolio/${caseItem.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {videoJsonLd && <JsonLd data={videoJsonLd} />}
      <Nav />

      <main className="mx-auto flex w-full max-w-[1240px] flex-col gap-12 px-6 py-14 sm:px-14 sm:py-20">
        {/* Vídeo ou foto no topo */}
        {caseItem.youtubeId ? (
          <VideoFrame
            youtubeId={caseItem.youtubeId}
            titulo={caseItem.titulo}
            capa={caseItem.capa}
            aspectRatio="hero"
            priority
          />
        ) : (
          <PhotoFrame
            src={caseItem.capa}
            alt={`Capa do case: ${caseItem.titulo}`}
            aspectRatio="16:9"
            priority
          />
        )}

        <div className="flex flex-col gap-4">
          <Timecode numero="00:00" rotulo={caseItem.categoria} />
          <h1 className="max-w-[24ch] font-(--font-display) text-3xl font-bold leading-[1.02] tracking-[-0.03em] text-(--color-cream) sm:text-[54px]">
            {caseItem.titulo}
          </h1>
          <p className="font-(--font-body) text-base text-(--color-cream-dim) sm:text-lg">
            {caseItem.cliente} · {caseItem.setor} · {caseItem.cidade}
          </p>
        </div>

        {/* Ficha técnica */}
        <dl className="grid grid-cols-1 gap-8 border-y border-(--color-line) py-8 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <dt className="font-(--font-mono) text-[11px] uppercase tracking-[0.18em] text-(--color-amber)">
              Entrega
            </dt>
            <dd className="font-(--font-body) text-base text-(--color-cream)">
              {caseItem.entrega}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-(--font-mono) text-[11px] uppercase tracking-[0.18em] text-(--color-amber)">
              Prazo
            </dt>
            <dd className="font-(--font-body) text-base text-(--color-cream)">
              {caseItem.prazo}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-(--font-mono) text-[11px] uppercase tracking-[0.18em] text-(--color-amber)">
              Formato
            </dt>
            <dd className="font-(--font-body) text-base text-(--color-cream)">
              {FAMILIA_LABEL[caseItem.familia] ?? caseItem.familia}
            </dd>
          </div>
        </dl>

        {/* O desafio */}
        {caseItem.desafio && (
          <section className="flex flex-col gap-4">
            <Timecode numero="00:01" rotulo="O desafio" as="h2" />
            <p className="max-w-[62ch] whitespace-pre-line font-(--font-body) text-base leading-[1.55] text-(--color-cream-dim) sm:text-lg">
              {caseItem.desafio}
            </p>
          </section>
        )}

        {/* O que fizemos */}
        {caseItem.oQueFizemos && (
          <section className="flex flex-col gap-4">
            <Timecode numero="00:02" rotulo="O que fizemos" as="h2" />
            <p className="max-w-[62ch] whitespace-pre-line font-(--font-body) text-base leading-[1.55] text-(--color-cream-dim) sm:text-lg">
              {caseItem.oQueFizemos}
            </p>
          </section>
        )}

        {/* Stills */}
        {caseItem.stills.length > 0 && (
          <section className="flex flex-col gap-6">
            <Timecode numero="00:03" rotulo="Imagens" as="h2" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {caseItem.stills.map((still, index) => (
                <PhotoFrame
                  key={still}
                  src={still}
                  alt={`Imagem ${index + 1} do case: ${caseItem.titulo}`}
                  aspectRatio="4:3"
                />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="flex flex-col items-start gap-6 border border-(--color-line) bg-(--color-surface) p-8 sm:p-14">
          <h2 className="max-w-[20ch] font-(--font-display) text-2xl font-bold leading-[1.05] tracking-[-0.028em] text-(--color-cream) sm:text-4xl">
            Quer um resultado parecido para a sua empresa?
          </h2>
          <WhatsAppCTA origem={origem} tamanho="lg">
            Iniciar conversa no WhatsApp
          </WhatsAppCTA>
        </div>
      </main>

      <Footer />
    </>
  );
}
