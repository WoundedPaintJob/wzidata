import { InstructionState } from "./instructions/instruction";

export interface GuideProps {
  Instructions: Map<number, InstructionState>;
}
export interface GuideSlice extends GuideProps {
  CompleteInstruction: (instruction: InstructionState) => void;
  AddInstruction: (instruction: InstructionState) => void;
  DeleteInstruction: (instruction: InstructionState) => void;
  ActiveInstruction: InstructionState | undefined;
  SetActiveInstruction: (instruction: InstructionState) => void;
  SetInstructions: (instructions: InstructionState[]) => void;
}