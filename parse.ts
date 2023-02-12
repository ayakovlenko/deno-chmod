import type { PermissionGroups } from "./types.ts";

const REGEX = /^.([r-][w-][x-])([r-][w-][x-])([r-][w-][x-])$/;

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
