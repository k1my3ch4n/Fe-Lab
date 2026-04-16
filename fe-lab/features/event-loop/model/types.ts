export interface QueueItem {
  label: string;
  color: string;
}

export interface Step {
  description: string;
  callStack: QueueItem[];
  microtaskQueue: QueueItem[];
  taskQueue: QueueItem[];
  console: string[];
}

export interface Scenario {
  id: string;
  label: string;
  code: string;
  steps: Step[];
}
