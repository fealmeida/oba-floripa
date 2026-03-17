'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { LoginResult } from '@/app/actions/auth'

type Props = {
  errorFromUrl?: string
}

export function AdminLoginForm({ errorFromUrl }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      return await login(formData)
    },
    null as LoginResult | null
  )

  const errorMessage = state?.success === false ? state.error : errorFromUrl

  return (
    <form action={formAction} className="space-y-4">
      {errorMessage && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errorMessage}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#1A1A1A]">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="admin@exemplo.com"
          className="rounded-full border-[#E5E7EB] bg-white text-[#1A1A1A]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#1A1A1A]">
          Senha
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-full border-[#E5E7EB] bg-white text-[#1A1A1A]"
        />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-[#FF5500] hover:bg-[#FF5500]/90 text-white font-semibold"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
      >
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
