import type { TypeGuardExample } from "./types";

export const TYPE_GUARD_EXAMPLES: TypeGuardExample[] = [
  {
    id: "typeof",
    label: "typeof",
    code: `function format(value: string | number): string {
  if (typeof value === "string") {
    // value: string ← 타입 좁히기
    return value.toUpperCase();
  }
  // value: number
  return value.toFixed(2);
}

format("hello"); // "HELLO"
format(3.14159); // "3.14"`,
    beforeType: "string | number",
    afterType: "string → string\nnumber → number",
    guardMethod: 'typeof value === "string"',
    color: "#00e5ff",
  },
  {
    id: "instanceof",
    label: "instanceof",
    code: `class Dog {
  bark() { return "Woof!"; }
}
class Cat {
  meow() { return "Meow!"; }
}

function speak(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    // animal: Dog
    return animal.bark();
  }
  // animal: Cat
  return animal.meow();
}`,
    beforeType: "Dog | Cat",
    afterType: "Dog → Dog.bark()\nCat → Cat.meow()",
    guardMethod: "animal instanceof Dog",
    color: "#b388ff",
  },
  {
    id: "in",
    label: "in 연산자",
    code: `interface Fish {
  swim: () => void;
}
interface Bird {
  fly: () => void;
}

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    // animal: Fish
    animal.swim();
  } else {
    // animal: Bird
    animal.fly();
  }
}`,
    beforeType: "Fish | Bird",
    afterType: '"swim" in → Fish\nelse → Bird',
    guardMethod: '"swim" in animal',
    color: "#00e676",
  },
  {
    id: "custom-is",
    label: "사용자 정의 (is)",
    code: `interface Admin {
  role: "admin";
  permissions: string[];
}
interface User {
  role: "user";
  email: string;
}

// 사용자 정의 타입 가드
function isAdmin(
  person: Admin | User
): person is Admin {
  return person.role === "admin";
}

function getInfo(person: Admin | User) {
  if (isAdmin(person)) {
    // person: Admin
    return person.permissions;
  }
  // person: User
  return person.email;
}`,
    beforeType: "Admin | User",
    afterType: "isAdmin() → Admin\nelse → User",
    guardMethod: "person is Admin",
    color: "#ffb800",
  },
  {
    id: "discriminated",
    label: "Discriminated Union",
    code: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; w: number; h: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.w * shape.h;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}`,
    beforeType: "Shape (3 variants)",
    afterType: "circle → radius\nrectangle → w, h\ntriangle → base, height",
    guardMethod: "shape.kind (discriminant)",
    color: "#ff2d8a",
  },
];

export const TABS = TYPE_GUARD_EXAMPLES.map((x) => ({
  id: x.id,
  label: x.label,
}));
