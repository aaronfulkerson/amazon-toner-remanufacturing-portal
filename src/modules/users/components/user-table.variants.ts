import { cva } from "class-variance-authority";

export const rowActionsVariants = cva("text-indigo-600 hover:text-indigo-900", {
  variants: {
    disabled: { true: "cursor-default pointer-events-none text-gray-300" },
  },
});
