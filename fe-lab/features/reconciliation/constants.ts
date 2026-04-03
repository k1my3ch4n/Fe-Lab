import type { DiffScenario } from "./types";

export const RECONCILIATION_SCENARIOS: DiffScenario[] = [
  {
    id: "same-type",
    label: "같은 타입 업데이트",
    description:
      "같은 타입의 엘리먼트는 속성만 비교하여 변경된 부분만 업데이트합니다.",
    oldTree: {
      tag: "div",
      props: { className: "container" },
      children: [
        {
          tag: "h1",
          props: { className: "title", style: "color: blue" },
          text: "Hello",
        },
        {
          tag: "p",
          props: { className: "desc" },
          text: "World",
        },
      ],
    },
    newTree: {
      tag: "div",
      props: { className: "container active" },
      children: [
        {
          tag: "h1",
          props: { className: "title", style: "color: red" },
          text: "Hello",
        },
        {
          tag: "p",
          props: { className: "desc" },
          text: "React!",
        },
      ],
    },
    operations: [
      {
        type: "UPDATE",
        target: "div",
        detail: 'className: "container" → "container active"',
        color: "#00e5ff",
      },
      {
        type: "UPDATE",
        target: "h1",
        detail: 'style: "color: blue" → "color: red"',
        color: "#ffb800",
      },
      {
        type: "UPDATE",
        target: "p",
        detail: 'textContent: "World" → "React!"',
        color: "#b388ff",
      },
    ],
    highlights: [
      { nodeTag: "div", action: "updated", color: "#00e5ff" },
      { nodeTag: "h1", action: "updated", color: "#ffb800" },
      { nodeTag: "p", action: "updated", color: "#b388ff" },
    ],
  },
  {
    id: "different-type",
    label: "다른 타입 교체",
    description:
      "다른 타입의 엘리먼트는 이전 트리를 버리고 새 트리를 처음부터 구축합니다.",
    oldTree: {
      tag: "div",
      props: { className: "wrapper" },
      children: [
        {
          tag: "Counter",
          props: { count: "5" },
          children: [{ tag: "span", text: "Count: 5" }],
        },
      ],
    },
    newTree: {
      tag: "div",
      props: { className: "wrapper" },
      children: [
        {
          tag: "Timer",
          props: { seconds: "0" },
          children: [{ tag: "span", text: "Time: 0s" }],
        },
      ],
    },
    operations: [
      {
        type: "DELETE",
        target: "Counter",
        detail: "Counter 컴포넌트 언마운트 (state 소멸)",
        color: "#ff2d8a",
      },
      {
        type: "INSERT",
        target: "Timer",
        detail: "Timer 컴포넌트 새로 마운트 (state 초기화)",
        color: "#00e676",
      },
    ],
    highlights: [
      { nodeTag: "Counter", action: "removed", color: "#ff2d8a" },
      { nodeTag: "Timer", action: "inserted", color: "#00e676" },
    ],
  },
  {
    id: "list-no-key",
    label: "리스트 (key 없음)",
    description:
      "key가 없으면 인덱스로 비교합니다. 앞에 삽입 시 모든 항목이 변경됩니다.",
    oldTree: {
      tag: "ul",
      children: [
        { tag: "li", text: "Apple" },
        { tag: "li", text: "Banana" },
      ],
    },
    newTree: {
      tag: "ul",
      children: [
        { tag: "li", text: "Cherry" },
        { tag: "li", text: "Apple" },
        { tag: "li", text: "Banana" },
      ],
    },
    operations: [
      {
        type: "UPDATE",
        target: "li[0]",
        detail: '"Apple" → "Cherry" (인덱스 0 비교)',
        color: "#ffb800",
      },
      {
        type: "UPDATE",
        target: "li[1]",
        detail: '"Banana" → "Apple" (인덱스 1 비교)',
        color: "#ffb800",
      },
      {
        type: "INSERT",
        target: "li[2]",
        detail: '"Banana" 새로 생성 (인덱스 2)',
        color: "#00e676",
      },
    ],
    highlights: [
      { nodeTag: "li[0]", action: "updated", color: "#ffb800" },
      { nodeTag: "li[1]", action: "updated", color: "#ffb800" },
      { nodeTag: "li[2]", action: "inserted", color: "#00e676" },
    ],
  },
  {
    id: "list-with-key",
    label: "리스트 (key 있음)",
    description:
      "key가 있으면 같은 key끼리 비교합니다. 기존 항목을 재사용하고 새 항목만 삽입합니다.",
    oldTree: {
      tag: "ul",
      children: [
        { tag: "li", key: "a", text: "Apple" },
        { tag: "li", key: "b", text: "Banana" },
      ],
    },
    newTree: {
      tag: "ul",
      children: [
        { tag: "li", key: "c", text: "Cherry" },
        { tag: "li", key: "a", text: "Apple" },
        { tag: "li", key: "b", text: "Banana" },
      ],
    },
    operations: [
      {
        type: "INSERT",
        target: 'li[key="c"]',
        detail: '"Cherry" 새로 삽입 (key: c)',
        color: "#00e676",
      },
      {
        type: "REORDER",
        target: 'li[key="a"]',
        detail: '"Apple" 재사용 (key: a → 이동만)',
        color: "#00e5ff",
      },
      {
        type: "REORDER",
        target: 'li[key="b"]',
        detail: '"Banana" 재사용 (key: b → 이동만)',
        color: "#00e5ff",
      },
    ],
    highlights: [
      { nodeTag: 'li[key="c"]', action: "inserted", color: "#00e676" },
      { nodeTag: 'li[key="a"]', action: "reused", color: "#00e5ff" },
      { nodeTag: 'li[key="b"]', action: "reused", color: "#00e5ff" },
    ],
  },
];

export const TABS = RECONCILIATION_SCENARIOS.map((x) => ({
  id: x.id,
  label: x.label,
}));
