-- Migração: tabelas animais e solicitações de adoção (OBA Floripa)
-- Executar no Supabase: SQL Editor → New query → colar e rodar.
-- Ou, com Supabase CLI: supabase db push (a partir da pasta do projeto).

-- Enum para tipo do animal (cachorro ou gato)
CREATE TYPE animal_type AS ENUM ('cachorro', 'gato');

-- Enum para gênero
CREATE TYPE animal_gender AS ENUM ('fêmea', 'macho');

-- Enum para status do animal
CREATE TYPE animal_status AS ENUM ('disponível', 'adotado', 'reservado');

-- Enum para status da solicitação
CREATE TYPE solicitacao_status AS ENUM ('pendente', 'em_analise', 'aprovada', 'rejeitada');

-- Tabela: animais disponíveis para adoção
CREATE TABLE public.animais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age TEXT NOT NULL,
  type animal_type NOT NULL,
  gender animal_gender NOT NULL,
  "desc" TEXT NOT NULL,
  img TEXT NOT NULL,
  tag TEXT,
  status animal_status NOT NULL DEFAULT 'disponível',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela: solicitações de adoção
CREATE TABLE public.solicitacoes_adocao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID NOT NULL REFERENCES public.animais(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  tem_experiencia TEXT,
  tem_outros_pets TEXT,
  tipo_moradia TEXT,
  mensagem TEXT,
  status solicitacao_status NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para buscas e listagens
CREATE INDEX idx_animais_status ON public.animais(status);
CREATE INDEX idx_animais_type ON public.animais(type);
CREATE INDEX idx_animais_created_at ON public.animais(created_at DESC);
CREATE INDEX idx_solicitacoes_animal_id ON public.solicitacoes_adocao(animal_id);
CREATE INDEX idx_solicitacoes_status ON public.solicitacoes_adocao(status);
CREATE INDEX idx_solicitacoes_created_at ON public.solicitacoes_adocao(created_at DESC);

-- Trigger para atualizar updated_at em animais
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER animais_updated_at
  BEFORE UPDATE ON public.animais
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER solicitacoes_updated_at
  BEFORE UPDATE ON public.solicitacoes_adocao
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS: políticas de segurança
ALTER TABLE public.animais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solicitacoes_adocao ENABLE ROW LEVEL SECURITY;

-- Animais: leitura pública (qualquer um pode listar/ver); escrita apenas autenticado (admin)
CREATE POLICY "Animais: leitura pública"
  ON public.animais FOR SELECT
  USING (true);

CREATE POLICY "Animais: inserir/atualizar/deletar apenas autenticado"
  ON public.animais FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Solicitações: qualquer um pode inserir (formulário público); leitura/atualização apenas autenticado (admin)
CREATE POLICY "Solicitações: inserção pública"
  ON public.solicitacoes_adocao FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Solicitações: leitura e atualização apenas autenticado"
  ON public.solicitacoes_adocao FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Solicitações: update apenas autenticado"
  ON public.solicitacoes_adocao FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Comentário: DELETE em solicitacoes_adocao pode ser restrito só a admin se usar roles no futuro.
-- Por ora, autenticado pode deletar (você pode trocar depois por uma role 'admin').

CREATE POLICY "Solicitações: delete apenas autenticado"
  ON public.solicitacoes_adocao FOR DELETE
  USING (auth.role() = 'authenticated');
