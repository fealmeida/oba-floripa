# Supabase – OBA Floripa

## Como aplicar as migrações

### Opção 1: SQL Editor no Dashboard

1. Acesse [app.supabase.com](https://app.supabase.com) → seu projeto.
2. Menu **SQL Editor** → **New query**.
3. Copie e cole o conteúdo de `migrations/00001_create_animais_and_solicitacoes.sql`.
4. Execute (Run).
5. Para popular com animais iniciais, abra uma nova query, cole `migrations/00002_seed_animais.sql` e execute.

### Opção 2: Supabase CLI

Se usar [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase link --project-ref SEU_PROJECT_REF
supabase db push
```

O seed (00002) pode ser executado depois pelo SQL Editor ou repetindo o conteúdo em uma migration local.

## Tabelas

| Tabela                 | Uso |
|------------------------|-----|
| `animais`              | Cadastro de animais para adoção (nome, idade, tipo, descrição, imagem, tag, status). Cores da UI são derivadas no código a partir de `tag` e `type`. |
| `solicitacoes_adocao`  | Formulário de adoção (animal_id, nome, email, telefone, endereço, cidade, respostas, status). |

## RLS

- **animais**: leitura pública; inserir/atualizar/deletar apenas usuário autenticado (admin).
- **solicitacoes_adocao**: qualquer um pode inserir (formulário público); leitura e atualização apenas autenticado.

## Variáveis de ambiente

No Dashboard: **Project Settings** → **API**. Use a aba **"Publishable and secret API keys"** (não a "Legacy anon, service_role"):

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **Publishable key** (`sb_publishable_...`) → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` no `.env.local`.

A chave legacy "anon" ainda funciona no Supabase; este projeto usa apenas a Publishable key.

## Tipos no código

Os tipos TypeScript estão em `src/lib/supabase/types.ts`. Para converter uma linha do banco no formato da UI (cards, modal), use:

```ts
import { mapAnimalRowToUI } from '@/lib/supabase'
```
