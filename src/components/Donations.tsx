"use client";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Copy, Check, Zap, Package, Stethoscope } from "lucide-react";
import {
  HeartIllustration,
  PawPrint,
  SparkleIllustration,
  CatIllustration,
  StarIllustration,
} from "./Illustrations";

const DOG_IMG = "/images/hero/hero-22.jpg";

const impacts = [
  { icon: Package, label: "Ração e cuidados diários", color: "#FF5500" },
  { icon: Stethoscope, label: "Tratamentos veterinários", color: "#8B5CF6" },
  { icon: Zap, label: "Resgates de emergência", color: "#FFB800" },
];

export function Donations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const PIX_KEY = "09.454.046/0001-55";

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section
      id="doacoes"
      className="bg-[#FFF5EC] py-24 md:py-36 overflow-hidden relative"
    >
      {/* Top colorful border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF6B9D] via-[#FFB800] to-[#FF5500]" />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          className="absolute -top-16 -left-16 opacity-10"
        >
          <StarIllustration color="#FF6B9D" className="w-48 h-48" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/2 right-0 opacity-10"
        >
          <CatIllustration className="w-48 h-40" />
        </motion.div>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/4 opacity-15"
        >
          <SparkleIllustration color="#FFB800" className="w-10 h-10" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span
                className="bg-[#FF6B9D]/15 text-[#FF6B9D] px-4 py-1.5 rounded-full uppercase tracking-widest"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}
              >
                💛 Faça a diferença
              </span>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[#1A1A1A] mb-6"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              Doe!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-[#555] mb-8"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
              }}
            >
              A OBA! precisa de doações financeiras para custear as internações,
              exames complementares, castrações, compra de medicamentos, vacinas
              e a ração que é distribuída durante o Mutirão Mata-Fome, pois nem
              sempre conseguimos arrecadar a quantidade necessária para
              alimentar todos os animais amparados. Toda ajuda, por menor que
              seja, é recebida com amor e gratidão! 🐾
            </motion.p>

            {/* Impact chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="space-y-3 mb-10"
            >
              {impacts.map((item, i) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon size={17} style={{ color: item.color }} />
                  </div>
                  <span
                    className="text-[#444]"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </span>
                  <div
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{ background: item.color }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-3xl overflow-hidden h-48 hidden md:block relative"
            >
              <img
                src={DOG_IMG}
                alt="Animal aguardando cuidados"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D]/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span
                  className="bg-white text-[#1A1A1A] rounded-xl px-3 py-1.5 shadow-md"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  🤍 Ele precisa de você
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: donation box */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -1 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative card behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B9D] to-[#FFB800] rounded-3xl rotate-2 opacity-30" />

            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
              {/* Floating illustrations on card */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                }}
                className="absolute -top-5 -right-5"
              >
                <HeartIllustration color="#FF6B9D" className="w-12 h-12" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4"
              >
                <PawPrint color="#FFB800" className="w-10 h-10" />
              </motion.div>

              {/* Faça uma doação - dados bancários e PIX */}
              <div className="bg-gradient-to-br from-[#F9F9F9] to-white rounded-2xl p-5 mb-5 border-2 border-dashed border-[#E5E7EB]">
                <p
                  className="text-[#1A1A1A] mb-4"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  Faça uma doação:
                </p>
                <ul
                  className="space-y-2 text-[#444] mb-4"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  <li>
                    <strong>Banco do Brasil</strong> (banco 001)
                  </li>
                  <li>Agência: 1453-2</li>
                  <li>Conta Corrente: 36.798-2</li>
                  <li>Titular: Organização Bem-Animal</li>
                  <li>CNPJ: 09.454.046/0001-55</li>
                  <li className="flex items-center justify-between gap-2 flex-wrap">
                    <span>PIX: {PIX_KEY} CNPJ</span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-none cursor-pointer transition-all duration-300 shrink-0"
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        background: copied ? "#DCFCE7" : "#F3F4F6",
                        color: copied ? "#16A34A" : "#555",
                      }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copiado!" : "Copiar PIX"}
                    </motion.button>
                  </li>
                </ul>
              </div>

              {/* CTA button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopy}
                className="w-full text-white py-4 rounded-2xl cursor-pointer border-none shadow-lg"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  background: "linear-gradient(135deg, #FF5500, #FF6B9D)",
                  boxShadow: "0 8px 25px rgba(255, 85, 0, 0.35)",
                }}
              >
                Copiar chave PIX
              </motion.button>

              <p
                className="text-center text-[#AAA] mt-4"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.75rem",
                }}
              >
                🔒 Pagamento seguro · 100% vai para os animais
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
