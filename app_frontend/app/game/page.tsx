"use client";

import { Data } from "./dragCode/tier-board.types";
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

import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import SortableTierRow from "./dragCode/sortable-tier-row";
import TierRow from "./dragCode/tier-row";
import SortableTierBase from "./dragCode/sortable-tier-base";
import SortableTeirCardItem from "./dragCode/sortable-tier-card-item";
import TeirCardItem from "./dragCode/tier-card-item";
const initialData: Data<string, string> = {
  ["Tier-S-id"]: {
    data: "Tier-S",
    children: [

    ],
  },

  ["Tier-A-id"]: {
    data: "Tier-A",
    children: [

    ],
  },

  ["Tier-B-id"]: {
    data: "Tier-B",
    children: [

    ],
  },

  ["Tier-C-id"]: {
    data: "Tier-C",
    children: [

    ],
  },

  ["Tier-F-id"]: {
    data: "Tier-F",
    children: [

    ],
  },

  ["Tier-Base-id"]: {
    data: "Tier-Base",
    children: [
  { id: "todo-item-1", data: "Todo 1" },
  { id: "todo-item-2", data: "Todo 2" },
  { id: "todo-item-3", data: "Todo 3" },
  { id: "todo-item-4", data: "Todo 4" },
  { id: "todo-item-5", data: "Todo 5" },
  { id: "todo-item-6", data: "Todo 6" },
  { id: "todo-item-7", data: "Todo 7" },
  { id: "todo-item-8", data: "Todo 8" },
  { id: "todo-item-9", data: "Todo 9" },
  { id: "todo-item-10", data: "Todo 10" },

  { id: "todo-item-11", data: "Todo 11" },
  { id: "todo-item-12", data: "Todo 12" },
  { id: "todo-item-13", data: "Todo 13" },
  { id: "todo-item-14", data: "Todo 14" },
  { id: "todo-item-15", data: "Todo 15" },
  { id: "todo-item-16", data: "Todo 16" },
  { id: "todo-item-17", data: "Todo 17" },
  { id: "todo-item-18", data: "Todo 18" },
  { id: "todo-item-19", data: "Todo 19" },
  { id: "todo-item-20", data: "Todo 20" },

  { id: "todo-item-21", data: "Todo 21" },
  { id: "todo-item-22", data: "Todo 22" },
  { id: "todo-item-23", data: "Todo 23" },
  { id: "todo-item-24", data: "Todo 24" },
  { id: "todo-item-25", data: "Todo 25" },
  { id: "todo-item-26", data: "Todo 26" },
  { id: "todo-item-27", data: "Todo 27" },
  { id: "todo-item-28", data: "Todo 28" },
  { id: "todo-item-29", data: "Todo 29" },
  { id: "todo-item-30", data: "Todo 30" },

  { id: "todo-item-31", data: "Todo 31" },
  { id: "todo-item-32", data: "Todo 32" },
  { id: "todo-item-33", data: "Todo 33" },
  { id: "todo-item-34", data: "Todo 34" },
  { id: "todo-item-35", data: "Todo 35" },
  { id: "todo-item-36", data: "Todo 36" },
  { id: "todo-item-37", data: "Todo 37" },
  { id: "todo-item-38", data: "Todo 38" },
  { id: "todo-item-39", data: "Todo 39" },
  { id: "todo-item-40", data: "Todo 40" },

  { id: "todo-item-41", data: "Todo 41" },
  { id: "todo-item-42", data: "Todo 42" },
  { id: "todo-item-43", data: "Todo 43" },
  { id: "todo-item-44", data: "Todo 44" },
  { id: "todo-item-45", data: "Todo 45" },
  { id: "todo-item-46", data: "Todo 46" },
  { id: "todo-item-47", data: "Todo 47" },
  { id: "todo-item-48", data: "Todo 48" },
  { id: "todo-item-49", data: "Todo 49" },
  { id: "todo-item-50", data: "Todo 50" },

  { id: "todo-item-51", data: "Todo 51" },
  { id: "todo-item-52", data: "Todo 52" },
  { id: "todo-item-53", data: "Todo 53" },
  { id: "todo-item-54", data: "Todo 54" },
  { id: "todo-item-55", data: "Todo 55" },
  { id: "todo-item-56", data: "Todo 56" },
  { id: "todo-item-57", data: "Todo 57" },
  { id: "todo-item-58", data: "Todo 58" },
  { id: "todo-item-59", data: "Todo 59" },
  { id: "todo-item-60", data: "Todo 60" },

  { id: "todo-item-61", data: "Todo 61" },
  { id: "todo-item-62", data: "Todo 62" },
  { id: "todo-item-63", data: "Todo 63" },
  { id: "todo-item-64", data: "Todo 64" },
  { id: "todo-item-65", data: "Todo 65" },
  { id: "todo-item-66", data: "Todo 66" },
  { id: "todo-item-67", data: "Todo 67" },
  { id: "todo-item-68", data: "Todo 68" },
  { id: "todo-item-69", data: "Todo 69" },
  { id: "todo-item-70", data: "Todo 70" },

  { id: "todo-item-71", data: "Todo 71" },
  { id: "todo-item-72", data: "Todo 72" },
  { id: "todo-item-73", data: "Todo 73" },
  { id: "todo-item-74", data: "Todo 74" },
  { id: "todo-item-75", data: "Todo 75" },
  { id: "todo-item-76", data: "Todo 76" },
  { id: "todo-item-77", data: "Todo 77" },
  { id: "todo-item-78", data: "Todo 78" },
  { id: "todo-item-79", data: "Todo 79" },
  { id: "todo-item-80", data: "Todo 80" },

  { id: "todo-item-81", data: "Todo 81" },
  { id: "todo-item-82", data: "Todo 82" },
  { id: "todo-item-83", data: "Todo 83" },
  { id: "todo-item-84", data: "Todo 84" },
  { id: "todo-item-85", data: "Todo 85" },
  { id: "todo-item-86", data: "Todo 86" },
  { id: "todo-item-87", data: "Todo 87" },
  { id: "todo-item-88", data: "Todo 88" },
  { id: "todo-item-89", data: "Todo 89" },
  { id: "todo-item-90", data: "Todo 90" },

  { id: "todo-item-91", data: "Todo 91" },
  { id: "todo-item-92", data: "Todo 92" },
  { id: "todo-item-93", data: "Todo 93" },
  { id: "todo-item-94", data: "Todo 94" },
  { id: "todo-item-95", data: "Todo 95" },
  { id: "todo-item-96", data: "Todo 96" },
  { id: "todo-item-97", data: "Todo 97" },
  { id: "todo-item-98", data: "Todo 98" },
  { id: "todo-item-99", data: "Todo 99" },
  { id: "todo-item-100", data: "Todo 100" },

    ],
  }
};


