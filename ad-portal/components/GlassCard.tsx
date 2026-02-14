import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6
        ${hover ? "transition-all duration-300 hover:bg-white/10 hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/20" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
