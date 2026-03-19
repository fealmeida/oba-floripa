-- Migration: adoption request status enum in English (OBA Floripa)
-- Replaces solicitacao_status (Portuguese + mixed) with adoption_request_status (all English).
-- Idempotent: safe to run again; skips if column already uses adoption_request_status.

DO $$
DECLARE
  col_type text;
BEGIN
  SELECT udt_name INTO col_type
  FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'solicitacoes_adocao' AND column_name = 'status';

  IF col_type IS NULL OR col_type <> 'adoption_request_status' THEN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'adoption_request_status') THEN
      CREATE TYPE adoption_request_status AS ENUM (
        'pending',
        'in_review',
        'approved',
        'rejected',
        'responded',
        'cancelled'
      );
    END IF;

    ALTER TABLE public.solicitacoes_adocao
      ALTER COLUMN status DROP DEFAULT;

    ALTER TABLE public.solicitacoes_adocao
      ALTER COLUMN status TYPE adoption_request_status
      USING (
        CASE status::text
          WHEN 'pendente' THEN 'pending'::adoption_request_status
          WHEN 'em_analise' THEN 'in_review'::adoption_request_status
          WHEN 'aprovada' THEN 'approved'::adoption_request_status
          WHEN 'rejeitada' THEN 'rejected'::adoption_request_status
          WHEN 'responded' THEN 'responded'::adoption_request_status
          WHEN 'cancelled' THEN 'cancelled'::adoption_request_status
          ELSE 'pending'::adoption_request_status
        END
      );

    ALTER TABLE public.solicitacoes_adocao
      ALTER COLUMN status SET DEFAULT 'pending'::adoption_request_status;

    DROP TYPE IF EXISTS solicitacao_status;
  END IF;
END $$;
