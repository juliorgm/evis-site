import React from 'react';

export type TimecodeProps = {
  numero: string;
  rotulo: string;
  className?: string;
  /**
   * Quando a seção não tem outro heading próprio, renderiza o rótulo como
   * `h2`/`h3` (mantendo o estilo visual) para não deixar a seção sem
   * marcação semântica (T-043). O padrão é `span` — decorativo, usado
   * quando já existe um heading real logo em seguida.
   */
  as?: 'span' | 'h2' | 'h3';
};

export function Timecode({ numero, rotulo, className = '', as = 'span' }: TimecodeProps) {
  const rotuloClassName =
    'font-(--font-mono) text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-(--color-muted) uppercase shrink-0';

  const RotuloTag = as;

  return (
    <div
      className={`flex items-center gap-3 w-full select-none ${className}`}
      aria-label={as === 'span' ? `Seção ${numero}: ${rotulo}` : undefined}
    >
      <span className="font-(--font-mono) text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-(--color-amber) shrink-0">
        {numero}
      </span>
      <RotuloTag className={rotuloClassName}>{rotulo}</RotuloTag>
      <div className="h-px flex-1 bg-(--color-line)" aria-hidden="true" />
    </div>
  );
}
