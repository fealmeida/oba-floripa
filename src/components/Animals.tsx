"use client";
import { motion, useInView } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { MapPin, Calendar, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { PawPrint, StarIllustration, BoneIllustration } from "./Illustrations";
import { AdoptionModal } from "./AdoptionModal";

const animals = [
  {
    id: 1,
    name: "Thor",
    age: "2 anos",
    type: "cachorro",
    gender: "macho",
    desc: "Brincalhão, cheio de energia e ama crianças. Thor espera por alguém que acompanhe sua animação.",
    img: "https://images.unsplash.com/photo-1651212508936-dfb6f6ea3d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBwdXBweSUyMGhhcHB5fGVufDF8fHx8MTc3MjYyMzExOXww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Destaque",
    tagColor: "#FF5500",
    cardBg: "from-[#FFF0E6] to-[#FFE4CC]",
    accent: "#FF5500",
  },
  {
    id: 2,
    name: "Luna",
    age: "3 anos",
    type: "gato",
    gender: "fêmea",
    desc: "Serena e independente, Luna adora uma boa sessão de carinho no fim do dia.",
    img: "https://images.unsplash.com/photo-1769634847861-69ee4fa8c343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBhZG9wdGlvbiUyMHNoZWx0ZXIlMjBjdXRlJTIwa2l0dGVufGVufDF8fHx8MTc3MjY0NzY2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Nova",
    tagColor: "#10B981",
    cardBg: "from-[#E6FFF5] to-[#CCFFE8]",
    accent: "#10B981",
  },
  {
    id: 3,
    name: "Zeus",
    age: "4 anos",
    type: "cachorro",
    gender: "macho",
    desc: "Tranquilo, leal e muito carinhoso. Zeus é perfeito para quem busca um companheiro fiel.",
    img: "https://images.unsplash.com/photo-1671572418326-69416b142404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGRvZyUyMHJlc2N1ZSUyMHBvcnRyYWl0JTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzI2NDc2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: null,
    tagColor: "#8B5CF6",
    cardBg: "from-[#F0E6FF] to-[#E4CCFF]",
    accent: "#8B5CF6",
  },
  {
    id: 4,
    name: "Mel",
    age: "1 ano",
    type: "cachorro",
    gender: "fêmea",
    desc: "Doce como o nome, Mel está pronta para trazer alegria para qualquer lar que a receba.",
    img: "https://images.unsplash.com/photo-1762893620918-af52d50a7dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMGJyZWVkJTIwZG9nJTIwcGxheWZ1bCUyMG91dGRvb3J8ZW58MXx8fHwxNzcyNjQ3NjY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Urgente",
    tagColor: "#EF4444",
    cardBg: "from-[#FFF0E6] to-[#FFDDD5]",
    accent: "#EF4444",
  },
  {
    id: 5,
    name: "Nala",
    age: "5 anos",
    type: "gato",
    gender: "fêmea",
    desc: "Elegante e curiosa, Nala observa tudo com seus olhos de amêndoa. Adora janelas.",
    img: "https://images.unsplash.com/photo-1708417250704-770feaf07660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwY2F0JTIwc3dlZXQlMjBsb29raW5nfGVufDF8fHx8MTc3MjY0NzY2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: null,
    tagColor: "#FF6B9D",
    cardBg: "from-[#FFF0F6] to-[#FFCCE6]",
    accent: "#FF6B9D",
  },
  {
    id: 6,
    name: "Simba",
    age: "2 anos",
    type: "gato",
    gender: "macho",
    desc: "Laranjinha e cheio de personalidade. Simba vai animar qualquer ambiente com suas travessuras.",
    img: "https://images.unsplash.com/photo-1768523506095-deb25e8f13a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGNhdCUyMGN1cmlvdXMlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI2NDc2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Popular",
    tagColor: "#FFB800",
    cardBg: "from-[#FFFBE6] to-[#FFF2CC]",
    accent: "#FFB800",
  },
  {
    id: 7,
    name: "Bolt",
    age: "6 meses",
    type: "cachorro",
    gender: "macho",
    desc: "Cheio de energia e amor para dar. Bolt precisa de espaço para brincar e correr.",
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXNreSUyMHB1cHB5JTIwYmx1ZSUyMGV5ZXN8ZW58MXx8fHwxNzI2Mzg5MTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Nova",
    tagColor: "#10B981",
    cardBg: "from-[#E6FFF5] to-[#CCFFE8]",
    accent: "#10B981",
  },
  {
    id: 8,
    name: "Mia",
    age: "4 anos",
    type: "gato",
    gender: "fêmea",
    desc: "Calma e afetuosa, Mia é ideal para quem busca uma companhia tranquila e leal.",
    img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTcyNjM4OTEyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: null,
    tagColor: "#8B5CF6",
    cardBg: "from-[#F0E6FF] to-[#E4CCFF]",
    accent: "#8B5CF6",
  },
  {
    id: 9,
    name: "Max",
    age: "3 anos",
    type: "cachorro",
    gender: "macho",
    desc: "Protetor e amoroso. Max é o guardião perfeito para sua família.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3MjYzODkxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Destaque",
    tagColor: "#FF5500",
    cardBg: "from-[#FFF0E6] to-[#FFE4CC]",
    accent: "#FF5500",
  },
  {
    id: 10,
    name: "Belinha",
    age: "2 anos",
    type: "cachorro",
    gender: "fêmea",
    desc: "Meiga e sociável, adora crianças e outros pets. Belinha é pura alegria!",
    img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBkb2clMjBoYXBweXxlbnwxfHx8fDE3MjYzODkxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Popular",
    tagColor: "#FFB800",
    cardBg: "from-[#FFFBE6] to-[#FFF2CC]",
    accent: "#FFB800",
  },
  {
    id: 11,
    name: "Fred",
    age: "1 ano",
    type: "gato",
    gender: "macho",
    desc: "Aventureiro e brincalhão, Fred adora explorar e fazer novas amizades.",
    img: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmluZ2UlMjBjYXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3MjYzODkxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: null,
    tagColor: "#FF6B9D",
    cardBg: "from-[#FFF0F6] to-[#FFCCE6]",
    accent: "#FF6B9D",
  },
  {
    id: 12,
    name: "Cacau",
    age: "5 anos",
    type: "cachorro",
    gender: "fêmea",
    desc: "Companheira fiel e tranquila. Cacau está pronta para ser sua melhor amiga.",
    img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGRvZyUyMHBvcnRyYWl0fGVufDF8fHx8MTcyNjM4OTEyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Urgente",
    tagColor: "#EF4444",
    cardBg: "from-[#FFF0E6] to-[#FFDDD5]",
    accent: "#EF4444",
  },
];

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
  animal: (typeof animals)[0];
  index: number;
  onAdopt: (animal: (typeof animals)[0]) => void;
}) {
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
      className={`group bg-gradient-to-b ${animal.cardBg} rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 border border-white`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={animal.img}
          alt={animal.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Color overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: animal.accent }}
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
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              background: animal.tagColor,
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
            background: liked ? animal.accent : "white",
          }}
        >
          <Heart
            size={16}
            style={{ color: liked ? "white" : animal.accent }}
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
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "1.4rem",
            }}
          >
            {getEmojiByType(animal.type)} {animal.name}
          </h3>
          <span
            className="px-3 py-1 rounded-full text-white"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              background: animal.accent,
            }}
          >
            {animal.gender === "fêmea" ? "Fêmea" : "Macho"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div
            className="flex items-center gap-1"
            style={{ color: animal.accent }}
          >
            <Calendar size={13} />
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              {animal.age}
            </span>
          </div>
          {/* <div className="flex items-center gap-1">
            <MapPin size={13} style={{ color: animal.accent }} />
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
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
            fontFamily: "Space Grotesk, sans-serif",
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
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            background: animal.accent,
            boxShadow: `0 6px 20px ${animal.accent}55`,
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
  const [selectedAnimal, setSelectedAnimal] = useState<
    (typeof animals)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAdopt = (animal: (typeof animals)[0]) => {
    setSelectedAnimal(animal);
    setIsModalOpen(true);
  };

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
                  fontFamily: "Space Grotesk, sans-serif",
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
                fontFamily: "Syne, sans-serif",
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
                fontFamily: "Space Grotesk, sans-serif",
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
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 touch-pan-y" style={{ backfaceVisibility: "hidden" }}>
              {animals.map((a, i) => (
                <div
                  key={a.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0 pl-2 first:pl-0"
                >
                  <AnimalCard animal={a} index={i} onAdopt={handleAdopt} />
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
