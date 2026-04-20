"use client";

import { useState } from "react";
import { TabBar } from "@shared/ui";
import { CRP_SCENARIOS, TABS } from "../model/constants";
import { CrpLegend } from "./components/CrpLegend";
import { CrpTimeline } from "./components/CrpTimeline";
import { CrpScenarioStats } from "./components/CrpScenarioStats";

export default function CriticalRenderingPathDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const scenario = CRP_SCENARIOS[activeScenario];

  return (
    <>
      <TabBar
        tabs={TABS}
        activeIndex={activeScenario}
        onTabChange={setActiveScenario}
      />

      <div className="p-6 flex flex-col gap-6">
        <p className="text-[13px] text-text-secondary leading-[1.8]">
          {scenario.description}
        </p>

        <CrpLegend />

        <CrpTimeline scenario={scenario} />

        <CrpScenarioStats
          activeScenario={activeScenario}
          onScenarioChange={setActiveScenario}
        />
      </div>
    </>
  );
}
