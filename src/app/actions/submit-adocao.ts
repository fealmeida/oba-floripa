'use server'

import { createClient } from '@/lib/supabase/server'
import type { SolicitacaoInsert } from '@/lib/supabase/types'

export type SubmitAdocaoPayload = {
  animal_id: string
  nome: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  tem_experiencia: string | null
  tem_outros_pets: string | null
  tipo_moradia: string | null
  mensagem: string | null
}

export type SubmitAdocaoResult =
  | { success: true }
  | { success: false; error: string }

export async function submitAdocao(
  payload: SubmitAdocaoPayload
): Promise<SubmitAdocaoResult> {
  const insert: SolicitacaoInsert = {
    animal_id: payload.animal_id,
    nome: payload.nome.trim(),
    email: payload.email.trim(),
    telefone: payload.telefone.trim(),
    endereco: payload.endereco.trim(),
    cidade: payload.cidade.trim(),
    tem_experiencia: payload.tem_experiencia || null,
    tem_outros_pets: payload.tem_outros_pets || null,
    tipo_moradia: payload.tipo_moradia || null,
    mensagem: payload.mensagem?.trim() || null,
  }

  const supabase = await createClient()
  const { error } = await supabase.from('solicitacoes_adocao').insert(insert)

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true }
}
