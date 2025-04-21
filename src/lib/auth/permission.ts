"use server";

import { cache } from "react";
import { getPermissionsByUserId } from "@/db/queries/permissions";
import { SelectPermission, SelectUser } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth/session";

export const getPermissions = cache(
  async (): Promise<{
    permissions: SelectPermission["permission"][];
    role: SelectUser["role"];
  }> => {
    const { user } = await getCurrentSession();

    if (!user) throw Error("getCurrentSession returned null.");

    const permissions = await getPermissionsByUserId(user.id);

    return {
      permissions: permissions.map((p) => p.permission),
      role: user.role,
    };
  }
);
