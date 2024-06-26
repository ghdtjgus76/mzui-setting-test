import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";

const UpArrow = (
  {
    size = 24,
    ...props
  }: SVGProps<SVGSVGElement> & {
    size?: number | string;
  },
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_36_3519)">
      <path
        d="M19 12L5 12"
        stroke="#E4E4E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M19 12L13 6"
        stroke="#E4E4E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M19 12L13 18"
        stroke="#E4E4E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </g>
    <defs>
      <clipPath id="clip0_36_3519">
        <rect fill="white" height="24" width="24" />
      </clipPath>
    </defs>
  </svg>
);

const ForwardRef = forwardRef(UpArrow);
export default ForwardRef;
