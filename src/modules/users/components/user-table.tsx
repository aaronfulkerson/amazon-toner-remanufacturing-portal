"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { Table } from "@/components";
import { useQueryWithToast } from "@/hooks";

import type { Cell, PaginationState, Row } from "@tanstack/react-table";
import type { GetUsersSuccess } from "@/app/api/users/route";
import type { CustomTableOptions } from "@/components";

type User = GetUsersSuccess["users"][number];
interface PermissionsProps<TData> {
  cell: Cell<TData, User["permissions"]>;
}

function Permissions<TData>({ cell }: PermissionsProps<TData>) {
  const value = cell.getValue();
  if (value.includes(null)) return "none";
  return value.join(", ");
}

interface RowActionsProps<TData> {
  row: Row<TData>;
}

function RowActions<TData>({ row }: RowActionsProps<TData>) {
  return (
    <a
      href="#"
      className="text-indigo-600 hover:text-indigo-900"
      onClick={() => console.log(row)}
    >
      Edit
    </a>
  );
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("role", { header: "Role" }),
  columnHelper.accessor("permissions", {
    header: "Permissions",
    cell: (props) => <Permissions cell={props.cell} />,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <RowActions row={props.row} />,
  }),
];

export function UserTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data } = useQueryWithToast<GetUsersSuccess>({
    queryKey: ["users", pagination],
    queryFn: async () => {
      const response = await fetch(
        "/api/users?" +
          new URLSearchParams({
            limit: pagination.pageSize.toString(),
            offset: pagination.pageIndex.toString(),
          }).toString()
      );
      if (response.status !== 200) throw await response.json();
      return await response.json();
    },
    retry: false,
  });

  const options: CustomTableOptions<User> = {
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: data?.count ?? -1,
    state: { pagination },
  };

  return <Table columns={columns} data={data?.users ?? []} options={options} />;
}
