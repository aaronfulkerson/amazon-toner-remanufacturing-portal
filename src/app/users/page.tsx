"use client";

import { ChangeEventHandler, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button, Input, Modal, PageHeading } from "@/components";
import { CreateUserForm, UserTable } from "@/modules/users";

function PageActions() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onOpenChange={setOpen}
      open={open}
      title="Create User"
      trigger={
        <Button icon="user" size="lg">
          Create User
        </Button>
      }
    >
      <CreateUserForm closeModal={() => setOpen(false)} />
    </Modal>
  );
}

export function UsersModuleAdminPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const handleSetSearch: ChangeEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.target.value);

  return (
    <div className="flex flex-col gap-8 mt-1">
      <PageHeading actions={<PageActions />}>Users</PageHeading>
      <div className="flex flex-col gap-3">
        <Input
          id="search"
          placeholder="Search"
          onChange={handleSetSearch}
          value={search}
        />
        <UserTable search={debouncedSearch} />
      </div>
    </div>
  );
}
