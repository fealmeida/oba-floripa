# Plano de migração: Vite/React → Next.js + Supabase

Este documento descreve o plano para migrar o repositório **oba-floripa** de Vite + React para **Next.js** (App Router) com **Supabase**, seguindo as boas práticas oficiais do Next.js e do guia [Migrating from Vite](https://nextjs.org/docs/app/building-your-application/upgrading/from-vite).

## Skill de referência: next-best-practices

**Durante a migração, seguir o skill do projeto:**

- **Caminho:** `.agents/skills/next-best-practices/`
- **Índice:** `SKILL.md` (visão geral de todos os tópicos)

**Para a interface admin (Fase 2B), usar também:**

- **Skill:** frontend-blueprint (`.cursor/skills/frontend-blueprint/SKILL.md`) — briefing, referências, direção de design, plano de execução e build atômico para manter a identidade visual do site.

**Para a integração Supabase e autenticação (Fases 3 e 5):**

- **Skill:** nextjs-supabase-auth (`.agents/skills/nextjs-supabase-auth/SKILL.md`) — uso de `@supabase/ssr`, middleware para rotas protegidas, auth callback, Server Actions para auth; evitar getSession em Server Components e tokens no client sem listener.

**Arquivos a consultar por tema (next-best-practices):**

| Tema | Arquivo | Uso na migração |
|------|---------|------------------|
| Estrutura e convenções | `file-conventions.md` | Pastas `app/`, arquivos especiais (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`), segmentos dinâmicos, pastas privadas `_components/` |
| Diretivas | `directives.md` | `'use client'` onde houver hooks/eventos/browser APIs; `'use server'` para Server Actions (ex.: submit do formulário de adoção) |
| Dados | `data-patterns.md` | Server Components para leitura (lista de animais); Server Actions para mutations (solicitação de adoção); evitar waterfalls |
| APIs assíncronas (Next 15+) | `async-patterns.md` | `params`, `searchParams`, `cookies()`, `headers()` assíncronos |
| Imagens | `image.md` | Usar `next/image` em vez de `<img>`, `remotePatterns`, `sizes`, blur |
| Fontes | `font.md` | `next/font` (Google Fonts / local), integração com Tailwind |
| Erros | `error-handling.md` | `error.tsx`, `not-found.tsx`, `redirect`, `notFound()` |
| Hidratação | `hydration-error.md` | Evitar `window`/datas/random no SSR; usar Client Components ou checagem `mounted` |
| Route Handlers | `route-handlers.md` | Quando usar `route.ts` vs Server Actions |
| Suspense | `suspense-boundaries.md` | `useSearchParams`/`usePathname` exigem Suspense boundary |

Ao implementar cada fase, conferir o arquivo correspondente para alinhar ao skill.

---

## Visão geral

| Atual | Destino |
|-------|---------|
| Vite 6 + React 18 | Next.js 15 (App Router) + React 19 |
| SPA (client-only) | SSR/SPA híbrido, preparado para Server Components |
| Sem backend | Supabase (PostgreSQL + Auth + Storage) |
| `src/app/` = pasta de componentes | `src/app/` = App Router (routes + layouts) |

**Boas práticas aplicadas:**

- **App Router** como único router; convenção de arquivos (`layout.tsx`, `page.tsx`).
- **Server Components** por padrão; **Client Components** apenas onde necessário (`'use client'`).
- **Colocation**: componentes próximos às rotas que os usam; componentes compartilhados em `components/`.
- **Alias `@/`** para imports absolutos a partir de `src/`.
- **Variáveis de ambiente** com prefixo `NEXT_PUBLIC_` para o que for exposto ao cliente; Supabase em `.env.local`.
- **Metadata API** do Next.js para título, descrição e SEO.

---

## Status atual (o que já foi feito × o que falta)

| Fase | Feito | Pendente |
|------|--------|----------|
| **1** | Next.js config, scripts, tsconfig, alias | — |
| **2** | App Router, layout, page, globals.css, componentes com `'use client'` onde necessário | — |
| **2B** | Layout admin, listagem com busca/filtros/excluir, **Novo animal**, **Editar animal** (formulários com mock) | — |
| **3** | Pacotes, client/server Supabase, types, `.env.example`, migrations e seed no repo; **`.env.local` preenchido** | — |
| **4** | Vite já removido (sem vite.config, index.html, main.tsx) | — |
| **5** | Listagem de animais do Supabase; formulário de adoção via **Server Action**; `next/image` em Navbar, Footer, AnimalList e **cards em Animals.tsx**; **`next/font`** (Syne + Space Grotesk); **Proteção do admin com Supabase Auth** | — |
| **Checklist final** | — | Validar `yarn dev` / `yarn build`, estilos, formulário, admin, sem hidratação |

Resumo: **Fases 1, 2, 2B, 3, 4 e 5 estão concluídas.** Falta apenas executar as validações do **checklist final**.

---

## Pré-requisitos

- [ ] Node.js 18.17+ (recomendado 20 LTS).
- [ ] **Yarn** (gerenciador de pacotes do projeto).
- [ ] Conta no [Supabase](https://supabase.com) (free tier).
- [ ] Backup do repositório (branch ou cópia) antes de começar.

---

## Fase 1: Configuração do Next.js

### 1.1 Instalar dependências

```bash
yarn add next@latest react@latest react-dom@latest
yarn add -D eslint-config-next@latest
```

Manter as dependências atuais (Tailwind, Radix, Motion, etc.) e remover apenas as específicas do Vite na Fase 4.

### 1.2 Criar `next.config.ts` (ou `next.config.mjs`)

Na raiz do projeto:

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Para manter comportamento SPA no início (opcional). Remover quando usar SSR/API routes.
  // output: 'export',

  // Alias já usado no Vite
  reactStrictMode: true,
  // Supabase e imagens externas (Unsplash, etc.)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/**' },
    ],
  },
}

export default nextConfig
```

### 1.3 TypeScript para Next.js

Criar ou atualizar `tsconfig.json` na raiz:

- `"moduleResolution": "bundler"` ou `"node16"`
- `"jsx": "preserve"`
- `"plugins": [{ "name": "next" }]`
- `"paths": { "@/*": ["./src/*"] }`
- `"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]`

Exemplo mínimo:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

Rodar `npx next dev` uma vez para gerar `next-env.d.ts`.

### 1.4 Scripts no `package.json`

Substituir/adicionar:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

Adicionar ao `.gitignore`:

```
.next
next-env.d.ts
```

---

## Fase 2: Estrutura do App Router

Convenção Next.js: **pastas = rotas**; `layout.tsx` e `page.tsx` definem layout e página.

### 2.1 Estrutura de pastas alvo

```
src/
├── app/
│   ├── layout.tsx          # Root layout (html, body, fonts, metadata)
│   ├── page.tsx             # Página inicial = conteúdo atual do App.tsx
│   ├── globals.css          # Estilos globais (importar fonts + tailwind + theme)
│   └── admin/               # Fase 2B: painel de edição de animais (antes do Supabase)
│       ├── layout.tsx       # Layout admin (identidade visual do site)
│       ├── page.tsx         # Listagem de animais
│       └── animals/
│           ├── novo/
│           │   └── page.tsx
│           └── [id]/
│               └── page.tsx # Edição
│   └── (depois)
│       └── api/              # Route Handlers se precisar
├── components/              # Componentes compartilhados (ex-app/components + ui)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Animals.tsx
│   ├── AdoptionProcess.tsx
│   ├── AdoptionModal.tsx
│   ├── Donations.tsx
│   ├── SocialProof.tsx
│   ├── Footer.tsx
│   ├── Illustrations.tsx
│   ├── figma/
│   └── ui/                  # shadcn/ui
├── lib/
│   └── supabase/
│       ├── client.ts        # createBrowserClient (uso no cliente)
│       ├── server.ts        # createServerClient (uso em Server Components/Actions)
│       └── types.ts         # Tipos gerados do Supabase (futuro)
└── styles/                  # Manter se quiser; ou mover conteúdo para app/globals.css
    └── fonts.css
```

Boas práticas:

- Uma única `page.tsx` na raiz (`app/page.tsx`) que renderiza o conteúdo atual da home (todas as seções).
- Root layout em `app/layout.tsx`: carrega CSS global, fontes e `metadata`; não colocar lógica pesada.
- Componentes que usam estado, event handlers ou browser APIs devem ter `'use client'` no topo (ex.: `Animals`, `AdoptionModal`, `Navbar` se tiver menu interativo).

### 2.2 Root layout (`app/layout.tsx`)

- Importar `globals.css`.
- Incluir `<html>`, `<body>` e `{children}`.
- Exportar `metadata` (title, description) para SEO.
- Carregar fontes (ex.: `next/font` ou link para Google Fonts já usado em `fonts.css`).

Exemplo mínimo:

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OBA Floripa',
  description: '...',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased overflow-x-hidden" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
```

### 2.3 Página inicial (`app/page.tsx`)

- Pode ser Server Component (sem `'use client'`).
- Importar e renderizar os mesmos blocos do `App.tsx` atual: Navbar, Hero, About, Animals, AdoptionProcess, Donations, SocialProof, Footer.
- Componentes que usam estado/eventos devem ter `'use client'` neles (não obrigatório na page).

Exemplo:

```tsx
// app/page.tsx
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
// ... demais imports

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Animals />
      <AdoptionProcess />
      <Donations />
      <SocialProof />
      <Footer />
    </>
  )
}
```

### 2.4 CSS global

- Criar `app/globals.css` com os mesmos `@import` que hoje: fonts, tailwind, theme.
- Ajustar Tailwind para Next: em projetos Next 14+ com Tailwind v4, usar a configuração recomendada (ex.: `@tailwindcss/postcss` ou equivalente no PostCSS).

### 2.5 Mover componentes

- Copiar/mover de `src/app/components/` para `src/components/` (e `ui/`, `figma/` como estão).
- Atualizar todos os imports para usar o alias `@/components/...`.
- Nos componentes que usam `useState`, `useEffect`, `onClick`, etc., adicionar `'use client'` na primeira linha.

Exemplos de componentes que devem ser Client Components:

- `AdoptionModal.tsx`
- `Animals.tsx`
- `Navbar.tsx` (se tiver estado de menu)
- Qualquer um que use hooks ou eventos.

---

## Fase 2B: Interface admin — edição de animais para adoção

**Posição:** executar **antes da Fase 3** (Supabase). A interface admin é implementada com dados mock/estáticos; a persistência real virá na Fase 3.

**Skill de referência:** **frontend-blueprint** (`.cursor/skills/frontend-blueprint/SKILL.md`).

A interface deve **manter a identidade visual do site**. Seguir o fluxo do skill: Briefing → Referências / Direção de design → Plano de execução → Build atômico.

### 2B.1 Identidade visual do site (fonte da verdade)

Usar como base os componentes atuais (Hero, Donations, Footer, Animals, etc.):

| Elemento | Especificação |
|---------|----------------|
| **Tipografia** | **Syne** (headings, títulos, CTAs) — 700–800; **Space Grotesk** (body, labels, UI) — 300–700 |
| **Cores primárias / acentos** | `#FF5500` (laranja), `#FF6B9D` (rosa), `#FFB800` (amarelo), `#8B5CF6` (roxo), `#10B981` (verde) |
| **Backgrounds** | `#FFF5EC` (creme, seções claras), `#1A1A1A` / `#111` (seções escuras), branco para cards |
| **Texto** | `#1A1A1A` (principal), `#555`, `#777`, `#888` (secundário) |
| **Bordas / neutros** | `#E5E7EB`, `#F9F9F9` |
| **Padrões** | Barra em gradiente no topo da seção (`from-[#FF5500] via-[#FFB800] to-[#FF6B9D]` etc.); botões `rounded-full`; labels em uppercase com `tracking-widest`; cards com cantos arredondados |

