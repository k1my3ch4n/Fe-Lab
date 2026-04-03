export interface RenderPhase {
  label: string;
  color: string;
  description: string;
}

export interface ComponentType {
  id: string;
  label: string;
  phases: RenderPhase[];
  code: string;
  bundleSize: string;
  renderLocation: string;
}
