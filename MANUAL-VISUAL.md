# Evis Produtora — Manual Visual

> Layout aprovado pelo cliente em 22/09/2026.
> Este documento é normativo. Valor visual que não estiver aqui não entra no código.

---

## 1. Direção

**Nome da direção:** *Sala de projeção* — escuro **quente**, não o preto neutro de produtora.

**Âncora de diferenciação:** o fundo é o marrom da própria logo (`#3A1A01` e derivados), não preto. Todo concorrente direto — CB2B Films, Destaquei, Lucas Allegretto — é preto ou cinza neutro. A Evis ser a marrom é reconhecimento visual de graça. Segundo marcador: os títulos de seção são **timecodes** (`00:00`, `00:01`, `00:02`), vocabulário de edição de vídeo.

**Teste:** com a logo apagada, a página ainda é identificável pelo marrom quente e pelos timecodes.

**DFII 13** — impacto 4, fit 5, viabilidade 4, performance 4, risco de consistência 2.

---

## 2. Cores

Tokens em `@theme` do Tailwind v4. **Nenhuma cor fora desta tabela.**

| Token | Hex | Uso |
|---|---|---|
| `--color-ground` | `#170A00` | Fundo da página |
| `--color-surface` | `#251103` | Caixas elevadas |
| `--color-surface-2` | `#321906` | Cabeçalhos de bloco |
| `--color-brand` | `#3A1A01` | Marrom exato da logo — molduras de vídeo |
| `--color-cream` | `#F6F2E7` | Texto principal, creme da logo |
| `--color-cream-dim` | `#DCCDB8` | Texto de apoio sobre fundo escuro |
| `--color-amber` | `#F38627` | Laranja da logo — acento único |
| `--color-amber-dim` | `#B8641A` | Bordas e estados |
| `--color-muted` | `#A28A6A` | Texto secundário |
| `--color-line` | `#3E2409` | Hairlines e divisores |

### Contraste — pares verificados

Valores calculados, não estimados.

| Par | Razão | Veredito |
|---|---|---|
| `cream` sobre `ground` | **17,39** | AA/AAA |
| `cream-dim` sobre `ground` | **12,47** | AA/AAA |
| `amber` sobre `ground` | **7,64** | AA |
| `muted` sobre `ground` | **5,91** | AA |
| `cream` sobre `brand` | **14,14** | AA/AAA |
| `muted` sobre `brand` | **4,80** | AA (limite — não usar abaixo de 14px) |
| `ground` sobre `amber` | **7,64** | AA — **este é o botão** |
| `cream` sobre `amber` | **2,28** | ❌ **REPROVA — proibido** |

**Regra dura:** botão laranja leva texto `--color-ground`, nunca creme. O par creme-sobre-laranja é o erro mais fácil de cometer e o único que reprova.

### Acento

Um só: o laranja. Não introduzir segunda cor de acento. Semântica (erro, sucesso) não existe nesta fase — não há formulário.

---

## 3. Tipografia

Três famílias, via `next/font/google` (self-hosted no build, zero request externo).

| Papel | Família | Pesos | Por quê |
|---|---|---|---|
| Display | **Bricolage Grotesque** | 500, 700, 800 | Grotesca com largura óptica variável. Moderna sem ser Inter. |
| Corpo | **Chivo** | 400, 500 | Grotesca de leitura, mais quente que as neutras padrão. |
| Rótulo | **DM Mono** | 500 | Timecodes, eyebrows, microcópia. É o que dá o tom de sala de edição. |

**Proibido:** Inter, Roboto, Arial, system-ui como fonte de display.

### Escala — mobile primeiro

| Papel | Mobile | Desktop | Tracking | Line-height |
|---|---|---|---|---|
| H1 | 40px / 800 | 92px / 800 | −0,035em | 0,96 |
| H2 | 30px / 700 | 54px / 700 | −0,03em | 1,02 |
| H3 | 24px / 700 | 44px / 800 | −0,028em | 1,05 |
| Corpo grande | 16px | 18px | 0 | 1,55 |
| Corpo | 15px | 16px | 0 | 1,6 |
| Pequeno | 13,5px | 14,5px | 0 | 1,5 |
| Rótulo mono | 10px | 11px | +0,22em | uppercase |

