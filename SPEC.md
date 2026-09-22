# Evis Produtora — Especificação do Projeto

> Fonte da verdade. Toda decisão de implementação sai daqui.
> Se o código divergir deste documento, o documento está errado e deve ser corrigido primeiro.

**Versão:** 1.0 · 22/09/2026
**Cliente:** Evis Produtora — Belém/PA, atende todo o Brasil
**Responsável técnico:** Júlio
**Prazo alvo:** site no ar em 1 mês

---

## 1. Contexto

A Evis é uma produtora de foto e vídeo. O carro-chefe é **vídeo institucional para empresas**; o cliente ideal são PMEs e agências de marketing. Ticket médio R$ 1.500–3.000, sem preço publicado.

Dados do briefing que definem o projeto:

| Fato | Consequência no produto |
|---|---|
| Fecha 3–5 trabalhos/mês, aguenta 6–10 | Existe capacidade ociosa real. O site precisa gerar contato, não só existir. |
| "Resultado" = **chamada no WhatsApp** | WhatsApp é a conversão principal. Não formulário longo. |
| "Ticket alto dificilmente se vende sozinho; fecha depois de uma conversa" | O site **inicia conversa**, não fecha venda. Nada de checkout, nada de funil longo. |
| Não tem Perfil da Empresa no Google | Tarefa de maior retorno por esforço no curto prazo. Gratuita. |
| +20 vídeos completos, centenas de fotos | Matéria-prima existe. Cases são o ativo de SEO. |
| Atende "Brasil" | SEO local tem peso menor; ainda assim vale, por credibilidade. |

**Objetivo de negócio:** aumentar o volume de conversas qualificadas no WhatsApp, a ponto de ocupar a capacidade ociosa.

**Não-objetivo:** vender online, exibir preço, captar e-mail para newsletter, blog na fase 1.

---

## 2. Decisões de arquitetura

Cada decisão registra a alternativa descartada e o porquê. Um agente executando este projeto **não deve reabrir** estas decisões sem autorização.

### ADR-01 — Next.js (App Router), não React puro

**Decisão:** Next.js **16 (LTS)**, App Router, TypeScript.

**Versão conferida em 22/09/2026:** 16.3.5, lançada em 11/09/2026. O Next 15 sai de suporte em **21/10/2026** — antes do site ir ao ar. Nascer nele seria começar em dívida.

⚠️ **Para quem executa:** ler a documentação e o guia de upgrade do Next 16 antes de escrever configuração. Houve mudanças de API entre 15 e 16 (params assíncronos, defaults de cache, Turbopack) que esta spec não detalha. Não confiar na memória de nenhum agente para assinatura de API — conferir na fonte.

**Motivo:** o projeto tem SEO como requisito de primeira classe. React puro (Vite/CRA) entrega um HTML vazio que depende de JS para renderizar — o Google até processa, mas com atraso e perda. Next gera HTML estático no build (SSG), com `metadata` nativo, `sitemap.ts`, `robots.ts` e `next/image`.

**Alternativa descartada:** Vite + React SPA. Mais simples de começar, ruim para o requisito principal.

**Nota:** "usar React" continua verdade — Next *é* React.

**Regra geral de versões:** todo número de versão neste documento tem data de verificação. Na hora de executar, conferir se ainda é a corrente. Documento envelhece; registro do repositório, não.

### ADR-02 — Estático na fase 1, com o conteúdo já estruturado

**Esta é a resposta à pergunta "estático agora ou CMS logo?".**

**Decisão:** sem CMS na fase 1. Mas o conteúdo **não fica hardcoded no JSX** — vive em arquivos de dados tipados, lidos por uma camada de acesso isolada.

**Motivo:** o custo de migrar para um CMS depois não é definido por "ter CMS ou não". É definido por o conteúdo estar **estruturado** ou **espalhado pelo JSX**.

- Conteúdo em `content/cases/*.mdx` + `lib/content.ts` → trocar por CMS depois é reescrever **uma função**. Cerca de um dia.
- Conteúdo dentro dos componentes → migração é reescrita. Semanas.

Somado a isso: o Jeff vai escolher os vídeos e imagens agora, manualmente. Ele não vai editar semanalmente. Montar CMS antes de existir conteúdo é construir a estante antes de ter os livros.

**Regra vinculante:** nenhum texto de case, serviço ou depoimento pode aparecer literal dentro de um componente `.tsx`. Componentes recebem dados via props, sempre.

**Caminho da fase 2:** Decap CMS ou Tina, ambos git-based, lendo os **mesmos** arquivos MDX. Sem mudar o shape dos dados, sem mudar os componentes.

### ADR-03 — Vídeo no YouTube, nunca no repositório

**Decisão:** todo vídeo vive em canal próprio do YouTube (não listado ou público). O site guarda apenas o ID.

**Motivo:** elimina armazenamento, banda, transcodificação e custo. Ganha o YouTube como canal de busca por conta própria. Mantém o site leve — requisito de performance mobile.

