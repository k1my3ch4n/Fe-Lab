import { javascriptConfigs } from "./javascript";
import { reactConfigs } from "./react";
import { networkConfigs } from "./network";
import { browserConfigs } from "./browser";
import { performanceConfigs } from "./performance";
import { typescriptConfigs } from "./typescript";
import { cssConfigs } from "./css";
import { securityConfigs } from "./security";
import { webApiConfigs } from "./web-api";
import { accessibilityConfigs } from "./accessibility";

export type { FeatureConfig } from "./types";

export const featureConfigs = {
  ...javascriptConfigs,
  ...reactConfigs,
  ...networkConfigs,
  ...browserConfigs,
  ...performanceConfigs,
  ...typescriptConfigs,
  ...cssConfigs,
  ...securityConfigs,
  ...webApiConfigs,
  ...accessibilityConfigs,
};
