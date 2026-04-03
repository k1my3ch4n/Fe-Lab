export type Phase = "mount" | "update" | "unmount";

export interface HookTiming {
  hook: string;
  phase: Phase;
  order: number;
  color: string;
  description: string;
}

export interface LifecyclePhase {
  id: Phase;
  label: string;
  color: string;
  description: string;
}

export interface ClassToHookMapping {
  classMethod: string;
  hookEquivalent: string;
  description: string;
}
