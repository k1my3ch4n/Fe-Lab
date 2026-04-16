export interface AuthMethod {
  id: string;
  label: string;
  color: string;
}

export interface FlowStep {
  from: "client" | "server";
  label: string;
  detail: string;
  color: string;
}

export interface AuthFlow {
  method: AuthMethod;
  description: string;
  pros: string[];
  cons: string[];
  steps: FlowStep[];
}
