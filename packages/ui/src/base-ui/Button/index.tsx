import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

export default Button;
