import { parseSymbolic } from "./parse.ts";

import type { PermissionGroup } from "./types.ts";

/**
 * Converts a symbolic representation of Unix permissions into an octal representation.
 *
 * ```typescript
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(symbolic2octal("-rw-r--r--"), 644);
 *
 * assertEquals(symbolic2octal("-rwxr-xr-x"), 755);
 *
 * assertEquals(symbolic2octal("drwxr-xr-x"), 755);
 * ```
 */
export function symbolic2octal(expr: string): number {
  const { owner, group, other } = parseSymbolic(expr);
  return octal(owner) * 100 + octal(group) * 10 + octal(other);
}

/**
 * Converts an octal representation of Unix permissions into a decimal representation.
 *
 * Useful for setting permissions with {@link Deno.chmod}.
 *
 * ```typescript
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(octal2decimal(777), 33279);
 * ```
 */
export function octal2decimal(p: number): number {
  return Number.parseInt((100_000 + p).toString(), 8);
}

/**
 * Converts a decimal representation of Unix permissions into an octal representation.
 *
 * Useful for converting `mode` returned by {@link Deno.stat}.
 *
 * ```typescript
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(decimal2octal(33279), 777);
 * ```
 */
export function decimal2octal(p: number): number {
  return parseInt((p - 0o100_000).toString(8));
}

function octal({ read, write, execute }: PermissionGroup): number {
  let ret = 0;
  if (read) ret += 4;
  if (write) ret += 2;
  if (execute) ret += 1;
  return ret;
}
