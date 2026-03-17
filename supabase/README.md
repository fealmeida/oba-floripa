# Supabase – OBA Floripa

## Como aplicar as migrações

### Opção 1: SQL Editor no Dashboard

1. Acesse [app.supabase.com](https://app.supabase.com) → seu projeto.
2. Menu **SQL Editor** → **New query**.
3. Copie e cole o conteúdo de `migrations/00001_create_animals_and_adoption_requests.sql`.
4. Execute (Run).
5. Para popular com animais iniciais, abra uma nova query, cole `migrations/00002_seed_animals.sql` e execute.

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

## Autenticação (admin)

Para proteger o painel `/admin` com Supabase Auth, configure no Dashboard:

### 1. Criar um usuário (email + senha)

1. Menu **Authentication** → **Users**.
2. **Add user** (ou "Add new user").
3. Preencha **Email** e **Password** — serão as credenciais para acessar `/admin/login`.
4. Confirme a criação.

### 2. URLs de redirecionamento

O Supabase só redireciona para URLs cadastradas. Sem isso, o login falha após o callback.

1. Menu **Authentication** → **URL Configuration**.
2. Em **Redirect URLs**, adicione (uma por linha):
   - Desenvolvimento: `http://localhost:3000/auth/callback`
   - Produção: `https://seu-dominio.com/auth/callback` (troque pelo domínio real).
3. Salve.

O app troca o `code` da URL por sessão em `src/app/auth/callback/route.ts` e redireciona para `/admin`.

## Tipos no código

Os tipos TypeScript estão em `src/lib/supabase/types.ts`. Para converter uma linha do banco no formato da UI (cards, modal), use:

```ts
import { mapAnimalRowToUI } from '@/lib/supabase'
```
