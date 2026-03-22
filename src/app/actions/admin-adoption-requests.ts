"use server";

import { createClient } from "@/lib/supabase/server";
import type {
  AdoptionRequestStatus,
  AdoptionRequestUpdate,
} from "@/lib/supabase/types";

export type AdoptionRequestListItem = {
  id: string;
  animal_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  message: string | null;
  created_at: string;
  updated_at: string;
  read: boolean;
  status: AdoptionRequestStatus;
  admin_comment: string | null;
  animal_name: string;
  animal_type: "cachorro" | "gato";
};

export type FetchAdoptionRequestsResult =
  | { success: true; data: AdoptionRequestListItem[] }
  | { success: false; error: string };

export async function fetchAdoptionRequests(): Promise<FetchAdoptionRequestsResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("solicitacoes_adocao")
    .select(
      `
      id,
      animal_id,
      name,
      email,
      phone,
      address,
      city,
      message,
      created_at,
      updated_at,
      read,
      status,
      admin_comment,
      animais (
        name,
        type
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  const list: AdoptionRequestListItem[] = (data ?? []).map((row: any) => {
    const animais = row.animais;
    return {
      id: row.id,
      animal_id: row.animal_id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      address: row.address,
      city: row.city,
      message: row.message ?? null,
      created_at: row.created_at,
      updated_at: row.updated_at,
      read: row.read ?? false,
      status: row.status,
      admin_comment: row.admin_comment ?? null,
      animal_name: animais?.name ?? "—",
      animal_type: animais?.type ?? "cachorro",
    };
  });

  return { success: true, data: list };
}

export type UpdateAdoptionRequestResult =
  | { success: true }
  | { success: false; error: string };

export async function updateAdoptionRequest(
  id: string,
  payload: AdoptionRequestUpdate,
): Promise<UpdateAdoptionRequestResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("solicitacoes_adocao")
    .update(payload)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
