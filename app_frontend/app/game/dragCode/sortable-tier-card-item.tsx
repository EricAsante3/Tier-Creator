import { Item } from "./tier-board.types";
import { cn } from "./tier-board.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import TeirCardItem from "./tier-card-item";

interface SortableTeirCardItemProps {
  className?: string;
  item: Item<string>;
}
export default function SortableTeirCardItem({
  className,
  item,
}: SortableTeirCardItemProps) {
  const {
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id: item.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TeirCardItem
      style={style}
      className={cn(
        "cursor-grab",
        { "opacity-40 border-amber-500": isDragging },
        className
      )}
      item={item}
      ref={setNodeRef}
      attributes={attributes}
      listeners={listeners}
    />
  );
}
