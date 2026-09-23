import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { Nav } from '@/components/Nav';
import { Timecode } from '@/components/Timecode';
import { VideoFrame } from '@/components/VideoFrame';
import { PhotoFrame } from '@/components/PhotoFrame';
import { LogoGrid } from '@/components/LogoGrid';
import { ServicoLista } from '@/components/ServicoLista';
import { Stats } from '@/components/Stats';
import { Footer } from '@/components/Footer';
import { getCasesDestaque, getClientes, getServicos, getStats } from '@/lib/content';
import { JsonLd } from '@/components/JsonLd';
import { getLocalBusinessJsonLd } from '@/lib/jsonld';

export default function HomePage() {
  const casesDestaque = getCasesDestaque();
  const heroCase = casesDestaque[0];
  const clientes = getClientes();
  const servicos = getServicos();
  const stats = getStats();

  return (
    <>
      <JsonLd data={getLocalBusinessJsonLd()} />
      <Nav />

      <main className="flex flex-col">
        {/* Hero */}
        <section className="mx-auto flex w-full max-w-[1240px] flex-col gap-10 px-6 pt-14 pb-16 sm:px-14 sm:pt-20 sm:pb-24">
          <Timecode numero="00:00" rotulo="Fundação" />

          <div className="flex flex-col gap-6">
            <h1 className="max-w-[16ch] font-(--font-display) text-[40px] font-extrabold leading-[0.96] tracking-[-0.035em] text-(--color-cream) sm:text-[92px]">
              Produção Audiovisual que dá{' '}
              <span className="text-(--color-amber)">resultado</span>, não vaidade.
            </h1>

            <p className="max-w-[62ch] font-(--font-body) text-base leading-[1.55] text-(--color-cream-dim) sm:text-lg">
              Evis Produtora — vídeo institucional e fotografia corporativa em Belém/PA,
              para empresas de todo o Brasil.
            </p>

            <div>
              <WhatsAppCTA origem="home-topo" tamanho="lg">
                Iniciar conversa no WhatsApp
              </WhatsAppCTA>
            </div>
          </div>

          {heroCase &&
            (heroCase.youtubeId ? (
              <VideoFrame
                youtubeId={heroCase.youtubeId}
                titulo={heroCase.titulo}
                capa={heroCase.capa}
                aspectRatio="hero"
                priority
              />
            ) : (
              <PhotoFrame
                src={heroCase.capa}
                alt={`Capa do case: ${heroCase.titulo}`}
                aspectRatio="16:9"
                priority
              />
            ))}
        </section>

        {/* Logos */}
        {clientes.length > 0 && (
          <section className="mx-auto w-full max-w-[1240px] px-6 pb-16 sm:px-14 sm:pb-24">
            <Timecode numero="00:01" rotulo="Clientes" className="mb-8 sm:mb-10" />
            <LogoGrid clientes={clientes} />
          </section>
        )}

        {/* Serviços */}
        <section
          id="servicos"
          className="mx-auto w-full max-w-[1240px] px-6 pb-16 sm:px-14 sm:pb-24"
        >
          <Timecode numero="00:02" rotulo="Serviços" className="mb-8 sm:mb-10" />

          <h2 className="mb-10 max-w-[14ch] font-(--font-display) text-3xl font-bold leading-[1.02] tracking-[-0.03em] text-(--color-cream) sm:mb-14 sm:text-[54px]">
            Duas frentes, um objetivo.
          </h2>

          <ServicoLista servicos={servicos} />
        </section>

        {/* Números */}
        <section className="mx-auto w-full max-w-[1240px] px-6 pb-16 sm:px-14 sm:pb-24">
          <Timecode numero="00:03" rotulo="Números" className="mb-8 sm:mb-10" />
          <Stats stats={stats} />
        </section>

        {/* Sobre */}
        <section
          id="sobre"
          className="mx-auto w-full max-w-[1240px] px-6 pb-16 sm:px-14 sm:pb-24"
        >
          <Timecode numero="00:04" rotulo="Sobre" className="mb-8 sm:mb-10" />

          <p className="max-w-[62ch] font-(--font-body) text-base leading-[1.55] text-(--color-cream-dim) sm:text-lg">
            A Evis Produtora nasceu em Belém e já entregou mais de 20 filmes completos
            para empresas e marcas de todo o Brasil. Trabalhamos com câmeras de cinema
            e drone, do roteiro à entrega final, para transformar a operação real de
            uma empresa em narrativa visual que gera negócio.
          </p>
        </section>

        {/* Reservado para depoimentos — fora do escopo da fase 1 (ADR-06) */}

        {/* CTA final */}
        <section className="mx-auto w-full max-w-[1240px] px-6 pb-20 sm:px-14 sm:pb-28">
          <div className="flex flex-col items-start gap-6 border border-(--color-line) bg-(--color-surface) p-8 sm:p-14">
            <h2 className="max-w-[20ch] font-(--font-display) text-3xl font-bold leading-[1.02] tracking-[-0.03em] text-(--color-cream) sm:text-[54px]">
              Vamos conversar sobre o seu próximo filme?
            </h2>
            <WhatsAppCTA origem="home-final" tamanho="lg">
              Iniciar conversa no WhatsApp
            </WhatsAppCTA>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
