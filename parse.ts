import type { PermissionGroups } from "./types.ts";

const REGEX = /^.([r-][w-][x-])([r-][w-][x-])([r-][w-][x-])$/;

/**
 * Converts a symbolic representation of Unix permissions into a {@link PermissionGroups} object.
 *
 * ```typescript
 * import { assertEquals } from "@std/assert";
 *
 * const have = parseSymbolic("-rwxr-x-w-");
 *
 * const want = {
 *  owner: {
 *    read: true,
 *    write: true,
 *    execute: true,
 *  },
 *  group: {
 *    read: true,
 *    write: false,
 *    execute: true,
 *  },
 *  other: {
 *    read: false,
 *    write: true,
 *    execute: false,
 *  },
 * };
 *
 * assertEquals(have, want);
 * ```
 *
 * ```typescript
 * import { assertThrows } from "@std/assert";
 *
 * assertThrows(() => {
 *   parseSymbolic("");
 * });
 * ```
 */
function parseSymbolic(expr: string): PermissionGroups {
  const match = expr.match(REGEX);
  if (!match) {
    throw "incorrect permission format";
  }

  const extractPermissions = (s: string) => {
    const [read, write, execute] = s;

    return {
      read: read === "r",
      write: write === "w",
      execute: execute === "x",
    };
  };

  const [owner, group, other] = match
    .slice(1)
    .map((s) => extractPermissions(s));

  return { owner, group, other };
}

export { parseSymbolic };
