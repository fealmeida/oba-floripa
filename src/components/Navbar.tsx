'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Sobre", href: "#sobre" },
    { label: "Animais", href: "#animais" },
    { label: "Adoção", href: "#adocao" },
    { label: "Doações", href: "#doacoes" },
    { label: "Seja voluntário", href: "#mutirao-mata-fome" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md py-3 shadow-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group"
          >
            <Image
              src="/logo-oba.svg"
              alt="OBA Floripa"
              width={180}
              height={52}
              className="h-11 w-auto"
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={`transition-colors duration-200 cursor-pointer bg-transparent border-none hover:text-[#FF5500] ${scrolled ? "text-[#444]" : "text-[#333]"}`}
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.04em" }}
              >
                {l.label}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("#doacoes")}
              className="bg-[#FF5500] text-white px-5 py-2.5 rounded-full cursor-pointer border-none shadow-[0_4px_15px_rgba(255,85,0,0.4)]"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "0.875rem" }}
            >
              💛 Doe agora
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-1 cursor-pointer bg-transparent border-none ${scrolled ? "text-[#1A1A1A]" : "text-[#1A1A1A]"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-[#FFF5EC] flex flex-col items-center justify-center gap-7"
            >
              <Image
                src="/logo-oba.svg"
                alt="OBA Floripa"
                width={220}
                height={64}
                className="h-14 w-auto mb-2"
              />
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(l.href)}
                className="text-[#1A1A1A] hover:text-[#FF5500] text-3xl cursor-pointer bg-transparent border-none transition-colors"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollTo("#doacoes")}
              className="mt-4 bg-[#FF5500] text-white px-8 py-3.5 rounded-full cursor-pointer border-none shadow-lg"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
            >
              💛 Doe agora
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
