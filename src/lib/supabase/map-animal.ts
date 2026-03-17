import type { AnimalRow } from "./types";

/** Paletas de cores para cards - independentes da tag, escolhidas por id (aleatório estável) */
const CARD_PALETTES: Array<{
  tagColor: string;
  cardBg: string;
  accent: string;
}> = [
  {
    tagColor: "#FF5500",
    cardBg: "from-[#FFF0E6] to-[#FFE4CC]",
    accent: "#FF5500",
  },
  {
    tagColor: "#10B981",
    cardBg: "from-[#E6FFF5] to-[#CCFFE8]",
    accent: "#10B981",
  },
  {
    tagColor: "#EF4444",
    cardBg: "from-[#FFF0E6] to-[#FFDDD5]",
    accent: "#EF4444",
  },
  {
    tagColor: "#FFB800",
    cardBg: "from-[#FFFBE6] to-[#FFF2CC]",
    accent: "#FFB800",
  },
  {
    tagColor: "#8B5CF6",
    cardBg: "from-[#F0E6FF] to-[#E4CCFF]",
    accent: "#8B5CF6",
  },
  {
    tagColor: "#EC4899",
    cardBg: "from-[#FFF0F6] to-[#FFCCE6]",
    accent: "#EC4899",
  },
  {
    tagColor: "#06B6D4",
    cardBg: "from-[#E6F7FF] to-[#CCF0FF]",
    accent: "#06B6D4",
  },
  {
    tagColor: "#F97316",
    cardBg: "from-[#FFF7ED] to-[#FFEDD5]",
    accent: "#F97316",
  },
];

/**
 * Hash simples e estável para string ou number (id do animal).
 * Usado para escolher paleta de cores sempre igual para o mesmo animal.
 */
function hashId(id: string | number): number {
  const s = String(id);
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h = (h << 5) - h + c;
    h = h & h;
  }
  return Math.abs(h);
}

/**
 * Formato esperado pelos componentes da home (Animals, AdoptionModal).
 * Cores vêm de getColorsForAnimal(animal.id, animal.tag, animal.type) — estáveis por id.
 */
export type AnimalForUI = {
  id: string | number;
  name: string;
  age: string;
  type: "cachorro" | "gato";
  gender: "fêmea" | "macho";
  desc: string;
  img: string;
  img_position?: string | null;
  img_zoom?: number | null;
  tag: string | null;
  status?: AnimalRow["status"];
};

export type AnimalColors = {
  tagColor: string;
  cardBg: string;
  accent: string;
};

/**
 * Retorna as cores do card/modal: independentes da tag, estáveis por animal (por id).
 * A tag só define o texto do badge; a cor do card vem da paleta “aleatória” por id.
 */
export function getColorsForAnimal(
  id: string | number,
  tag: string | null,
  type: string,
): AnimalColors {
  const index = hashId(id) % CARD_PALETTES.length;
  const palette = CARD_PALETTES[index];
  return {
    tagColor: palette.tagColor,
    cardBg: palette.cardBg,
    accent: palette.accent,
  };
}

/**
 * Converte uma linha da tabela `animais` (Supabase) para o formato da UI.
 * Cores ficam apenas no código; use getColorsForAnimal(animal.id, animal.tag, animal.type) ao renderizar.
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
    img_position: row.img_position ?? null,
    img_zoom: row.img_zoom ?? 1,
    tag: row.tag,
    status: row.status,
  };
}
