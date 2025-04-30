import { Button, PageHeading } from "@/components";
import { UserTable } from "@/modules/users";

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
      <UserTable />
    </div>
  );
}
