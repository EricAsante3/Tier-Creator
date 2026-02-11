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

  const combinedStyle = {
    ...style, // keep any styles passed in
    backgroundImage: `url(${item.image_url})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    
  };



  return (
    <div
    style={combinedStyle}
      className={className}
      ref={ref}
      {...listeners}
      {...attributes}
    >
    </div>


  );
}
