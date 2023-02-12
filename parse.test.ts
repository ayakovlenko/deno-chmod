import { assertEquals, assertThrows } from "./deps_test.ts";
import { parseSymbolic } from "./parse.ts";

Deno.test({
  name: "symbolic parser",
  fn: async (t) => {
    await t.step({
      name: "successful parsing",
      fn(): void {
        const have = parseSymbolic("-rwxr-x-w-");
        const want = {
          owner: {
            read: true,
            write: true,
            execute: true,
          },
          group: {
            read: true,
            write: false,
            execute: true,
          },
          other: {
            read: false,
            write: true,
            execute: false,
          },
        };

        assertEquals(have, want);
      },
    });

    await t.step({
      name: "parsing failure",
      fn(): void {
        assertThrows(() => {
          parseSymbolic("");
        });
      },
    });
  },
});
