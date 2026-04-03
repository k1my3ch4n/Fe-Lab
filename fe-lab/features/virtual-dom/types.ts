export interface DomNode {
  id: string;
  tag: string;
  text?: string;
  children?: DomNode[];
}

export interface ComparisonItem {
  category: string;
  realDom: string;
  virtualDom: string;
}

export type DiffStatus = "unchanged" | "modified" | "added" | "removed";

export interface DiffEntry {
  id: string;
  status: DiffStatus;
  detail?: string;
}
