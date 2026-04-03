export interface HeaderPair {
  name: string;
  value: string;
  side: "request" | "response";
  color: string;
}

export interface CorsStep {
  label: string;
  direction: "right" | "left";
  headers: HeaderPair[];
  description: string;
}

export interface CorsScenario {
  id: string;
  label: string;
  success: boolean;
  steps: CorsStep[];
  summary: string;
}
