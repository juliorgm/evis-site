# Evis Produtora — Lista de Tasks

> Para execução por agente. Cada task tem escopo fechado, arquivos nomeados e critério de aceite verificável.
> Ler `SPEC.md` e `MANUAL-VISUAL.md` antes de começar. Não reabrir ADRs.

**Convenções:** uma task, um commit. Branch por sprint. PR gera preview na Vercel.
**Legenda de bloqueio:** 🔒 = depende de conteúdo do cliente (ver SPEC §12).

---

## Sprint 0 — Fundação

### T-001 · Inicializar o projeto
`pnpm create next-app@latest` — Next **16 LTS**, App Router, TypeScript strict, ESLint, Tailwind v4, `src/`, alias `@/*`.

Antes de configurar qualquer coisa, ler a doc do Next 16. Houve mudanças de API desde o 15 que a spec não cobre.

**Aceite:** `pnpm dev` sobe sem erro; `pnpm build` passa; `tsconfig` com `"strict": true`; `next` no `package.json` em `^16`.

### T-002 · Repositório e Vercel
Repo no GitHub, `main` protegida. Projeto na Vercel conectado. Preview por PR ativo.
**Aceite:** um PR de teste gera URL de preview funcionando.

### T-003 · Tokens da marca
Declarar em `src/app/globals.css`, bloco `@theme`, todos os tokens da seção 2 do manual visual.
**Aceite:** `--color-ground`, `--color-brand`, `--color-cream`, `--color-amber`, `--color-muted`, `--color-line`, `--color-cream-dim`, `--color-surface`, `--color-surface-2`, `--color-amber-dim` existem e estão em uso. Nenhuma cor literal em componente.

### T-004 · Fontes
`next/font/google`: Bricolage Grotesque (500/700/800), Chivo (400/500), DM Mono (500). Expor como variáveis CSS, aplicar no `<body>`.
**Aceite:** nenhum request para `fonts.googleapis.com` na aba Network. `font-display: swap`. CLS de fonte = 0.

### T-005 · Layout raiz
`src/app/layout.tsx` com `lang="pt-BR"`, `metadataBase`, metadata padrão, grão de filme como overlay global.
**Aceite:** `<html lang="pt-BR">` no HTML servido; overlay com `pointer-events: none`.

---

## Sprint 1 — Camada de conteúdo

### T-010 · Tipos
`src/types/content.ts` com `Case`, `Servico`, `Cliente`, `Depoimento` exatamente como SPEC §3.
**Aceite:** tipos exportados, sem `any`.

### T-011 · Leitor de conteúdo
`src/lib/content.ts`: `getCases()`, `getCaseBySlug()`, `getCasesDestaque()`, `getClientes()`, `getServicos()`. Lê MDX de `content/cases/`, valida o frontmatter com Zod.
**Aceite:** frontmatter inválido quebra o **build**, não o runtime. Esta é a única camada que conhece a origem dos dados — trocá-la por um CMS não pode exigir mudar componente algum (ADR-02).

### T-012 · Conteúdo de exemplo
Três cases fictícios **claramente marcados** (`cliente: "[EXEMPLO] ..."`) para desenvolver antes do material real chegar.
**Aceite:** removidos antes do deploy de produção. Criar issue de lembrete.

### T-013 · Serviços e clientes
`content/servicos.ts` com a taxonomia de SPEC §4, literal. `content/clientes.ts` com o campo `autorizado`.
**Aceite:** `getClientes()` nunca retorna item com `autorizado: false` (RN-04).

---

## Sprint 2 — Componentes

Todos mobile-first. Nenhum texto de conteúdo literal dentro de componente.

### T-020 · `<Nav>`
Logo, links (Portfólio/Serviços/Sobre), CTA de WhatsApp. Mobile: logo + CTA.
**Aceite:** CTA visível em 390px; alvo ≥44px; navegável por teclado com foco visível.

### T-021 · `<Timecode>`
Marcador de seção: `00:0N` âmbar + rótulo + hairline.
**Aceite:** props `numero` e `rotulo`; numeração sequencial na página.

### T-022 · `<VideoFrame>`
Facade de player: capa + botão de play; só monta o iframe do YouTube no clique (ADR-03).
**Aceite:** nenhum request para youtube.com antes do clique; dispara `play_video` no GA4; `aria-label` no botão.

### T-023 · `<PhotoFrame>`
Mesma base visual, marcador de cruz. **Sem play.**
**Aceite:** nenhum ícone de play no DOM.

### T-024 · `<ServicoLista>`
Famílias numeradas com itens separados por hairline e traço âmbar. Vídeo com peso maior que Fotografia.
**Aceite:** renderiza a partir de `getServicos()`; hover cresce o traço; respeita `prefers-reduced-motion`.

### T-025 · `<LogoGrid>`
Grade de logos. 3 colunas no mobile, 6 no desktop.
**Aceite:** só logos autorizados; `alt` com o nome do cliente.

### T-026 · `<Stats>`
Três números. Valores vêm de `content/stats.ts`, nunca literais (RN-06).
**Aceite:** nenhum número hardcoded em JSX.

