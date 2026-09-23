import React from 'react';
import type { Servico } from '@/types/content';

export type ServicoListaProps = {
  servicos: Servico[];
  className?: string;
};

export function ServicoLista({ servicos, className = '' }: ServicoListaProps) {
  const servicosVideo = servicos.filter((s) => s.familia === 'video');
  const servicosFoto = servicos.filter((s) => s.familia === 'foto');

  return (
    <div className={`w-full flex flex-col gap-14 sm:gap-20 ${className}`}>
      {/* 01 Vídeo (Peso visual maior) */}
      <section className="flex flex-col gap-6" aria-labelledby="servicos-video-heading">
        <div className="flex items-baseline gap-3">
          <span className="font-(--font-mono) text-xs font-semibold tracking-[0.22em] text-(--color-amber)">
            01
          </span>
          <h3
            id="servicos-video-heading"
            className="font-(--font-display) text-2xl sm:text-4xl font-extrabold tracking-tight text-(--color-cream)"
          >
            Produção de Vídeo
          </h3>
          <span className="ml-auto hidden text-xs font-(--font-mono) tracking-widest text-(--color-muted) uppercase sm:inline-block">
            Principal Frente
          </span>
        </div>

        <ul className="flex flex-col border-t border-(--color-line)">
          {servicosVideo.map((servico) => (
            <li
              key={servico.slug}
              className="group flex flex-col sm:flex-row sm:items-center justify-between border-b border-(--color-line) py-4 sm:py-5 gap-2 transition-colors hover:bg-(--color-surface)/40 px-2 -mx-2"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Traço âmbar: 16px -> 28px no hover, 180ms */}
                <div
                  aria-hidden="true"
                  className="h-0.5 w-4 bg-(--color-amber) shrink-0 transition-[width] duration-180 ease-out group-hover:w-7 motion-reduce:transition-none"
                />
                <span className="font-(--font-display) text-base sm:text-xl font-bold tracking-tight text-(--color-cream) group-hover:text-(--color-amber) transition-colors">
                  {servico.nome}
                </span>
              </div>

              {servico.detalhe && (
                <span className="pl-7 sm:pl-0 font-(--font-body) text-xs sm:text-sm text-(--color-muted) max-w-md sm:text-right">
                  {servico.detalhe}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 02 Fotografia (Peso secundário) */}
      <section className="flex flex-col gap-6" aria-labelledby="servicos-foto-heading">
        <div className="flex items-baseline gap-3">
          <span className="font-(--font-mono) text-xs font-semibold tracking-[0.22em] text-(--color-muted)">
            02
          </span>
          <h3
            id="servicos-foto-heading"
            className="font-(--font-display) text-xl sm:text-3xl font-bold tracking-tight text-(--color-cream-dim)"
          >
            Fotografia Corporativa
          </h3>
        </div>

        <ul className="flex flex-col border-t border-(--color-line)">
          {servicosFoto.map((servico) => (
            <li
              key={servico.slug}
              className="group flex flex-col sm:flex-row sm:items-center justify-between border-b border-(--color-line) py-3.5 sm:py-4 gap-2 transition-colors hover:bg-(--color-surface)/30 px-2 -mx-2"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Traço âmbar: 16px -> 28px no hover */}
                <div
                  aria-hidden="true"
                  className="h-0.5 w-4 bg-(--color-amber-dim) shrink-0 transition-[width] duration-180 ease-out group-hover:w-7 motion-reduce:transition-none"
                />
                <span className="font-(--font-display) text-sm sm:text-lg font-bold tracking-tight text-(--color-cream-dim) group-hover:text-(--color-cream) transition-colors">
                  {servico.nome}
                </span>
              </div>

              {servico.detalhe && (
                <span className="pl-7 sm:pl-0 font-(--font-body) text-xs sm:text-sm text-(--color-muted) max-w-md sm:text-right">
                  {servico.detalhe}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
