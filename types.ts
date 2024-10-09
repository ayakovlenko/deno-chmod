/**
 * An object that holds owner, group, and other permissions.
 */
export interface PermissionGroups {
  owner: PermissionGroup; // u
  group: PermissionGroup; // g
  other: PermissionGroup; // o
}

/**
 * An object that holds read, write, and execute permission flags.
 */
export interface PermissionGroup {
  read: boolean; // r
  write: boolean; // w
  execute: boolean; // x
}
