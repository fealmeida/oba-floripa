import type { AnimalRow } from './types'

/** Cores por tag (derivadas no código) */
const TAG_COLORS: Record<string, string> = {
  Destaque: '#FF5500',
  Nova: '#10B981',
  Urgente: '#EF4444',
  Popular: '#FFB800',
}

/** Accent por tipo (derivado no código) */
const ACCENT_BY_TYPE: Record<string, string> = {
  cachorro: '#FF5500',
  gato: '#10B981',
}

/** Card background por tag (derivado no código) */
const CARD_BG_BY_TAG: Record<string, string> = {
  Destaque: 'from-[#FFF0E6] to-[#FFE4CC]',
  Nova: 'from-[#E6FFF5] to-[#CCFFE8]',
  Urgente: 'from-[#FFF0E6] to-[#FFDDD5]',
  Popular: 'from-[#FFFBE6] to-[#FFF2CC]',
}

/** Card background por tipo quando não há tag */
const CARD_BG_BY_TYPE: Record<string, string> = {
  cachorro: 'from-[#F0E6FF] to-[#E4CCFF]',
  gato: 'from-[#FFF0F6] to-[#FFCCE6]',
}

const DEFAULT_CARD_BG = 'from-[#FFF5EC] to-[#FFE4CC]'

/**
 * Formato esperado pelos componentes da home (Animals, AdoptionModal).
 * id pode ser string (UUID) ou number (mock).
 * Cores (tagColor, cardBg, accent) não vêm do banco; use getColorsForAnimal(tag, type).
 */
export type AnimalForUI = {
  id: string | number
  name: string
  age: string
  type: 'cachorro' | 'gato'
  gender: 'fêmea' | 'macho'
  desc: string
  img: string
  tag: string | null
  status?: AnimalRow['status']
}

/** Cores derivadas apenas no código (tag + type), não do banco */
export type AnimalColors = {
  tagColor: string
  cardBg: string
  accent: string
}

/**
 * Retorna as cores do card/modal a partir de tag e type (regras só no código).
 */
export function getColorsForAnimal(
  tag: string | null,
  type: string
): AnimalColors {
  const tagColor = tag ? TAG_COLORS[tag] ?? '#8B5CF6' : '#8B5CF6'
  const accent = ACCENT_BY_TYPE[type] ?? '#FF5500'
  const cardBg = tag
    ? CARD_BG_BY_TAG[tag] ?? CARD_BG_BY_TYPE[type] ?? DEFAULT_CARD_BG
    : CARD_BG_BY_TYPE[type] ?? DEFAULT_CARD_BG
  return { tagColor, cardBg, accent }
}

/**
 * Converte uma linha da tabela `animais` (Supabase) para o formato da UI.
 * Cores ficam apenas no código; use getColorsForAnimal(animal.tag, animal.type) ao renderizar.
 */
export function mapAnimalRowToUI(row: AnimalRow): AnimalForUI {
  return {
    id: row.id,
    name: row.name,
    age: row.age,
    type: row.type,
    gender: row.gender,
    desc: row.desc,
    img: row.img,
    tag: row.tag,
    status: row.status,
  }
}
