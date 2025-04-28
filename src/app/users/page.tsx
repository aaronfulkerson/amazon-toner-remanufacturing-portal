"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Button, PageHeading, Table } from "@/components";

import type { Row } from "@tanstack/react-table";

interface RowActionsProps<TData> {
  row: Row<TData>;
}

function RowActions<TData>({ row }: RowActionsProps<TData>) {
  console.log(row);
  return (
    <a href="#" className="text-indigo-600 hover:text-indigo-900">
      Edit
    </a>
  );
}

interface Users {
  name: string;
  email: string;
  role: "admin" | "customer" | "employee";
}

const people: Users[] = [
  {
    name: "Test User",
    email: "test1@test.net",
    role: "customer",
  },
  {
    name: "Logan Ice",
    email: "test2@test.net",
    role: "employee",
  },
  {
    name: "Guillermo Casablanca",
    email: "test3@test.net",
    role: "admin",
  },
];

const columnHelper = createColumnHelper<Users>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
  columnHelper.accessor("role", { header: "Role" }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <RowActions row={props.row} />,
  }),
];

function PageActions() {
  return (
    <Button icon="user" size="lg">
      Create New User
    </Button>
  );
}

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeading actions={<PageActions />}>Users</PageHeading>
      <Table columns={columns} data={people} />
    </div>
  );
}
