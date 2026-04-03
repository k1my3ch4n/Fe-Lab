export interface ProtocolVersion {
  id: string;
  label: string;
  color: string;
}

export interface ConnectionStep {
  label: string;
  duration: number;
  color: string;
}

export interface ProtocolFlow {
  version: ProtocolVersion;
  description: string;
  features: string[];
  steps: ConnectionStep[];
  totalTime: number;
}
