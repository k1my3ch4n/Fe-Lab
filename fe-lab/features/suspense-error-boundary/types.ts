export interface FlowStep {
  label: string;
  color: string;
  description: string;
}

export interface SuspenseScenario {
  id: string;
  label: string;
  steps: FlowStep[];
  code: string;
}
