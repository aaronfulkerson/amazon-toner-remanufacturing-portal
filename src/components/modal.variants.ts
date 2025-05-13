import { cva } from "class-variance-authority";

export const dialogOverlayVariants = cva(
  "fixed inset-0 bg-black/40 data-[state=open]:animate-dialog-show z-100"
);

export const dialogContentVariants = cva(
  "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-md shadow-black/20 focus:outline-none data-[state=open]:animate-content-show z-101 text-sm text-black"
);

export const dialogTitleVariants = cva("text-base font-semibold text-gray-900");

export const dialogDescriptionVariants = cva("text-sm text-gray-500", {
  variants: {
    hasDescription: {
      true: "mt-2",
    },
  },
});
