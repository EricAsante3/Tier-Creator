import { Column } from "./tier-board.types";
import { cn } from "./tier-board.types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import TierBase from "./tier-base";

interface SortableTaskColumnProps {
  className?: string;
  column: Column<string, string>;
  columnId: UniqueIdentifier;
  children?: React.ReactNode;
  onClickDelete?: (columnId: UniqueIdentifier) => void;
}
export default function SortableTierBase({
  className,
  column,
  columnId,
  children,
  onClickDelete,
}: SortableTaskColumnProps) {
  const {
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id: columnId });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TierBase
      ref={setNodeRef}
      className={className}
      column={column}
      columnId={columnId}
      onClickDelete={onClickDelete}

    >
      {children}
    </TierBase>
  );
}
