import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const navigationLinkVariants = cva(
  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
  {
    variants: {
      active: {
        true: "bg-gray-50 text-indigo-600",
        false: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
      },
    },
  }
);

export const navigationIconVariants = cva("size-6 shrink-0", {
  variants: {
    active: {
      true: "text-indo-600",
      false: "text-gray-400 group-hover:text-indigo-600",
    },
  },
});

export type NavigtationLinkVariantsProps = VariantProps<
  typeof navigationLinkVariants
>;
export type NavigationIconVariants = VariantProps<
  typeof navigationIconVariants
>;
