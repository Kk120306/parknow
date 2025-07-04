export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/spots",
    "/favorites",
    "/reservations",
    "/properties",
  ],
};