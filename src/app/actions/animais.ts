"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { AnimalInsert, AnimalUpdate } from "@/lib/supabase/types";

export type CreateAnimalResult =
  | { success: true; id: string }
  | { success: false; error: string };
export type UpdateAnimalResult =
  | { success: true }
  | { success: false; error: string };
export type DeleteAnimalResult =
  | { success: true }
  | { success: false; error: string };

export async function createAnimal(
  payload: Omit<AnimalInsert, "id">,
): Promise<CreateAnimalResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("animais")
    .insert({
      name: payload.name.trim(),
      age: payload.age.trim(),
      type: payload.type,
      gender: payload.gender,
      desc: payload.desc.trim(),
      img: payload.img.trim(),
      img_position: payload.img_position?.trim() || null,
      img_zoom: payload.img_zoom ?? 1,
      tag: payload.tag?.trim() || null,
      status: payload.status ?? "disponível",
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, id: data.id };
}

export async function updateAnimal(
  id: string,
  payload: AnimalUpdate,
): Promise<UpdateAnimalResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("animais")
    .update({
      ...(payload.name !== undefined && { name: payload.name.trim() }),
      ...(payload.age !== undefined && { age: payload.age.trim() }),
      ...(payload.type !== undefined && { type: payload.type }),
      ...(payload.gender !== undefined && { gender: payload.gender }),
      ...(payload.desc !== undefined && { desc: payload.desc.trim() }),
      ...(payload.img !== undefined && { img: payload.img.trim() }),
      ...(payload.img_position !== undefined && {
        img_position: payload.img_position?.trim() || null,
      }),
      ...(payload.img_zoom !== undefined && { img_zoom: payload.img_zoom }),
      ...(payload.tag !== undefined && { tag: payload.tag?.trim() || null }),
      ...(payload.status !== undefined && { status: payload.status }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteAnimal(id: string): Promise<DeleteAnimalResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("animais").delete().eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}
