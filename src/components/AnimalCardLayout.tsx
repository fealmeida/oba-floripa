"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export type AnimalCardImage = {
  src: string;
  alt: string;
  img_zoom?: number | null;
  img_position?: string | null;
};

type AnimalCardLayoutProps = {
  /** Dados da foto: URL, alt, zoom e posição (crop) */
  image: AnimalCardImage;
  /** Conteúdo sobre a foto (tag, botão like, etc.) */
  imageOverlay?: ReactNode;
  /** className do container da imagem (ex.: para hover scale) */
  imageContainerClassName?: string;
  /** className do componente Image */
  imageClassName?: string;
  /** Conteúdo abaixo da foto (título, descrição, ações) */
  children: ReactNode;
};

/**
 * Layout presentacional do card de animal: bloco de imagem (zoom/position) + slot para overlay + children.
 * Quem usa define o wrapper (motion.div, Card) e o conteúdo (tag, título, botões).
 */
export function AnimalCardLayout({
  image,
  imageOverlay,
  imageContainerClassName,
  imageClassName,
  children,
}: AnimalCardLayoutProps) {
  const zoom = Math.max(1, image.img_zoom ?? 1);
  const position = image.img_position || "50% 40%";

  return (
    <>
      <div
        className={`relative h-64 shrink-0 overflow-hidden ${imageContainerClassName ?? ""}`}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: position,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover ${imageClassName ?? ""}`}
            style={{ objectPosition: position }}
          />
        </div>
        {imageOverlay}
      </div>
      {children}
    </>
  );
}
