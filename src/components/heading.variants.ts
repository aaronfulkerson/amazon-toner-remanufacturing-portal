import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const headingVariants = cva("font-bold text-gray-900", {
  variants: { size: { md: "text-2xl/7" } },
  defaultVariants: { size: "md" },
});

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
