import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type Item<T> = {
  id: UniqueIdentifier;
  image_url: T;
};

export type Column<T, E> = {
  data: Record<string, string>;
  children: Item<E>[];
};

export type Data<T, E> = {
  [key: UniqueIdentifier]: Column<T, E>;
};

export type SortableProps = Pick<
  ReturnType<typeof useSortable>,
  "listeners" | "attributes"
>;


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function moveAllOthersInto<T, E>(
  data: Data<T, E>,
  destinationKey: UniqueIdentifier
): Data<T, E> {
  if (!data[destinationKey]) return data;

  // collect children from all other columns
  const collectedChildren: Item<E>[] = Object.entries(data)
    .filter(([key]) => key !== destinationKey)
    .flatMap(([, column]) => column.children);

  // build new object
  const updated: Data<T, E> = {} as Data<T, E>;

  Object.entries(data).forEach(([key, column]) => {
    if (key === destinationKey) {
      updated[key] = {
        ...column,
        children: [...column.children, ...collectedChildren],
      };
    } else {
      updated[key] = {
        ...column,
        children: [],
      };
    }
  });

  return updated;
}

export function moveFromRowInto<T, E>(
  data: Data<T, E>,
  sourceKey: UniqueIdentifier,
  destinationKey: UniqueIdentifier
): Data<T, E> {
  // if source or destination doesn't exist, return original
  if (!data[sourceKey] || !data[destinationKey]) return data;

  const sourceChildren = data[sourceKey].children;

  // build new object
  const updated: Data<T, E> = {} as Data<T, E>;

  Object.entries(data).forEach(([key, column]) => {
    if (key === destinationKey) {
      // append source children to destination
      updated[key] = {
        ...column,
        children: [...column.children, ...sourceChildren],
      };
    } else if (key === sourceKey) {
      // clear source row
      updated[key] = {
        ...column,
        children: [],
      };
    } else {
      // leave all other rows unchanged
      updated[key] = column;
    }
  });

  return updated;
}