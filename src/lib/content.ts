import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { clientes as clientesData } from '@/../content/clientes';
import { servicos as servicosData } from '@/../content/servicos';
import { stats as statsData } from '@/../content/stats';
import type { Case, Cliente, Servico, Stat } from '@/types/content';

const CaseFrontmatterSchema = z.object({
  slug: z.string().min(1, 'Slug é obrigatório'),
  titulo: z.string().min(1, 'Título é obrigatório'),
  cliente: z.string().min(1, 'Cliente é obrigatório'),
  setor: z.string().min(1, 'Setor é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  ano: z.number().int().positive('Ano inválido'),
  familia: z.enum(['video', 'foto'], {
    message: "Família deve ser 'video' ou 'foto'",
  }),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  youtubeId: z.string().nullable(),
  capa: z.string().min(1, 'Capa é obrigatória'),
  stills: z.array(z.string()),
  entrega: z.string().min(1, 'Entrega é obrigatória'),
  prazo: z.string().min(1, 'Prazo é obrigatório'),
  destaque: z.boolean(),
  ordem: z.number().int(),
  autorizado: z.boolean().default(true),
});

const CASES_DIRECTORY = path.join(process.cwd(), 'content', 'cases');

function parseCaseBody(rawContent: string) {
  const desafioMatch = rawContent.match(/## O desafio\s+([\s\S]*?)(?=\n## |$)/);
  const oQueFizemosMatch = rawContent.match(/## O que fizemos\s+([\s\S]*?)(?=\n## |$)/);

  return {
    desafio: desafioMatch ? desafioMatch[1].trim() : '',
    oQueFizemos: oQueFizemosMatch ? oQueFizemosMatch[1].trim() : '',
  };
}

export function getCases(): Case[] {
  if (!fs.existsSync(CASES_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(CASES_DIRECTORY).filter((file) => file.endsWith('.mdx'));

  const cases = fileNames.map((fileName) => {
    const fullPath = path.join(CASES_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const validationResult = CaseFrontmatterSchema.safeParse(data);
    if (!validationResult.success) {
      const errors = validationResult.error.format();
      throw new Error(
        `[BUILD ERROR] Erro de validação no frontmatter do case "${fileName}":\n${JSON.stringify(errors, null, 2)}`
      );
    }

    const frontmatter = validationResult.data;
    const { desafio, oQueFizemos } = parseCaseBody(content);

    const caseItem: Case = {
      ...frontmatter,
      desafio,
      oQueFizemos,
      content,
    };

    return caseItem;
  });

  return cases
    .filter((c) => c.autorizado)
    .sort((a, b) => a.ordem - b.ordem);
}

export function getCaseBySlug(slug: string): Case | undefined {
  const allCases = getCases();
  return allCases.find((c) => c.slug === slug);
}

export function getCasesDestaque(): Case[] {
  const allCases = getCases();
  return allCases.filter((c) => c.destaque);
}

export function getClientes(): Cliente[] {
  // RN-04: Renderiza apenas autorizado: true
  return clientesData.filter((cliente) => cliente.autorizado);
}

export function getServicos(): Servico[] {
  return servicosData;
}

export function getStats(): Stat[] {
  return statsData;
}
