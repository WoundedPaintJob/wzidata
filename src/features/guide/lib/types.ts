import { HTMLAttributes } from "react";
import { InstructionState } from "./instructions/instruction";

export type SortableItemProps = {
  item: InstructionState;
} & HTMLAttributes<HTMLDivElement>;