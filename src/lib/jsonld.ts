import type { Case } from '@/types/content';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

// Numero de WhatsApp usado como telefone de contato (unico numero de contato
// confirmado no projeto ate agora — ver WhatsAppCTA/Footer).
const TELEFONE = '+5591981109635';
const INSTAGRAM_URL = 'https://www.instagram.com/evisprodutora/';

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: TELEFONE,
    areaServed: 'BR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belém',
      addressRegion: 'PA',
      addressCountry: 'BR',
    },
    // Perfil da Empresa no Google entra aqui assim que existir (SPEC §12, T-053 🔒).
    sameAs: [INSTAGRAM_URL],
  };
}

export function getVideoObjectJsonLd(caseItem: Case) {
  if (!caseItem.youtubeId) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: caseItem.titulo,
    description: caseItem.desafio || caseItem.titulo,
    thumbnailUrl: `${SITE_URL}${caseItem.capa}`,
    uploadDate: `${caseItem.ano}-01-01`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${caseItem.youtubeId}`,
  };
}

export type BreadcrumbItem = {
  nome: string;
  path: string;
};

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.nome,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
