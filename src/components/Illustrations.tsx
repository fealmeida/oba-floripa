// Inline SVG illustrations used across the site

export function PawPrint({ className = "", color = "#FF5500" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="38" rx="14" ry="11" fill={color} />
      <ellipse cx="14" cy="24" rx="7" ry="9" fill={color} />
      <ellipse cx="46" cy="24" rx="7" ry="9" fill={color} />
      <ellipse cx="22" cy="15" rx="5.5" ry="7" fill={color} />
      <ellipse cx="38" cy="15" rx="5.5" ry="7" fill={color} />
    </svg>
  );
}

export function HeartIllustration({ className = "", color = "#FF6B9D" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 55" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 C30 50 5 33 5 18 C5 10 11 4 19 4 C24 4 28 7 30 10 C32 7 36 4 41 4 C49 4 55 10 55 18 C55 33 30 50 30 50Z" fill={color} />
    </svg>
  );
}

export function StarIllustration({ className = "", color = "#FFB800" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M30 5 L36.5 22.5 L55 22.5 L40.5 33.5 L46.5 51 L30 40 L13.5 51 L19.5 33.5 L5 22.5 L23.5 22.5 Z" fill={color} />
    </svg>
  );
}

export function BoneIllustration({ className = "", color = "#C4B5FD" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="12" width="40" height="12" rx="6" fill={color} />
      <circle cx="12" cy="10" r="8" fill={color} />
      <circle cx="12" cy="26" r="8" fill={color} />
      <circle cx="68" cy="10" r="8" fill={color} />
      <circle cx="68" cy="26" r="8" fill={color} />
    </svg>
  );
}

export function SparkleIllustration({ className = "", color = "#10B981" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 50 50" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M25 2 L27.5 22.5 L48 25 L27.5 27.5 L25 48 L22.5 27.5 L2 25 L22.5 22.5 Z" fill={color} />
    </svg>
  );
}

export function DogIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* body */}
      <ellipse cx="60" cy="68" rx="30" ry="22" fill="#FFB800" />
      {/* head */}
      <circle cx="60" cy="38" r="22" fill="#FFB800" />
      {/* ears */}
      <ellipse cx="40" cy="24" rx="9" ry="14" fill="#FF8C00" transform="rotate(-20 40 24)" />
      <ellipse cx="80" cy="24" rx="9" ry="14" fill="#FF8C00" transform="rotate(20 80 24)" />
      {/* face */}
      <circle cx="54" cy="34" r="3.5" fill="#1A1A1A" />
      <circle cx="66" cy="34" r="3.5" fill="#1A1A1A" />
      <circle cx="55.5" cy="32.5" r="1.2" fill="white" />
      <circle cx="67.5" cy="32.5" r="1.2" fill="white" />
      {/* nose */}
      <ellipse cx="60" cy="42" rx="5" ry="3.5" fill="#1A1A1A" />
      {/* mouth */}
      <path d="M54 46 Q60 52 66 46" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* tongue */}
      <ellipse cx="60" cy="51" rx="5" ry="6" fill="#FF6B9D" />
      {/* tail */}
      <path d="M88 62 Q105 45 98 35" stroke="#FF8C00" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* legs */}
      <rect x="38" y="82" width="10" height="14" rx="5" fill="#FF8C00" />
      <rect x="52" y="84" width="10" height="14" rx="5" fill="#FF8C00" />
      <rect x="64" y="84" width="10" height="14" rx="5" fill="#FF8C00" />
      <rect x="72" y="82" width="10" height="14" rx="5" fill="#FF8C00" />
    </svg>
  );
}

export function CatIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 110" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* body */}
      <ellipse cx="60" cy="74" rx="26" ry="22" fill="#8B5CF6" />
      {/* head */}
      <circle cx="60" cy="44" r="22" fill="#8B5CF6" />
      {/* ears */}
      <polygon points="40,28 34,8 52,24" fill="#8B5CF6" />
      <polygon points="80,28 86,8 68,24" fill="#8B5CF6" />
      <polygon points="42,26 37,13 50,24" fill="#FF6B9D" />
      <polygon points="78,26 83,13 70,24" fill="#FF6B9D" />
      {/* face */}
      <ellipse cx="53" cy="40" rx="5" ry="4" fill="#10B981" />
      <ellipse cx="67" cy="40" rx="5" ry="4" fill="#10B981" />
      <ellipse cx="53" cy="41" rx="2" ry="3.5" fill="#1A1A1A" />
      <ellipse cx="67" cy="41" rx="2" ry="3.5" fill="#1A1A1A" />
      {/* nose */}
      <polygon points="60,47 57,50 63,50" fill="#FF6B9D" />
      {/* whiskers */}
      <line x1="30" y1="47" x2="52" y2="49" stroke="white" strokeWidth="1.5" />
      <line x1="30" y1="51" x2="52" y2="51" stroke="white" strokeWidth="1.5" />
      <line x1="68" y1="49" x2="90" y2="47" stroke="white" strokeWidth="1.5" />
      <line x1="68" y1="51" x2="90" y2="51" stroke="white" strokeWidth="1.5" />
      {/* tail */}
      <path d="M36 82 Q18 95 24 108" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* legs */}
      <rect x="42" y="88" width="9" height="16" rx="4.5" fill="#7C3AED" />
      <rect x="54" y="90" width="9" height="16" rx="4.5" fill="#7C3AED" />
      <rect x="64" y="90" width="9" height="16" rx="4.5" fill="#7C3AED" />
      <rect x="72" y="88" width="9" height="16" rx="4.5" fill="#7C3AED" />
    </svg>
  );
}

export function CloudBubble({ className = "", color = "#FFB800" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 70" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="45" rx="40" ry="22" fill={color} />
      <circle cx="25" cy="38" r="16" fill={color} />
      <circle cx="50" cy="30" r="22" fill={color} />
      <circle cx="72" cy="37" r="15" fill={color} />
    </svg>
  );
}
