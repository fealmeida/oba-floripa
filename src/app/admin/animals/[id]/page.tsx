import { notFound } from 'next/navigation'
import { AnimalForm } from '@/components/admin/AnimalForm'
import { createClient } from '@/lib/supabase/server'
import type { AdminAnimal } from '@/lib/supabase/types'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditAnimalPage({ params }: Props) {
  const { id } = await params

  const supabase = await createClient()
  const { data: row, error } = await supabase
    .from('animais')
    .select('id, name, age, type, gender, desc, img, img_position, img_zoom, tag, status')
    .eq('id', id)
    .single()

  if (error || !row) notFound()

  const initialValues: AdminAnimal = {
    id: row.id,
    name: row.name,
    age: row.age,
    type: row.type,
    gender: row.gender,
    desc: row.desc,
    img: row.img,
    img_position: row.img_position ?? null,
    img_zoom: row.img_zoom ?? 1,
    tag: row.tag,
    status: row.status,
  }

  return <AnimalForm initialValues={initialValues} mode="edit" />
}
