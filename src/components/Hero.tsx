"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  PawPrint,
  HeartIllustration,
  StarIllustration,
  BoneIllustration,
  SparkleIllustration,
} from "./Illustrations";

/**
 * Imagem de fundo do hero.
 *
 * O import estático entrega ao Next as dimensões intrínsecas e o blur
 * placeholder gerado em build — sem isso o navegador não tem nada para pintar
 * enquanto a foto baixa.
 *
 * O arquivo apontado vive em `public/images/hero/optimized/`, gerado por
 * `yarn optimize:hero` a partir do original em `public/images/hero/`. Para
 * testar outra foto: rode `node scripts/optimize-hero.mjs hero-NN.jpg` e troque
 * o caminho do import abaixo. Os originais (4284x5712, até 13 MB) nunca devem
 * ser referenciados direto — são a fonte, não o que vai para o navegador.
 */
import heroImage from "../../public/images/hero/optimized/hero-26.jpg";

const floatingElements = [
  {
    Component: PawPrint,
    color: "#FF5500",
    size: "w-12 h-12",
    top: "12%",
    left: "8%",
    delay: 0,
    duration: 4.2,
    rotate: -20,
  },
  {
    Component: HeartIllustration,
    color: "#FF6B9D",
    size: "w-10 h-10",
    top: "20%",
    right: "12%",
    delay: 0.5,
    duration: 3.8,
    rotate: 15,
  },
  {
    Component: StarIllustration,
    color: "#FFB800",
    size: "w-8 h-8",
    top: "55%",
    right: "6%",
    delay: 1.0,
    duration: 5,
    rotate: 30,
  },
  {
    Component: PawPrint,
    color: "#C4B5FD",
    size: "w-9 h-9",
    top: "70%",
    left: "5%",
    delay: 0.3,
    duration: 4.5,
    rotate: 10,
  },
  {
    Component: BoneIllustration,
    color: "#FFB800",
    size: "w-16 h-8",
    top: "35%",
    left: "3%",
    delay: 0.8,
    duration: 5.5,
    rotate: -10,
  },
  {
    Component: SparkleIllustration,
    color: "#10B981",
    size: "w-8 h-8",
    top: "80%",
    right: "10%",
    delay: 0.2,
    duration: 3.5,
    rotate: 0,
  },
  {
    Component: HeartIllustration,
    color: "#FFB800",
    size: "w-7 h-7",
    top: "8%",
    right: "25%",
    delay: 1.2,
    duration: 4.8,
    rotate: -5,
  },
  {
    Component: SparkleIllustration,
    color: "#FF6B9D",
    size: "w-6 h-6",
    top: "45%",
    left: "12%",
    delay: 0.6,
    duration: 4,
    rotate: 45,
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#FFF5EC] flex flex-col justify-end [@media(min-height:701px)_and_(max-height:935px)]:min-h-[calc(100dvh+3rem)]"
    >
      {/* Bright colorful blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#FFB800]/20 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-[#FF6B9D]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/10 blur-3xl" />
      </div>

      {/* Parallax image — bright and joyful */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 will-change-transform"
      >
        {/* priority + fetchPriority: o Next emite <link rel="preload"> com o
            srcset, então a foto começa a baixar antes do JS. quality 60 (em vez
            do padrão 75) porque ela fica sob brightness(0.82) e dois gradientes
            — o detalhe extra não chega à tela e custa ~40% a mais de bytes. */}
        <Image
          src={heroImage}
          alt="Animais e voluntários da OBA Floripa"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={60}
          placeholder="blur"
          className="object-cover object-center"
          style={{ filter: "brightness(0.82) saturate(1.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5EC] via-[#FFF5EC]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5EC]/80 via-[#FFF5EC]/20 to-transparent" />
      </motion.div>

      {/* Floating illustrated elements */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className={`hero-pop absolute ${el.size} pointer-events-none`}
          style={
            {
              top: el.top,
              left: el.left,
              right: el.right,
              "--hero-delay": `${el.delay + 0.8}s`,
              "--hero-rotate": `${el.rotate}deg`,
            } as CSSProperties
          }
        >
          <div
            className="hero-float"
            style={{ "--hero-float-duration": `${el.duration}s` } as CSSProperties}
          >
            <el.Component color={el.color} className="w-full h-full" />
          </div>
        </div>
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-20 md:pb-28 w-full [@media(max-width:767px)_and_(max-height:669px)]:pb-10 [@media(max-width:767px)_and_(min-height:800px)_and_(max-height:899px)]:pb-36"
      >
        <h1
          className="hero-rise text-primary-foreground mb-6 max-w-3xl [@media(min-height:701px)_and_(max-height:900px)]:mb-12"
          style={{
            "--hero-delay": "0.4s",
            "--hero-duration": "0.9s",
            "--hero-rise-from": "60px",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.40rem, 4.5vw, 4.25rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          } as CSSProperties}
        >
          Adotar é
          <br />
          transformar
          <br />
          amor em{" "}
          <span className="relative inline-block">
            <span style={{ color: "#FF5500" }}>ação.</span>
            {/* Underline doodle */}
            <svg
              viewBox="0 0 200 20"
              className="absolute -bottom-2 left-0 w-full"
              style={{ overflow: "visible" }}
            >
              <path
                d="M0 10 Q50 2 100 10 Q150 18 200 10"
                pathLength="1"
                stroke="#FFB800"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                className="hero-draw"
                style={{ "--hero-delay": "1.2s" } as CSSProperties}
              />
            </svg>
          </span>
        </h1>

        <p
          className="hero-rise text-primary max-w-lg mb-10 [@media(min-height:701px)_and_(max-height:935px)]:mt-12"
          style={{
            "--hero-delay": "0.65s",
            "--hero-duration": "0.8s",
            "--hero-rise-from": "30px",
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "1.15rem",
            lineHeight: 1.7,
            textShadow:
              "0 0 1px rgba(255,255,255,0.95), 0 1px 3px rgba(255,255,255,0.85), 0 2px 8px rgba(0,0,0,0.18)",
          } as CSSProperties}
        >
          A OBA Floripa conecta pessoas a animais que precisam de amor, abrigo e
          uma segunda chance. Adote. Doe. Transforme vidas.
        </p>

        <div
          className="hero-rise flex flex-wrap gap-4"
          style={
            {
              "--hero-delay": "0.85s",
              "--hero-duration": "0.7s",
              "--hero-rise-from": "20px",
            } as CSSProperties
          }
        >
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              document
                .querySelector("#animais")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#FF5500] text-white px-8 py-4 rounded-full cursor-pointer border-none shadow-[0_6px_30px_rgba(255,85,0,0.45)]"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.02em",
            }}
          >
            Quero adotar →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              document
                .querySelector("#doacoes")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-[#FFB800] hover:border-[#FFB800]"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            Quero doar 💛
          </motion.button>
        </div>

        {/* Stats mini */}
        <div
          className="hero-rise mt-14 flex flex-wrap gap-3"
          style={
            {
              "--hero-delay": "1.1s",
              "--hero-duration": "0.8s",
              "--hero-rise-from": "20px",
            } as CSSProperties
          }
        >
          {/* {[
            { num: "1.200+", label: "Animais adotados", color: "#FF5500", bg: "#FF5500" },
            { num: "340+", label: "Famílias felizes", color: "#8B5CF6", bg: "#8B5CF6" },
            { num: "8 anos", label: "De impacto em Floripa", color: "#10B981", bg: "#10B981" },
          ].map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl px-5 py-3 shadow-md flex items-center gap-3 border border-white"
            >
              <div className="w-2 h-8 rounded-full" style={{ background: s.color }} />
              <div>
                <p
                  className=""
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", lineHeight: 1, color: s.color }}
                >
                  {s.num}
                </p>
                <p
                  className="text-[#777]"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.72rem", letterSpacing: "0.04em" }}
                >
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))} */}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <button
        className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 text-[#555]/60 hover:text-[#FF5500] transition-colors cursor-pointer bg-transparent border-none flex flex-col items-center gap-1"
        style={{ "--hero-delay": "1.6s" } as CSSProperties}
        onClick={() =>
          document
            .querySelector("#sobre")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="hero-nudge">
          <ChevronDown size={26} />
        </div>
      </button>
    </section>
  );
}
