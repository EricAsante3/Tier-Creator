import {
  Column,
  SortableProps,
} from "./tier-board.types";
import { cn } from "./tier-board.types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSSProperties, Ref } from "react";

interface TierBaseProps extends Partial<SortableProps> {
  style?: CSSProperties;
  className?: string;
  column: Column<string, string>;
  columnId: UniqueIdentifier;
  children?: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
  onClickDelete?: (columnId: UniqueIdentifier) => void;
}
export default function TierBase({
  style,
  className,
  column,
  columnId,
  children,
  ref,
  attributes,
  listeners,
  onClickDelete,
}: TierBaseProps) {
  return (
    <div  
    style={style}
    className={className}
    ref={ref}    
    >

        <div className="w-full aspect-12/1 flex flex-wrap">
            {children}
        </div>
    </div>


  );
}
