export type PipelineStage = "style" | "layout" | "paint" | "composite";

export type CostLevel = "expensive" | "moderate" | "good";

export interface CSSPropertyInfo {
  name: string;
  label: string;
  triggeredStages: PipelineStage[];
  cost: CostLevel;
  category: "layout" | "paint" | "composite";
}
