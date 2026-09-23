'use client';

import React from 'react';
import Link from 'next/link';

export type FooterProps = {
  className?: string;
};

const INSTAGRAM_URL = 'https://www.instagram.com/evisprodutora/';
const TELEFONE_DISPLAY = '(91) 98110-9635';
const TELEFONE_HREF = 'tel:+5591981109635';

export function Footer({ className = '' }: FooterProps) {
  const handleTelefoneClick = () => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag('event', 'clique_telefone', {
        origem: 'footer',
      });
    }
  };

  return (
    <footer
      className={`w-full border-t border-(--color-line) bg-(--color-surface) ${className}`}
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-14 sm:px-14 sm:py-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-amber)"
            aria-label="Evis Produtora - Página Inicial"
          >
            <span className="font-(--font-display) text-2xl font-extrabold tracking-tight text-(--color-cream)">
              E<span className="text-(--color-amber)">v</span>is
            </span>
            <span className="-mt-1 font-(--font-mono) text-[10px] uppercase tracking-[0.22em] text-(--color-muted)">
              PRODUTORA
            </span>
          </Link>

          <nav
            className="flex flex-wrap items-center gap-x-8 gap-y-3 font-(--font-body) text-sm text-(--color-cream-dim)"
            aria-label="Contato"
          >
            <span className="font-(--font-mono) text-xs uppercase tracking-[0.15em] text-(--color-muted)">
              Belém, PA
            </span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center transition-colors hover:text-(--color-amber) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-amber)"
            >
              Instagram
            </a>
            <a
              href={TELEFONE_HREF}
              onClick={handleTelefoneClick}
              className="inline-flex min-h-[44px] items-center transition-colors hover:text-(--color-amber) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-amber)"
            >
              {TELEFONE_DISPLAY}
            </a>
          </nav>
        </div>

        <div className="border-t border-(--color-line) pt-6">
          <p className="font-(--font-mono) text-[11px] tracking-wide text-(--color-muted)">
            © {new Date().getFullYear()} Evis Produtora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