### T-027 · `<WhatsAppCTA>`
Botão reutilizável. Prop obrigatória `origem`. Monta o link de RN-02 e dispara `clique_whatsapp`.
**Aceite:** `origem` é obrigatória no tipo — esquecer não compila. Texto `--color-ground` sobre âmbar.

### T-028 · `<Footer>`
Logo, cidade, Instagram, telefone.
**Aceite:** links reais, sem `href="#"`.

---

## Sprint 3 — Páginas

### T-030 · Home
Monta na ordem: Nav · Hero · Logos · Serviços · Números · Sobre · CTA · Footer.

Copy aprovada, literal:
- H1: **"Produção Audiovisual que dá resultado, não vaidade."** (*resultado* em âmbar)
- H2 de serviços: **"Duas frentes, um objetivo."**
- Sem seção de depoimento (ADR-06) — deixar o lugar reservado com comentário

**Aceite:** confere com `evis-home-v2.png`; Lighthouse mobile ≥90; sem scroll horizontal em 390px.

### T-031 · `/portfolio`
Grade de cases, capa + cliente + categoria. Vídeo e foto juntos.
**Aceite:** SSG; link para cada case.

### T-032 · `/portfolio/[slug]`
Vídeo no topo, ficha (entrega/prazo/formato), "O desafio", "O que fizemos", stills, CTA.
**Aceite:** `generateStaticParams`; 404 para slug inexistente; CTA com `origem="case-<slug>"`.

### T-033 · OG image por case
`opengraph-image.tsx` com a capa e o nome do cliente.
**Aceite:** preview correto no validador do WhatsApp e do LinkedIn.

---

## Sprint 4 — SEO

### T-040 · Metadata por rota
`title` único ≤60, `description` 120–158, `openGraph`, canônica.
**Aceite:** nenhuma página com title duplicado.

### T-041 · Sitemap e robots
`app/sitemap.ts` e `app/robots.ts` gerados a partir de `getCases()`.
**Aceite:** sitemap lista todas as rotas estáticas; robots aponta para ele.

### T-042 · JSON-LD
`LocalBusiness` na home, `VideoObject` nos cases com vídeo, `BreadcrumbList` nas internas.
**Aceite:** Rich Results Test do Google sem erro.

### T-043 · Semântica e acessibilidade
Um `<h1>` por página, hierarquia sem pulo, `alt` em toda imagem, foco visível.
**Aceite:** Lighthouse Acessibilidade e SEO = 100; axe sem violação crítica.

---

## Sprint 5 — Medição

### T-050 · GA4
`@next/third-parties/google`. ID em variável de ambiente.
**Aceite:** pageview no relatório em tempo real; ID fora do código.

### T-051 · Eventos
`clique_whatsapp`, `clique_telefone`, `play_video`, `ver_case`, todos com `origem`.
**Aceite:** os quatro aparecem no DebugView, testados no celular.

### T-052 · Search Console 🔒
Propriedade de domínio, verificação por DNS, sitemap submetido.
**Aceite:** propriedade verificada, sitemap com status "Sucesso".

### T-053 · Perfil da Empresa no Google 🔒
Criar, verificar, categorias, horário, serviços, 20+ fotos. Link do site com UTM de GBP.
**Aceite:** perfil verificado; UTM conferida no GA4.

---

## Sprint 6 — Fechamento

### T-060 · Conteúdo real 🔒
Substituir os exemplos pelos 6 cases reais. Remover tudo marcado `[EXEMPLO]`.
**Aceite:** `grep -r "EXEMPLO" content/` não retorna nada.

### T-061 · Autorizações 🔒
Confirmar por escrito, com o Jeff, autorização de cada vídeo e cada logo (RN-04, RN-05).
**Aceite:** campo `autorizado: true` em todo case publicado, com registro da confirmação.

### T-062 · Performance
Otimizar até bater o orçamento de SPEC §9.
**Aceite:** LCP ≤2,5s, CLS ≤0,05, JS ≤120KB gzip, Performance ≥90 no Lighthouse mobile.

### T-063 · Teste em aparelho real
Abrir num Android de gama média no 4G. Ler o hero. Clicar no WhatsApp. Dar play num vídeo.
**Aceite:** os três funcionam; o WhatsApp abre com a mensagem pré-preenchida certa.

### T-064 · Domínio e produção 🔒
Apontar DNS, HTTPS, redirect de `www`, deploy na `main`.
**Aceite:** domínio resolve com HTTPS; 200 na home.

### T-065 · Entrega ao cliente
Vídeo curto (3–5min) mostrando ao Jeff onde ele acompanha resultado: GA4, Perfil da Empresa e a planilha de CRM.
**Aceite:** Jeff confirma que entendeu.

---

## Fora do escopo da fase 1

Não fazer, mesmo que pareça rápido: CMS, depoimentos, páginas internas de serviço, página Sobre dedicada, blog, formulário de contato, área de cliente, multi-idioma, campanha de Google Ads.
