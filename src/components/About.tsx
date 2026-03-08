"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Heart, Shield, Users } from "lucide-react";
import {
  DogIllustration,
  CatIllustration,
  PawPrint,
  HeartIllustration,
  SparkleIllustration,
} from "./Illustrations";

const WOMAN_IMG =
  "https://images.unsplash.com/photo-1624730420182-d1f041ce6469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGh1Z2dpbmclMjBhZG9wdGVkJTIwZG9nJTIwaGFwcHl8ZW58MXx8fHwxNzcyNjQ3NjYyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const pillars = [
  {
    icon: Heart,
    title: "Amor pela causa",
    desc: "Cuidamos de cada animal como se fosse nosso, porque para nós, cada vida importa.",
    color: "#FF6B9D",
    bg: "bg-[#FF6B9D]/10",
  },
  {
    icon: Shield,
    title: "Adoção responsável",
    desc: "Acompanhamos cada processo de perto, garantindo um lar seguro e amoroso.",
    color: "#8B5CF6",
    bg: "bg-[#8B5CF6]/10",
  },
  {
    icon: Users,
    title: "O Mutirão Mata-Fome",
    desc: "Fazemos visita em comunidades semanalmente e os voluntários levam alimento, assistência e cuidados aos animais sob a guarda das famílias indígenas.",
    color: "#10B981",
    bg: "bg-[#10B981]/10",
  },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre"
      ref={ref}
      className="bg-white py-24 md:py-36 overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute top-10 right-10 opacity-10">
        <DogIllustration className="w-48 h-40" />
      </div>
      <div className="absolute bottom-10 left-6 opacity-8">
        <CatIllustration className="w-36 h-32" />
      </div>

      {/* Floating bits */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-20 left-1/2 opacity-20"
      >
        <PawPrint color="#FFB800" className="w-10 h-10" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span
            className="bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full uppercase tracking-widest"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
            }}
          >
            Quem somos
          </span>
          <SparkleIllustration color="#FFB800" className="w-6 h-6" />
        </motion.span>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[#1A1A1A] mb-8"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Proteção
              <br />
              <span style={{ color: "#FF6B9D" }}>e bem-estar animal.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-[#555] mb-6"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.8,
              }}
            >
              A Organização Bem-Animal (OBA!) é uma organização da sociedade
              civil, registrada sob CNPJ 09.454.046/0001-55 e atuante desde 2007
              na região da Grande Florianópolis, Santa Catarina.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-[#555]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.8,
              }}
            >
              Temos como missão a proteção, conscientização e promoção de ações
              e campanhas para o bem-estar animal.
            </motion.p>

            {/* Pillars */}
            <div className="mt-10 space-y-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.45 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className={`flex items-start gap-4 ${p.bg} rounded-2xl p-4 border border-transparent hover:border-current/10 transition-all cursor-default`}
                  style={{ borderColor: `${p.color}20` }}
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.color}20` }}
                  >
                    <p.icon size={18} style={{ color: p.color }} />
                  </div>
                  <div>
                    <p
                      className="text-[#1A1A1A] mb-1"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="text-[#666]"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Color background card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800] to-[#FF5500] rounded-3xl rotate-3" />
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src={WOMAN_IMG}
                alt="Tutora feliz com seu pet adotado"
                className="w-full h-full object-cover"
              />
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={inView ? { scale: 1, rotate: -8 } : {}}
                transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
                className="absolute top-6 -right-4 bg-[#FFB800] text-[#1A1A1A] rounded-2xl px-4 py-2 shadow-lg"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                }}
              >
                ❤️ Adotada!
              </motion.div>

              {/* Bottom quote */}
              <div className="absolute bottom-6 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF6B9D] flex items-center justify-center shrink-0">
                  <Heart size={18} className="text-white" fill="white" />
                </div>
                <div>
                  <p
                    className="text-[#1A1A1A]"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                    }}
                  >
                    "Adotar mudou minha vida."
                  </p>
                  <p
                    className="text-[#777]"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.78rem",
                    }}
                  >
                    — Juliana, tutora da Mel
                  </p>
                </div>
              </div>
            </div>

            {/* Floating illustrations */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-6"
            >
              <HeartIllustration color="#FF6B9D" className="w-14 h-14" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -left-6"
            >
              <PawPrint color="#FFB800" className="w-10 h-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
