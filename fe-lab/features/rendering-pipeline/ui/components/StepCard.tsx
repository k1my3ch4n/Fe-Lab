interface StepCardProps {
  step: { icon: string; name: string; time: string; color: string };
  index: number;
  currentStep: number;
  onClick: () => void;
}

export default function StepCard({
  step,
  index,
  currentStep,
  onClick,
}: StepCardProps) {
  const isActive = index === currentStep;
  const isDone = index < currentStep;

  return (
    <div
      onClick={onClick}
      className={`w-[115px] text-center cursor-pointer transition-all duration-500 ${
        isActive
          ? "opacity-100 translate-y-0"
          : isDone
            ? "opacity-60 translate-y-0"
            : "opacity-25 translate-y-2"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl mx-auto mb-2.5 border relative transition-all duration-500 ${
          isActive ? "scale-110" : ""
        }`}
        style={{
          background: `${step.color}15`,
          borderColor: `${step.color}33`,
          boxShadow: isActive ? `0 0 30px ${step.color}` : "none",
        }}
      >
        {step.icon}
        {isActive && (
          <span
            className="absolute inset-0 rounded-[inherit] animate-[pulseRing_1.5s_ease_infinite]"
            style={{ border: `2px solid ${step.color}` }}
          />
        )}
      </div>
      <div className="font-mono text-caption font-semibold text-text-primary mb-1">
        {step.name}
      </div>
      <div className="font-mono text-[9px] text-text-muted">
        {step.time}
      </div>
    </div>
  );
}
