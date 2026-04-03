import type { ChainExample } from "./types";

export const PROTOTYPE_CHAIN_EXAMPLES: ChainExample[] = [
  {
    id: "array",
    label: "Array",
    chain: [
      {
        name: "myArray",
        properties: [
          { name: "0", value: '"a"' },
          { name: "1", value: '"b"' },
          { name: "length", value: "2" },
        ],
        color: "#00e5ff",
      },
      {
        name: "Array.prototype",
        properties: [
          { name: "push", value: "f()" },
          { name: "pop", value: "f()" },
          { name: "map", value: "f()" },
          { name: "filter", value: "f()" },
          { name: "forEach", value: "f()" },
          { name: "indexOf", value: "f()" },
        ],
        color: "#b388ff",
      },
      {
        name: "Object.prototype",
        properties: [
          { name: "toString", value: "f()" },
          { name: "hasOwnProperty", value: "f()" },
          { name: "valueOf", value: "f()" },
          { name: "constructor", value: "f()" },
        ],
        color: "#00e676",
      },
      {
        name: "null",
        properties: [],
        color: "#555",
      },
    ],
  },
  {
    id: "function",
    label: "Function",
    chain: [
      {
        name: "myFunc",
        properties: [
          { name: "name", value: '"myFunc"' },
          { name: "length", value: "0" },
        ],
        color: "#00e5ff",
      },
      {
        name: "Function.prototype",
        properties: [
          { name: "call", value: "f()" },
          { name: "apply", value: "f()" },
          { name: "bind", value: "f()" },
          { name: "constructor", value: "f()" },
        ],
        color: "#ff2d8a",
      },
      {
        name: "Object.prototype",
        properties: [
          { name: "toString", value: "f()" },
          { name: "hasOwnProperty", value: "f()" },
          { name: "valueOf", value: "f()" },
          { name: "constructor", value: "f()" },
        ],
        color: "#00e676",
      },
      {
        name: "null",
        properties: [],
        color: "#555",
      },
    ],
  },
  {
    id: "class",
    label: "Class (Dog)",
    chain: [
      {
        name: "myDog",
        properties: [
          { name: "name", value: '"Max"' },
          { name: "breed", value: '"Poodle"' },
        ],
        color: "#00e5ff",
      },
      {
        name: "Dog.prototype",
        properties: [
          { name: "bark", value: "f()" },
          { name: "constructor", value: "f()" },
        ],
        color: "#ffb800",
      },
      {
        name: "Animal.prototype",
        properties: [
          { name: "eat", value: "f()" },
          { name: "sleep", value: "f()" },
          { name: "constructor", value: "f()" },
        ],
        color: "#b388ff",
      },
      {
        name: "Object.prototype",
        properties: [
          { name: "toString", value: "f()" },
          { name: "hasOwnProperty", value: "f()" },
          { name: "valueOf", value: "f()" },
          { name: "constructor", value: "f()" },
        ],
        color: "#00e676",
      },
      {
        name: "null",
        properties: [],
        color: "#555",
      },
    ],
  },
];

/** Well-known property lookups for each example */
export const PROPERTY_SUGGESTIONS: Record<string, string[]> = {
  array: ["push", "length", "toString", "hasOwnProperty", "foo"],
  function: ["call", "bind", "toString", "valueOf", "bar"],
  class: ["bark", "eat", "toString", "name", "fly"],
};
