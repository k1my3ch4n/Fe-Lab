export type ProtocolType = "websocket" | "sse" | "long-polling";

export interface ProtocolInfo {
  id: ProtocolType;
  label: string;
  fullName: string;
  direction: string;
  protocol: string;
  connectionFlow: string[];
  messagePattern: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  color: string;
}

export interface ComparisonRow {
  label: string;
  websocket: string;
  sse: string;
  longPolling: string;
}

export interface SimMessage {
  id: number;
  from: "client" | "server";
  text: string;
  timestamp: number;
}
