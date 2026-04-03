export interface PrototypeNode {
  name: string;
  properties: { name: string; value: string }[];
  color: string;
}

export interface ChainExample {
  id: string;
  label: string;
  chain: PrototypeNode[];
}
