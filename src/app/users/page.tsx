"use client";

import { ChangeEventHandler, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button, PageHeading } from "@/components";
import { Input } from "@/components/input";
import { UserTable } from "@/modules/users";

function PageActions() {
  return (
    <Button icon="user" size="lg">
      Create New User
    </Button>
  );
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const handleSetSearch: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);

  return (
    <div className="flex flex-col gap-8">
      <PageHeading actions={<PageActions />}>Users</PageHeading>
      <div className="flex flex-col gap-3">
        <Input placeholder="Search" onChange={handleSetSearch} value={search} />
        <UserTable search={debouncedSearch} />
      </div>
    </div>
  );
}
