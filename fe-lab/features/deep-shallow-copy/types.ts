export interface ObjectNode {
  key: string;
  value: string;
  isReference: boolean;
  color: string;
}

export interface CopyMethod {
  id: string;
  label: string;
  code: string;
  description: string;
  isDeep: boolean;
  color: string;
}
