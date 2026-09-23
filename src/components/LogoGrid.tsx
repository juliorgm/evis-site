import React from 'react';
import Image from 'next/image';
import type { Cliente } from '@/types/content';

export type LogoGridProps = {
  clientes: Cliente[];
  className?: string;
};

export function LogoGrid({ clientes, className = '' }: LogoGridProps) {
  return (
    <ul
      className={`grid grid-cols-3 gap-6 sm:gap-8 md:grid-cols-6 ${className}`}
      aria-label="Clientes atendidos"
    >
      {clientes.map((cliente) => (
        <li
          key={cliente.nome}
          className="flex items-center justify-center border border-(--color-line) bg-(--color-surface) p-4 sm:p-6 transition-colors hover:bg-(--color-surface-2)"
        >
          <Image
            src={cliente.logo}
            alt={cliente.nome}
            width={120}
            height={48}
            className="h-8 w-auto object-contain opacity-80 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0 sm:h-10"
          />
        </li>
      ))}
    </ul>
  );
}