**Implementação:** *facade* de player (thumbnail + botão que só carrega o iframe no clique). O iframe do YouTube custa ~500KB e vários requests; carregar isso no load inicial destrói o LCP no 4G.

### ADR-04 — Tailwind CSS v4 com tokens da marca

**Decisão:** Tailwind v4, com os tokens da marca declarados como variáveis CSS em `@theme`.

**Motivo:** velocidade para um dev solo. O risco de "cara de template Tailwind" é neutralizado porque o design já está definido e documentado em `MANUAL-VISUAL.md` — Tailwind aqui é só o mecanismo, não a fonte do estilo.

**Regra vinculante:** proibido usar cor, espaçamento ou tamanho de fonte fora dos tokens. Nada de `text-gray-500`, nada de `bg-[#2a2a2a]`.

### ADR-05 — Vercel

**Decisão:** deploy na Vercel, conectado ao GitHub. Preview por PR, produção na `main`.

**Motivo:** caminho nativo do Next. Preview automático serve para o Jeff aprovar antes de subir.

### ADR-06 — Sem depoimentos na fase 1

**Decisão:** a seção de depoimento sai do escopo da fase 1, por pedido do cliente.

**Consequência:** a prova social da fase 1 fica sobre **logos de clientes** e **números**. O lugar da seção fica reservado no layout e na estrutura de dados (`content/depoimentos/` existe vazio), para entrar na fase 2 sem refatoração.

---

## 3. Modelo de conteúdo

Quatro tipos. Este é o contrato que a fase 2 vai herdar.

### `Case` — `content/cases/<slug>.mdx`

```yaml
---
slug: "nome-do-cliente"          # único, kebab-case, vira a URL
titulo: "Nome do cliente"
cliente: "Razão social ou nome fantasia"
setor: "Construção civil"        # usado em SEO e filtro futuro
cidade: "Belém"
ano: 2026
familia: "video"                 # "video" | "foto"
categoria: "institucional"       # ver taxonomia na seção 4
youtubeId: "dQw4w9WgXcQ"         # null quando for case só de foto
capa: "/images/cases/<slug>/capa.jpg"
stills: ["/images/cases/<slug>/01.jpg", "..."]
entrega: "Filme 3min + cortes"
prazo: "3 semanas"
destaque: true                   # aparece na home
ordem: 1
---

## O desafio
[markdown]

## O que fizemos
[markdown]
```

### `Servico` — `content/servicos.ts`

Lista fixa, tipada. Não muda com frequência, não merece arquivo por item.

```ts
type Servico = {
  familia: 'video' | 'foto'
  nome: string
  detalhe?: string      // a linha pequena ao lado
  slug: string          // vira /servicos/<slug> na fase 2
}
```

### `Cliente` — `content/clientes.ts`

```ts
type Cliente = { nome: string; logo: string; autorizado: boolean }
```

`autorizado: false` não renderiza. Protege contra publicar logo de quem não liberou.

### `Depoimento` — `content/depoimentos/` *(fase 2, diretório vazio na fase 1)*

```ts
type Depoimento = { texto: string; nome: string; cargo: string; empresa: string; caseSlug?: string }
```

---

## 4. Taxonomia de serviços

Definida pelo cliente. **Não inventar categorias.**

**Vídeo**
- Institucional
- Branding
- Cobertura de eventos — *corporativos, inauguração, ações de vendas e sociais*
- Conteúdo para redes sociais

**Fotografia**
- Cobertura fotográfica corporativa
- Ensaio para empresas
- Esportes

---

## 5. Rotas

| Rota | Fase | Renderização | Observação |
|---|---|---|---|
| `/` | 1 | SSG | Home |
| `/portfolio` | 1 | SSG | Grade de cases |
| `/portfolio/[slug]` | 1 | SSG + `generateStaticParams` | Página de case — o ativo de SEO |
| `/servicos` | 2 | SSG | |
| `/servicos/[slug]` | 2 | SSG | Páginas de captura de busca |
| `/sobre` | 2 | SSG | |
| `/sitemap.xml`, `/robots.txt` | 1 | gerado | |

**Menu da fase 1:** Portfólio · Serviços · Sobre — "Serviços" e "Sobre" apontam para âncoras da home enquanto as páginas não existem.

---

## 6. Regras de negócio

**RN-01 — WhatsApp é a conversão.** Todo CTA principal abre `wa.me`. Nenhum formulário na fase 1.

**RN-02 — Rastreamento de origem no WhatsApp.** O link carrega mensagem pré-preenchida que identifica a origem:

```
https://wa.me/5591981109635?text=Ol%C3%A1!%20Vim%20pelo%20site%20({origem})
```

`{origem}` = `home-topo`, `home-final`, `case-<slug>`, `servicos`. Sem isso a origem do lead se perde e o CRM não fecha a conta.

**RN-03 — Sem preço.** Nenhum valor publicado, em nenhuma página.

