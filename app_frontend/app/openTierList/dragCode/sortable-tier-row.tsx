import { Column } from "./tier-board.types";
import { cn } from "./tier-board.types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import TierRow from "./tier-row";

interface SortableTaskColumnProps {
  className?: string;
  column: Column<string, string>;
  activeCardId: UniqueIdentifier | null;
  columnId: UniqueIdentifier;
  rowIds: UniqueIdentifier[];
  children?: React.ReactNode;
  tierConfig: boolean;
  onClickDelete?: (columnId: UniqueIdentifier) => void;
  renameColum?: (columnId: UniqueIdentifier, newTitle: string) => void;
  colorChange?: (columnId: UniqueIdentifier, newColor: string) => void;
}
export default function SortableTierRow({
  className,
  column,
  columnId,
  children,
  activeCardId,
  rowIds,
  tierConfig,
  onClickDelete,
  renameColum,
  colorChange,
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
  const columnDragged = activeCardId !== null && rowIds.includes(activeCardId)

  return (
    <TierRow
      ref={setNodeRef}
      style={style}
      tierConfig={tierConfig}
      totRows={rowIds.length}
      className={cn(
        {
          "opacity-50": columnDragged && !(isDragging),
        },
        className
      )}

      column={column}
      columnId={columnId}
      onClickDelete={onClickDelete}
      renameColum={renameColum}
      colorChange={colorChange}
      listeners={listeners}
      attributes={attributes}
      columnDragged={columnDragged}
    >
      {columnDragged ? null : children}
    </TierRow>
  );
}
