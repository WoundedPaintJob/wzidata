import { HTMLAttributes } from "react";
import { Instruction } from "./instructions/instruction";

export type SortableItemProps = {
  item: Instruction;
} & HTMLAttributes<HTMLDivElement>;