export interface PermissionGroups {
  owner: PermissionGroup; // u
  group: PermissionGroup; // g
  other: PermissionGroup; // o
}

export interface PermissionGroup {
  read: boolean; // r
  write: boolean; // w
  execute: boolean; // x
}
