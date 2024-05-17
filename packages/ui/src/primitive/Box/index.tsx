import type { ReactNode } from "react";

export interface BoxProps {
  children: ReactNode;
}

const Box = ({ children }: BoxProps) => {
  return <div>{children}</div>;
};

export default Box;
