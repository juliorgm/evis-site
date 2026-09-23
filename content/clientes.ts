import type { Cliente } from '@/types/content';

export const clientes: Cliente[] = [
  {
    nome: 'Grupo Líder',
    logo: '/images/clientes/lider.svg',
    autorizado: true,
  },
  {
    nome: 'Hospital Porto Dias',
    logo: '/images/clientes/porto-dias.svg',
    autorizado: true,
  },
  {
    nome: 'Agência Conceito',
    logo: '/images/clientes/conceito.svg',
    autorizado: true,
  },
  {
    nome: 'Norte Engenharia',
    logo: '/images/clientes/norte-engenharia.svg',
    autorizado: true,
  },
  {
    nome: 'Belém Importados',
    logo: '/images/clientes/belem-importados.svg',
    autorizado: true,
  },
  {
    nome: 'Cliente Não Autorizado de Teste',
    logo: '/images/clientes/teste-bloqueado.svg',
    autorizado: false,
  },
];
