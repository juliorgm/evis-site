'use client';

import React from 'react';

export type WhatsAppCTAProps = {
  origem: string;
  texto?: string;
  className?: string;
  tamanho?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
};

export function WhatsAppCTA({
  origem,
  texto = 'Iniciar conversa no WhatsApp',
  className = '',
  tamanho = 'md',
  children,
}: WhatsAppCTAProps) {
  const message = `Olá! Vim pelo site (${origem})`;
  const href = `https://wa.me/5591981109635?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag('event', 'clique_whatsapp', {
        origem,
      });
    }
  };

  const tamanhoClasses = {
    sm: 'text-xs px-3 py-2 min-h-[44px]',
    md: 'text-sm px-5 py-3 min-h-[44px]',
    lg: 'text-base px-7 py-4 min-h-[48px]',
  }[tamanho];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`${children ? '' : texto} - Iniciar conversa no WhatsApp (origem: ${origem})`}
      className={`inline-flex items-center justify-center gap-2.5 font-bold tracking-tight bg-(--color-amber) text-(--color-ground) rounded-[2px] transition-colors hover:brightness-105 active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-amber) select-none ${tamanhoClasses} ${className}`}
    >
      <svg
        className="w-4 h-4 shrink-0 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1 .587 1.706.783 2.806.783 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.505-4.475 9.97-9.969 9.97-1.745 0-3.378-.454-4.801-1.246l-5.23 1.371 1.395-5.093c-.889-1.488-1.395-3.224-1.395-5.002 0-5.505 4.475-9.968 9.969-9.968 5.494 0 10.031 4.463 10.031 9.968z" />
      </svg>
      <span>{children ?? texto}</span>
    </a>
  );
}
