export interface BundleModule {
  name: string;
  size: number; // KB
  used: boolean;
  color: string;
}

export interface BundleExample {
  id: string;
  label: string;
  description: string;
  modules: BundleModule[];
  totalSize: number;
  optimizedSize: number;
}
