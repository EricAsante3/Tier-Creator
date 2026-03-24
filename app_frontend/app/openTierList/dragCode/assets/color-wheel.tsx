import { HsvColorPicker, HsvColor } from "react-colorful";
import { useState, useEffect } from "react";
import { colord } from "colord";
import { Dispatch, SetStateAction } from "react";

interface ColorWheelProps {
  color: HsvColor;
  setColor: Dispatch<SetStateAction<HsvColor>>;
}

export default function ColorWheel({color, setColor}: ColorWheelProps) {


  const [hexInput, setHexInput] = useState(colord(color).toHex());

  // sync input when picker changes
  useEffect(() => {
    setHexInput(colord(color).toHex());
  }, [color]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (colord(hexInput).isValid()) {
        setColor(colord(hexInput).toHsv());
      } else {
        // reset to current valid color if invalid
        setHexInput(colord(color).toHex());
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 absolute z-20 top-0/26 left-2/26 aspect-square w-3/14 ">
    <div className="aspect-square w-3/4 ">
        <HsvColorPicker color={color} onChange={setColor}   style={{ width: "100%", height: "100%" }} />
    </div>
      <input
        value={hexInput}
        onChange={handleHexChange}
        onKeyDown={handleKeyDown}
        className="border px-2 py-1 rounded w-3/4 text-center  font-semibold font-mono bg-background"
        placeholder="#ffffff"
      />
    </div>
  );
}