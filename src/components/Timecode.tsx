import React from 'react';

export type TimecodeProps = {
  numero: string;
  rotulo: string;
  className?: string;
};

export function Timecode({ numero, rotulo, className = '' }: TimecodeProps) {
  return (
    <div
      className={`flex items-center gap-3 w-full select-none ${className}`}
      aria-label={`Seção ${numero}: ${rotulo}`}
    >
      <span className="font-(--font-mono) text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-(--color-amber) shrink-0">
        {numero}
      </span>
      <span className="font-(--font-mono) text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-(--color-muted) uppercase shrink-0">
        {rotulo}
      </span>
      <div className="h-px flex-1 bg-(--color-line)" aria-hidden="true" />
    </div>
  );
}