Largura de leitura: máximo **62ch** em qualquer parágrafo corrido.

---

## 4. Espaçamento e grid

Ritmo base **4px**. Passos permitidos: 4, 8, 12, 16, 22, 32, 44, 64, 88, 112.

| | Mobile | Desktop |
|---|---|---|
| Gutter lateral | 22px | 56px |
| Largura máxima do conteúdo | — | 1240px |
| Espaço entre seções | 56px | 104px |
| Colunas | 1 | 12, gap 24px |

**Breakpoints:** `sm 640` · `md 768` · `lg 1024` · `xl 1280`. Projetar em 390px e subir a partir dali.

---

## 5. Componentes

### Nav
Logo à esquerda (`Evis` com o `v` em laranja, `PRODUTORA` em mono abaixo). Links no centro: **Portfólio · Serviços · Sobre**. Botão de WhatsApp à direita. Borda inferior `--color-line`.

No mobile: logo + botão de WhatsApp apenas. Links entram em menu. O botão nunca some.

### Marcador de seção (timecode)
`00:0N` em `--color-amber`, mono, seguido do rótulo em `--color-muted`, seguido de uma hairline que ocupa o resto da largura. Numeração sequencial na ordem da página.

### Moldura de vídeo
Fundo `--color-brand`, borda `--color-line`, com um gradiente radial de luz âmbar vindo de baixo (a "projeção"). Botão de play circular, 78px, borda creme a 55% de opacidade. Proporção 2.39:1 no hero, 16:9 nos cases.

**Moldura de foto** usa a mesma base, mas o marcador é uma cruz quadrada, **nunca um play**. Foto não tem play — erro já cometido uma vez.

### Lista de serviços
Filiação numerada (`01` Vídeo, `02` Fotografia) com título em display. Itens em linhas separadas por hairline, cada uma com um traço âmbar de 16px à esquerda. Detalhe secundário em `--color-muted`, na mesma linha, menor.

Peso assimétrico: o bloco de Vídeo é maior que o de Fotografia. Isso é intencional — reflete que vídeo puxa mais receita.

### Números
Três colunas, valor em display 800 na cor âmbar, rótulo em `--color-muted` abaixo, máximo 26ch.

### CTA de WhatsApp
Fundo `--color-amber`, texto `--color-ground`, peso 700, ícone do WhatsApp à esquerda, raio 2px. Altura mínima 44px. Aparece no topo, no fim de cada seção grande e no rodapé.

### Grão de filme
Overlay `feTurbulence` em SVG sobre a página inteira, opacidade 0,16, `pointer-events: none`. É o que impede o escuro de parecer chapado.

---

## 6. Movimento

Escasso e com propósito. Na fase 1:

- Uma entrada: hero aparece com fade + translateY de 12px, 500ms, `ease-out`. Uma vez, no load.
- Hover nos itens de serviço: o traço âmbar cresce de 16px para 28px, 180ms.
- Hover no play: borda vai de 55% para 100% de opacidade.

Nada mais. Sem parallax, sem reveal on scroll em cada bloco, sem biblioteca de animação. Tudo em CSS.

`prefers-reduced-motion: reduce` desliga tudo.

---

## 7. O que nunca fazer

- Texto creme sobre o laranja
- Play em moldura de fotografia
- Cor, espaçamento ou tamanho fora dos tokens
- Segunda cor de acento
- Emoji como ícone — SVG inline, sempre
- Card com sombra genérica em tudo: a elevação é para a moldura de vídeo, não para todo bloco
- Hero de `100vh` — o conteúdo precisa aparecer no primeiro frame
- Preço em qualquer lugar
