export interface TimelineResource {
  label: string;
  type: "html" | "css" | "js" | "render";
  start: number;
  end: number;
}

export interface CRPScenario {
  id: string;
  label: string;
  description: string;
  resources: TimelineResource[];
  fcp: number;
}
