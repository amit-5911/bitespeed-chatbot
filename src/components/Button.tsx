"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  onClick = () => {},
  className = "",
  children,
  disabled = false,
  type = "button",
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
}
