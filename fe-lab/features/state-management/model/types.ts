export interface StateLayer {
  name: string;
  color: string;
  description: string;
}

export interface StateApproach {
  id: string;
  label: string;
  layers: StateLayer[];
  code: string;
  pros: string[];
  cons: string[];
}
