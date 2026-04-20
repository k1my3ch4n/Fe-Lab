export interface BindingExample {
  id: string;
  label: string;
  code: string;
  thisValue: string;
  explanation: string;
  color: string;
}

export interface ScopeLevel {
  name: string;
  variables: { name: string; value: string }[];
  color: string;
}
