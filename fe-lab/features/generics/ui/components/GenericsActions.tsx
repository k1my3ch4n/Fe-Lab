import { ActionButton } from "@shared/ui";

interface GenericsActionsProps {
  activeExample: number;
  onTypeCall: (typeArg: string) => void;
  onAddLog: (message: string) => void;
  onUtilityApply: (utilName: string) => void;
}

export function GenericsActions({
  activeExample,
  onTypeCall,
  onAddLog,
  onUtilityApply,
}: GenericsActionsProps) {
  return (
    <>
      {activeExample === 0 && (
        <div className="flex flex-col gap-2">
          <ActionButton variant="cyan" onClick={() => onTypeCall("string")}>
            identity&lt;string&gt;()
          </ActionButton>
          <ActionButton variant="amber" onClick={() => onTypeCall("number")}>
            identity&lt;number&gt;()
          </ActionButton>
          <ActionButton variant="green" onClick={() => onTypeCall("boolean")}>
            identity&lt;boolean&gt;()
          </ActionButton>
        </div>
      )}
      {activeExample === 1 && (
        <ActionButton
          variant="violet"
          onClick={() => onUtilityApply("Partial<User>")}
        >
          Partial&lt;User&gt; 적용
        </ActionButton>
      )}
      {activeExample === 2 && (
        <div className="flex flex-col gap-2">
          <ActionButton
            variant="green"
            onClick={() => {
              onAddLog('Pick<User, "name" | "email">');
              onAddLog("→ { name: string; email: string }");
            }}
          >
            Pick 적용
          </ActionButton>
          <ActionButton
            variant="magenta"
            onClick={() => {
              onAddLog('Omit<User, "password">');
              onAddLog("→ { name: string; age: number; email: string }");
            }}
          >
            Omit 적용
          </ActionButton>
        </div>
      )}
      {activeExample === 3 && (
        <ActionButton
          variant="amber"
          onClick={() => {
            onAddLog("Record<Status, string> 적용");
            onAddLog(
              "→ { loading: string; success: string; error: string }",
            );
          }}
        >
          Record 적용
        </ActionButton>
      )}
      {activeExample === 4 && (
        <div className="flex flex-col gap-2">
          <ActionButton
            variant="cyan"
            onClick={() => {
              onAddLog('IsString<string> → "yes"');
              onAddLog('string extends string ? ✓ → "yes"');
            }}
          >
            IsString&lt;string&gt;
          </ActionButton>
          <ActionButton
            variant="magenta"
            onClick={() => {
              onAddLog('IsString<number> → "no"');
              onAddLog('number extends string ? ✗ → "no"');
            }}
          >
            IsString&lt;number&gt;
          </ActionButton>
          <ActionButton
            variant="amber"
            onClick={() => {
              onAddLog("ReturnType<() => number>");
              onAddLog("infer R → number");
            }}
          >
            ReturnType 추론
          </ActionButton>
        </div>
      )}
    </>
  );
}
