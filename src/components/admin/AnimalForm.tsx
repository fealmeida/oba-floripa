'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Animal } from '@/lib/mock-animals'
import { ANIMAL_TYPES, ANIMAL_GENDERS } from '@/lib/mock-animals'
import { ArrowLeft } from 'lucide-react'

const STATUS_OPTIONS: Animal['status'][] = ['disponível', 'reservado', 'adotado']

export type AnimalFormValues = Omit<Animal, 'id'> & { id?: number }

const defaultValues: AnimalFormValues = {
  name: '',
  age: '',
  type: 'cachorro',
  gender: 'macho',
  desc: '',
  img: '',
  tag: null,
  status: 'disponível',
}

export function AnimalForm({
  initialValues,
  mode,
}: {
  initialValues?: AnimalFormValues | null
  mode: 'new' | 'edit'
}) {
  const router = useRouter()
  const [form, setForm] = useState<AnimalFormValues>(initialValues ?? defaultValues)

  const update = (field: keyof AnimalFormValues, value: string | null) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Fase 2B: sem persistência; apenas log e redirecionamento
    if (mode === 'new') {
      console.log('[Admin] Novo animal (mock):', form)
      router.push('/admin')
      return
    }
    console.log('[Admin] Editar animal (mock):', form)
    router.push('/admin')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <Card className="border-[#E5E7EB] bg-white rounded-2xl">
        <CardHeader className="pb-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-[#555] hover:text-[#1A1A1A] text-sm font-medium mb-2 transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <ArrowLeft className="size-4" />
            Voltar à listagem
          </Link>
          <h2
            className="text-[#1A1A1A] text-2xl font-bold"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            {mode === 'new' ? 'Novo animal' : 'Editar animal'}
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
                Nome
              </Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Ex.: Thor"
                className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
                Idade
              </Label>
              <Input
                id="age"
                required
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                placeholder="Ex.: 2 anos"
                className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
                Tipo
              </Label>
              <Select value={form.type} onValueChange={(v) => update('type', v)}>
                <SelectTrigger id="type" className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ANIMAL_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
                Gênero
              </Label>
              <Select value={form.gender} onValueChange={(v) => update('gender', v as Animal['gender'])}>
                <SelectTrigger id="gender" className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ANIMAL_GENDERS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
                Status
              </Label>
              <Select value={form.status} onValueChange={(v) => update('status', v as Animal['status'])}>
                <SelectTrigger id="status" className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc" className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
              Descrição
            </Label>
            <Textarea
              id="desc"
              required
              value={form.desc}
              onChange={(e) => update('desc', e.target.value)}
              placeholder="Descreva o animal..."
              rows={4}
              className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="img" className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
              URL da imagem
            </Label>
            <Input
              id="img"
              type="url"
              value={form.img}
              onChange={(e) => update('img', e.target.value)}
              placeholder="https://..."
              className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag" className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
              Tag (opcional)
            </Label>
            <Input
              id="tag"
              value={form.tag ?? ''}
              onChange={(e) => update('tag', e.target.value || null)}
              placeholder="Ex.: Destaque, Nova, Urgente"
              className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 pt-6">
          <Link href="/admin">
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-[#E5E7EB] text-[#555]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            className="rounded-full bg-[#FF5500] hover:bg-[#FF5500]/90 text-white border-0"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}
          >
            {mode === 'new' ? 'Cadastrar' : 'Salvar'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
