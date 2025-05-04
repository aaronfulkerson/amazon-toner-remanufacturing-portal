import { NextResponse } from "next/server";
import { authorizeRoute } from "@/lib/auth/routes";
import { getParam } from "@/lib/routes";
import { PERMISSIONS } from "@/modules";
import { getUsers } from "@/modules/users";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = await authorizeRoute(PERMISSIONS.USERS);
  if (response) return response;

  const limit = getParam(request, "limit", Number);
  const offset = getParam(request, "offset", Number);

  const users = await getUsers(limit, offset);

  return NextResponse.json(users);
}

export type GetUsersSuccess = Awaited<ReturnType<typeof getUsers>>;