O admin deve reutilizar essas fontes, paleta e padrões (gradiente, botões, cards) para parecer parte do mesmo produto.

### 2B.2 Briefing (frontend-blueprint — Fase 1)

- **O quê:** Painel admin para listar, criar e editar animais para adoção.
- **Quem:** Equipe interna da ONG (poucos usuários).
- **Problema:** Gerenciar quais animais aparecem no site e seus dados (nome, idade, tipo, descrição, imagem, tag, status).
- **Restrições:** Next.js App Router, identidade visual do site obrigatória, dados inicialmente mock/estáticos (sem Supabase até a Fase 3).
- **Escopo MVP:** Listagem de animais com **busca por nome**, **filtros** (nome e tipo), e ações **Editar** e **Excluir**; formulário de novo animal; formulário de edição por ID. Sem autenticação nesta fase (proteção pode vir na Fase 5 ou com Supabase).

### 2B.3 Direção de design (frontend-blueprint — Fase 3)

Antes de codar, definir e aprovar:

- **Mood:** Consistente com o site — acolhedor, claro, uso dos mesmos acentos (laranja/rosa/amarelo).
- **Paleta:** Mesma do site (acima). Para o admin, priorizar fundo claro `#FFF5EC` ou branco, com gradiente no topo do layout.
- **Tipografia:** Syne para títulos do painel; Space Grotesk para tabelas, formulários e labels.
- **Layout:** Layout admin (`app/admin/layout.tsx`) com barra superior ou lateral com link “Voltar ao site” e título “Admin – Animais”; área de conteúdo com listagem em cards ou tabela; formulários (novo/editar) com os mesmos inputs/estilos que combinem com o site.
- **Componentes:** Reaproveitar componentes de `components/ui/` (Input, Button, Card, etc.) e estilizar com as cores do site (ex.: botão primário `#FF5500`).

