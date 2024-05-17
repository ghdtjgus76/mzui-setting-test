import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: "xs" | "s" | "m" | "l" | "xl";
  isLoading?: boolean;
}

const Button = ({
  children,
  onClick,
  size = "xs",
  isLoading = false,
}: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
