import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
            const isActionCell = typeof cell.renderValue() === "object";
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
    TableHeaderVariantProps {
  children: React.ReactNode;
}

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
      <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          {children}
        </table>
      </div>
    </div>
  );
}

interface TableProps<TData>
  extends Pick<TableOptions<TData>, "columns" | "data">,
    TableVariantProps {}

export function Table<TData>({ columns, data }: TableProps<TData>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
      <TableHead getHeaderGroups={table.getHeaderGroups} />
      <TableBody getRowModel={table.getRowModel} />
    </TableContainer>
  );
}
