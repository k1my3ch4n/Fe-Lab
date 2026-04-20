export interface EdgeServer {
  id: string;
  name: string;
  region: string;
  x: number;
  y: number;
  color: string;
}

export interface CacheResult {
  type: "HIT" | "MISS" | "STALE";
  label: string;
  description: string;
  color: string;
}
