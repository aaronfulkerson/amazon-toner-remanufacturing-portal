import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base outline-1 outline-gray-300 outline-offset-0 focus:outline-2 focus:outline-offset-0 focus:outline-indigo-600 sm:pr-9 sm:text-sm/6",
  {
    variants: {
      variant: {},
      size: {},
      hasError: {
        true: "text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600",
        false: null,
      },
    },
    defaultVariants: {},
    compoundVariants: [],
  }
);

export const iconVariants = cva(
  "pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end sm:size-4",
  {
    variants: {
      hasError: {
        true: "text-red-500 ",
        false: null,
      },
    },
    defaultVariants: {},
  }
);

export type IconVariantProps = VariantProps<typeof iconVariants>;
export type InputVariantProps = VariantProps<typeof inputVariants> &
  IconVariantProps;
