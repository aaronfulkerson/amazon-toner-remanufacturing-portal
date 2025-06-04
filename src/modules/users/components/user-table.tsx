"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { Modal, Table } from "@/components";
import { useQueryWithToast } from "@/hooks";
import { createApiUrl } from "@/lib/api";
import { cnMerge } from "@/lib/ui";
import { EditUserForm } from "@/modules/users/components";
import { rowActionsVariants } from "@/modules/users/components/user-table.variants";

import type { Cell, PaginationState, Row } from "@tanstack/react-table";
import type { GetUsersSuccess } from "@/app/api/users/route";
import type { CustomTableOptions } from "@/components";

export type User = GetUsersSuccess["users"][number];
interface PermissionsCellProps {
  cell: Cell<User, User["permissions"]>;
}

function PermissionsCell({ cell }: PermissionsCellProps) {
  const value = cell.getValue();
  if (value.includes(null)) return "none";
  return value.join(", ");
}

interface RowActionsProps {
  row: Row<User>;
}

function RowActions({ row }: RowActionsProps) {
  const [open, setOpen] = useState(false);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);
  const disabled = row.original.role === "admin";

  return (
    <Modal
      onOpenChange={setOpen}
      open={open}
      title="Edit User"
      trigger={
        <a href="#" className={cnMerge(rowActionsVariants({ disabled }))}>
          Edit
        </a>
      }
    >
      <EditUserForm closeModal={closeModal} user={row.original} />
    </Modal>
  );
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("role", { header: "Role" }),
  columnHelper.accessor("permissions", {
    header: "Permissions",
    cell: (props) => <PermissionsCell cell={props.cell} />,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <RowActions row={props.row} />,
  }),
];

interface UserTableProps {
  search?: string;
}

export function UserTable({ search }: UserTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryObj = search ? { search } : undefined;
  const fetchUrl = createApiUrl("/users", { pagination, queryObj });

  const { data, isError, isLoading } = useQueryWithToast<GetUsersSuccess>(
    fetchUrl,
    {
      queryKey: ["users", pagination, queryObj],
      retry: false,
    }
  );

  const options: CustomTableOptions<User> = {
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: data?.count,
    state: { pagination },
  };

  return (
    <Table
      columns={columns}
      data={data?.users ?? []}
      isError={isError}
      isLoading={isLoading}
      options={options}
    />
  );
}
