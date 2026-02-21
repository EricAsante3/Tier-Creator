import {
  Column,
  SortableProps,
} from "./tier-board.types";
import { cn } from "./tier-board.types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSSProperties, Ref } from "react";

interface TierRowProps extends Partial<SortableProps> {
  style?: CSSProperties;
  className?: string;
  column: Column<string, string>;
  columnId: UniqueIdentifier;
  children?: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
  onClickDelete?: (columnId: UniqueIdentifier) => void;
}
export default function TierRow({
  style,
  className,
  column,
  columnId,
  children,
  ref,
  attributes,
  listeners,
  onClickDelete,
}: TierRowProps) {


  return (
    <div  
    style={style}
    className={className}
    ref={ref}>
        
        <div 
          style={{ backgroundColor: column?.data?.color }}
          className="bg-red-300 aspect-square max-w-1/12 w-1/12 border-red-900/50 rounded-xs border-2 flex items-center justify-center overflow-hidden">
          <h1 className="text-sm text-white  text-center w-full line-clamp-3 wrap-break-words min-w-0 min-h-0 overflow-hidden">
            {column.data.title}
          </h1>
        </div>

        <div className="bg-foreground w-full aspect-12/1 flex flex-wrap">
            {children}
        </div>
    </div>


  );
}
