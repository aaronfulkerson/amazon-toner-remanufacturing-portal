import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const textVariants = cva("", {
  variants: {
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    weight: "normal",
  },
});

export type TextVariantProps = VariantProps<typeof textVariants>;
