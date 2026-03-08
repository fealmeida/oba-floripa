"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import {
  PawPrint,
  HeartIllustration,
  StarIllustration,
  BoneIllustration,
  SparkleIllustration,
} from "./Illustrations";

const HERO_IMG =
  "https://images.unsplash.com/photo-1763718592879-127a175bb396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBsYXlmdWwlMjBkb2dzJTIwY29sb3JmdWwlMjBwYXJrJTIwc3Vubnl8ZW58MXx8fHwxNzcyNjQ4NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080";

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
      className="relative min-h-screen overflow-hidden bg-[#FFF5EC] flex items-end"
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
        <img
          src={HERO_IMG}
          alt="Cachorros felizes brincando"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.82) saturate(1.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF5EC] via-[#FFF5EC]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5EC]/80 via-[#FFF5EC]/20 to-transparent" />
      </motion.div>

      {/* Floating illustrated elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: el.rotate }}
          animate={{ opacity: 1, scale: 1, rotate: el.rotate }}
          transition={{
            delay: el.delay + 0.8,
            duration: 0.6,
            type: "spring",
            bounce: 0.5,
          }}
          className={`absolute ${el.size} pointer-events-none`}
          style={{
            top: el.top,
            left: (el as any).left,
            right: (el as any).right,
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [el.rotate, el.rotate + 8, el.rotate],
            }}
            transition={{
              repeat: Infinity,
              duration: el.duration,
              ease: "easeInOut",
            }}
          >
            <el.Component color={el.color} className="w-full h-full" />
          </motion.div>
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#1A1A1A] mb-6 max-w-3xl"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 9vw, 7rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}
        >
          Todo bicho
          <br />
          merece um{" "}
          <span className="relative inline-block">
            <span style={{ color: "#FF5500" }}>lar.</span>
            {/* Underline doodle */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              viewBox="0 0 200 20"
              className="absolute -bottom-2 left-0 w-full"
              style={{ overflow: "visible" }}
            >
              <motion.path
                d="M0 10 Q50 2 100 10 Q150 18 200 10"
                stroke="#FFB800"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </motion.svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="text-[#555] max-w-lg mb-10"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "1.15rem",
            lineHeight: 1.7,
          }}
        >
          A OBA Floripa conecta pessoas a animais que precisam de amor, abrigo e
          uma segunda chance. Adote. Doe. Transforme vidas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="flex flex-wrap gap-4"
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
        </motion.div>

        {/* Stats mini */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 flex flex-wrap gap-3"
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() =>
          document
            .querySelector("#sobre")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#555]/60 hover:text-[#FF5500] transition-colors cursor-pointer bg-transparent border-none flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={26} />
        </motion.div>
      </motion.button>
    </section>
  );
}
