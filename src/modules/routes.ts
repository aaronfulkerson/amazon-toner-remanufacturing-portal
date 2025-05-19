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
  FORGOT_PASSWORD: "/forgot-password",
  LOGIN: "/login",
  RESET_PASSWORD: "/reset-password",
  ROOT: "/",
  SETUP: "/setup",
} as const;
