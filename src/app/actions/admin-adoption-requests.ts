'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  AdoptionRequestStatus,
  AdoptionRequestUpdate,
} from '@/lib/supabase/types'

export type AdoptionRequestListItem = {
  id: string
  animal_id: string
  nome: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  mensagem: string | null
  created_at: string
  updated_at: string
  read: boolean
  status: AdoptionRequestStatus
  admin_comment: string | null
  animal_name: string
  animal_type: 'cachorro' | 'gato'
}

export type FetchAdoptionRequestsResult =
  | { success: true; data: AdoptionRequestListItem[] }
  | { success: false; error: string }

export async function fetchAdoptionRequests(): Promise<FetchAdoptionRequestsResult> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('solicitacoes_adocao')
    .select(
      `
      id,
      animal_id,
      nome,
      email,
      telefone,
      endereco,
      cidade,
      mensagem,
      created_at,
      updated_at,
      read,
      status,
      admin_comment,
      animais (
        name,
        type
      )
    `
    )
    .order('created_at', { ascending: false })

  if (error) {
    return { success: false, error: error.message }
  }

  const list: AdoptionRequestListItem[] = (data ?? []).map((row: any) => {
    const animais = row.animais
    return {
      id: row.id,
      animal_id: row.animal_id,
      nome: row.nome,
      email: row.email,
      telefone: row.telefone,
      endereco: row.endereco,
      cidade: row.cidade,
      mensagem: row.mensagem ?? null,
      created_at: row.created_at,
      updated_at: row.updated_at,
      read: row.read ?? false,
      status: row.status,
      admin_comment: row.admin_comment ?? null,
      animal_name: animais?.name ?? '—',
      animal_type: animais?.type ?? 'cachorro',
    }
  })

  return { success: true, data: list }
}

export type UpdateAdoptionRequestResult =
  | { success: true }
  | { success: false; error: string }

export async function updateAdoptionRequest(
  id: string,
  payload: AdoptionRequestUpdate
): Promise<UpdateAdoptionRequestResult> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('solicitacoes_adocao')
    .update(payload)
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true }
}
