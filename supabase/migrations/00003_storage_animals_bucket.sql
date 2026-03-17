-- Bucket para fotos dos animais (admin faz upload; leitura pública no site)
-- Executar no SQL Editor do Supabase ou: supabase db push

INSERT INTO storage.buckets (id, name, public)
VALUES ('animais', 'animais', true)
ON CONFLICT (id) DO NOTHING;

-- Leitura pública (qualquer um pode ver as fotos)
CREATE POLICY "Animais: leitura pública"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'animais');

-- Upload apenas autenticado (admin)
CREATE POLICY "Animais: upload autenticado"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'animais');

-- Atualizar/remover apenas autenticado
CREATE POLICY "Animais: update autenticado"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'animais')
  WITH CHECK (bucket_id = 'animais');

CREATE POLICY "Animais: delete autenticado"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'animais');