Documentar esta direção num bloco “Design Direction” e só seguir para o plano de execução após ok do responsável.

### 2B.4 Plano de execução (frontend-blueprint — Fase 5)

Construir em passos pequenos e revisáveis:

1. **Layout admin** — `app/admin/layout.tsx`: barra superior com identidade do site (gradiente, logo/texto “OBA Floripa”, link “Site”), fontes Syne/Space Grotesk, fundo alinhado ao site.
2. **Página de listagem** — `app/admin/page.tsx`: listar animais a partir de dados mock (array em código ou JSON); **busca por nome** (campo de texto que filtra em tempo real); **filtros** por **nome** e por **tipo** (ex.: select ou chips: cão, gato, outro); cards ou tabela com nome, tipo, status e ações **“Editar”** e **“Excluir”**. Excluir: com dados mock, remover do estado local (ou da lista em memória) e opcionalmente confirmação (modal/dialog) antes de deletar.
3. **Página “Novo animal”** — `app/admin/animals/new/page.tsx`: formulário (nome, idade, tipo, descrição, URL da imagem, tag, status); submit por enquanto apenas em estado local ou console (sem Supabase).
4. **Página “Editar animal”** — `app/admin/animals/[id]/page.tsx`: mesmo formulário, pré-preenchido com dados do animal escolhido; dados mock buscados por `id`.
5. **Revisão e polish** — Consistência de espaçamento, estados vazios, botões e feedback visual; acessibilidade básica (labels, contraste).

