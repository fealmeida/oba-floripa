"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Check, Loader2 } from "lucide-react";
import { ANIMAL_TYPES } from "@/lib/mock-animals";
import type { AdoptionRequestStatus } from "@/lib/supabase/types";
import { updateAdoptionRequest } from "@/app/actions/admin-adoption-requests";

/** Gera link wa.me para número brasileiro (aceita (48) 99999-1111 ou 5548999991111) */
function getWhatsAppUrl(telefone: string): string {
  const digits = telefone.replace(/\D/g, "");
  const withCountry = digits.length === 10 || digits.length === 11 ? `55${digits}` : digits;
  return `https://wa.me/${withCountry}`;
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export type AdoptionRequestListItem = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  mensagem: string | null;
  created_at: string;
  read: boolean;
  status: AdoptionRequestStatus;
  admin_comment: string | null;
  animal_name: string;
  animal_type: "cachorro" | "gato";
};

// UI: Portuguese labels for adoption request status (code is English)
const STATUS_LABELS: Record<AdoptionRequestStatus, string> = {
  pending: "Pendente",
  in_review: "Em análise",
  responded: "Respondida",
  approved: "Aprovada",
  rejected: "Rejeitada",
  cancelled: "Cancelada",
};

const STATUS_COLORS: Record<AdoptionRequestStatus, string> = {
  pending: "bg-[#E5E7EB] text-[#555]",
  in_review: "bg-amber-100 text-amber-800",
  responded: "bg-emerald-100 text-emerald-800",
  approved: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-[#E5E7EB] text-[#666]",
};

const STATUS_OPTIONS: AdoptionRequestStatus[] = [
  "pending",
  "in_review",
  "responded",
  "approved",
  "rejected",
  "cancelled",
];

function formatDate(s: string) {
  try {
    const d = new Date(s);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return s;
  }
}

export function AdoptionRequestsList({
  initialRequests,
}: {
  initialRequests: AdoptionRequestListItem[];
}) {
  const [requests, setRequests] =
    useState<AdoptionRequestListItem[]>(initialRequests);
  const [searchNome, setSearchNome] = useState("");
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [filterRead, setFilterRead] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [commentEdits, setCommentEdits] = useState<Record<string, string>>({});
  const [loadingReadId, setLoadingReadId] = useState<string | null>(null);
  const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null);
  const [loadingCommentId, setLoadingCommentId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return requests.filter((s) => {
      const matchNome =
        !searchNome.trim() ||
        s.nome.toLowerCase().includes(searchNome.trim().toLowerCase());
      const matchTipo =
        filterTipo === "todos" || s.animal_type === filterTipo;
      const matchRead =
        filterRead === "all" ||
        (filterRead === "read" && s.read) ||
        (filterRead === "unread" && !s.read);
      const matchStatus =
        filterStatus === "todos" || s.status === filterStatus;
      return matchNome && matchTipo && matchRead && matchStatus;
    });
  }, [
    requests,
    searchNome,
    filterTipo,
    filterRead,
    filterStatus,
  ]);

  const clearError = () => setActionError(null);

  const toggleRead = async (id: string) => {
    const s = requests.find((r) => r.id === id);
    if (!s) return;
    setLoadingReadId(id);
    setActionError(null);
    const nextRead = !s.read;
    const result = await updateAdoptionRequest(id, { read: nextRead });
    setLoadingReadId(null);
    if (result.success) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, read: nextRead } : r))
      );
    } else {
      setActionError(result.error ?? "Erro ao atualizar.");
    }
  };

  const setStatus = async (id: string, status: AdoptionRequestStatus) => {
    setLoadingStatusId(id);
    setActionError(null);
    const result = await updateAdoptionRequest(id, { status });
    setLoadingStatusId(null);
    if (result.success) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } else {
      setActionError(result.error ?? "Erro ao atualizar status.");
    }
  };

  const setComment = (id: string, value: string) => {
    setCommentEdits((prev) => ({ ...prev, [id]: value }));
  };

  const saveComment = async (id: string) => {
    const value = commentEdits[id] ?? "";
    setLoadingCommentId(id);
    setActionError(null);
    const result = await updateAdoptionRequest(id, {
      admin_comment: value || null,
    });
    setLoadingCommentId(null);
    if (result.success) {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, admin_comment: value || null } : r
        )
      );
      setCommentEdits((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      setActionError(result.error ?? "Erro ao salvar comentário.");
    }
  };

  const commentValue = (s: AdoptionRequestListItem) =>
    commentEdits[s.id] ?? s.admin_comment ?? "";

  return (
    <div className="space-y-6">
      <h2
        className="text-[#1A1A1A] text-2xl font-bold"
        style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
      >
        Solicitações de adoção
      </h2>

      {actionError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800"
        >
          <p className="text-sm font-medium">{actionError}</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0 text-red-700 hover:bg-red-100"
            onClick={clearError}
            aria-label="Fechar mensagem de erro"
          >
            Fechar
          </Button>
        </div>
      )}

      {/* Busca e filtros */}
      <div className="flex flex-col gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#777]"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Buscar por nome do solicitante..."
            value={searchNome}
            onChange={(e) => setSearchNome(e.target.value)}
            className="pl-9 rounded-full border-[#E5E7EB] bg-white text-[#1A1A1A] placeholder:text-[#888]"
            aria-label="Buscar por nome"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Select value={filterTipo} onValueChange={setFilterTipo}>
            <SelectTrigger
              className="rounded-full border-[#E5E7EB] bg-white text-[#1A1A1A]"
              aria-label="Filtrar por tipo do animal"
            >
              <SelectValue placeholder="Tipo do animal" />
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
          <Select value={filterRead} onValueChange={setFilterRead}>
            <SelectTrigger
              className="rounded-full border-[#E5E7EB] bg-white text-[#1A1A1A]"
              aria-label="Filtrar por lida"
            >
              <SelectValue placeholder="Lida" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="read">Lidas</SelectItem>
              <SelectItem value="unread">Não lidas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger
              className="rounded-full border-[#E5E7EB] bg-white text-[#1A1A1A]"
              aria-label="Filtrar por status"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <Card className="border-[#E5E7EB] bg-white rounded-2xl">
          <CardContent className="py-12 text-center">
            <p
              className="text-[#555] mb-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {requests.length === 0
                ? "Nenhuma solicitação ainda."
                : "Nenhuma solicitação encontrada com os filtros aplicados."}
            </p>
            {(searchNome || filterTipo !== "todos" || filterRead !== "all" || filterStatus !== "todos") && (
              <Button
                variant="outline"
                className="rounded-full border-[#FF5500] text-[#FF5500] hover:bg-[#FF5500]/10"
                onClick={() => {
                  setSearchNome("");
                  setFilterTipo("todos");
                  setFilterRead("all");
                  setFilterStatus("todos");
                }}
              >
                Limpar filtros
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((s) => (
            <Card
              key={s.id}
              className={`border rounded-2xl overflow-hidden transition-shadow ${
                s.read
                  ? "border-[#E5E7EB] bg-white"
                  : "border-[#FF5500]/30 bg-[#FFF9F6]"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                  <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                    <h3
                      className="text-[#1A1A1A] font-bold break-words"
                      style={{ fontFamily: "Syne, sans-serif", lineHeight: 1.3 }}
                    >
                      {s.nome}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={`rounded-full text-xs shrink-0 ${STATUS_COLORS[s.status]}`}
                    >
                      {STATUS_LABELS[s.status]}
                    </Badge>
                  </div>
                  <span className="text-[#777] text-sm shrink-0">
                    {formatDate(s.created_at)}
                  </span>
                </div>
                <p className="text-[#555] text-sm mt-1">
                  <span className="font-semibold text-[#1A1A1A] text-base">
                    {s.animal_name}
                  </span>
                  {" · "}
                  {s.animal_type === "cachorro" ? "Cachorro" : "Gato"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <p className="text-[#555]">
                    <span className="text-[#777]">Email:</span> {s.email}
                  </p>
                  <p className="text-[#555]">
                    <span className="text-[#777]">Telefone:</span>{" "}
                    <a
                      href={getWhatsAppUrl(s.telefone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#20BD5C] font-medium underline underline-offset-2"
                      aria-label={`Abrir WhatsApp de ${s.nome}`}
                    >
                      <WhatsAppIcon size={16} />
                      {s.telefone}
                    </a>
                  </p>
                  <p className="text-[#555] sm:col-span-2">
                    <span className="text-[#777]">Cidade:</span> {s.cidade}
                  </p>
                </div>
                {s.mensagem && (
                  <p className="text-[#555] text-sm border-l-2 border-[#E5E7EB] pl-3">
                    {s.mensagem.length > 120
                      ? `${s.mensagem.slice(0, 120)}...`
                      : s.mensagem}
                  </p>
                )}

                {/* Ações: read + status */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E5E7EB]">
                  <Button
                    type="button"
                    variant={s.read ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full h-8 text-xs min-w-[88px] ${
                      s.read
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600"
                        : ""
                    }`}
                    onClick={() => toggleRead(s.id)}
                    disabled={loadingReadId === s.id}
                    aria-busy={loadingReadId === s.id}
                    aria-label={s.read ? "Marcar como não lida" : "Marcar como lida"}
                  >
                    {loadingReadId === s.id ? (
                      <Loader2 className="size-3.5 mr-1 animate-spin" aria-hidden />
                    ) : !s.read ? (
                      <Check className="size-3.5 mr-1" aria-hidden />
                    ) : null}
                    {loadingReadId === s.id ? "Salvando…" : s.read ? "Lido" : "Marcar como lida"}
                  </Button>
                  <div className="flex items-center gap-1.5">
                    <Select
                      value={s.status}
                      onValueChange={(v: string) =>
                        setStatus(s.id, v as AdoptionRequestStatus)
                      }
                      disabled={loadingStatusId === s.id}
                    >
                      <SelectTrigger
                        className="w-[160px] h-8 rounded-full text-xs border-[#E5E7EB]"
                        aria-label="Alterar status da solicitação"
                        aria-busy={loadingStatusId === s.id}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {STATUS_LABELS[opt]}
                        </SelectItem>
                      ))}
                      </SelectContent>
                    </Select>
                    {loadingStatusId === s.id && (
                      <Loader2
                        className="size-4 animate-spin text-[#FF5500] shrink-0"
                        aria-hidden
                      />
                    )}
                  </div>
                </div>

                {/* Admin comment */}
                <div className="space-y-2">
                  <label
                    className="flex items-center gap-1.5 text-sm font-medium text-[#555]"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    <MessageSquare className="size-4" />
                    Comentário do admin
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Adicione um comentário interno..."
                      value={commentValue(s)}
                      onChange={(e) => setComment(s.id, e.target.value)}
                      className="rounded-xl border-[#E5E7EB] bg-white text-sm flex-1"
                      aria-label="Comentário do admin"
                      disabled={loadingCommentId === s.id}
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="rounded-full bg-[#FF5500] hover:bg-[#FF5500]/90 text-white shrink-0 min-w-[72px]"
                      onClick={() => saveComment(s.id)}
                      disabled={loadingCommentId === s.id}
                      aria-busy={loadingCommentId === s.id}
                      aria-label="Salvar comentário"
                    >
                      {loadingCommentId === s.id ? (
                        <>
                          <Loader2 className="size-3.5 mr-1.5 animate-spin" aria-hidden />
                          Salvando…
                        </>
                      ) : (
                        "Salvar"
                      )}
                    </Button>
                  </div>
                  {s.admin_comment && (
                    <p className="text-[#555] text-sm bg-[#F5F5F5] rounded-lg px-3 py-2">
                      {s.admin_comment}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
