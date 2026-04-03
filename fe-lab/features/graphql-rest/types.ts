export interface ApiStyle {
  id: string;
  label: string;
  color: string;
}

export interface RequestExample {
  style: ApiStyle;
  endpoint: string;
  request: string;
  response: string;
  dataSize: number;
  neededFields: number;
  totalFields: number;
}
