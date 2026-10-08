import { Layers, Plus, Minus, Map, PenTool, Compass, LocateFixed, Satellite } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type MapStyle = "dark" | "satellite";

interface MapToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onStyleChange?: (style: MapStyle) => void;
  onToggleLayers?: () => void;
  onToggleDraw?: () => void;
  onResetNorth?: () => void;
  onLocateUser?: () => void;
  onToggleNdvi?: () => void;
  
  isDrawing?: boolean;
  showFields?: boolean;
  showNdvi?: boolean;
  defaultStyle?: MapStyle;
}

const MapToolbar = ({
  onZoomIn,
  onZoomOut,
  onStyleChange,
  onToggleLayers,
  onToggleDraw,
  onResetNorth,
  onLocateUser,
  onToggleNdvi,
  
  isDrawing,
  showFields = true,
  showNdvi = false,
  defaultStyle = "dark",
}: MapToolbarProps) => {
  const [currentStyle, setCurrentStyle] = useState<MapStyle>(defaultStyle);

  const handleStyleToggle = () => {
    const next: MapStyle = currentStyle === "dark" ? "satellite" : "dark";
    setCurrentStyle(next);
    onStyleChange?.(next);
  };

  const groups = [
    [
      { icon: Layers, onClick: onToggleLayers ?? (() => {}), label: showFields ? "Hide Regions" : "Show Regions", active: showFields },
      { icon: Plus, onClick: onZoomIn, label: "Zoom In" },
      { icon: Minus, onClick: onZoomOut, label: "Zoom Out" },
      { icon: Map, onClick: handleStyleToggle, label: currentStyle === "dark" ? "Satellite" : "Dark Mode", active: currentStyle === "satellite" },
    ],
    [
      { icon: PenTool, onClick: onToggleDraw ?? (() => {}), label: "Draw Region", active: isDrawing },
      { icon: Satellite, onClick: onToggleNdvi ?? (() => {}), label: showNdvi ? "Hide NDVI" : "NDVI Overlay", active: showNdvi },
    ],
    [
      { icon: Compass, onClick: onResetNorth ?? (() => {}), label: "Reset North" },
      { icon: LocateFixed, onClick: onLocateUser ?? (() => {}), label: "My Location" },
    ],
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <div className="absolute right-4 bottom-6 flex flex-col gap-2 z-10 opacity-85">
        {groups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-1">
            {gi > 0 && <div className="w-full h-px bg-border/50 my-0.5" />}
            {group.map(({ icon: Icon, onClick, label, active }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <button
                    onClick={onClick}
                    className={`w-10 h-10 rounded-lg backdrop-blur-sm border border-border flex items-center justify-center transition-colors ${
                      active ? "text-primary bg-accent" : "text-foreground"
                    }`}
                    style={{ backgroundColor: active ? undefined : "#041009" }}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  {label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default MapToolbar;
