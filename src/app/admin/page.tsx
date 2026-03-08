import { AnimalList } from '@/components/admin/AnimalList'
import { getInitialAnimals } from '@/lib/mock-animals'

export default function AdminPage() {
  const animals = getInitialAnimals()
  return <AnimalList initialAnimals={animals} />
}
