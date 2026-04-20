import { ActionButton } from "@shared/ui";

interface TypeGuardActionsProps {
  activeExample: number;
  onGuardCheck: (inputLabel: string, resultType: string) => void;
  onAddLog: (message: string) => void;
}

export function TypeGuardActions({
  activeExample,
  onGuardCheck,
  onAddLog,
}: TypeGuardActionsProps) {
  return (
    <>
      {activeExample === 0 && (
        <div className="flex flex-col gap-2">
          <ActionButton
            variant="cyan"
            onClick={() => onGuardCheck('"hello" (string)', "string")}
          >
            format(&quot;hello&quot;)
          </ActionButton>
          <ActionButton
            variant="amber"
            onClick={() => onGuardCheck("3.14159 (number)", "number")}
          >
            format(3.14159)
          </ActionButton>
        </div>
      )}
      {activeExample === 1 && (
        <div className="flex flex-col gap-2">
          <ActionButton
            variant="violet"
            onClick={() => onGuardCheck("new Dog()", "Dog → bark()")}
          >
            speak(new Dog())
          </ActionButton>
          <ActionButton
            variant="green"
            onClick={() => onGuardCheck("new Cat()", "Cat → meow()")}
          >
            speak(new Cat())
          </ActionButton>
        </div>
      )}
      {activeExample === 2 && (
        <div className="flex flex-col gap-2">
          <ActionButton
            variant="cyan"
            onClick={() => onGuardCheck("{ swim() }", "Fish → swim()")}
          >
            move(fish)
          </ActionButton>
          <ActionButton
            variant="green"
            onClick={() => onGuardCheck("{ fly() }", "Bird → fly()")}
          >
            move(bird)
          </ActionButton>
        </div>
      )}
      {activeExample === 3 && (
        <div className="flex flex-col gap-2">
          <ActionButton
            variant="amber"
            onClick={() =>
              onGuardCheck('{ role: "admin" }', "Admin → permissions")
            }
          >
            getInfo(admin)
          </ActionButton>
          <ActionButton
            variant="magenta"
            onClick={() => onGuardCheck('{ role: "user" }', "User → email")}
          >
            getInfo(user)
          </ActionButton>
        </div>
      )}
      {activeExample === 4 && (
        <div className="flex flex-col gap-2">
          <ActionButton
            variant="cyan"
            onClick={() => {
              onGuardCheck('{ kind: "circle" }', "circle → radius");
              onAddLog("area = π × r²");
            }}
          >
            area(circle)
          </ActionButton>
          <ActionButton
            variant="amber"
            onClick={() => {
              onGuardCheck('{ kind: "rectangle" }', "rectangle → w, h");
              onAddLog("area = w × h");
            }}
          >
            area(rectangle)
          </ActionButton>
          <ActionButton
            variant="magenta"
            onClick={() => {
              onGuardCheck('{ kind: "triangle" }', "triangle → base, height");
              onAddLog("area = (base × height) / 2");
            }}
          >
            area(triangle)
          </ActionButton>
        </div>
      )}
    </>
  );
}
