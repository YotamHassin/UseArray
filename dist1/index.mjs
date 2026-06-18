// src/useArrayState.ts
import {
  useState,
  useCallback
} from "react";
var useArrayState = (initialArray) => {
  const [items, setItems] = useState(initialArray);
  return useArrayStateInit(items, setItems);
};
var useArrayStateInit = (items, setItems) => {
  const addNewItem = useCallback(
    (item, newIndex) => {
      setItems((currentItems) => {
        const nextItems = newIndex === void 0 || newIndex < 0 || newIndex > currentItems.length ? [...currentItems, item] : [
          ...currentItems.slice(0, newIndex),
          item,
          ...currentItems.slice(newIndex)
        ];
        return nextItems;
      });
    },
    []
  );
  const moveItem = useCallback(
    (index, newIndex) => {
      setItems((currentItems) => {
        if (index < 0 || index >= currentItems.length || newIndex < 0 || newIndex >= currentItems.length || index === newIndex) {
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
    (index, forward = "Forward") => {
      setItems((currentItems) => {
        if (currentItems.length <= 1 || index < 0 || index >= currentItems.length) {
          return currentItems;
        }
        const newIndex = forward === "Forward" ? Math.min(index + 1, currentItems.length - 1) : Math.max(index - 1, 0);
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
    (item, index) => {
      setItems((currentItems) => {
        if (index < 0 || index >= currentItems.length) {
          return currentItems;
        }
        const previousItem = currentItems[index];
        const nextItems = currentItems.map(
          (currentItem, i) => i === index ? item : currentItem
        );
        return nextItems;
      });
    },
    []
  );
  const insertItem = useCallback(
    (item, index) => {
      setItems((currentItems) => {
        if (index < 0 || index > currentItems.length) {
          return currentItems;
        }
        const nextItems = [
          ...currentItems.slice(0, index),
          item,
          ...currentItems.slice(index)
        ];
        return nextItems;
      });
    },
    []
  );
  const deleteItem = useCallback(
    (index) => {
      setItems((currentItems) => {
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
    deleteItem
  };
};
export {
  useArrayState,
  useArrayStateInit
};
