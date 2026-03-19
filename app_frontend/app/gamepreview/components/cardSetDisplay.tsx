"use client"; // <-- needed in App Router for client-side interactivity
import { Data } from "../../game/dragCode/tier-board.types";
import LoadingCardSetItem from "./loadingCardSetDisplay";

import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import SortableTierBase from "@/app/game/dragCode/sortable-tier-base";
import SortableTierCardItem from "@/app/game/dragCode/sortable-tier-card-item";
import TierCardItem from "@/app/game/dragCode/tier-card-item";
import { useCallback, useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const initialData: Data<string, string> = {
  ["Tier-Preview"]: {
    data: {color: "#00d90b", title: "S"},
    children: [
        {
            "id": "22e771b4-ffd9-4cd2-9844-b1a50d37720d",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/0d14d70d7b0534aa6631f4b21bd7918b.png"
        },

        {
            "id": "f98ff8ec-40324-43cw4-af77-533c63b34fa1",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/img0831.png"
        },

        {
            "id": "22e771b4-ffd9-4cdw2-9844-b1a50d37720d",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/0d14d70d7b0534aa6631f4b21bd7918b.png"
        },

        {
            "id": "f98ff8ec-40324-4w3c4-af77-533c63b34fa1",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/img0831.png"
        },


        {
            "id": "22e771b4-ffd9-w4cd2-9844-b1a50d37720d",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/0d14d70d7b0534aa6631f4b21bd7918b.png"
        },

        {
            "id": "f98ff8ec-4w0324-43c4-af77-533c63b34fa1",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/img0831.png"
        },
         {
            "id": "22e771b4w-ffd9-4cd2-9844-b1a50d37720d",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/0d14d70d7b0534aa6631f4b21bd7918b.png"
        },

        {
            "id": "f98ff8ec-w40324-43c4-af77-533c63b34fa1",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/img0831.png"
        },
         {
            "id": "22e2771b4w-ffd9-4cd2-9844-b1a50d37720d",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/0d14d70d7b0534aa6631f4b21bd7918b.png"
        },

        {
            "id": "f98ff8ec-2w40324-43c4-af77-533c63b34fa1",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/img0831.png"
        },

    ],
  },
}

export default function CardSetDisplay() {

  const [text, setText] = useState("");

  useEffect(() => {
    fetch("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1")
      .then((res) => res.json())
      .then((data) => setText(data.join("\n\n")));
  }, []);






  const [tierConfig, setTierConfig] = useState<boolean>(false);
  const [data, setData] = useState<Data<string, string>>(initialData);
  const [columnIds, setColumnIds] = useState<UniqueIdentifier[]>(
    Object.keys(data)
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const [cloneData, setCloneData] = useState({ ...data });

  const customCollision: CollisionDetection = useCallback(
    (args) => {
      // Drag a column
      // Use closestCenter to find the nearest droppable column.
      // Only columns are considered valid drop targets.
      if (activeId && activeId in data) {
        const intersections = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (droppable) => droppable.id in data
          ),
        });
        return intersections;
      }

      // Drag an item
      // use pointerWithin or rectIntersection
      const pointerWithinList = pointerWithin(args);
      const rectIntersectionList = rectIntersection(args);

      const intersections =
        pointerWithinList.length > 0 ? pointerWithinList : rectIntersectionList;

      // drag an item over a column or item or null
      let overId = getFirstCollision(intersections, "id");

      if (overId !== null) {
        // Drag an item over a column
        // All items inside the column are droppable, use closetCenter
        if (data[overId]) {
          const columnItems = data[overId].children;

          if (columnItems.length > 0) {
            const closetItemsInColumn = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (droppable) =>
                  droppable.id !== overId &&
                  columnItems.find((item) => item.id === droppable.id)
              ),
            });

            overId = closetItemsInColumn[0].id;
          }
        }

        // cache overId to avoid unexpected jumps when no collision is detected
        lastOverId.current = overId;
        return [{ id: overId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, data]
  );

  function renderOverlay() {
    let content: React.ReactNode = null;
    if (activeId) {

      // dragging a column
      if (data[activeId]) {
        content = (

          <div className="cursor-grabbing bg-amber-900 opacity-0 h-16"></div>
        );
      }

      // dragging an item
      const columnId = findColumnId(activeId);
      if (columnId) {
        const activeItem = data[columnId].children.find(
          (item) => item.id === activeId
        );

        if (activeItem) {
          content = <TierCardItem item={activeItem} className="cursor-grabbing aspect-square w-full" />;
        }
      }
    }

    return <DragOverlay className="aspect-square w-3/20">{content}</DragOverlay>;
  }

  function findColumnId(id: UniqueIdentifier) {
    if (data[id]) {
      return id;
    }

    const activeColumnId = columnIds.find((columnId) =>
      data[columnId].children.some((item) => item.id === id)
    );

    return activeColumnId;
  }

  function handleDragStart(e: DragStartEvent) {
    setActiveId(e.active.id);
    setCloneData({ ...data });
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    const overId = over?.id;
    const activeId = active.id;
    console.log(overId)
    if (!overId || activeId in data) {
      return;
    }
    const activeColumnId = findColumnId(activeId);
    const overColumnId = findColumnId(overId);

    // Handle dragging an item from one column to another
    if (activeColumnId && overColumnId && activeColumnId !== overColumnId) {
      setData((data) => {
        const activeItems = data[activeColumnId].children;
        const overItems = data[overColumnId].children;

        const activeIndex = activeItems.findIndex(
          (item) => item.id === activeId
        );
        const overIndex = overItems.findIndex((item) => item.id === overId);

        let newIndex: number;

        // Over an empty column
        // (Custom collision algorithm returns a column ID as overId only if the column has no items)
        if (overId in data) {
          newIndex = overItems.length + 1; // add one for working with Array.prototype.slice later easily
        } else {
          // over an item, need to check if the dragging item is below or above
          // the over item
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;
          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        return {
          ...data,
          [activeColumnId]: {
            ...data[activeColumnId],
            children: activeItems.filter((item) => item.id !== activeId),
          },
          [overColumnId]: {
            ...data[overColumnId],
            children: [
              ...overItems.slice(0, newIndex),
              activeItems[activeIndex],
              ...overItems.slice(newIndex),
            ],
          },
        };
      });
    }
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    const activeId = active.id;
    const overId = over?.id;

    // Drag a column end
    if (activeId && overId) {
      if (data[activeId] && overId) {
        setColumnIds((columnIds) => {
          const activeColumnIdIdx = columnIds.indexOf(activeId);
          const overColumnIdIdx = columnIds.indexOf(overId);
          const newColumnIds = arrayMove(
            columnIds,
            activeColumnIdIdx,
            overColumnIdIdx
          );

          return newColumnIds;
        });

        setActiveId(null);
        return;
      }
    }

    // Drag an item end
    const activeColumnId = findColumnId(activeId);

    if (!activeColumnId) {
      setActiveId(null);
      return;
    }

    if (!overId) {
      setActiveId(null);
      return;
    }

    const overColumnId = findColumnId(overId);
    if (overColumnId && activeColumnId && overColumnId === activeColumnId) {
      const activeIndex = data[activeColumnId].children.findIndex(
        (item) => item.id === activeId
      );
      const overIndex = data[overColumnId].children.findIndex(
        (item) => item.id === overId
      );

      if (activeIndex !== overIndex) {
        setData((data) => {
          const newOverColumnChildren = arrayMove(
            data[overColumnId].children,
            activeIndex,
            overIndex
          );

          const newData = {
            ...data,
            [overColumnId]: {
              ...data[overColumnId],
              children: newOverColumnChildren,
            },
          };

          return newData;
        });
      }
    }
    setActiveId(null);
  }

  function handleDragCancel() {
    setData({ ...cloneData });
    setColumnIds(Object.keys(cloneData));
  }

  return (

      <DndContext
        id="dnd-kanban-context-id"
        collisionDetection={customCollision}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
      <SortableContext items={columnIds}>

        <SortableTierBase
          key={"Tier-Base-id"}
          columnId={"Tier-Base-id"}
          column={data["Tier-Base-id"]}
          className="w-full h-full"
          addiClassName="space-x-1 space-y-2 items-center "
        >

          <SortableContext items={data["Tier-Preview"].children}>

            <>
              {text === "" ? (
                // render 50 skeleton items
                Array.from({ length: 50 }).map((_, i) => (
                  <LoadingCardSetItem key={i} />
                ))
              ) : (
                data["Tier-Preview"].children.map((item) => (
                  <SortableTierCardItem
                    key={item.id}
                    item={item}
                    className="bg-red-300 aspect-square w-[15%] text-sm"
                  />
                ))
              )}
            </>

          </SortableContext>
        </SortableTierBase>

      </SortableContext>

      {renderOverlay()}           
      </DndContext>

  );
}
