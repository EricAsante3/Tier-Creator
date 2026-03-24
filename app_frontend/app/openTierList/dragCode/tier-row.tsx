import {
  Column,
  SortableProps,
} from "./tier-board.types";
import { cn } from "./tier-board.types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSSProperties, Ref, useEffect } from "react";
import { ColorWheelIcon, PaletteIcon, GridDotsIcon, ColorWheelIconCircle, PencilIcon} from "@/icons/icons";
import { TrashIcon } from "@/icons/icons";
import { useState } from "react";
import ColorWheel from "./assets/color-wheel";
import { HsvColor } from "react-colorful";
import { colord, HsvColor as ColordHsv } from "colord";

interface TierRowProps extends Partial<SortableProps> {
  style?: CSSProperties;
  className?: string;
  column: Column<string, string>;
  columnId: UniqueIdentifier;
  children?: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
  tierConfig: boolean;
  totRows: number;
  columnDragged: boolean;
  onClickDelete?: (columnId: UniqueIdentifier) => void;
  renameColum?: (columnId: UniqueIdentifier, newTitle: string) => void;
  colorChange?: (columnId: UniqueIdentifier, newColor: string) => void;

}


export default function TierRow({
  style,
  className,
  column,
  columnId,
  totRows,
  tierConfig,
  columnDragged,
  children,
  ref,
  attributes,
  listeners,
  onClickDelete,
  renameColum,
  colorChange
}: TierRowProps) {
  const [text, setText] = useState(column.data.title);
  const [colorWheel, serColorWheel] = useState(false);

  const [color, setColor] = useState<HsvColor>(colord(column?.data?.color).toHsv());

  useEffect(() => {
    renameColum?.(columnId, text);
  }, [text]);  

  useEffect(() => {
    colorChange?.(columnId, colord(color).toHex())
    console.log(colord(color).toHex())
  }, [color]);  

  return (
    <div  
    style={style}
    className={className + " relative"}
    ref={ref}>
      
        <div 
          style={{ backgroundColor: colord(color).toHex() }}
          className="bg-red-300 aspect-square max-w-1/12 w-1/12 border-red-900/50 rounded-xs border-2 flex items-center justify-center overflow-hidden relative">
          <h1 
            contentEditable
            suppressContentEditableWarning
            className="text-sm text-white  text-center w-full line-clamp-3 wrap-break-words min-w-0 min-h-0 overflow-hidden"
            onBlur={(e) => setText(e.currentTarget.textContent)}
          >
            {column.data.title}
          </h1>

          {tierConfig && !columnDragged? 
            <div className="absolute bottom-0 left-0 opacity-80 p-1 cursor-pointer aspect-square h-2/6" onClick={() => serColorWheel(!colorWheel)}>
                <PencilIcon  stroke={"#ffffff"} className="h-full w-full" size={16}></PencilIcon>
            </div> 
            
          :
            null 
          }

        </div>

          {tierConfig && !columnDragged && colorWheel? 

            <ColorWheel color={color} setColor={setColor}></ColorWheel>

          :
            null 
          }

        <div className="bg-foreground w-full aspect-12/1 flex flex-wrap">
            {children}

            {tierConfig && !columnDragged?

              <button
              {...listeners}
              {...attributes}            
              className="h-full w-1/20 absolute right-0 top-0 p-2"
              >
                <GridDotsIcon className="h-full w-full bg-background/40 rounded-lg cursor-grab" fill="#ffffff"></GridDotsIcon>
              </button>
            :
              null
            }
        </div>

        {tierConfig && !columnDragged && totRows > 3? 
          <button
            onClick={() => columnId !== undefined && onClickDelete?.(columnId)}
            className="absolute top-1/2 -translate-y-1/2 -right-2/40 aspect-square h-6/12 cursor-pointer"
          >
            <TrashIcon className="h-full w-full"></TrashIcon>
          </button>
          :
          null
      }


    </div>


  );
}
