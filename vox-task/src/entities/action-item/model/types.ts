export type ActionItemStatus = 'pending' | 'done' | 'dismissed';

export interface ActionItem {
  id: string;
  content: string;
  assignee: string | null;
  dueDate: string | null;
  status: ActionItemStatus;
  createdAt: number;
}
