import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const headingVariants = cva("font-bold text-gray-900", {
  variants: { size: { sm: "text-2xl/7", md: "text-3xl" } },
  defaultVariants: { size: "md" },
});

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
