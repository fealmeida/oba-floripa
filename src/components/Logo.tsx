"use client";

type LogoProps = {
  className?: string;
  height?: number;
  src?: string;
};

export function Logo({ className = "", height = 40, src = "/logo-oba-svg.svg" }: LogoProps) {
  return (
    <img
      src={src}
      alt="OBA! Organização Bem-Animal"
      height={height}
      width={height * (576 / 360)}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
