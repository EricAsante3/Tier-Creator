import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type Item<T> = {
  id: UniqueIdentifier;
  image_url: T;
};

export type Column<T, E> = {
  data: T;
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
