export interface WaterfallPhase {
  name: string;
  duration: number;
  color: string;
  description: string;
}

export interface ResourceEntry {
  name: string;
  type: string;
  phases: WaterfallPhase[];
  totalTime: number;
  size: string;
}

export interface StatusCode {
  code: number;
  name: string;
  category: string;
  description: string;
  color: string;
}
