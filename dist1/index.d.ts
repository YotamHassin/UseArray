import React, { Dispatch, SetStateAction } from 'react';

type Direction = "Forward" | "Backward";
interface ArrayStateHandler<T> {
    items: T[];
    setItems: Dispatch<SetStateAction<T[]>>;
    addNewItem: (item: T, newIndex?: number) => void;
    moveItem: (index: number, newIndex: number) => void;
    moveDirection: (index: number, forward: Direction) => void;
    updateItem: (item: T, index: number) => void;
    insertItem: (item: T, index: number) => void;
    deleteItem: (index: number) => void;
}

declare const useArrayState: <T>(initialArray: T[] | (() => T[])) => ArrayStateHandler<T>;
declare const useArrayStateInit: <T>(items: T[], setItems: React.Dispatch<React.SetStateAction<T[]>>) => ArrayStateHandler<T>;

export { ArrayStateHandler, Direction, useArrayState, useArrayStateInit };
