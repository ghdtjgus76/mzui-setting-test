import type { ReactNode } from "react";
import { css } from "@styled-system/css/css";

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
  return (
    <button
      className={css({
        bg: "red.400",
        fontFamily: "Inter",
        px: "4",
        py: "3",
        borderRadius: "md",
        _hover: { bg: "red.500" },
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
