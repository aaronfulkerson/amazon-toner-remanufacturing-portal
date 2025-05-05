import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex justify-center items-center rounded-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer",
  {
    variants: {
      intent: {
        primary:
          "bg-primary text-primary-foreground hover:bg-indigo-500 focus-visible:outline-indigo-600",
        secondary:
          "bg-white text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50",
      },
      size: {
        xs: "text-xs gap-x-1.5 px-2 py-1",
        sm: "text-sm gap-x-1.5 px-2 py-1",
        md: "text-sm gap-x-1.5 px-2.5 py-1.5",
        lg: "text-sm gap-x-2 px-3 py-2",
        xl: "text-sm gap-x-2 px-3.5 py-2.5",
      },
      disabled: {
        false: null,
        true: "hover:bg-unset cursor-not-allowed",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        disabled: true,
        class: "bg-gray-400 text-gray-200",
      },
      {
        intent: "secondary",
        disabled: true,
        class: "bg-gray-50 text-gray-300 ring-gray-100",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      disabled: false,
    },
  }
);

export const iconVariants = cva("-ml-0.5", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4.5",
      md: "size-4.5",
      lg: "size-4.5",
      xl: "size-4.5",
    },
    disabled: {
      false: null,
      true: "text-gray-200",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export type IconVariantProps = VariantProps<typeof iconVariants>;
export type ButtonVariantProps = VariantProps<typeof buttonVariants> &
  IconVariantProps;
