-- Migration: admin workflow fields for adoption requests (OBA Floripa)
-- Add read (read flag) and admin_comment (admin comment).
-- (Status enum is replaced in full by 00007 with English values.)

-- New columns: read, admin_comment
ALTER TABLE public.solicitacoes_adocao
  ADD COLUMN IF NOT EXISTS read BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS admin_comment TEXT;

-- Index for filtering by read (status already has an index)
CREATE INDEX IF NOT EXISTS idx_adoption_requests_read ON public.solicitacoes_adocao(read);
