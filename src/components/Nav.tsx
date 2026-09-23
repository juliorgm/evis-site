'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WhatsAppCTA } from './WhatsAppCTA';

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--color-line) bg-(--color-ground)/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-6 sm:px-14">
        {/* Logo */}
        <Link
          href="/"
          className="group flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-amber)"
          aria-label="Evis Produtora - Página Inicial"
        >
          <span className="font-(--font-display) text-2xl font-extrabold tracking-tight text-(--color-cream)">
            E<span className="text-(--color-amber)">v</span>is
          </span>
          <span className="font-(--font-mono) text-[10px] tracking-[0.22em] uppercase text-(--color-muted) -mt-1">
            PRODUTORA
          </span>
        </Link>

        {/* Desktop Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          aria-label="Navegação principal"
        >
          <Link
            href="/portfolio"
            className="text-(--color-cream-dim) transition-colors hover:text-(--color-cream) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-amber)"
          >
            Portfólio
          </Link>
          <Link
            href="#servicos"
            className="text-(--color-cream-dim) transition-colors hover:text-(--color-cream) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-amber)"
          >
            Serviços
          </Link>
          <Link
            href="#sobre"
            className="text-(--color-cream-dim) transition-colors hover:text-(--color-cream) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-amber)"
          >
            Sobre
          </Link>
        </nav>

        {/* Right side: WhatsApp CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <WhatsAppCTA origem="nav" tamanho="sm" className="h-10 text-xs sm:text-sm">
            Falar no WhatsApp
          </WhatsAppCTA>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-[2px] border border-(--color-line) bg-(--color-surface) text-(--color-cream) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-amber)"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menu móvel"
          className="md:hidden border-b border-(--color-line) bg-(--color-surface) px-6 py-6"
        >
          <ul className="flex flex-col gap-4 text-base font-medium">
            <li>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-(--color-cream) transition-colors hover:text-(--color-amber) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-amber)"
              >
                Portfólio
              </Link>
            </li>
            <li>
              <Link
                href="#servicos"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-(--color-cream) transition-colors hover:text-(--color-amber) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-amber)"
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                href="#sobre"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-(--color-cream) transition-colors hover:text-(--color-amber) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-amber)"
              >
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
