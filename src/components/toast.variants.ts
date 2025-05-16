import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const toastRootVariants = cva("rounded-md p-4 shadow-sm flex flex-col", {
  variants: {
    type: {
      error: "bg-red-50",
      info: "bg-white",
      success: "bg-green-50",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export const toastTitleVariants = cva(
  "text-sm font-medium flex items-center gap-3",
  {
    variants: {
      type: {
        error: "text-red-800",
        info: "text-gray-600",
        success: "text-green-800",
      },
    },
    defaultVariants: { type: "info" },
  }
);

export const toastDescriptionVariants = cva("text-xs ml-8", {
  variants: {
    type: {
      error: "text-red-700",
      info: "text-gray-700",
      success: "text-green-700",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export const toastViewportVariants = cva(
  "fixed bottom-0 right-0 w-100 p-8 z-200 flex flex-col gap-2.5 outline-none list-none"
);

export type ToastRootVariantProps = VariantProps<typeof toastRootVariants>;
