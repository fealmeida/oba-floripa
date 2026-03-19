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
  | Json[];

export type AnimalType = "cachorro" | "gato";
export type AnimalGender = "fêmea" | "macho";
export type AnimalStatus = "disponível" | "adotado" | "reservado";
export type AdoptionRequestStatus =
  | "pending"
  | "in_review"
  | "approved"
  | "rejected"
  | "responded"
  | "cancelled";

export interface Database {
  public: {
    Tables: {
      animais: {
        Row: {
          id: string;
          name: string;
          age: string;
          type: AnimalType;
          gender: AnimalGender;
          desc: string;
          img: string;
          img_position: string | null;
          img_zoom: number;
          tag: string | null;
          status: AnimalStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          age: string;
          type: AnimalType;
          gender: AnimalGender;
          desc: string;
          img: string;
          img_position?: string | null;
          img_zoom?: number;
          tag?: string | null;
          status?: AnimalStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          age?: string;
          type?: AnimalType;
          gender?: AnimalGender;
          desc?: string;
          img?: string;
          img_position?: string | null;
          img_zoom?: number;
          tag?: string | null;
          status?: AnimalStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
      solicitacoes_adocao: {
        Row: {
          id: string;
          animal_id: string;
          name: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          has_experience: string | null;
          has_other_pets: string | null;
          housing_type: string | null;
          message: string | null;
          status: AdoptionRequestStatus;
          read: boolean;
          admin_comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          animal_id: string;
          name: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          has_experience?: string | null;
          has_other_pets?: string | null;
          housing_type?: string | null;
          message?: string | null;
          status?: AdoptionRequestStatus;
          read?: boolean;
          admin_comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          animal_id?: string;
          name?: string;
          email?: string;
          phone?: string;
          address?: string;
          city?: string;
          has_experience?: string | null;
          has_other_pets?: string | null;
          housing_type?: string | null;
          message?: string | null;
          status?: AdoptionRequestStatus;
          read?: boolean;
          admin_comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      animal_type: AnimalType;
      animal_gender: AnimalGender;
      animal_status: AnimalStatus;
      adoption_request_status: AdoptionRequestStatus;
    };
  };
}

/** Linha da tabela animais (Row) */
export type AnimalRow = Database["public"]["Tables"]["animais"]["Row"];

/** Payload para inserir animal (Insert) */
export type AnimalInsert = Database["public"]["Tables"]["animais"]["Insert"];

/** Payload para atualizar animal (Update) */
export type AnimalUpdate = Database["public"]["Tables"]["animais"]["Update"];

/** Animal no admin (sem timestamps); id é UUID string do Supabase */
export type AdminAnimal = Omit<AnimalRow, "created_at" | "updated_at">;

/** Row for solicitacoes_adocao table */
export type AdoptionRequestRow =
  Database["public"]["Tables"]["solicitacoes_adocao"]["Row"];

/** Insert payload for adoption request (public form) */
export type AdoptionRequestInsert =
  Database["public"]["Tables"]["solicitacoes_adocao"]["Insert"];

/** Update payload for adoption request (admin) */
export type AdoptionRequestUpdate =
  Database["public"]["Tables"]["solicitacoes_adocao"]["Update"];

/** Adoption request in admin list with animal name and type (from join) */
export type AdminAdoptionRequest = AdoptionRequestRow & {
  animal_name: string;
  animal_type: AnimalType;
};
