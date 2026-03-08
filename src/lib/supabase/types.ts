/**
 * Tipos do banco Supabase (OBA Floripa).
 * Alinhados às tabelas animais e solicitacoes_adocao.
 * Para regenerar a partir do projeto: npx supabase gen types typescript --project-id SEU_PROJECT_ID > src/lib/supabase/types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AnimalType = 'cachorro' | 'gato'
export type AnimalGender = 'fêmea' | 'macho'
export type AnimalStatus = 'disponível' | 'adotado' | 'reservado'
export type SolicitacaoStatus = 'pendente' | 'em_analise' | 'aprovada' | 'rejeitada'

export interface Database {
  public: {
    Tables: {
      animais: {
        Row: {
          id: string
          name: string
          age: string
          type: AnimalType
          gender: AnimalGender
          desc: string
          img: string
          tag: string | null
          status: AnimalStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          age: string
          type: AnimalType
          gender: AnimalGender
          desc: string
          img: string
          tag?: string | null
          status?: AnimalStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: string
          type?: AnimalType
          gender?: AnimalGender
          desc?: string
          img?: string
          tag?: string | null
          status?: AnimalStatus
          created_at?: string
          updated_at?: string
        }
      }
      solicitacoes_adocao: {
        Row: {
          id: string
          animal_id: string
          nome: string
          email: string
          telefone: string
          endereco: string
          cidade: string
          tem_experiencia: string | null
          tem_outros_pets: string | null
          tipo_moradia: string | null
          mensagem: string | null
          status: SolicitacaoStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          animal_id: string
          nome: string
          email: string
          telefone: string
          endereco: string
          cidade: string
          tem_experiencia?: string | null
          tem_outros_pets?: string | null
          tipo_moradia?: string | null
          mensagem?: string | null
          status?: SolicitacaoStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          animal_id?: string
          nome?: string
          email?: string
          telefone?: string
          endereco?: string
          cidade?: string
          tem_experiencia?: string | null
          tem_outros_pets?: string | null
          tipo_moradia?: string | null
          mensagem?: string | null
          status?: SolicitacaoStatus
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      animal_type: AnimalType
      animal_gender: AnimalGender
      animal_status: AnimalStatus
      solicitacao_status: SolicitacaoStatus
    }
  }
}

/** Linha da tabela animais (Row) */
export type AnimalRow = Database['public']['Tables']['animais']['Row']

/** Payload para inserir animal (Insert) */
export type AnimalInsert = Database['public']['Tables']['animais']['Insert']

/** Linha da tabela solicitacoes_adocao (Row) */
export type SolicitacaoRow = Database['public']['Tables']['solicitacoes_adocao']['Row']

/** Payload para inserir solicitação (formulário de adoção) */
export type SolicitacaoInsert = Database['public']['Tables']['solicitacoes_adocao']['Insert']
