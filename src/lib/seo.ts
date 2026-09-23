export const SITE_URL = 'https://evisprodutora.com.br';
export const SITE_NAME = 'Evis Produtora';

// 60 (limite de <title> da SPEC §7) - " | Evis Produtora" (17 caracteres do template do layout).
export const MAX_PAGE_TITLE_LENGTH = 60 - ` | ${SITE_NAME}`.length;

export const META_DESCRIPTION_MAX_LENGTH = 158;

/**
 * Trunca um texto em um limite de caracteres respeitando fronteira de palavra.
 * Usado tanto para o segmento de <title> de cada rota quanto para meta description
 * (alvo: 120-158 caracteres, ver SPEC §7). Não preenche artificialmente textos
 * curtos — isso exigiria inventar conteúdo (RN-06).
 */
export function truncateText(text: string, maxLength: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();

  if (clean.length <= maxLength) {
    return clean;
  }

  const truncated = clean.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(' ');
  const safe = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return `${safe}…`;
}
