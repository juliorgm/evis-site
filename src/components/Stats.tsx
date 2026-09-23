import React from 'react';
import type { Stat } from '@/types/content';

export type StatsProps = {
  stats: Stat[];
  className?: string;
};

export function Stats({ stats, className = '' }: StatsProps) {
  return (
    <dl
      className={`grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 ${className}`}
    >
      {stats.map((stat) => (
        <div key={stat.rotulo} className="flex flex-col gap-2">
          <dt className="sr-only">{stat.rotulo}</dt>
          <dd className="font-(--font-display) text-4xl font-extrabold tracking-tight text-(--color-amber) sm:text-5xl">
            {stat.valor}
          </dd>
          <dd className="max-w-[26ch] font-(--font-body) text-sm text-(--color-muted) sm:text-base">
            {stat.rotulo}
          </dd>
        </div>
      ))}
    </dl>
  );
}
