"use server";

import { createClient } from "@/lib/supabase/server";
import type { AdoptionRequestInsert } from "@/lib/supabase/types";

export type SubmitAdoptionPayload = {
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
};

export type SubmitAdoptionResult =
  | { success: true }
  | { success: false; error: string };

export async function submitAdoption(
  payload: SubmitAdoptionPayload,
): Promise<SubmitAdoptionResult> {
  const insert: AdoptionRequestInsert = {
    animal_id: payload.animal_id,
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    address: payload.address.trim(),
    city: payload.city.trim(),
    has_experience: payload.has_experience || null,
    has_other_pets: payload.has_other_pets || null,
    housing_type: payload.housing_type || null,
    message: payload.message?.trim() || null,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("solicitacoes_adocao").insert(insert);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
