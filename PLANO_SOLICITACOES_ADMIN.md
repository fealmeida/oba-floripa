# Plano: Listagem e gestão de solicitações de adoção no Admin

Objetivo: permitir que o admin visualize todas as solicitações de adoção enviadas ao Supabase, pesquise por nome e tipo, marque como lida/não lida, altere o **status** da solicitação (respondida, aprovada, rejeitada, cancelada), adicione comentários e filtre por lida e por status.

**Modelagem:** “Lida” é uma **flag** (boolean); os resultados de fluxo (respondida, cancelada, recusada) são **status** (um único valor por solicitação), não tags booleanas.

---

## 1. Banco de dados (Supabase)

### 1.1 Alterações em `solicitacoes_adocao`

**Campos já existentes:** `id`, `animal_id`, `nome`, `email`, `telefone`, `endereco`, `cidade`, `tem_experiencia`, `tem_outros_pets`, `tipo_moradia`, `mensagem`, `status`, `created_at`, `updated_at`.

**Enum atual:** `solicitacao_status` = `pendente` | `em_analise` | `aprovada` | `rejeitada`.

**Fazer:**

1. **Estender o enum** `solicitacao_status` com: `respondida`, `cancelada`.  
   - “Recusada” = usar o valor já existente **`rejeitada`**.
2. **Adicionar apenas duas colunas:**

| Coluna             | Tipo    | Default | Descrição                    |
|--------------------|---------|---------|-----------------------------|
| `lida`             | BOOLEAN | `false` | Admin já leu/revisou        |
| `comentario_admin` | TEXT    | `null`  | Comentário interno do admin |

### 1.2 Migração SQL

Criar arquivo em `supabase/migrations/` (ex.: `00002_solicitacoes_admin_campos.sql`):

```sql
-- Estender enum de status (respondida, cancelada; recusada = rejeitada)
ALTER TYPE solicitacao_status ADD VALUE IF NOT EXISTS 'respondida';
ALTER TYPE solicitacao_status ADD VALUE IF NOT EXISTS 'cancelada';

-- Novos campos: apenas lida e comentário do admin
ALTER TABLE public.solicitacoes_adocao
  ADD COLUMN IF NOT EXISTS lida BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS comentario_admin TEXT;

-- Índice para filtro por lida (status já tem idx_solicitacoes_status)
CREATE INDEX IF NOT EXISTS idx_solicitacoes_lida ON public.solicitacoes_adocao(lida);
```

Executar no Supabase (SQL Editor ou `supabase db push`).

### 1.3 Atualizar tipos TypeScript

Em `src/lib/supabase/types.ts`: 

- **SolicitacaoStatus:** incluir `'respondida'` e `'cancelada'` no tipo (alinhado ao enum).
- Nos tipos `Row`, `Insert` e `Update` de `solicitacoes_adocao`: adicionar `lida` e `comentario_admin`.
- (Opcional) Exportar tipo `AdminSolicitacao` para listagem com join ao animal (nome e tipo).

---

## 2. Backend (Server Actions)

### 2.1 Listar solicitações (com animal)

- **Arquivo:** `src/app/actions/solicitacoes.ts` (ou similar).
- **Função:** `getSolicitacoes()` (ou receber filtros opcionais).
- **Comportamento:** `select` em `solicitacoes_adocao` com join em `animais` para trazer `animais.name`, `animais.type` (para exibição e filtro por tipo). Ordenar por `created_at` desc.
- Retornar tipo tipado (ex.: `AdminSolicitacao[]`).

### 2.2 Atualizar solicitação (lida, status, comentário)

- **Arquivo:** mesmo `src/app/actions/solicitacoes.ts`.
- **Função:** `updateSolicitacao(id, payload)`.
- **Payload:** campos opcionais: `lida`, `status` (SolicitacaoStatus), `comentario_admin`.
- Usar `createClient()` do server; apenas usuário autenticado (RLS já restringe UPDATE a autenticado).
- Retornar `{ success: true } | { success: false; error: string }`.

---

## 3. Rotas e páginas (Admin)

### 3.1 Navegação no admin

- No **layout** do admin (`src/app/admin/layout.tsx`) ou na **página principal** do admin (`src/app/admin/page.tsx`), adicionar links claros:
  - “Animais” → `/admin` (ou `/admin/animals` se criar redirect).
  - “Solicitações” → `/admin/solicitacoes`.
- Se a página inicial do admin for um dashboard, manter link para “Solicitações” em destaque.

### 3.2 Página de listagem

- **Rota:** `src/app/admin/solicitacoes/page.tsx`.
- **Server Component:** buscar solicitações (com join ao animal) via `getSolicitacoes()` e passar para um Client Component de listagem.
- **Metadata:** título/descrição para “Solicitações de adoção – Admin”.

### 3.3 Componente de listagem (Client)

- **Arquivo:** `src/components/admin/SolicitacoesList.tsx` (ou `AdoptionRequestsList.tsx`).
- **Props:** `initialSolicitacoes: AdminSolicitacao[]`.
- **Estado local:** lista pode ser atualizada após ações (marcar lida, tags, comentário) com `router.refresh()` ou atualização otimista.

