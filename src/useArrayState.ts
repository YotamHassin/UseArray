import React, {
  useState, 
  useCallback,
} from "react";

import type { ArrayStateHandler, Direction } from "./models";

export const useArrayState = <T>(
    initialArray: T[] | (() => T[])
): ArrayStateHandler<T> => {
    const [items, setItems] = useState<T[]>(initialArray);
    return useArrayStateInit(items, setItems);
}

export const useArrayStateInit = <T>(
    items: T[], setItems: React.Dispatch<React.SetStateAction<T[]>>
): ArrayStateHandler<T> => {


  const addNewItem = useCallback(
    (item: T, newIndex?: number) => {
      setItems((currentItems: T[]) => {
        const nextItems =
          newIndex === undefined ||
          newIndex < 0 ||
          newIndex > currentItems.length
            ? [...currentItems, item]
            : [
                ...currentItems.slice(0, newIndex),
                item,
                ...currentItems.slice(newIndex),
              ];
        return nextItems;
      });
    },
    []
  );

  const moveItem = useCallback(
    (index: number, newIndex: number) => {
      setItems((currentItems: T[]) => {
        if (
          index < 0 ||
          index >= currentItems.length ||
          newIndex < 0 ||
          newIndex >= currentItems.length ||
          index === newIndex
        ) {
          return currentItems;
        }
        const itemToMove = currentItems[index];
        const nextItems = currentItems.filter((_, i) => i !== index);
        nextItems.splice(newIndex, 0, itemToMove);
        return nextItems;
      });
    },
    []
  );

  const moveDirection = useCallback(
    (index: number, forward: Direction = "Forward") => {
      setItems((currentItems: T[]) => {
        if (
          currentItems.length <= 1 ||
          index < 0 ||
          index >= currentItems.length
        ) {
          return currentItems;
        }
        const newIndex =
          forward === "Forward"
            ? Math.min(index + 1, currentItems.length - 1)
            : Math.max(index - 1, 0);
        if (newIndex === index) {
          return currentItems;
        }
        const itemToMove = currentItems[index];
        const nextItems = currentItems.filter((_, i) => i !== index);
        nextItems.splice(newIndex, 0, itemToMove);
        return nextItems;
      });
    },
    []
  );

  const updateItem = useCallback(
    (item: T, index: number) => {
      setItems((currentItems: T[]) => {
        if (index < 0 || index >= currentItems.length) {
          return currentItems;
        }
        const previousItem = currentItems[index];
        const nextItems = currentItems.map((currentItem, i) =>
          i === index ? item : currentItem
        );
        return nextItems;
      });
    },
    []
  );

  const insertItem = useCallback(
    (item: T, index: number) => {
      setItems((currentItems: T[]) => {
        if (index < 0 || index > currentItems.length) {
          return currentItems;
        }
        const nextItems = [
          ...currentItems.slice(0, index),
          item,
          ...currentItems.slice(index),
        ];
        return nextItems;
      });
    },
    []
  );

  const deleteItem = useCallback(
    (index: number) => {
      setItems((currentItems: T[]) => {
        if (index < 0 || index >= currentItems.length) {
          return currentItems;
        }
        const deletedItem = currentItems[index];
        const nextItems = currentItems.filter((_, i) => i !== index);
        return nextItems;
      });
    },
    []
  );


  return {
    items,
    setItems,

    addNewItem,
    moveItem,
    moveDirection,
    updateItem,
    insertItem,
    deleteItem,

  };
}
