export interface AttackStep {
  label: string;
  color: string;
  description: string;
}

export interface SecurityScenario {
  id: string;
  label: string;
  steps: AttackStep[];
  code: string;
}
