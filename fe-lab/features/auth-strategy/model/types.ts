export interface AuthStep {
  label: string;
  color: string;
  description: string;
}

export interface AuthMethod {
  id: string;
  label: string;
  steps: AuthStep[];
  code: string;
  pros: string[];
  cons: string[];
}
