import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const selectVariants = cva(
  [
    "col-start-1 row-start-1",
    "block",
    "appearance-none",
    "w-full",
    "rounded-md",
    "bg-white",
    "py-1.5 pr-8 pl-3",
    "text-base text-gray-900 sm:text-sm/6",
    "outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600",
    "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200",
  ],
  {
    variants: {
      intent: {},
      size: {},
      hasError: {
        true: "text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600",
        false: null,
      },
    },
  }
);

export const iconVariants = cva(
  "pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
);

export type SelectVariantProps = VariantProps<typeof selectVariants>;
export type IconVariantProps = VariantProps<typeof iconVariants>;
