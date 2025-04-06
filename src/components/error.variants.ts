import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const errorVariants = cva("text-[0.7rem]/4 text-red-600", {
  variants: { intent: {}, size: {} },
  defaultVariants: {},
});

export type ErrorVariantProps = VariantProps<typeof errorVariants>;
