"use client";
import { GearIcon, ResetIcon, PlusIcon, ArrowDownIcon, AddRowIcon } from "@/icons/icons";
import { Data, moveAllOthersInto, moveFromRowInto } from "./dragCode/tier-board.types";

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
import SortableTierBase from "./dragCode/sortable-tier-base";
import SortableTeirCardItem from "./dragCode/sortable-tier-card-item";
import TeirCardItem from "./dragCode/tier-card-item";
import TierRow from "./dragCode/tier-row";

const initialData: Data<string, string> = {
  ["Tier-S-id"]: {
    data: {color: "#00d90b", title: "S"},
    children: [

    ],
  },

  ["Tier-A-id"]: {
    data: {color: "#008000", title: "A"},
    children: [

    ],
  },

  ["Tier-B-id"]: {
    data: {color: "#FFA500", title: "B"},
    children: [

    ],
  },

  ["Tier-C-id"]: {
    data: {color: "#ff4d00", title: "C"},
    children: [

    ],
  },

  ["Tier-F-id"]: {
    data: {color: "#FF0000", title: "F"},
    children: [

    ],
  },

  ["Tier-Base-id"]: {
    data: {color: "#ffffff"},
    children: [
        {
            "id": "22e771b4-ffd9-4cd2-9844-b1a50d37720d",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/0d14d70d7b0534aa6631f4b21bd7918b.png"
        },
        {
            "id": "47124aaf-4df6-475f-93a8-957c1d368308",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/2747c30d4c574d5beb88dd4b2ffc93e4.jpg"
        },
        {
            "id": "ae28fea7-5a3e-4064-9eb6-697c02b831c3",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/red.jpeg"
        },
        {
            "id": "c54d48f5-edbd-4083-8a46-4807c1b8fbba",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/9cee5e3436559735edc1d6286c3ec1f0.jpg"
        },
        {
            "id": "f98ff8ec-4024-43c4-af77-533c63b34fa1",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/img0831.png"
        },
        {
            "id": "22e7721b4-ffd9-4cd2-9844-b1a50d37720d",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/0d14d70d7b0534aa6631f4b21bd7918b.png"
        },
        {
            "id": "47124aa2f-4df6-475f-93a8-957c1d368308",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/2747c30d4c574d5beb88dd4b2ffc93e4.jpg"
        },
        {
            "id": "ae282fea7-5a3e-4064-9eb6-697c02b831c3",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/red.jpeg"
        },
        {
            "id": "c54d428f5-edbd-4083-8a46-4807c1b8fbba",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/9cee5e3436559735edc1d6286c3ec1f0.jpg"
        },
        {
            "id": "f98ff8e2c-4024-43c4-af77-533c63b34fa1",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/img0831.png"
        },
        {
            "id": "22e771b4-3ffd9-4cd2-9844-b1a50d37720d",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/0d14d70d7b0534aa6631f4b21bd7918b.png"
        },
        {
            "id": "47124aaf3-4df6-475f-93a8-957c1d368308",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/2747c30d4c574d5beb88dd4b2ffc93e4.jpg"
        },
        {
            "id": "ae28fea7-53a3e-4064-9eb6-697c02b831c3",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/red.jpeg"
        },
        {
            "id": "c54d48f5-3edbd-4083-8a46-4807c1b8fbba",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/9cee5e3436559735edc1d6286c3ec1f0.jpg"
        },
        {
            "id": "f98ff8ec-40324-43c4-af77-533c63b34fa1",
            "image_url": "https://d30xw6wjd1eomi.cloudfront.net/public/images_set2/img0831.png"
        },
    ],
  }
};

export default function Home() {
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

  function handleClickAddColumn() {
    const newId = uuidv4()

    const newData = {
      ...data,
      [newId]: { data: {"color": "#ff9c9c", "title": "Default"}, children: [] },
    };

    setData(newData);

    setColumnIds(prev => [...prev, newId]);
  }

  function handleClickDeleteColumn(columnId: UniqueIdentifier) {
    const newData = moveFromRowInto(data, columnId, "Tier-Base-id");
    delete newData[columnId];

    setData(newData);
    setColumnIds(prev => prev.filter(id => id !== columnId));
  }

  function handleRenameColumn(columnId: UniqueIdentifier, newTitle: string) {
    setData((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        data: {
          ...prev[columnId].data,
          title: newTitle,
        },
      },
    }));
  }

  function handleColorChange(columnId: UniqueIdentifier, newColor: string) {
    setData((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        data: {
          ...prev[columnId].data,
          color: newColor,
        },
      },
    }));
  }

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
          content = <TeirCardItem item={activeItem} className="cursor-grabbing aspect-square w-20" />;
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

  function restCards() {
    setData(prev =>
    moveAllOthersInto(prev, "Tier-Base-id")
  );
  }
  
  return (
  <>
    <main className="flex min-h-screen h-full justify-center bg-background">
      <DndContext
        id="dnd-kanban-context-id"
        collisionDetection={customCollision}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
      <SortableContext items={columnIds.filter(id => id !== "Tier-Base-id")}>

      <div className="w-10/12 max-w-300 aspect-video grid grid-rows-[0.05fr_auto_1fr] gap-8 ">



        <div>
        </div>
        <div className="w-full flex flex-col space-y-2 items-center relative">

          <div className="absolute top-1/64 -left-1/82 aspect-square w-1/32 " onClick={() => setTierConfig(!tierConfig)}>
            <GearIcon className="cursor-pointer w-full h-full" stroke="#ffffff"></GearIcon>
          </div>

          {tierConfig ?

            <div className="absolute bottom-0 -left-3/82 aspect-square w-2/32 " onClick={handleClickAddColumn}>
                <AddRowIcon className="fill-white h-full w-full cursor-pointer "></AddRowIcon>
            </div>

          : 
            null
          }



          {columnIds
            .filter((columnId) => columnId !== "Tier-Base-id")
            .map((columnId) => (
            <SortableTierRow
              key={columnId}
              columnId={columnId}
              column={data[columnId]}
              activeCardId={activeId}
              rowIds={columnIds}
              tierConfig={tierConfig}
              onClickDelete={handleClickDeleteColumn}
              renameColum={handleRenameColumn}
              colorChange={handleColorChange}
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
          className="w-full h-fit rounded-md bg-foreground min-h-96  border-white/25 border-4 relative"
        >

          <div onClick={() => restCards()} className="absolute top-0 -left-1/20 aspect-square w-1/26" >
            <ResetIcon className="cursor-pointer h-full w-full" stroke="#ffffff"></ResetIcon>
          </div>

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