**RN-04 — Logo só com autorização.** Renderiza apenas `autorizado: true`.

**RN-05 — Vídeo de cliente só com autorização.** Antes de publicar, confirmar que o contrato permite. Registrar em `content/cases/<slug>.mdx` no campo `autorizado`.

**RN-06 — Nada de número inventado.** "+20 filmes" veio do briefing. Qualquer estatística nova precisa de origem confirmada com o cliente.

**RN-07 — Depoimento não se fabrica.** Só entra com nome, cargo e empresa reais, autorizados.

---

## 7. SEO

**Requisito, não enfeite.** Mas com expectativa calibrada: "produtora de vídeo institucional" tem volume de busca baixo. SEO aqui traz poucos visitantes de alta intenção — não vai encher a agenda sozinho. Vale porque é gratuito e permanente.

### Obrigatório na fase 1

- `metadata` por rota: `title` único ≤60 caracteres, `description` 120–158, `openGraph`, `twitter`
- `metadataBase` configurado, canônicas em todas as páginas
- `app/sitemap.ts` e `app/robots.ts` gerados a partir do conteúdo
- **JSON-LD:**
  - `LocalBusiness` na home (nome, telefone, área de atuação, `sameAs` para Instagram e Perfil do Google)
  - `VideoObject` em cada case com vídeo (`name`, `description`, `thumbnailUrl`, `uploadDate`, `embedUrl`)
  - `BreadcrumbList` nas páginas internas
- `<html lang="pt-BR">`
- Um `<h1>` por página, hierarquia sem pular nível
- `alt` descritivo em toda imagem — é SEO e acessibilidade na mesma linha
- OG image por case (`opengraph-image.tsx`)

### Search Console

Propriedade de domínio, verificada por DNS. Sitemap submetido. Conferir cobertura na primeira semana.

---

## 8. Medição

O painel é a planilha de CRM que já existe. O site alimenta ela.

**GA4** via `@next/third-parties/google`.

Eventos de conversão:

| Evento | Dispara | Conversão no Ads |
|---|---|---|
| `clique_whatsapp` | clique em qualquer CTA de WhatsApp | sim |
| `clique_telefone` | clique no telefone | sim |
| `play_video` | play em um case | não, só análise |
| `ver_case` | entrada em `/portfolio/[slug]` | não |

Parâmetro `origem` em todos, batendo com RN-02.

**Perfil da Empresa no Google:** criar, verificar, preencher categorias e horários, subir 20+ fotos. Link do site com UTM: `?utm_source=google&utm_medium=organic&utm_campaign=gbp` — sem isso o GA4 conta como orgânico e o mapa some do relatório.

**Google Ads:** fora do escopo desta fase. A recomendação registrada é *não* subir campanha agora — volume de busca baixo e metade do cliente ideal (agências) não procura produtora no Google. Reavaliar com dados do Search Console após 90 dias.

---

## 9. Orçamento de performance

Mobile é o alvo. Medir no Lighthouse mobile, 4G simulado.

| Métrica | Teto |
|---|---|
| LCP | ≤ 2,5s |
| CLS | ≤ 0,05 |
| INP | ≤ 200ms |
| JS na home (first load) | ≤ 120KB gzip |
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO / Best Practices | 100 |

Regras que sustentam isso: fontes via `next/font` (self-hosted, `display: swap`, sem request ao Google); imagens via `next/image` com `sizes` correto e AVIF/WebP; `priority` só na imagem do hero; facade de vídeo (ADR-03); zero biblioteca de animação na fase 1 — CSS puro.

---

## 10. Acessibilidade

WCAG 2.1 AA como piso.

- Contraste de texto ≥ 4.5:1 (≥ 3:1 acima de 24px). Os pares aprovados estão no manual visual — **não** improvisar cor nova.
- Alvo de toque ≥ 44×44px
- `<button>` e `<a href>` reais. Nunca `onClick` em `div`.
- Foco visível, com `:focus-visible`
- `aria-label` em botão só de ícone
- `prefers-reduced-motion` respeitado
- Navegável inteiro por teclado

---

## 11. Fases

**Fase 1 — no ar em 1 mês.** Home, portfólio, página de case, SEO completo, GA4, Search Console, Perfil da Empresa. Conteúdo estático estruturado.

**Fase 2.** Depoimentos, páginas de serviço, página Sobre, CMS git-based sobre os mesmos arquivos.

**Fase 3.** Blog/conteúdo se o Search Console mostrar demanda. Reavaliação de mídia paga com dados reais.

---

## 12. Pendências com o cliente

Bloqueiam a fase 1:

- [ ] Reel principal escolhido (o vídeo do topo)
- [ ] 6 cases selecionados, com vídeo, fotos e autorização de publicação
- [ ] Logos dos clientes autorizados
- [ ] Foto da equipe em set
- [ ] Domínio definido e comprado
- [ ] Acesso à conta Google que vai administrar Analytics, Search Console e Perfil da Empresa
