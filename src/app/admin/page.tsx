import { AnimalList } from '@/components/admin/AnimalList'
import { createClient } from '@/lib/supabase/server'
import type { AdminAnimal } from '@/lib/supabase/types'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: rows, error } = await supabase
    .from('animais')
    .select('id, name, age, type, gender, desc, img, img_position, img_zoom, tag, status')
    .order('created_at', { ascending: false })

  const animals: AdminAnimal[] = error
    ? []
    : (rows ?? []).map((r) => ({
        id: r.id,
        name: r.name,
        age: r.age,
        type: r.type,
        gender: r.gender,
        desc: r.desc,
        img: r.img,
        img_position: r.img_position ?? null,
        img_zoom: r.img_zoom ?? 1,
        tag: r.tag,
        status: r.status,
      }))

  return <AnimalList initialAnimals={animals} />
}
