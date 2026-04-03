export interface CurryStep {
  args: string[];
  result: string;
  description: string;
}

export interface DemoExample {
  id: string;
  label: string;
  code: string;
  steps: CurryStep[];
  color: string;
}
