"use client";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  Heart,
  FileText,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { submitAdocao } from "@/app/actions/submit-adocao";
import { getColorsForAnimal } from "@/lib/supabase";

interface Animal {
  id: string | number;
  name: string;
  type: string;
  gender: string;
  tag?: string | null;
  emoji?: string;
  accent?: string;
  img: string;
  img_position?: string | null;
  img_zoom?: number | null;
}

/** Emoji por tipo: gato → 🐱, cachorro → patinhas 🐾🐾🐾 */
function getEmojiByType(type: string): string {
  if (type === "gato") return "🐱";
  return "🐾";
}

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

export function AdoptionModal({ isOpen, onClose, animal }: AdoptionModalProps) {
  const accent = animal
    ? getColorsForAnimal(animal.id, animal.tag ?? null, animal.type).accent
    : "#FF5500";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    hasExperience: "",
    hasOtherPets: "",
    houseType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animal) return;
    setIsSubmitting(true);
    setSubmitError(null);
    const result = await submitAdocao({
      animal_id: String(animal.id),
      nome: formData.name,
      email: formData.email,
      telefone: formData.phone,
      endereco: formData.address,
      cidade: formData.city,
      tem_experiencia: formData.hasExperience || null,
      tem_outros_pets: formData.hasOtherPets || null,
      tipo_moradia: formData.houseType || null,
      mensagem: formData.message || null,
    });
    setIsSubmitting(false);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSubmitError(null);
      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        hasExperience: "",
        hasOtherPets: "",
        houseType: "",
        message: "",
      });
    }, 3000);
  };

  if (!animal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto relative"
            >
              {/* Header with animal info */}
              <div
                className="relative p-6 pb-8 text-white overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}DD)`,
                }}
              >
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer border-none hover:bg-white/30 transition-colors"
                >
                  <X size={20} className="text-white" />
                </motion.button>

                {/* Animal info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/30 shadow-lg shrink-0">
                    <div
                      className="absolute inset-0"
                      style={{
                        transform: `scale(${Math.max(1, animal.img_zoom ?? 1)})`,
                        transformOrigin: animal.img_position || "50% 40%",
                      }}
                    >
                      <Image
                        src={animal.img}
                        alt={animal.name}
                        fill
                        className="object-cover"
                        style={{ objectPosition: animal.img_position || "50% 40%" }}
                        sizes="80px"
                      />
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-white/80 mb-1"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Solicitação de adoção
                    </p>
                    <h3
                      className="text-white"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "2rem",
                        lineHeight: 1,
                      }}
                    >
                      {getEmojiByType(animal.type)} {animal.name}
                    </h3>
                    <p
                      className="text-white/90 mt-1"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {animal.gender === "fêmea" ? "Fêmea" : "Macho"}
                    </p>
                  </div>
                </div>

                {/* Decorative wave */}
                <svg
                  className="absolute bottom-0 left-0 w-full"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  style={{ height: "40px" }}
                >
                  <path
                    d="M0,0 C300,60 600,60 900,20 L900,120 L0,120 Z"
                    fill="white"
                    opacity="0.3"
                  />
                  <path
                    d="M0,20 C300,80 600,80 1200,40 L1200,120 L0,120 Z"
                    fill="white"
                  />
                </svg>
              </div>

              {/* Form content */}
              <div
                className="p-6 overflow-y-auto"
                style={{ maxHeight: "calc(90vh - 180px)" }}
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <p
                      className="text-[#555] mb-6"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                      }}
                    >
                      Preencha o formulário abaixo para iniciar o processo de
                      adoção. Nossa equipe entrará em contato em até 48 horas!
                      🐾
                    </p>

                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="flex items-center gap-2 text-[#333] mb-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          <User size={16} style={{ color: accent }} />
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9rem",
                          }}
                          placeholder="Seu nome"
                        />
                      </div>

                      <div>
                        <label
                          className="flex items-center gap-2 text-[#333] mb-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          <Mail size={16} style={{ color: accent }} />
                          E-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9rem",
                          }}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="flex items-center gap-2 text-[#333] mb-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          <Phone size={16} style={{ color: accent }} />
                          Telefone/WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9rem",
                          }}
                          placeholder="(48) 99999-9999"
                        />
                      </div>

                      <div>
                        <label
                          className="flex items-center gap-2 text-[#333] mb-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          <MapPin size={16} style={{ color: accent }} />
                          Cidade *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9rem",
                          }}
                          placeholder="Florianópolis"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="flex items-center gap-2 text-[#333] mb-2"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        <Home size={16} style={{ color: accent }} />
                        Endereço *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.9rem",
                        }}
                        placeholder="Rua, número, bairro"
                      />
                    </div>

                    {/* Additional Questions */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="flex items-center gap-2 text-[#333] mb-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          <Heart size={16} style={{ color: accent }} />
                          Tem experiência com pets? *
                        </label>
                        <select
                          name="hasExperience"
                          value={formData.hasExperience}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9rem",
                          }}
                        >
                          <option value="">Selecione</option>
                          <option value="sim">Sim, já tive pets</option>
                          <option value="nao">Não, seria meu primeiro</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className="flex items-center gap-2 text-[#333] mb-2"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          <Home size={16} style={{ color: accent }} />
                          Tipo de moradia *
                        </label>
                        <select
                          name="houseType"
                          value={formData.houseType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9rem",
                          }}
                        >
                          <option value="">Selecione</option>
                          <option value="casa">Casa</option>
                          <option value="apartamento">Apartamento</option>
                          <option value="sitio">Sítio/Chácara</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        className="flex items-center gap-2 text-[#333] mb-2"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        Possui outros pets? *
                      </label>
                      <select
                        name="hasOtherPets"
                        value={formData.hasOtherPets}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.9rem",
                        }}
                      >
                        <option value="">Selecione</option>
                        <option value="nao">Não tenho outros pets</option>
                        <option value="cachorro">Sim, tenho cachorro(s)</option>
                        <option value="gato">Sim, tenho gato(s)</option>
                        <option value="ambos">
                          Sim, tenho cachorros e gatos
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="flex items-center gap-2 text-[#333] mb-2"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        <FileText size={16} style={{ color: accent }} />
                        Mensagem (opcional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#FF5500] focus:outline-none transition-colors resize-none"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.9rem",
                        }}
                        placeholder={`Conte um pouco sobre você e por que deseja adotar ${animal.name}...`}
                      />
                    </div>

                    {/* Info box */}
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: `${accent}10`,
                        border: `1px solid ${accent}30`,
                      }}
                    >
                      <p
                        className="text-[#555]"
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.8rem",
                          lineHeight: 1.6,
                        }}
                      >
                        ℹ️ <strong>Processo de adoção:</strong> Após o envio,
                        faremos uma entrevista e você assinará um termo de
                        adoção responsável.
                      </p>
                    </div>

                    {submitError && (
                      <p
                        className="text-red-600 text-sm"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {submitError}
                      </p>
                    )}

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className="w-full text-white py-4 rounded-2xl cursor-pointer border-none shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        fontSize: "1rem",
                        background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
                        boxShadow: `0 8px 25px ${accent}55`,
                      }}
                    >
                      {isSubmitting
                        ? "Enviando..."
                        : "Enviar solicitação de adoção →"}
                    </motion.button>
                  </form>
                ) : (
                  // Success message
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                      style={{ background: `${accent}20` }}
                    >
                      <CheckCircle size={40} style={{ color: accent }} />
                    </motion.div>
                    <h3
                      className="text-[#1A1A1A] mb-3"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "1.8rem",
                      }}
                    >
                      Solicitação enviada! 🎉
                    </h3>
                    <p
                      className="text-[#555] max-w-md mx-auto"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                      }}
                    >
                      Obrigado pelo interesse em adotar{" "}
                      <strong>{animal.name}</strong>! Nossa equipe entrará em
                      contato em breve para dar continuidade ao processo.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