### 2B.5 Estrutura de rotas e dados mock

- **Rotas:** `app/admin/` (layout), `app/admin/page.tsx` (lista), `app/admin/animals/new/page.tsx`, `app/admin/animals/[id]/page.tsx`.
- **Dados:** Tipo TypeScript compartilhado (ex.: `Animal`: id, nome, idade, tipo, descrição, imagem, tag, status). Lista mock em `lib/mock-animals.ts` ou junto ao primeiro componente que a usar. Na Fase 3, trocar leitura/escrita por Supabase.
- **Listagem:** Manter estado para busca (texto por nome) e filtro por tipo; filtrar a lista antes de exibir. Botão “Excluir” remove o animal da lista mock (estado local); na Fase 3, substituir por chamada ao Supabase.

### 2B.6 Convenções Next.js (next-best-practices)

- `app/admin/layout.tsx`: Server Component; metadata para título “Admin – OBA Floripa”.
- Páginas de listagem e formulários: usar `'use client'` onde houver estado (formulários, filtros) ou manter Server Component e colocar formulários em Client Components em `components/admin/`.
- Seguir `file-conventions.md` (layout, page, loading/error se fizer sentido).

### 2B.7 Checklist da Fase 2B

- [x] Layout admin com identidade visual do site (fontes, cores, gradiente).
- [x] Listagem de animais (dados mock) em `/admin`.
- [x] **Busca por nome** e **filtros** (nome + tipo) na listagem, com atualização em tempo real.
- [x] Ação **Excluir** em cada item (com dados mock: remoção no estado local; opcional: confirmação antes de excluir).
- [x] Página “Novo animal” com formulário funcional (sem persistência).
- [x] Página “Editar animal” por `id` com formulário pré-preenchido (dados mock).
- [x] Revisão de consistência e acessibilidade conforme frontend-blueprint.

