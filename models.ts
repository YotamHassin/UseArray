import react, {
  Dispatch, SetStateAction, 
} from "react";

export type Direction = "Forward" | "Backward";

export interface ArrayStateHandler<T> {
  items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;

  addNewItem: (item: T, newIndex?: number) => void;
  moveItem: (index: number, newIndex: number) => void;
  moveDirection: (index: number, forward: Direction) => void;
  updateItem: (item: T, index: number) => void;
  insertItem: (item: T, index: number) => void;
  deleteItem: (index: number) => void;

}

