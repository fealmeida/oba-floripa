'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type LoginResult =
  | { success: true }
  | { success: false; error: string }

export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email')?.toString()?.trim()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return { success: false, error: 'E-mail e senha são obrigatórios.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { success: false, error: error.message }
  }

  redirect('/admin')
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
