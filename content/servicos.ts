import type { Servico } from '@/types/content';

export const servicos: Servico[] = [
  // Vídeo
  {
    familia: 'video',
    nome: 'Vídeo Institucional',
    detalhe: 'Apresentação da empresa, processos e estrutura com foco em conversão e autoridade',
    slug: 'institucional',
  },
  {
    familia: 'video',
    nome: 'Branding',
    detalhe: 'Filmes conceituais de fortalecimento e posicionamento de marca',
    slug: 'branding',
  },
  {
    familia: 'video',
    nome: 'Cobertura de Eventos',
    detalhe: 'Corporativos, inauguração, ações de vendas e sociais',
    slug: 'cobertura-de-eventos',
  },
  {
    familia: 'video',
    nome: 'Conteúdo para Redes Sociais',
    detalhe: 'Cortes rápidos, reels e formatos estratégicos para distribuição digital',
    slug: 'conteudo-redes-sociais',
  },

  // Fotografia
  {
    familia: 'foto',
    nome: 'Cobertura Fotográfica Corporativa',
    detalhe: 'Registro fotográfico editorial de eventos, congressos e convenções',
    slug: 'cobertura-fotografica-corporativa',
  },
  {
    familia: 'foto',
    nome: 'Ensaio para Empresas',
    detalhe: 'Retratos executivos, equipe em set e rotina operacional',
    slug: 'ensaio-para-empresas',
  },
  {
    familia: 'foto',
    nome: 'Esportes',
    detalhe: 'Cobertura de alta performance e registros de competições esportivas',
    slug: 'esportes',
  },
];
