import type { CSSProperties } from "react";
import { splitTextWithBrazilPhones } from "@/lib/brazil-phone-in-text";

type DescriptionWithWhatsAppLinksProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  linkClassName?: string;
  linkStyle?: CSSProperties;
};

/**
 * Renderiza texto da descrição e transforma números de telefone BR reconhecíveis em links para o WhatsApp.
 */
export function DescriptionWithWhatsAppLinks({
  text,
  className,
  style,
  linkClassName,
  linkStyle,
}: DescriptionWithWhatsAppLinksProps) {
  const segments = splitTextWithBrazilPhones(text);

  return (
    <span className={className} style={style}>
      {segments.map((seg, i) =>
        seg.kind === "phone" ? (
          <a
            key={i}
            href={seg.waHref}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            style={linkStyle}
            onClick={(e) => e.stopPropagation()}
          >
            {seg.text}
          </a>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </span>
  );
}
