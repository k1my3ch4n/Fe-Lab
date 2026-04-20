import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "프로토타입 기본",
    code: `const animal = {
  eats: true,
  walk() {
    console.log("걷는 중...");
  }
};

const rabbit = {
  jumps: true,
  __proto__: animal   // rabbit의 프로토타입을 animal로 설정
};

rabbit.walk();   // "걷는 중..." — animal에서 상속
rabbit.jumps;    // true — 자신의 프로퍼티
rabbit.eats;     // true — 프로토타입 체인을 통해 접근

// hasOwnProperty로 자체 프로퍼티 확인
rabbit.hasOwnProperty('jumps');  // true
rabbit.hasOwnProperty('eats');   // false (상속됨)`,
  },
  {
    title: "상속 구현",
    code: `function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() {
  console.log(this.name + ' eats');
};

function Dog(name, breed) {
  Animal.call(this, name);  // super() 역할
  this.breed = breed;
}

// 프로토타입 체인 연결
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;  // constructor 복원

Dog.prototype.bark = function() {
  console.log(this.name + ' barks!');
};

const max = new Dog('Max', 'Poodle');
max.bark();  // "Max barks!"  — Dog.prototype
max.eat();   // "Max eats"    — Animal.prototype
max.toString(); // "[object Object]" — Object.prototype`,
  },
  {
    title: "class와 프로토타입",
    code: `// class는 프로토타입의 문법적 설탕(Syntactic Sugar)
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() { console.log(this.name + ' eats'); }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  bark() { console.log(this.name + ' barks!'); }
}

const max = new Dog('Max', 'Poodle');

// 내부적으로 프로토타입 체인은 동일하게 작동
max.__proto__ === Dog.prototype;           // true
Dog.prototype.__proto__ === Animal.prototype; // true
Animal.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null;       // true (체인 끝)`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "프로토타입 체인이란 무엇인가요?",
    answer: (
      <>
        프로토타입 체인은 JavaScript에서{" "}
        <strong>객체의 프로퍼티나 메서드를 탐색하는 메커니즘</strong>입니다.
        객체에서 프로퍼티를 찾지 못하면, <InlineCode>__proto__</InlineCode>가
        가리키는 프로토타입 객체에서 탐색을 계속합니다. 이 과정은 프로토타입이{" "}
        <InlineCode>null</InlineCode>일 때까지 반복되며, 이 연결된 탐색 경로를
        프로토타입 체인이라 합니다. 모든 객체는 최종적으로{" "}
        <InlineCode>Object.prototype</InlineCode>을 거쳐{" "}
        <InlineCode>null</InlineCode>에 도달합니다.
      </>
    ),
  },
  {
    question: "__proto__와 prototype의 차이는 무엇인가요?",
    answer: (
      <>
        <InlineCode>prototype</InlineCode>은 <strong>함수 객체만</strong> 가지는
        프로퍼티로, 해당 함수를 생성자로 사용할 때 새 인스턴스의 프로토타입이 될
        객체를 가리킵니다.
        <InlineCode>__proto__</InlineCode>는 <strong>모든 객체</strong>가 가지는
        내부 슬롯 <InlineCode>[[Prototype]]</InlineCode>의 접근자로, 실제
        프로토타입 체인의 연결을 나타냅니다. 즉,{" "}
        <InlineCode>new Foo()</InlineCode>로 생성된 인스턴스의{" "}
        <InlineCode>__proto__</InlineCode>는{" "}
        <InlineCode>Foo.prototype</InlineCode>을 가리킵니다. 현대 코드에서는{" "}
        <InlineCode>Object.getPrototypeOf()</InlineCode>를 사용하는 것이
        권장됩니다.
      </>
    ),
  },
  {
    question: "class 문법과 프로토타입의 관계를 설명해주세요.",
    answer: (
      <>
        ES6의 <InlineCode>class</InlineCode>는 프로토타입 기반 상속의{" "}
        <strong>문법적 설탕(Syntactic Sugar)</strong>입니다.
        <InlineCode>class Dog extends Animal</InlineCode>은 내부적으로{" "}
        <InlineCode>Dog.prototype.__proto__ = Animal.prototype</InlineCode>을
        설정합니다. 메서드는 자동으로 <InlineCode>prototype</InlineCode> 객체에
        추가되며,
        <InlineCode>super()</InlineCode>는{" "}
        <InlineCode>Animal.call(this)</InlineCode>와 유사하게 동작합니다.
        <InlineCode>class</InlineCode>가 새로운 상속 모델을 도입한 것이 아니라,
        기존 프로토타입 메커니즘을 더 읽기 쉽게 표현한 것입니다.
      </>
    ),
  },
];
