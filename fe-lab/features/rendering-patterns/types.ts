export interface RenderingStep {
  label: string;
  color: string;
  start: number; // percentage
  end: number;
}

export interface RenderingPattern {
  id: string;
  label: string;
  description: string;
  steps: RenderingStep[];
  flow: string[];
}
