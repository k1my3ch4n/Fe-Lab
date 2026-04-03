export interface LeakPattern {
  id: string;
  label: string;
  code: string;
  description: string;
  severity: "high" | "medium" | "low";
  color: string;
}
