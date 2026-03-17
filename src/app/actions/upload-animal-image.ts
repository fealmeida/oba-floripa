'use server'

import { createClient } from '@/lib/supabase/server'

const BUCKET = 'animais'
const MAX_SIZE_MB = 10
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export type UploadAnimalImageResult =
  | { success: true; url: string }
  | { success: false; error: string }

export async function uploadAnimalImage(formData: FormData): Promise<UploadAnimalImageResult> {
  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return { success: false, error: 'Nenhum arquivo enviado.' }
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return { success: false, error: `Arquivo deve ter no máximo ${MAX_SIZE_MB} MB.` }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { success: false, error: 'Formato inválido. Use JPEG, PNG, WebP ou GIF.' }
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`

  const supabase = await createClient()
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  })

  if (error) return { success: false, error: error.message }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { success: true, url: data.publicUrl }
}
