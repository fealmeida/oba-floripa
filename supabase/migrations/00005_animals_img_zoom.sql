-- Zoom da imagem no card (1 = 100%, 1.5 = 150%). Permite dar zoom in/out na edição.
ALTER TABLE public.animais
  ADD COLUMN IF NOT EXISTS img_zoom NUMERIC(3,2) DEFAULT 1 NOT NULL;

ALTER TABLE public.animais
  ADD CONSTRAINT animais_img_zoom_range CHECK (img_zoom >= 0.5 AND img_zoom <= 3);

COMMENT ON COLUMN public.animais.img_zoom IS 'Fator de zoom da imagem no card (ex: 1 = 100%, 1.5 = 150%).';
