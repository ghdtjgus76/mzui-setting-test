import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
}

const Box = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

export default Box;
