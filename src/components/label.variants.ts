import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const labelVariants = cva("block text-sm/6 font-medium text-gray-900", {
  variants: {
    intent: {},
    size: {},
  },
  defaultVariants: {},
});

export type LabelVariantProps = VariantProps<typeof labelVariants>;
