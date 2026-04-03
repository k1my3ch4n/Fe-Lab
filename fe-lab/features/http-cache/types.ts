export type CacheStatus = "HIT" | "MISS" | "REVALIDATE";

export interface HeaderPair {
  key: string;
  value: string;
}

export interface FlowStep {
  actor: "browser" | "cache" | "server";
  label: string;
  headers?: HeaderPair[];
  status?: CacheStatus;
  description: string;
}

export interface CacheScenario {
  id: string;
  label: string;
  description: string;
  steps: FlowStep[];
}
