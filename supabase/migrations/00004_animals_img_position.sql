-- Posição do recorte da foto no card (object-position em CSS, ex: '50% 50%', '25% 75%').
-- Permite ao admin arrastar a foto na edição para escolher o enquadramento.
ALTER TABLE public.animais
  ADD COLUMN IF NOT EXISTS img_position TEXT DEFAULT '50% 50%';

COMMENT ON COLUMN public.animais.img_position IS 'CSS object-position para a imagem no card (ex: 50% 50%).';
