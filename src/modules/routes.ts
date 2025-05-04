export const FEATURE_ROUTES = {
  CARTRIDGES: "/cartridges",
  DASHBOARD: "/dashboard",
  PARTS: "/parts",
  REMANUFACTURING: "/remanufacturing",
  SALES: "/sales",
  SERVICE: "/service",
  USERS: "/users",
} as const;

export const ROUTES = {
  ...FEATURE_ROUTES,
  LOGIN: "/login",
  ROOT: "/",
  SETUP: "/setup",
} as const;
