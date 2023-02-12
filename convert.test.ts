import { assertEquals } from "./deps_test.ts";
import { decimal2octal, octal2decimal, symbolic2octal } from "./convert.ts";

Deno.test({
  name: "symbolic to octal",
  fn: async (t) => {
    const testCases: [string, number][] = [
      ["-rw-r--r--", 644],
      ["-rwxr-xr-x", 755],
      ["drwxr-xr-x", 755],
    ];

    for (const [input, want] of testCases) {
      await t.step({
        name: `${input} must be ${want}`,
        fn: () => {
          const have = symbolic2octal(input);
          assertEquals(have, want);
        },
      });
    }
  },
});

Deno.test({
  name: "octal to decimal",
  fn: async (t) => {
    const testCases: [number, number][] = [
      [777, 33279],
    ];

    for (const [input, want] of testCases) {
      await t.step({
        name: `${input} must be ${want}`,
        fn: () => {
          const have = octal2decimal(input);
          assertEquals(have, want);
        },
      });
    }
  },
});

Deno.test({
  name: "decimal to octal",
  fn: async (t) => {
    const testCases: [number, number][] = [
      [33279, 777],
    ];

    for (const [input, want] of testCases) {
      await t.step({
        name: `${input} must be ${want}`,
        fn: () => {
          const have = decimal2octal(input);
          assertEquals(have, want);
        },
      });
    }
  },
});
