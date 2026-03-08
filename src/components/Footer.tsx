"use client";
import { motion } from "motion/react";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import {
  PawPrint,
  HeartIllustration,
  SparkleIllustration,
} from "./Illustrations";

const socials = [
  { icon: Instagram, label: "Instagram", href: "#", color: "#FF6B9D" },
  { icon: Facebook, label: "Facebook", href: "#", color: "#8B5CF6" },
  { icon: Youtube, label: "YouTube", href: "#", color: "#FF5500" },
];

const links = [
  { label: "Sobre a OBA", href: "#sobre" },
  { label: "Animais para adoção", href: "#animais" },
  { label: "Processo de adoção", href: "#adocao" },
  { label: "Fazer doação", href: "#doacoes" },
  { label: "Seja voluntário", href: "#" },
  { label: "Política de privacidade", href: "#" },
];

export function Footer() {
  const scrollTo = (href: string) => {
    if (href === "#") return;
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1A1A1A] py-16 relative overflow-hidden">
      {/* Top colorful bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF5500] via-[#FFB800] via-[#10B981] via-[#8B5CF6] to-[#FF6B9D]" />

      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="absolute -bottom-10 -right-10 opacity-5"
        >
          <PawPrint color="#FF5500" className="w-48 h-48" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-10 right-1/4 opacity-5"
        >
          <HeartIllustration color="#FF6B9D" className="w-20 h-20" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <PawPrint color="#FF5500" className="w-8 h-8" />
              </motion.div>
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[#FF5500]"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  OBA
                </span>
                <span
                  className="text-white/90"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 300,
                    fontSize: "1rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  FLORIPA
                </span>
              </div>
            </div>
            <p
              className="text-white/80 mb-6"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.8,
              }}
            >
              ONG dedicada à adoção responsável e ao bem-estar animal em
              Florianópolis, Santa Catarina. 🌊
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: `${s.color}20`, color: s.color }}
                >
                  <s.icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p
              className="text-white mb-5"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
              }}
            >
              NAVEGAÇÃO
            </p>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-white/75 hover:text-[#FF5500] transition-colors duration-200 cursor-pointer bg-transparent border-none text-left flex items-center gap-2 group"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.875rem",
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FF5500]/0 group-hover:bg-[#FF5500] transition-all" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-white mb-5"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
              }}
            >
              CONTATO
            </p>
            <ul className="space-y-4">
              {[
                {
                  icon: Mail,
                  text: "ong.obafloripa@gmail.com",
                  color: "#FF5500",
                },
                { icon: Phone, text: "(48) 99999-0000", color: "#10B981" },
                { icon: MapPin, text: "Florianópolis, SC", color: "#8B5CF6" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}20` }}
                  >
                    <item.icon size={14} style={{ color: item.color }} />
                  </div>
                  <span
                    className="text-white/80"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <SparkleIllustration color="#FFB800" className="w-5 h-5" />
              </motion.div>
              <p
                className="text-white/70"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.75rem",
                }}
              >
                CNPJ: 09.454.046/0001-55
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-white/65"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.78rem",
            }}
          >
            © 2026 OBA Floripa. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="text-white/65"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.78rem",
              }}
            >
              Feito com
            </span>
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Heart size={13} className="text-[#FF6B9D]" fill="#FF6B9D" />
            </motion.div>
            <span
              className="text-white/65"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.78rem",
              }}
            >
              por quem ama os animais
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
