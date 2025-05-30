import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";

export const tableVariants = cva("", {
  variants: {},
  defaultVariants: {},
});

export const tableHeadVariants = cva("bg-gray-50", {
  variants: {},
  defaultVariants: {},
});

export const tableBodyVariants = cva("divide-y divide-gray-200 bg-white", {
  variants: {},
  defaultVariants: {},
});

export const tableHeaderVariants = cva(
  "py-3.5 text-left text-sm font-semibold text-gray-900",
  {
    variants: {
      alignment: {
        left: "pl-6 pr-3",
        right: "pl-3 pr-6",
        default: "px-3",
      },
    },
    defaultVariants: {
      alignment: "default",
    },
  }
);

export const tableDataCellVariants = cva(
  "py-4 text-sm whitespace-nowrap text-gray-500",
  {
    variants: {
      isActionCell: {
        true: "relative text-right font-medium",
      },
      isPlaceHolder: {
        true: "text-center",
      },
      alignment: {
        left: "pl-6 pr-3 font-medium text-gray-900",
        right: "pl-3 pr-6",
        default: "px-3",
      },
    },
    defaultVariants: {
      alignment: "default",
    },
  }
);

export type TableVariantProps = VariantProps<typeof tableVariants>;
export type TableHeadVariantProps = VariantProps<typeof tableHeadVariants>;
export type TableBodyVariantProps = VariantProps<typeof tableBodyVariants>;
export type TableHeaderVariantProps = VariantProps<typeof tableHeaderVariants>;
export type TableDataCellVariantProps = VariantProps<
  typeof tableDataCellVariants
>;