**Funcionalidades:**

1. **Busca**
   - Campo de pesquisa por **nome do solicitante** (`nome`).
   - Campo ou filtro por **tipo do animal** (cachorro/gato), usando o tipo vindo do join com `animais`.
   - Filtro em memória (como no `AnimalList`) ou refetch com query params; para poucos registros, filtro em memória é suficiente.

2. **Filtros por lida e status**
   - Filtro por **lida** (todas / lidas / não lidas).
   - Filtro por **status**: pendente, em análise, respondida, aprovada, rejeitada, cancelada (select ou abas).
   - Exibir **badge de status** em cada solicitação (e indicador visual de “não lida” quando aplicável).

3. **Lista**
   - Cards ou tabela: dados do solicitante (nome, email, telefone, cidade), animal (nome e tipo), data, mensagem (resumida), flag “lida” e status.
   - Botão ou toggle para **marcar como lida / não lida**.
   - **Select ou botões** para alterar **status** (ex.: Respondida, Aprovada, Rejeitada, Cancelada), chamando `updateSolicitacao`.
   - Área para **comentário do admin**: campo de texto + botão “Salvar comentário”; ao salvar, enviar `comentario_admin` via `updateSolicitacao`.
   - Opção: abrir detalhe da solicitação em **drawer/modal** (dados completos + comentário + ações), mantendo a lista enxuta.

4. **Empty state**
   - Se não houver solicitações ou nenhum resultado nos filtros, mensagem amigável e botão “Limpar filtros” se aplicável.

---

## 4. Tipos e dados

### 4.1 Tipo para listagem

- Definir tipo (ex. em `types.ts` ou no próprio arquivo de actions) que represente uma solicitação com dados do animal:

```ts
// Exemplo
type AdminSolicitacao = SolicitacaoRow & {
  animal_name: string
  animal_type: AnimalType
}
```

- `SolicitacaoRow` já inclui `status`; garantir que inclua também `lida` e `comentario_admin` (após atualizar os tipos do Supabase).

### 4.2 Select da listagem

- Query Supabase:  
  `from('solicitacoes_adocao').select('*, animais(name, type)').order('created_at', { ascending: false })`  
  e mapear para `AdminSolicitacao` (ajustar chave do join conforme retorno do Supabase, ex.: `animais` como objeto ou flatten).

---

## 5. UI/UX (resumo)

- Reaproveitar padrões do admin existente: cores (`#FF5500`, `#1A1A1A`, fundo `#FFF5EC`), fontes (Syne, Space Grotesk), componentes (Button, Card, Input, Select, Badge) de `@/components/ui`.
- Busca e filtros no topo (como em `AnimalList`).
- **Status** com badges coloridos (ex.: respondida = verde, aprovada = azul, rejeitada = vermelho suave, cancelada = cinza).
- Indicador visual de “não lida” (ex.: bolinha ou peso de fonte).
- Comentário do admin: textarea + “Salvar” que chama a action e atualiza a UI.

---

## 6. Ordem sugerida de implementação

| # | Tarefa | Status |
|---|--------|--------|
| 1 | Migração SQL: estender enum e adicionar colunas (read/lida, admin_comment). | ✅ Feito (00006 + 00007) |
| 2 | Atualizar `src/lib/supabase/types.ts` (AdoptionRequestStatus, read, admin_comment, AdminAdoptionRequest). | ✅ Feito |
| 3 | Criar actions: `fetchAdoptionRequests()` e `updateAdoptionRequest()` em `admin-adoption-requests.ts`. | ✅ Feito |
| 4 | Criar rota `src/app/admin/solicitacoes/page.tsx` e buscar dados iniciais. | ✅ Feito |
| 5 | Criar `AdoptionRequestsList.tsx`: lista, busca por nome e tipo, filtros por lida e status. | ✅ Feito |
| 6 | Implementar ações: marcar lida/não lida, alterar status, salvar comentário do admin. | ✅ Feito |
| 7 | Adicionar link “Solicitações” na navegação do admin (AdminNav no layout). | ✅ Feito |
| 8 | Ajustes finais: empty states, acessibilidade, loading/feedback nas ações. | ✅ Feito |

---

## 7. Checklist rápido

- [x] Migração aplicada no Supabase (enum + `read`, `admin_comment`) e tipos atualizados.
- [x] Server Actions para listar (com join) e atualizar solicitação (read, status, admin_comment).
- [x] Página `/admin/solicitacoes` com listagem.
- [x] Busca por nome do solicitante e filtro por tipo do animal.
- [x] Marcar como lida / não lida.
- [x] Status: exibir e alterar (pendente, em análise, respondida, aprovada, rejeitada, cancelada).
- [x] Comentário do admin (campo + salvar).
- [x] Filtros por lida e por status.
- [x] Navegação do admin com link para Solicitações.
- [x] Loading/feedback nas ações e ajustes de acessibilidade (item 8).
