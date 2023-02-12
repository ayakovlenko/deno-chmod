import { parseSymbolic } from "./parse.ts";

import type { PermissionGroup } from "./types.ts";

function symbolic2octal(expr: string): number {
  const { owner, group, other } = parseSymbolic(expr);
  return octal(owner) * 100 + octal(group) * 10 + octal(other);
}

// the decimal format is used by Deno.stat
function octal2decimal(p: number): number {
  return Number.parseInt((100_000 + p).toString(), 8);
}

function decimal2octal(p: number): number {
  return parseInt((p - 0o100_000).toString(8));
}

function octal({ read, write, execute }: PermissionGroup): number {
  let ret = 0;
  if (read) ret += 4;
  if (write) ret += 2;
  if (execute) ret += 1;
  return ret;
}

export { decimal2octal, octal2decimal, symbolic2octal };
