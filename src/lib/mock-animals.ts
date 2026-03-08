/**
 * Tipo do animal para o painel admin (e futura tabela Supabase).
 * type: apenas 'cachorro' ou 'gato'; gender: fêmea ou macho.
 */
export type Animal = {
  id: number
  name: string
  age: string
  type: 'cachorro' | 'gato'
  gender: 'fêmea' | 'macho'
  desc: string
  img: string
  tag: string | null
  status: 'disponível' | 'adotado' | 'reservado'
}

/** Valores de tipo (apenas cachorro ou gato) */
export const ANIMAL_TYPES = ['cachorro', 'gato'] as const

/** Valores de gênero */
export const ANIMAL_GENDERS = ['fêmea', 'macho'] as const

/** Lista inicial de animais mock (fonte única para admin na Fase 2B) */
export function getInitialAnimals(): Animal[] {
  return [
    { id: 1, name: 'Thor', age: '2 anos', type: 'cachorro', gender: 'macho', desc: 'Brincalhão, cheio de energia e ama crianças. Thor espera por alguém que acompanhe sua animação.', img: 'https://images.unsplash.com/photo-1651212508936-dfb6f6ea3d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBwdXBweSUyMGhhcHB5fGVufDF8fHx8MTc3MjYyMzExOXww&ixlib=rb-4.1.0&q=80&w=1080', tag: 'Destaque', status: 'disponível' },
    { id: 2, name: 'Luna', age: '3 anos', type: 'gato', gender: 'fêmea', desc: 'Serena e independente, Luna adora uma boa sessão de carinho no fim do dia.', img: 'https://images.unsplash.com/photo-1769634847861-69ee4fa8c343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBhZG9wdGlvbiUyMHNoZWx0ZXIlMjBjdXRlJTIwa2l0dGVufGVufDF8fHx8MTc3MjY0NzY2MHww&ixlib=rb-4.1.0&q=80&w=1080', tag: 'Nova', status: 'disponível' },
    { id: 3, name: 'Zeus', age: '4 anos', type: 'cachorro', gender: 'macho', desc: 'Tranquilo, leal e muito carinhoso. Zeus é perfeito para quem busca um companheiro fiel.', img: 'https://images.unsplash.com/photo-1671572418326-69416b142404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGRvZyUyMHJlc2N1ZSUyMHBvcnRyYWl0JTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzI2NDc2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080', tag: null, status: 'disponível' },
    { id: 4, name: 'Mel', age: '1 ano', type: 'cachorro', gender: 'fêmea', desc: 'Doce como o nome, Mel está pronta para trazer alegria para qualquer lar que a receba.', img: 'https://images.unsplash.com/photo-1762893620918-af52d50a7dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMGJyZWVkJTIwZG9nJTIwcGxheWZ1bCUyMG91dGRvb3J8ZW58MXx8fHwxNzcyNjQ3NjY1fDA&ixlib=rb-4.1.0&q=80&w=1080', tag: 'Urgente', status: 'disponível' },
    { id: 5, name: 'Nala', age: '5 anos', type: 'gato', gender: 'fêmea', desc: 'Elegante e curiosa, Nala observa tudo com seus olhos de amêndoa. Adora janelas.', img: 'https://images.unsplash.com/photo-1708417250704-770feaf07660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwY2F0JTIwc3dlZXQlMjBsb29raW5nfGVufDF8fHx8MTc3MjY0NzY2M3ww&ixlib=rb-4.1.0&q=80&w=1080', tag: null, status: 'disponível' },
    { id: 6, name: 'Simba', age: '2 anos', type: 'gato', gender: 'macho', desc: 'Laranjinha e cheio de personalidade. Simba vai animar qualquer ambiente com suas travessuras.', img: 'https://images.unsplash.com/photo-1768523506095-deb25e8f13a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGNhdCUyMGN1cmlvdXMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI2NDc2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080', tag: 'Popular', status: 'disponível' },
    { id: 7, name: 'Bolt', age: '6 meses', type: 'cachorro', gender: 'macho', desc: 'Cheio de energia e amor para dar. Bolt precisa de espaço para brincar e correr.', img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXNreSUyMHB1cHB5JTIwYmx1ZSUyMGV5ZXN8ZW58MXx8fHwxNzI2Mzg5MTI1fDA&ixlib=rb-4.1.0&q=80&w=1080', tag: 'Nova', status: 'disponível' },
    { id: 8, name: 'Mia', age: '4 anos', type: 'gato', gender: 'fêmea', desc: 'Calma e afetuosa, Mia é ideal para quem busca uma companhia tranquila e leal.', img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTcyNjM4OTEyNXww&ixlib=rb-4.1.0&q=80&w=1080', tag: null, status: 'disponível' },
    { id: 9, name: 'Max', age: '3 anos', type: 'cachorro', gender: 'macho', desc: 'Protetor e amoroso. Max é o guardião perfeito para sua família.', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3MjYzODkxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080', tag: 'Destaque', status: 'disponível' },
    { id: 10, name: 'Belinha', age: '2 anos', type: 'cachorro', gender: 'fêmea', desc: 'Meiga e sociável, adora crianças e outros pets. Belinha é pura alegria!', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBkb2clMjBoYXBweXxlbnwxfHx8fDE3MjYzODkxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080', tag: 'Popular', status: 'disponível' },
  ]
}

/** Retorna o próximo ID sugerido (para formulário "novo") */
export function getNextId(animals: Animal[]): number {
  if (animals.length === 0) return 1
  return Math.max(...animals.map((a) => a.id)) + 1
}
