import {
  TableDataCellVariantProps,
  TableHeaderVariantProps,
} from "@/components/table.variants";
import type { Cell, Header } from "@tanstack/react-table";

type HeaderAlignment = NonNullable<TableHeaderVariantProps["alignment"]>;
type CellAlignment = NonNullable<TableDataCellVariantProps["alignment"]>;

export function getHeaderAlignment<TData>(
  header: Header<TData, unknown>
): HeaderAlignment {
  if (header.index === 0) {
    return "left";
  }

  if (header.index === header.headerGroup.headers.length - 1) {
    return "right";
  }

  return "default";
}

export function getCellAlignment<TData>(
  cell: Cell<TData, unknown>
): CellAlignment {
  const index = cell.column.getIndex();

  if (index === 0) {
    return "left";
  }

  if (index === cell.getContext().table.getAllColumns().length - 1) {
    return "right";
  }

  return "default";
}
