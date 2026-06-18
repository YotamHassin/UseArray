"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var UseArray_exports = {};
__export(UseArray_exports, {
  useArrayState: () => useArrayState,
  useArrayStateInit: () => useArrayStateInit
});
module.exports = __toCommonJS(UseArray_exports);

// src/useArrayState.ts
var import_react = require("react");
var useArrayState = (initialArray) => {
  const [items, setItems] = (0, import_react.useState)(initialArray);
  return useArrayStateInit(items, setItems);
};
var useArrayStateInit = (items, setItems) => {
  const addNewItem = (0, import_react.useCallback)(
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
  const moveItem = (0, import_react.useCallback)(
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
  const moveDirection = (0, import_react.useCallback)(
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
  const updateItem = (0, import_react.useCallback)(
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
  const insertItem = (0, import_react.useCallback)(
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
  const deleteItem = (0, import_react.useCallback)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useArrayState,
  useArrayStateInit
});
