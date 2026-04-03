export interface TreeNode {
  tag: string;
  props?: Record<string, string>;
  children?: TreeNode[];
  key?: string;
  text?: string;
}

export interface DomOperation {
  type: "UPDATE" | "REPLACE" | "INSERT" | "DELETE" | "REORDER";
  target: string;
  detail: string;
  color: string;
}

export interface DiffScenario {
  id: string;
  label: string;
  description: string;
  oldTree: TreeNode;
  newTree: TreeNode;
  operations: DomOperation[];
  highlights: {
    nodeTag: string;
    action:
      | "compared"
      | "updated"
      | "replaced"
      | "reused"
      | "removed"
      | "inserted";
    color: string;
  }[];
}
