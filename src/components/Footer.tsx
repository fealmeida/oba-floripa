"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import {
  PawPrint,
  HeartIllustration,
  SparkleIllustration,
} from "./Illustrations";

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/organizacao.bem.animal?igsh=MWhnanAyZmswaGN2cg%3D%3D",
    color: "#FF6B9D",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/obafloripa/",
    color: "#8B5CF6",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@obafloripa",
    color: "#FF5500",
  },
];

const links = [
  { label: "Sobre a OBA", href: "#sobre" },
  { label: "Animais para adoção", href: "#animais" },
  { label: "Processo de adoção", href: "#adocao" },
  { label: "Fazer doação", href: "#doacoes" },
  { label: "Seja voluntário", href: "#mutirao-mata-fome" },
  { label: "Política de privacidade", href: "#" },
  { label: "Área admin", href: "/admin", isPage: true },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5548991142537&text&type=phone_number&app_absent=0";

function WhatsAppIcon({
  size = 14,
  color = "#25D366",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
              <Image
                src="/logo-oba-2.svg"
                alt="OBA Floripa"
                width={220}
                height={140}
                className="h-14 w-auto"
              />
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
              {links.map((l) => {
                const linkContent = (
                  <>
                    <span className="w-1 h-1 rounded-full bg-[#FF5500]/0 group-hover:bg-[#FF5500] transition-all" />
                    {l.label}
                  </>
                );
                return (
                  <li key={l.label}>
                    {"isPage" in l && l.isPage ? (
                      <Link
                        href={l.href}
                        className="text-white/75 hover:text-[#FF5500] transition-colors duration-200 flex items-center gap-2 group"
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "0.875rem",
                        }}
                      >
                        {linkContent}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollTo(l.href)}
                        className="text-white/75 hover:text-[#FF5500] transition-colors duration-200 cursor-pointer bg-transparent border-none text-left flex items-center gap-2 group"
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "0.875rem",
                        }}
                      >
                        {linkContent}
                      </button>
                    )}
                  </li>
                );
              })}
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
                  text: "oba.floripa@gmail.com",
                  color: "#FF5500",
                },
                { icon: MapPin, text: "Florianópolis, SC", color: "#8B5CF6" },
              ].map((item) => {
                const content = (
                  <>
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
                  </>
                );
                return (
                  <li key={item.text} className="flex items-center gap-3">
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                        aria-label="Fale conosco pelo WhatsApp"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
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
