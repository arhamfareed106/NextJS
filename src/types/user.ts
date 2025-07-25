import type { UserProfile } from "./index";

/**
 * Essential user data that is stored in cookies and used across components
 */
export type EssentialUserData = Pick<
  UserProfile,
  "name" | "last_name" | "email" | "role"
>;