---

## Fase 3: Integração Supabase

**Consultar o skill nextjs-supabase-auth** (`.agents/skills/nextjs-supabase-auth/SKILL.md`) para configuração dos clientes com `@supabase/ssr`, fluxo de cookies e preparação para auth (middleware, callback) nas fases seguintes.

### 3.1 Instalar cliente Supabase

```bash
yarn add @supabase/supabase-js @supabase/ssr
```

### 3.2 Variáveis de ambiente

Criar `.env.local` na raiz (não commitar):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua-publishable-key
```

No [Dashboard do Supabase](https://app.supabase.com) → Project Settings → API → aba "Publishable and secret API keys": usar URL e Publishable key.

### 3.3 Cliente Supabase no browser (`lib/supabase/client.ts`)

Para uso em Client Components e em Server Actions:

```ts
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
```

Recomendação: usar `@supabase/ssr` para cookies/sessão no Next (auth). Se não for usar auth ainda:

```ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
```

### 3.4 Cliente Supabase no servidor (opcional, para depois)

Para Server Components e Route Handlers:

```ts
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) },
      },
    }
  )
}
```

### 3.5 Banco de dados

Implementado em `supabase/migrations/`:

- Tabela **animais** (id UUID, name, age, type, gender, desc, img, tag, status, created_at, updated_at).
- Tabela **solicitacoes_adocao** (id, animal_id, nome, email, telefone, endereco, cidade, tem_experiencia, tem_outros_pets, tipo_moradia, mensagem, status, created_at, updated_at).
- Enums: `animal_type`, `animal_gender`, `animal_status`, `solicitacao_status`.
- Políticas RLS: leitura pública de animais; escrita em animais e leitura/escrita de solicitações apenas autenticado.
- Seed opcional em `00002_seed_animals.sql`.

### 3.6 Checklist da Fase 3

- [x] Pacotes instalados: `@supabase/supabase-js`, `@supabase/ssr`.
- [x] Variáveis de ambiente: `.env.example` na raiz; `.env*.local` no `.gitignore`.
- [x] Cliente browser: `src/lib/supabase/client.ts` com `createBrowserClient` (`@supabase/ssr`).
- [x] Cliente servidor: `src/lib/supabase/server.ts` com `createServerClient` e `cookies()` (Next 15+).
- [x] Placeholder de tipos: `src/lib/supabase/types.ts` (futuro: tipos gerados do projeto).
- [x] Copiar `.env.example` → `.env.local` e preencher URL e Publishable key do projeto Supabase (já feito).

---

## Fase 4: Remover Vite e artefatos antigos

- [x] Desinstalar: `yarn remove vite @vitejs/plugin-react`
- [x] Remover `vite.config.ts`
- [x] Remover `index.html`
- [x] Remover `src/main.tsx` (entrada agora é `app/layout.tsx` + `app/page.tsx`)
- [x] Remover `tsconfig.node.json` e `vite-env.d.ts` se existirem
- [x] Ajustar `package.json`: remover scripts do Vite e dependências exclusivas do Vite

*(Vite já foi removido; não há mais referências no projeto.)*

---

## Fase 5: Ajustes pós-migração (recomendados)

### 5.1 Imagens

- **Feito:** URLs externas em `remotePatterns` (next.config); **cards em `Animals.tsx`** e imagem do animal no **`AdoptionModal`** usando `next/image` (fill + sizes nos cards; width/height no modal). *(Também já usado em Navbar, Footer, AnimalList.)*

### 5.2 Fontes

- **Feito:** `next/font` para Space Grotesk e Syne em **`src/lib/fonts.ts`**; variáveis CSS `--font-space-grotesk` e `--font-syne`; root layout aplica as variáveis no `<html>`; `@theme` em `globals.css` com `--font-sans` e `--font-heading`; body com `font-sans`; utility `.font-heading` para títulos. Removido `@import` do Google Fonts.

### 5.3 Dados com Supabase

- **Feito:** `Animals.tsx` busca a lista de animais do Supabase (tabela `animais`); **`AdoptionModal`** envia o formulário via **Server Action** `submitAdoption` em **`src/app/actions/submit-adoption.ts`** (cliente Supabase no servidor), inserindo em `solicitacoes_adocao`.
- **Admin:** Listagem/novo/editar ainda usam dados mock (`lib/mock-animals.ts`); ao ativar auth (Fase 5.4), trocar para CRUD via Supabase.

### 5.4 Proteção do painel admin (auth)

- **Feito:** Interface do admin (Fase 2B) protegida com Supabase Auth. **Middleware** em `src/middleware.ts` chama **`updateSession`** em `src/lib/supabase/proxy.ts` para refrescar a sessão (`getClaims()`) e gravar cookies; rotas em `app/admin/` (exceto `/admin/login`) exigem sessão — sem usuário redireciona para `/admin/login`; usuário logado em `/admin/login` redireciona para `/admin`. **Rota** `app/auth/callback/route.ts` para OAuth/magic link (troca de `code` por sessão). **Server Actions** em `src/app/actions/auth.ts`: `login` (email/senha com `signInWithPassword`) e `logout`; página **`/admin/login`** com formulário e botão Sair no layout admin quando autenticado. Listar/editar/criar animais continua com mock; ao conectar CRUD ao Supabase, usar sessão já disponível.

---

## Checklist final

- [x] `yarn dev` sobe em `http://localhost:3000` e a página inicial é igual à atual.
- [ ] Estilos (Tailwind, fontes, tema) idênticos — *validação manual no browser*.
- [ ] Formulário de adoção abre e fecha; interações (botões, modal) funcionam — *validação manual*.
- [x] **Fase 2B:** Interface admin em `/admin` com identidade visual do site; listagem com **busca por nome**, **filtros (nome e tipo)** e **excluir**; novo e editar animais (dados mock).
- [ ] Sem erros de hidratação no console — *validação manual*.
- [x] `.env.local` preenchido com Supabase (e no `.gitignore`).
- [x] Build: `yarn build` conclui sem erros.
- [x] Remoção completa do Vite e arquivos listados na Fase 4.

---

## Ordem sugerida de execução

1. ~~Fase 1 (Next.js + config + scripts).~~ ✅
2. ~~Fase 2 (layout, page, globals.css, mover componentes e marcar Client onde necessário).~~ ✅
3. ~~Testar `next dev` e corrigir imports/erros.~~ ✅
4. ~~**Fase 2B (Interface admin):** layout admin, listagem, novo e editar animais com dados mock.~~ ✅
5. ~~Fase 3 (Supabase: pacote, env, client/server, types, migrations).~~ ✅
6. ~~Fase 4 (remover Vite e arquivos antigos).~~ ✅
7. ~~**Fase 5 (incremental):** `next/image`, `next/font`, Server Action no AdoptionModal, proteção do admin com Supabase Auth.~~ ✅
8. **Checklist final:** ~~`yarn dev`, `yarn build`~~ ✅; validar manualmente estilos, formulário de adoção e ausência de erros de hidratação.

*(Quando for usar o Supabase em produção ou local: copiar `.env.example` → `.env.local` e preencher URL e Publishable key.)*
