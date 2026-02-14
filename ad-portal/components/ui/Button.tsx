import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-600 text-white",
    secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/10",
    ghost: "hover:bg-white/5 text-gray-400 hover:text-white",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
