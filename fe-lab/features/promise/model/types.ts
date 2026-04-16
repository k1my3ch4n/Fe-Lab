export type PromiseState = "pending" | "fulfilled" | "rejected";

export interface PromiseItem {
  id: number;
  label: string;
  delay: number;
  shouldReject: boolean;
  state: PromiseState;
  value?: string;
}

export interface MethodExample {
  id: string;
  label: string;
  code: string;
  description: string;
  color: string;
}
