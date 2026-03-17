"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminAnimal } from "@/lib/supabase/types";
import { ANIMAL_TYPES, ANIMAL_GENDERS } from "@/lib/mock-animals";
import { createAnimal, updateAnimal } from "@/app/actions/animais";
import { uploadAnimalImage } from "@/app/actions/upload-animal-image";
import { ArrowLeft, Upload, Link as LinkIcon, ZoomIn, ZoomOut } from "lucide-react";

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.1;

const STATUS_OPTIONS: AdminAnimal["status"][] = [
  "disponível",
  "reservado",
  "adotado",
];

export type AnimalFormValues = Omit<AdminAnimal, "id"> & { id?: string };

const defaultValues: AnimalFormValues = {
  name: "",
  age: "",
  type: "cachorro",
  gender: "macho",
  desc: "",
  img: "",
  img_position: "50% 50%",
  img_zoom: 1,
  tag: null,
  status: "disponível",
};

export function AnimalForm({
  initialValues,
  mode,
}: {
  initialValues?: AnimalFormValues | null;
  mode: "new" | "edit";
}) {
  const router = useRouter();
  const [form, setForm] = useState<AnimalFormValues>(
    initialValues ? { ...defaultValues, ...initialValues, img_position: initialValues.img_position ?? "50% 50%", img_zoom: initialValues.img_zoom ?? 1 } : defaultValues,
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropBoxRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);

  const update = (field: keyof AnimalFormValues, value: string | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const imgPosition = form.img_position ?? "50% 50%";
  const imgZoom = Math.max(ZOOM_MIN, typeof form.img_zoom === "number" ? form.img_zoom : 1);
  const setZoom = useCallback((z: number) => {
    const clamped = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
    setForm((prev) => ({ ...prev, img_zoom: clamped }));
  }, []);
  const parsePosition = useCallback((s: string) => {
    const parts = s.split(/\s+/).map((v) => parseFloat(String(v).replace("%", "")) || 50);
    const x = Math.max(0, Math.min(100, parts[0] ?? 50));
    const y = Math.max(0, Math.min(100, parts[1] ?? 50));
    return { x, y };
  }, []);
  const formatPosition = (x: number, y: number) =>
    `${Math.round(Math.max(0, Math.min(100, x)))}% ${Math.round(Math.max(0, Math.min(100, y)))}%`;

  const handleCropPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!cropBoxRef.current) return;
      const { x: posX, y: posY } = parsePosition(imgPosition);
      dragStartRef.current = { x: e.clientX, y: e.clientY, posX, posY };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [imgPosition, parsePosition],
  );
  const handleCropPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStartRef.current || !cropBoxRef.current) return;
      const rect = cropBoxRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      const newX = dragStartRef.current.posX - (dx / w) * 100;
      const newY = dragStartRef.current.posY - (dy / h) * 100;
      update("img_position", formatPosition(newX, newY));
    },
    [update, formatPosition],
  );
  const handleCropPointerUp = useCallback((e: React.PointerEvent) => {
    dragStartRef.current = null;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  useEffect(() => {
    const onPointerUp = () => { dragStartRef.current = null; };
    window.addEventListener("pointerup", onPointerUp);
    return () => window.removeEventListener("pointerup", onPointerUp);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadAnimalImage(formData);
      if (result.success) {
        update("img", result.url);
        update("img_position", "50% 50%");
        setForm((prev) => ({ ...prev, img_zoom: 1 }));
      } else {
        setError(result.error);
      }
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.img?.trim()) {
      setError("Envie uma foto do animal ou use uma URL de imagem.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (mode === "new") {
        const result = await createAnimal({
          name: form.name,
          age: form.age,
          type: form.type,
          gender: form.gender,
          desc: form.desc,
          img: form.img,
          img_position: form.img_position ?? null,
          img_zoom: form.img_zoom ?? 1,
          tag: form.tag,
          status: form.status,
        });
        if (result.success) {
          router.push("/admin");
          return;
        }
        setError(result.error);
      } else {
        if (!form.id) {
          setError("ID do animal não encontrado.");
          return;
        }
        const result = await updateAnimal(form.id, {
          name: form.name,
          age: form.age,
          type: form.type,
          gender: form.gender,
          desc: form.desc,
          img: form.img,
          img_position: form.img_position ?? null,
          img_zoom: form.img_zoom ?? 1,
          tag: form.tag,
          status: form.status,
        });
        if (result.success) {
          router.push("/admin");
          return;
        }
        setError(result.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <Card className="border-[#E5E7EB] bg-white rounded-2xl">
        <CardHeader className="pb-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-[#555] hover:text-[#1A1A1A] text-sm font-medium mb-2 transition-colors"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <ArrowLeft className="size-4" />
            Voltar à listagem
          </Link>
          <h2
            className="text-[#1A1A1A] text-2xl font-bold"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
          >
            {mode === "new" ? "Novo animal" : "Editar animal"}
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold"
              >
                Nome
              </Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ex.: Thor"
                className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="age"
                className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold"
              >
                Idade
              </Label>
              <Input
                id="age"
                required
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                placeholder="Ex.: 2 anos"
                className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="type"
                className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold"
              >
                Tipo
              </Label>
              <Select
                value={form.type}
                onValueChange={(v) => update("type", v)}
              >
                <SelectTrigger
                  id="type"
                  className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ANIMAL_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="gender"
                className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold"
              >
                Gênero
              </Label>
              <Select
                value={form.gender}
                onValueChange={(v) =>
                  update("gender", v as AdminAnimal["gender"])
                }
              >
                <SelectTrigger
                  id="gender"
                  className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ANIMAL_GENDERS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold"
              >
                Status
              </Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  update("status", v as AdminAnimal["status"])
                }
              >
                <SelectTrigger
                  id="status"
                  className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="desc"
              className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold"
            >
              Descrição
            </Label>
            <Textarea
              id="desc"
              required
              value={form.desc}
              onChange={(e) => update("desc", e.target.value)}
              placeholder="Descreva o animal..."
              rows={4}
              className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold">
              Foto do animal
            </Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploadingImage}
            />
            <div className="flex flex-col gap-3">
              {form.img ? (
                <>
                  {/* Área de edição: arraste a foto para enquadrar (moldura tracejada = área do card) */}
                  <div className="space-y-1">
                    <p className="text-xs text-[#666]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      Arraste para enquadrar e use os botões para zoom. A área dentro dos tracejados é a que aparece no card.
                    </p>
                    <div
                      ref={cropBoxRef}
                      className="relative rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#F9F9F9] aspect-[3/2] max-w-sm cursor-grab active:cursor-grabbing select-none touch-none"
                      style={{ aspectRatio: "3/2" }}
                      onPointerDown={handleCropPointerDown}
                      onPointerMove={handleCropPointerMove}
                      onPointerUp={handleCropPointerUp}
                      onPointerLeave={handleCropPointerUp}
                      onPointerCancel={handleCropPointerUp}
                    >
                      <Image
                        src={form.img}
                        alt="Enquadrar foto"
                        fill
                        className="object-cover pointer-events-none"
                        style={{
                          objectPosition: imgPosition,
                          transform: `scale(${imgZoom})`,
                          transformOrigin: imgPosition,
                        }}
                        sizes="(max-width: 384px) 100vw, 384px"
                        unoptimized={form.img.startsWith("blob:")}
                        draggable={false}
                      />
                      {/* Moldura tracejada */}
                      <div
                        className="absolute inset-0 pointer-events-none border-2 border-dashed border-white"
                        style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.25)" }}
                        aria-hidden
                      />
                      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white/90 p-1">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setZoom(imgZoom - ZOOM_STEP)}
                            disabled={imgZoom <= ZOOM_MIN}
                            aria-label="Menos zoom"
                          >
                            <ZoomOut className="size-4 text-[#555]" />
                          </Button>
                          <span className="min-w-[3rem] text-center text-xs font-medium text-[#333]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                            {Math.round(imgZoom * 100)}%
                          </span>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setZoom(imgZoom + ZOOM_STEP)}
                            disabled={imgZoom >= ZOOM_MAX}
                            aria-label="Mais zoom"
                          >
                            <ZoomIn className="size-4 text-[#555]" />
                          </Button>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="rounded-full text-xs"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploadingImage}
                        >
                          {isUploadingImage ? "Enviando..." : "Trocar foto"}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="rounded-full text-xs border-[#E5E7EB]"
                          onClick={() => update("img", "")}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Preview exato: como ficará no card */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#1A1A1A]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      Como ficará no card
                    </p>
                    <div className="relative h-64 w-full max-w-[384px] overflow-hidden rounded-xl border-2 border-[#E5E7EB] bg-[#F9F9F9]">
                      <Image
                        src={form.img}
                        alt="Preview no card"
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: imgPosition,
                          transform: `scale(${imgZoom})`,
                          transformOrigin: imgPosition,
                        }}
                        sizes="336px"
                        unoptimized={form.img.startsWith("blob:")}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E5E7EB] bg-[#F9F9F9] p-8 text-center cursor-pointer hover:border-[#FF5500]/50 hover:bg-[#FFF5EC]/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) =>
                    e.key === "Enter" && fileInputRef.current?.click()
                  }
                  role="button"
                  tabIndex={0}
                  aria-label="Selecionar foto"
                >
                  <Upload className="size-10 text-[#999]" aria-hidden />
                  <span
                    className="text-sm text-[#555]"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {isUploadingImage
                      ? "Enviando..."
                      : "Clique para enviar uma foto (até 10 MB)"}
                  </span>
                  <span className="text-xs text-[#888]">
                    JPEG, PNG, WebP ou GIF
                  </span>
                </div>
              )}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-sm text-[#555] hover:text-[#FF5500] transition-colors"
                onClick={() => setShowUrlInput((v) => !v)}
              >
                <LinkIcon className="size-4" />
                {showUrlInput
                  ? "Ocultar campo URL"
                  : "Ou use uma URL de imagem"}
              </button>
              {showUrlInput && (
                <Input
                  type="url"
                  value={form.img}
                  onChange={(e) => update("img", e.target.value)}
                  placeholder="https://..."
                  className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="tag"
              className="text-[#1A1A1A] uppercase tracking-widest text-xs font-semibold"
            >
              Tag (opcional)
            </Label>
            <Input
              id="tag"
              value={form.tag ?? ""}
              onChange={(e) => update("tag", e.target.value || null)}
              placeholder="Ex.: Destaque, Nova, Urgente"
              className="rounded-lg border-[#E5E7EB] bg-[#F9F9F9] text-[#1A1A1A]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 pt-6">
          <Link href="/admin">
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-[#E5E7EB] text-[#555]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#FF5500] hover:bg-[#FF5500]/90 text-white border-0"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            {isSubmitting
              ? mode === "new"
                ? "Cadastrando..."
                : "Salvando..."
              : mode === "new"
                ? "Cadastrar"
                : "Salvar"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