export default function Home() {
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

  function handleClickAddColumn() {
    const newData = {
      ...data,
      [uuidv4()]: { data: "New column", children: [] },
    };
    setData(newData);
    setColumnIds(Object.keys(newData));
  }

  function handleClickDeleteColumn(columnId: UniqueIdentifier) {
    const newData = { ...data };
    delete newData[columnId];
    setData(newData);
    setColumnIds(Object.keys(newData));
  }

  function renderOverlay() {
    let content: React.ReactNode = null;
    if (activeId) {

      {/*
      // dragging a column
      if (data[activeId]) {
        content = (
          <TaskColumn
            columnId={activeId}
            column={data[activeId]}
            className="group"
          >
            <ScrollArea className="w-full h-full px-2">
              {data[activeId].children.map((item) => (
                <TaskItem
                  key={item.id}
                  item={item}
                  className="mt-3 first:mt-0"
                />
              ))}
            </ScrollArea>
          </TaskColumn>
        );
      }
      */}

      // dragging an item
      const columnId = findColumnId(activeId);
      if (columnId) {
        const activeItem = data[columnId].children.find(
          (item) => item.id === activeId
        );

        if (activeItem) {
          content = <TeirCardItem item={activeItem} className="cursor-grabbing" />;
        }
      }
    }

    return <DragOverlay>{content}</DragOverlay>;
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
  <>
  
    <main className="flex min-h-screen h-full justify-center bg-foreground">
      <DndContext
        id="dnd-kanban-context-id"
        collisionDetection={customCollision}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
      <SortableContext items={columnIds}>

      <div className="w-10/12 max-w-300 aspect-video grid grid-rows-[0.05fr_auto_1fr] gap-8">

        <div>
        </div>
        <div className="w-full flex flex-col space-y-2 items-center">

          {columnIds
            .filter((columnId) => columnId !== "Tier-Base-id")
            .map((columnId) => (
            <SortableTierRow
              key={columnId}
              columnId={columnId}
              column={data[columnId]}
              onClickDelete={handleClickDeleteColumn}
              className="w-9/10 h-fit flex flex-row items-start relative"
            >
              <SortableContext items={data[columnId].children}>
                  {data[columnId].children.map((item) => (
                    <SortableTeirCardItem
                      key={item.id}
                      item={item}
                      className="bg-red-300 aspect-square w-1/12  text-sm"
                    />
                  ))}
              </SortableContext>
            </SortableTierRow>
          ))}

        </div>







        <SortableTierBase
          key={"Tier-Base-id"}
          columnId={"Tier-Base-id"}
          column={data["Tier-Base-id"]}
          onClickDelete={handleClickDeleteColumn}
          className="w-full h-fit bg-red-950 min-h-96 border-white border-2"
        >
          <SortableContext items={data["Tier-Base-id"].children}>
              {data["Tier-Base-id"].children.map((item) => (
                <SortableTeirCardItem
                  key={item.id}
                  item={item}
                  className="bg-red-300 aspect-square w-1/12  text-sm"
                />
              ))}
          </SortableContext>
        </SortableTierBase>

        
      </div>
      </SortableContext>

      {renderOverlay()}
      </DndContext>
    </main>
  
  </>

  );
}
