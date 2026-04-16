import { BOX_CONFIGS } from "../../model/constants";
import BoxLabel from "./BoxLabel";

interface NestedBoxesProps {
  flashingBoxes: Set<string>;
  onBoxClick: (index: number) => void;
}

export default function NestedBoxes({
  flashingBoxes,
  onBoxClick,
}: NestedBoxesProps) {
  const renderBox = (
    depth: number,
    children: React.ReactNode,
  ): React.ReactNode => {
    if (depth >= BOX_CONFIGS.length) return children;

    const config = BOX_CONFIGS[depth];
    const isFlashing = flashingBoxes.has(config.id);

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onBoxClick(depth);
        }}
        className={`flex items-center justify-center rounded-xl relative cursor-pointer transition-all duration-300 border-2 ${config.size} ${
          isFlashing
            ? `${config.flashBorder} ${config.flashShadow} ${config.flashBg}`
            : `${config.defaultBorder} ${config.defaultBg}`
        }`}
      >
        <BoxLabel text={config.label} color={config.color} />
        {renderBox(depth + 1, children)}
      </div>
    );
  };

  const isButtonFlashing = flashingBoxes.has("box-button");

  return (
    <div className="flex items-center justify-center p-10">
      {renderBox(
        0,
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBoxClick(3);
          }}
          className={`flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 w-[140px] h-[52px] border-2 font-[family-name:var(--font-display)] text-[13px] font-semibold text-accent-amber tracking-wide ${
            isButtonFlashing
              ? "border-accent-amber shadow-[0_0_30px_#ffb80033] bg-gradient-to-br from-[#ffb80033] to-[#ff2d8a33]"
              : "border-[#ffb80055] bg-gradient-to-br from-[#ffb80022] to-[#ff2d8a22]"
          }`}
        >
          Click me
        </button>,
      )}
    </div>
  );
}
