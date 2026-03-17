"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimalCardLayout } from "@/components/AnimalCardLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { AdminAnimal } from "@/lib/supabase/types";
import { ANIMAL_TYPES } from "@/lib/mock-animals";
import { deleteAnimal } from "@/app/actions/animais";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

const STATUS_LABELS: Record<AdminAnimal["status"], string> = {
  disponível: "Disponível",
  adotado: "Adotado",
  reservado: "Reservado",
};

export function AnimalList({
  initialAnimals,
}: {
  initialAnimals: AdminAnimal[];
}) {
  const router = useRouter();
  const [animals, setAnimals] = useState<AdminAnimal[]>(initialAnimals);
  const [searchName, setSearchName] = useState("");
  const [filterType, setFilterType] = useState<string>("todos");
  const [deleteTarget, setDeleteTarget] = useState<AdminAnimal | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setAnimals(initialAnimals);
  }, [initialAnimals]);

  const filtered = useMemo(() => {
    return animals.filter((a) => {
      const matchName =
        !searchName.trim() ||
        a.name.toLowerCase().includes(searchName.trim().toLowerCase());
      const matchType = filterType === "todos" || a.type === filterType;
      return matchName && matchType;
    });
  }, [animals, searchName, filterType]);

  const handleDelete = (animal: AdminAnimal) => {
    setDeleteTarget(animal);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const result = await deleteAnimal(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
    if (result.success) router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Título e ações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2
          className="text-[#1A1A1A] text-2xl font-bold"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
        >
          Animais para adoção
        </h2>
        <Link href="/admin/animais/novo">
          <Button
            className="rounded-full bg-[#FF5500] hover:bg-[#FF5500]/90 text-white border-0"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            <Plus className="size-4" />
            Novo animal
          </Button>
        </Link>
      </div>

      {/* Busca e filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#777]"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Buscar por nome..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="pl-9 rounded-full border-[#E5E7EB] bg-white text-[#1A1A1A] placeholder:text-[#888]"
            aria-label="Buscar por nome do animal"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px] rounded-full border-[#E5E7EB] bg-white text-[#1A1A1A]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os tipos</SelectItem>
            {ANIMAL_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista: cards */}
      {filtered.length === 0 ? (
        <Card className="border-[#E5E7EB] bg-white rounded-2xl">
          <CardContent className="py-12 text-center">
            <p
              className="text-[#555] mb-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {animals.length === 0
                ? "Nenhum animal cadastrado ainda."
                : "Nenhum animal encontrado com os filtros aplicados."}
            </p>
            {(searchName || filterType !== "todos") && (
              <Button
                variant="outline"
                className="rounded-full border-[#FF5500] text-[#FF5500] hover:bg-[#FF5500]/10"
                onClick={() => {
                  setSearchName("");
                  setFilterType("todos");
                }}
              >
                Limpar filtros
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((animal) => (
            <Card
              key={animal.id}
              className="border-[#E5E7EB] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <AnimalCardLayout
                image={{
                  src: animal.img,
                  alt: animal.name,
                  img_zoom: animal.img_zoom,
                  img_position: animal.img_position,
                }}
                imageOverlay={
                  animal.tag ? (
                    <Badge
                      className="absolute top-4 left-4 rounded-full text-white border-0 text-xs font-semibold uppercase tracking-widest"
                      style={{ backgroundColor: "#FF5500" }}
                    >
                      {animal.tag}
                    </Badge>
                  ) : undefined
                }
              >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-[#1A1A1A] text-lg font-bold truncate"
                    style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  >
                    {animal.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="rounded-full text-xs font-medium text-[#555] bg-[#E5E7EB] border-0"
                  >
                    {animal.gender === "fêmea" ? "Fêmea" : "Macho"}
                  </Badge>
                </div>
                <p className="text-[#777] text-sm">
                  {animal.age} ·{" "}
                  {animal.type.charAt(0).toUpperCase() + animal.type.slice(1)} ·{" "}
                  {STATUS_LABELS[animal.status]}
                </p>
              </CardHeader>
              <CardContent className="py-0">
                <p className="text-[#555] text-sm line-clamp-2">
                  {animal.desc}
                </p>
              </CardContent>
              <CardFooter className="pt-4 flex gap-2">
                <Link href={`/admin/animais/${animal.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full border-[#FF5500] text-[#FF5500] hover:bg-[#FF5500]/10"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    <Pencil className="size-4" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#E5E7EB] text-[#777] hover:bg-[#F9F9F9] hover:text-[#d4183d]"
                  onClick={() => handleDelete(animal)}
                  aria-label={`Excluir ${animal.name}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </CardFooter>
              </AnimalCardLayout>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent className="rounded-2xl border-[#E5E7EB]">
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: "Syne, sans-serif" }}>
              Excluir animal?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget && (
                <>
                  Tem certeza que deseja excluir{" "}
                  <strong>{deleteTarget.name}</strong>? Esta ação não pode ser
                  desfeita.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full" disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-full bg-[#d4183d] hover:bg-[#d4183d]/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
