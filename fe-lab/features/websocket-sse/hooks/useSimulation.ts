"use client";

import { useState, useRef, useCallback } from "react";
import { WS_SCENARIO, SSE_SCENARIO, type SimMessage } from "../constants";

type ProtocolTab = "websocket" | "sse";

export function useSimulation(activeTab: ProtocolTab) {
  const [messages, setMessages] = useState<SimMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = activeTab === "websocket" ? WS_SCENARIO : SSE_SCENARIO;

  const stopSimulation = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stopSimulation();
    setMessages([]);
    setCurrentStep(-1);
  }, [stopSimulation]);

  const startSimulation = useCallback(() => {
    reset();
    setIsRunning(true);
    setCurrentStep(0);

    let step = 0;

    const scheduleNext = () => {
      if (step >= scenario.length) {
        setIsRunning(false);
        return;
      }

      const delay = step === 0 ? 400 : 800 + Math.random() * 600;

      intervalRef.current = setTimeout(() => {
        const msg = scenario[step];
        setMessages((prev) => [
          ...prev,
          { ...msg, id: step, timestamp: Date.now() },
        ]);
        setCurrentStep(step);
        step++;
        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }, [reset, scenario]);

  return {
    messages,
    isRunning,
    currentStep,
    startSimulation,
    stopSimulation,
    reset,
  };
}
