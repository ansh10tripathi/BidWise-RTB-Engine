import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-xl shadow-md p-6 ${
        hover ? "transition-all duration-200 hover:-translate-y-0.5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
