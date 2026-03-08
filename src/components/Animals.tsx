"use client";
import { motion, useInView } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { MapPin, Calendar, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { PawPrint, StarIllustration, BoneIllustration } from "./Illustrations";
import { AdoptionModal } from "./AdoptionModal";
import { createClient } from "@/lib/supabase/client";
import { mapAnimalRowToUI, getColorsForAnimal, type AnimalForUI } from "@/lib/supabase";

/** Emoji por tipo: gato → 🐱, cachorro → patinhas 🐾🐾🐾 */
function getEmojiByType(type: string): string {
  if (type === "gato") return "🐱";
  return "🐾";
}

function AnimalCard({
  animal,
  index,
  onAdopt,
}: {
  animal: AnimalForUI;
  index: number;
  onAdopt: (animal: AnimalForUI) => void;
}) {
  const { tagColor, cardBg, accent } = getColorsForAnimal(animal.tag, animal.type);
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.02 }}
      className={`group bg-gradient-to-b ${cardBg} rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 border border-white`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={animal.img}
          alt={animal.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Color overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: accent }}
        />

        {animal.tag && (
          <motion.span
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              delay: index * 0.1 + 0.4,
              type: "spring",
              bounce: 0.5,
            }}
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs shadow-lg"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              background: tagColor,
              letterSpacing: "0.05em",
            }}
          >
            {animal.tag}
          </motion.span>
        )}

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-none shadow-md transition-all duration-300"
            style={{
            background: liked ? accent : "white",
          }}
        >
          <Heart
            size={16}
            style={{ color: liked ? "white" : accent }}
            fill={liked ? "white" : "none"}
          />
        </motion.button>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-[#1A1A1A] flex items-center gap-2"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "1.4rem",
            }}
          >
            {getEmojiByType(animal.type)} {animal.name}
          </h3>
          <span
            className="px-3 py-1 rounded-full text-white"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 600,
              background: accent,
            }}
          >
            {animal.gender === "fêmea" ? "Fêmea" : "Macho"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div
            className="flex items-center gap-1"
            style={{ color: accent }}
          >
            <Calendar size={13} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              {animal.age}
            </span>
          </div>
          {/* <div className="flex items-center gap-1">
            <MapPin size={13} style={{ color: accent }} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              Florianópolis
            </span>
          </div> */}
        </div>

        <p
          className="text-[#555] mb-5"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            lineHeight: 1.7,
          }}
        >
          {animal.desc}
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onAdopt(animal)}
          className="w-full text-white py-3 rounded-2xl cursor-pointer border-none transition-all duration-300 shadow-md"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "0.9rem",
            background: accent,
            boxShadow: `0 6px 20px ${accent}55`,
          }}
        >
          Quero adotar {animal.name} →
        </motion.button>
      </div>
    </motion.div>
  );
}

export function Animals() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  const [animals, setAnimals] = useState<AnimalForUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalForUI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("animais")
      .select("*")
      .eq("status", "disponível")
      .order("created_at", { ascending: false })
      .then(({ data, error: err }) => {
        setLoading(false);
        if (err) {
          setError(err.message);
          return;
        }
        setAnimals((data ?? []).map(mapAnimalRowToUI));
      });
  }, []);

  const handleAdopt = (animal: AnimalForUI) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 1 },
      "(min-width: 768px)": { slidesToScroll: 1 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="animais"
      className="bg-[#FFF5EC] py-24 md:py-36 relative overflow-hidden"
    >
      {/* Fun background decoration */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF5500] via-[#FFB800] via-[#10B981] via-[#8B5CF6] to-[#FF6B9D]" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          className="absolute top-16 right-20 opacity-15"
        >
          <StarIllustration color="#FFB800" className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-10 opacity-15"
        >
          <BoneIllustration color="#8B5CF6" className="w-24 h-12" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
          className="absolute top-1/2 right-5 opacity-10"
        >
          <PawPrint color="#FF6B9D" className="w-14 h-14" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span
                className="bg-[#FF5500]/10 text-[#FF5500] px-4 py-1.5 rounded-full uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}
              >
                🐾 Disponíveis para adoção
              </span>
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[#1A1A1A]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              Eles estão esperando
              <br />
              <span style={{ color: "#FF5500" }}>por você.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-2xl p-4 border border-[#E5E7EB] max-w-xs shadow-sm"
          >
            <p
              className="text-[#555]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
              }}
            >
              ✅ Todos vacinados, castrados e com acompanhamento veterinário
              antes da adoção.
            </p>
          </motion.div>
        </div>

        {/* Carrossel */}
        <div className="relative">
          {loading ? (
            <div
              className="text-center py-16 text-[#666]"
              style={{ fontFamily: "var(--font-sans)", fontSize: "1rem" }}
            >
              Carregando animais...
            </div>
          ) : error ? (
            <div
              className="text-center py-16 text-red-600"
              style={{ fontFamily: "var(--font-sans)", fontSize: "1rem" }}
            >
              Não foi possível carregar os animais. Tente novamente mais tarde.
            </div>
          ) : animals.length === 0 ? (
            <div
              className="text-center py-16 text-[#666]"
              style={{ fontFamily: "var(--font-sans)", fontSize: "1rem" }}
            >
              Nenhum animal disponível no momento.
            </div>
          ) : (
            <>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 touch-pan-y" style={{ backfaceVisibility: "hidden" }}>
              {animals.map((a, i) => (
                <div
                  key={a.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0 pl-2 first:pl-0"
                >
                  <AnimalCard
                    animal={a}
                    index={i}
                    onAdopt={handleAdopt}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botões prev/next */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white border-2 border-[#FF5500] text-[#FF5500] flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:bg-[#FF5500] hover:text-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white border-2 border-[#FF5500] text-[#FF5500] flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:bg-[#FF5500] hover:text-white transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
            </>
          )}
        </div>

        {/* Adoption Modal */}
        <AdoptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          animal={selectedAnimal}
        />
      </div>
    </section>
  );
}
