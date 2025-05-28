"use client";

import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button, Input, Modal, PageHeading } from "@/components";
import { CreateUserForm, UserTable } from "@/modules/users";

import type { ChangeEventHandler } from "react";

function PageActions() {
  const [open, setOpen] = useState(false);
  const closeModal = useCallback(() => setOpen(false), [setOpen]);

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
      <CreateUserForm closeModal={closeModal} />
    </Modal>
  );
}

export default function UsersPage() {
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
