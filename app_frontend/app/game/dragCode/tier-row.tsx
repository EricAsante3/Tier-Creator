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
        
        <div className="bg-red-200 aspect-square w-1/12 ">
        </div>

        <div className="bg-yellow-200 w-full aspect-12/1 flex flex-wrap">
            {children}
        </div>
    </div>


  );
}
