/**
 * Detecta telefones brasileiros em texto livre e monta segmentos para linkar ao WhatsApp.
 */

export type PhoneTextSegment =
  | { kind: "text"; text: string }
  | { kind: "phone"; text: string; waHref: string };

/** Dígitos → wa.me (55 + DDD + número, 10 ou 11 dígitos locais). */
export function matchToWhatsAppHref(raw: string): string | null {
  const d = raw.replace(/\D/g, "");
  let n = d;
  if (n.length === 10 || n.length === 11) {
    n = `55${n}`;
  }
  if (!n.startsWith("55")) return null;
  const rest = n.slice(2);
  if (rest.length !== 10 && rest.length !== 11) return null;
  const ddd = Number.parseInt(rest.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return null;
  return `https://wa.me/${n}`;
}

const FORMATTED_PHONE =
  /(?:\+?55[\s.-]*)?(?:(?:\([1-9]\d\)|[1-9]\d)[\s.-]*)?(?:9[\s.-]*)?\d{4}[\s.-]?\d{4}/g;

const DIGITS_ONLY_PHONE = /\b(?:\+?55)?[1-9]\d{9,10}\b/g;

function collectRawMatches(text: string): { start: number; end: number; raw: string }[] {
  const out: { start: number; end: number; raw: string }[] = [];

  for (const re of [FORMATTED_PHONE, DIGITS_ONLY_PHONE]) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      out.push({ start: m.index, end: m.index + m[0].length, raw: m[0] });
    }
  }

  out.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return b.end - b.start - (a.end - a.start);
  });

  const picked: { start: number; end: number; raw: string }[] = [];
  for (const x of out) {
    if (!matchToWhatsAppHref(x.raw)) continue;
    const overlaps = picked.some(
      (p) => !(x.end <= p.start || x.start >= p.end),
    );
    if (overlaps) continue;
    picked.push(x);
  }

  picked.sort((a, b) => a.start - b.start);
  return picked;
}

/** Parte o texto em trechos normais e trechos que são telefone válido (com href WhatsApp). */
export function splitTextWithBrazilPhones(text: string): PhoneTextSegment[] {
  if (!text) return [{ kind: "text", text: "" }];

  const matches = collectRawMatches(text);
  if (matches.length === 0) return [{ kind: "text", text }];

  const segments: PhoneTextSegment[] = [];
  let last = 0;

  for (const x of matches) {
    const href = matchToWhatsAppHref(x.raw);
    if (!href) continue;
    if (x.start > last) {
      segments.push({ kind: "text", text: text.slice(last, x.start) });
    }
    segments.push({ kind: "phone", text: x.raw, waHref: href });
    last = x.end;
  }

  if (last < text.length) {
    segments.push({ kind: "text", text: text.slice(last) });
  }

  return segments;
}
