'use client'
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { Star, MapPin, Clock, CloudRain, Target, Heart, Package, ChevronDown, Home } from "lucide-react";
import { PawPrint, HeartIllustration, StarIllustration, SparkleIllustration } from "./Illustrations";

const mutiraoItems = [
  {
    title: "Como começou?",
    icon: Heart,
    color: "#FF6B9D",
    bg: "bg-[#FFF0F6]",
    text: "Em setembro de 2008, durante a enchente em Santa Catarina, recebemos pedido de socorro para os cães e gatos da aldeia indígena guarani Yynn Moroti Wherá, em Biguaçu. Havia cerca de 150 animais, muitos desnutridos, com sarna, verminose e outros parasitas — nenhum castrado ou vacinado.",
  },
  {
    title: "Quando acontece?",
    icon: Clock,
    color: "#FFB800",
    bg: "bg-[#FFF8E6]",
    text: "A ação aberta a voluntariado acontece aos domingos.",
  },
  {
    title: "Onde fica o ponto de encontro?",
    icon: MapPin,
    color: "#10B981",
    bg: "bg-[#E6F7F2]",
    text: "Saímos às 9h do Centro de Florianópolis (em frente ao Mercado Público). Podemos combinar outro local desde que esteja no trajeto.",
  },
  {
    title: "Do que preciso para participar?",
    icon: Package,
    color: "#8B5CF6",
    bg: "bg-[#F0E6FF]",
    text: "Roupa confortável, tênis ou galocha, água e lanche para seu consumo. Dicas: repelente e protetor solar.",
  },
  {
    title: "Preciso confirmar presença?",
    icon: Star,
    color: "#FF5500",
    bg: "bg-[#FFF0E6]",
    text: "Sim! Envie mensagem aqui informando seu interesse para reservarmos sua carona.",
  },
  {
    title: "Quanto tempo dura a ação?",
    icon: Clock,
    color: "#10B981",
    bg: "bg-[#E6F7F2]",
    text: "Em média 5 horas, dependendo do número de voluntários.",
  },
  {
    title: "E se chover?",
    icon: CloudRain,
    color: "#8B5CF6",
    bg: "bg-[#F0E6FF]",
    text: "É cancelado!",
  },
  {
    title: "Como funciona?",
    icon: Heart,
    color: "#FF6B9D",
    bg: "bg-[#FFF0F6]",
    text: "Nas visitas às comunidades carentes entregamos a ração arrecadada, tratamos os animais com produtos para controle de endo e ectoparasitas e promovemos campanhas de vacinação. Cães e gatos também são encaminhados para castração, para controlar a população, fechar o ciclo de abandono e maus-tratos e evitar a proliferação de zoonoses.",
  },
  {
    title: "Quais os objetivos?",
    icon: Target,
    color: "#FFB800",
    bg: "bg-[#FFF8E6]",
    text: "Educar e conscientizar sobre o abandono de animais, o compromisso e as responsabilidades de ter um animal e envolver mais setores da sociedade na solução dos problemas existentes.",
  },
];

export function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="mutirao-mata-fome" className="bg-[#111] py-24 md:py-36 overflow-hidden relative">
      {/* Top colorful bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#10B981] via-[#8B5CF6] to-[#FF6B9D]" />

      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute top-20 right-20 opacity-10"
        >
          <StarIllustration color="#FFB800" className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="absolute bottom-20 left-12 opacity-10"
        >
          <HeartIllustration color="#FF6B9D" className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 opacity-5"
        >
          <PawPrint color="#8B5CF6" className="w-32 h-32" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Mutirão Mata-Fome – Voluntariado */}
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center mb-12"
          >
            <span
              className="inline-flex items-center gap-2 bg-[#FFB800]/25 text-[#FFD54F] border border-[#FFB800]/40 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(255,184,0,0.15)] mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.72rem", fontWeight: 700 }}
            >
              <SparkleIllustration color="#FFD54F" className="w-4 h-4" />
              Mutirão Mata-Fome – Voluntariado
            </span>
            <h2
              className="text-white"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Participe aos domingos e leve
              <br />
              <span style={{ color: "#FFD54F" }}>ração e cuidados a quem precisa.</span>
            </h2>
          </motion.div>

          {/* Mobile: accordion */}
          <div className="md:hidden space-y-3 mb-24 max-w-3xl mx-auto">
            {mutiraoItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={`${item.bg} rounded-3xl relative overflow-hidden border-2 transition-colors`}
                  style={{ borderColor: isOpen ? `${item.color}40` : "transparent" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}20` }}
                    >
                      <item.icon size={18} style={{ color: item.color }} />
                    </div>
                    <h3
                      className="flex-1 text-[#1A1A1A]"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        lineHeight: 1.25,
                      }}
                    >
                      {item.title}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0"
                      style={{ color: item.color }}
                    >
                      <ChevronDown size={22} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-5 pb-5 pt-0"
                          style={{ marginTop: "-0.25rem" }}
                        >
                          <p
                            className="text-[#333] pl-14"
                            style={{
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "0.925rem",
                              lineHeight: 1.75,
                            }}
                          >
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div
                    className="absolute top-0 right-0 w-12 h-12 rounded-tr-3xl rounded-bl-3xl pointer-events-none"
                    style={{ background: `${item.color}20` }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: cards grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
            {mutiraoItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06, type: "spring", bounce: 0.25 }}
                whileHover={{ y: -4 }}
                className={`${item.bg} rounded-3xl p-6 relative overflow-hidden cursor-default`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.color}20` }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <h3
                  className="text-[#1A1A1A] mb-2"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#333]"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                  }}
                >
                  {item.text}
                </p>
                <div
                  className="absolute top-0 right-0 w-12 h-12 rounded-tr-3xl rounded-bl-3xl pointer-events-none"
                  style={{ background: `${item.color}20` }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lar Temporário */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="inline-block bg-[#FF6B9D]/15 text-[#FF6B9D] px-4 py-1.5 rounded-full uppercase tracking-widest mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.72rem", fontWeight: 700 }}
            >
              Lar temporário
            </span>
            <h2
              className="text-white"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Abrigue um peludo
              <br />
              <span style={{ color: "#FF6B9D" }}>até encontrar sua família.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="bg-[#FFF0F6] rounded-3xl p-7 md:p-9 relative cursor-default max-w-4xl mx-auto"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{ background: "#FF6B9D20" }}
            >
              <Home size={22} style={{ color: "#FF6B9D" }} />
            </div>
            <p
              className="text-[#333] mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.8 }}
            >
              Às vezes precisamos resgatar ou retirar um animal para tratamento, internação ou cirurgia. Muitos são abandonados e, quando saudáveis, seguem para adoção — mas o lar definitivo pode demorar. Por isso precisamos de <strong>lar temporário</strong> para abrigá-los em segurança.
            </p>
            <p
              className="text-[#333] mb-5"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.8 }}
            >
              Se você tem tempo, espaço e amor, pode se voluntariar como lar temporário e manter o peludo na sua companhia até ele encontrar uma nova família. Essa ajuda faz toda a diferença: o animal fica mais seguro, educado, feliz e saudável, e suas chances de encontrar um tutor responsável aumentam muito.
            </p>
            <p
              className="text-[#333] text-sm"
              style={{ fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.7, color: "#555" }}
            >
              <strong>Requisito:</strong> apartamento com tela em todas as janelas e sacadas para garantir a segurança.
            </p>
            <div
              className="absolute top-0 right-0 w-12 h-12 rounded-tr-3xl rounded-bl-3xl pointer-events-none"
              style={{ background: "#FF6B9D20" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
