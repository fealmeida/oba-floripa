# OBA Floripa

Site institucional da **Organização Bem-Animal (OBA!)**, ONG de Florianópolis voltada à adoção responsável de animais e arrecadação de doações.

## Sobre o projeto

A OBA Floripa conecta pessoas a animais que precisam de amor, abrigo e um lar. O site permite:

- Conhecer a organização e o processo de adoção
- Ver animais disponíveis para adoção
- Solicitar adoção por meio de formulário
- Doar via PIX para custear internações e cuidados

## Tecnologias

- **[Next.js](https://nextjs.org/)** 16 (App Router) com React 19
- **TypeScript**
- **Tailwind CSS** 4
- **Motion** (animações)
- **Radix UI** e **MUI** (componentes)
- **Lucide React** (ícones)

## Pré-requisitos

- **Node.js** 18.17+ (recomendado 20 LTS)
- **pnpm** (gerenciador de pacotes do projeto)

## Como rodar

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build e produção

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Estrutura do projeto

```
src/
├── app/              # App Router (rotas, layouts, páginas)
│   ├── admin/        # Área administrativa (animais)
│   └── page.tsx      # Página inicial (one-page)
├── components/       # Componentes reutilizáveis
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Animals.tsx
│   ├── Donations.tsx
│   ├── AdoptionModal.tsx
│   └── ...
└── lib/              # Utilitários e dados (ex.: mock-animals)
```

## Variáveis de ambiente

Para uso com Supabase (autenticação, banco, storage), crie um arquivo `.env.local` na raiz com as variáveis necessárias (ex.: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Consulte o `MIGRATION_PLAN.md` para o plano de integração.

---

© 2026 OBA Floripa. Todos os direitos reservados.
