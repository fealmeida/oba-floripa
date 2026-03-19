/**
 * Tipos do Supabase. Para clientes, importe do arquivo específico:
 * - Browser: import { createClient } from '@/lib/supabase/client'
 * - Servidor: import { createClient } from '@/lib/supabase/server'
 */
export type {
  Database,
  Json,
  AnimalRow,
  AnimalInsert,
  AdoptionRequestRow,
  AdoptionRequestInsert,
  AdoptionRequestStatus,
  AdoptionRequestUpdate,
  AdminAdoptionRequest,
  AnimalType,
  AnimalGender,
  AnimalStatus,
} from './types'
export type { AnimalForUI, AnimalColors } from './map-animal'
export { mapAnimalRowToUI, getColorsForAnimal } from './map-animal'
