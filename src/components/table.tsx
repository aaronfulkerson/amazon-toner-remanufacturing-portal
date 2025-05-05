"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TablePagination } from "@/components";
import {
  tableBodyVariants,
  tableDataCellVariants,
  tableHeaderVariants,
  tableHeadVariants,
} from "@/components/table.variants";
import {
  getTableDataCellAlignment,
  getTableHeaderAlignment,
} from "@/lib/table";
import { cnMerge } from "@/lib/ui";

import type {
  CoreInstance,
  HeadersInstance,
  TableOptions,
} from "@tanstack/react-table";
import type {
  TableHeaderVariantProps,
  TableBodyVariantProps,
  TableHeadVariantProps,
  TableVariantProps,
  TableDataCellVariantProps,
} from "@/components/table.variants";

interface TableDataCellProps
  extends React.ComponentProps<"td">,
    TableDataCellVariantProps {}

function TableDataCell({
  alignment,
  children,
  className,
  isActionCell,
  ...props
}: TableDataCellProps) {
  return (
    <td
      className={cnMerge(
        tableDataCellVariants({ alignment, isActionCell }),
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

interface TableBodyProps<TData>
  extends React.ComponentProps<"tbody">,
    Pick<CoreInstance<TData>, "getRowModel">,
    TableBodyVariantProps {}

function TableBody<TData>({
  className,
  getRowModel,
  ...props
}: TableBodyProps<TData>) {
  return (
    <tbody className={cnMerge(tableBodyVariants(), className)} {...props}>
      {getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            const alignment = getTableDataCellAlignment(cell);
            const isActionCell = cell.column.id === "actions";
            return (
              <TableDataCell
                alignment={alignment}
                isActionCell={isActionCell}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableDataCell>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

interface TableHeaderProps
  extends React.ComponentProps<"th">,
    TableHeaderVariantProps {}

function TableHeader({ alignment, children, className }: TableHeaderProps) {
  return (
    <th
      className={cnMerge(tableHeaderVariants({ alignment }), className)}
      scope="col"
    >
      {children}
    </th>
  );
}

interface TableHead<TData>
  extends React.ComponentProps<"thead">,
    Pick<HeadersInstance<TData>, "getHeaderGroups">,
    TableHeadVariantProps {}

function TableHead<TData>({ className, getHeaderGroups }: TableHead<TData>) {
  return (
    <thead className={cnMerge(tableHeadVariants(), className)}>
      {getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const alignment = getTableHeaderAlignment(header);
            return (
              <TableHeader
                alignment={alignment}
                key={header.id}
                colSpan={header.colSpan}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHeader>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}

interface TableContainerProps {
  children: React.ReactNode;
}

function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="inline-block min-w-full pb-2 align-middle">
      <div className="overflow-hidden shadow-sm ring-1 ring-black/5 rounded-lg">
        {children}
      </div>
    </div>
  );
}

type RequiredTableOptions<TData> = Pick<
  TableOptions<TData>,
  "columns" | "data"
>;
type OmittedTableOptions<TData> = RequiredTableOptions<TData> &
  Pick<TableOptions<TData>, "getCoreRowModel">;
export type CustomTableOptions<TData> = Omit<
  TableOptions<TData>,
  keyof OmittedTableOptions<TData>
>;
interface TableProps<TData>
  extends RequiredTableOptions<TData>,
    TableVariantProps {
  options?: CustomTableOptions<TData>;
}

export function Table<TData>({ columns, data, options }: TableProps<TData>) {
  const table = useReactTable({
    ...options,
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
      <table className="min-w-full divide-y divide-gray-300">
        <TableHead getHeaderGroups={table.getHeaderGroups} />
        <TableBody getRowModel={table.getRowModel} />
      </table>
      {options?.manualPagination && <TablePagination {...table} />}
    </TableContainer>
  );
}
