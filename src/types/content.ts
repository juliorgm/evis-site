export type Familia = 'video' | 'foto';

export type Case = {
  slug: string;
  titulo: string;
  cliente: string;
  setor: string;
  cidade: string;
  ano: number;
  familia: Familia;
  categoria: string;
  youtubeId: string | null;
  capa: string;
  stills: string[];
  entrega: string;
  prazo: string;
  destaque: boolean;
  ordem: number;
  autorizado: boolean;
  desafio?: string;
  oQueFizemos?: string;
  content: string;
};

export type Servico = {
  familia: Familia;
  nome: string;
  detalhe?: string;
  slug: string;
};

export type Cliente = {
  nome: string;
  logo: string;
  autorizado: boolean;
};

export type Depoimento = {
  texto: string;
  nome: string;
  cargo: string;
  empresa: string;
  caseSlug?: string;
};

export type Stat = {
  valor: string;
  rotulo: string;
};
