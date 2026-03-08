import { notFound } from 'next/navigation'
import { AnimalForm } from '@/components/admin/AnimalForm'
import { getInitialAnimals } from '@/lib/mock-animals'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditAnimalPage({ params }: Props) {
  const { id } = await params
  const idNum = Number(id)
  if (Number.isNaN(idNum)) notFound()

  const animals = getInitialAnimals()
  const animal = animals.find((a) => a.id === idNum)
  if (!animal) notFound()

  const initialValues = {
    id: animal.id,
    name: animal.name,
    age: animal.age,
    type: animal.type,
    gender: animal.gender,
    desc: animal.desc,
    img: animal.img,
    tag: animal.tag,
    status: animal.status,
  }

  return <AnimalForm initialValues={initialValues} mode="edit" />
}
