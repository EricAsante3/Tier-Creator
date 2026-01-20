import {
  Item,
  SortableProps,
} from "./tier-board.types";
import { CSSProperties, Ref } from "react";

interface TaskItemProps extends Partial<SortableProps> {
  style?: CSSProperties;
  className?: string;
  item: Item<string>;
  ref?: Ref<HTMLDivElement>;
}
export default function TeirCardItem({
  className,
  style,
  item,
  ref,
  attributes,
  listeners,
}: TaskItemProps) {
  return (
    <div
    style={style}
      className={className}
      ref={ref}
      {...listeners}
      {...attributes}
    >
        {item.id + item.data}
    </div>


  );
}
