'use client'
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Scissors, Syringe, Heart, Cat } from "lucide-react";
import { PawPrint, HeartIllustration, SparkleIllustration, DogIllustration } from "./Illustrations";

const steps = [
  {
    num: "01",
    icon: Scissors,
    title: "Todos os animais são castrados?",
    desc: "Sim! Filhotes com menos de 4 meses terão castração garantida e obrigatória.",
    color: "#FF5500",
    bg: "bg-[#FFF0E6]",
    emoji: "✂️",
  },
  {
    num: "02",
    icon: Syringe,
    title: "Serei responsável pela vacinação?",
    desc: "A OBA! doa o animal vacinado. A continuidade do protocolo vacinal anual passa a ser responsabilidade do adotante.",
    color: "#8B5CF6",
    bg: "bg-[#F0E6FF]",
    emoji: "💉",
  },
  {
    num: "03",
    icon: Heart,
    title: "Posso adotar mais de um pet?",
    desc: "Sim, desde que você tenha condições financeiras e espaço físico para assumir mais de um patudo.",
    color: "#10B981",
    bg: "bg-[#E6FFF5]",
    emoji: "🐾",
  },
  {
    num: "04",
    icon: Cat,
    title: "Pré-requisitos para adoção de gatos?",
    desc: "Apartamentos: tela em todas as janelas (incl. basculantes) e sacadas. Casas: muro acima de 4 m sem risco de fuga ou telas em todas as janelas. Não doamos para vida livre, para evitar riscos como atropelamento, brigas, envenenamento e violência.",
    color: "#FF6B9D",
    bg: "bg-[#FFF0F6]",
    emoji: "🐱",
  },
];

export function AdoptionProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="adocao" className="bg-[#111] py-24 md:py-36 overflow-hidden relative">
      {/* Colorful top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B5CF6] via-[#FF6B9D] via-[#FFB800] to-[#10B981]" />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute -top-10 -right-10 opacity-10"
        >
          <PawPrint color="#FFB800" className="w-40 h-40" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-20 left-0 opacity-5"
        >
          <DogIllustration className="w-56 h-48" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-1/2 right-10 opacity-10"
        >
          <SparkleIllustration color="#FF6B9D" className="w-12 h-12" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span
              className="bg-[#FFB800]/20 text-[#FFB800] px-4 py-1.5 rounded-full uppercase tracking-widest"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.72rem", fontWeight: 700 }}
            >
              Informações sobre adoção
            </span>
          </motion.span>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-white"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              Tudo o que você precisa saber
              <br />
              <span style={{ color: "#FFB800" }}>sobre adoção. 🐾</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/50 max-w-xs"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}
            >
              Castração, vacinação, mais de um pet e pré-requisitos para gatos — tudo em um lugar.
            </motion.p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, rotate: 0.5 }}
              className={`${step.bg} rounded-3xl p-6 relative group cursor-default`}
            >
              {/* Big number bg */}
              <span
                className="absolute top-4 right-5 select-none pointer-events-none"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "5rem",
                  lineHeight: 1,
                  color: step.color,
                  opacity: 0.08,
                }}
              >
                {step.num}
              </span>

              {/* Emoji big */}
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                className="text-4xl block mb-4"
              >
                {step.emoji}
              </motion.span>

              {/* Step num pill */}
              <span
                className="inline-block px-3 py-0.5 rounded-full text-white mb-3"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  background: step.color,
                  letterSpacing: "0.1em",
                }}
              >
                PASSO {step.num}
              </span>

              {/* Title */}
              <h3
                className="text-[#1A1A1A] mb-3"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.05rem" }}
              >
                {step.title}
              </h3>

              {/* Desc */}
              <p
                className="text-[#555]"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.85rem", lineHeight: 1.7 }}
              >
                {step.desc}
              </p>

              {/* Bottom color bar */}
              <div
                className="absolute bottom-0 left-6 right-6 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: step.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.querySelector("#animais")?.scrollIntoView({ behavior: "smooth" })}
            className="text-white px-9 py-4 rounded-full cursor-pointer border-none shadow-[0_8px_30px_rgba(255,85,0,0.5)]"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              background: "linear-gradient(135deg, #FF5500, #FF6B9D)",
            }}
          >
            Começar agora 🐾
          </motion.button>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <HeartIllustration color="#FF6B9D" className="w-5 h-5" />
            <p
              className="text-white/70"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.875rem" }}
            >
              100% gratuito · Adoção responsável
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
