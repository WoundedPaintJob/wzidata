import { LevelState } from "@lib/stores/levelStore/types";
import { StateCreator } from "zustand";
import { GuideSlice } from "./types";
import { produce } from "immer";
import { InstructionState } from "./instructions/instruction";
import { InstructionType } from "./enums";
import { ConquerBonusInstructionState } from "./instructions/conquerBonus";
import { ConquerZoneInstructionState } from "./instructions/conquerZone";
import { ZoneState } from "@features/zone/lib/types";
import { TextInstructionState } from "./instructions/text";

export const createGuideSlice: StateCreator<
  LevelState,
  [["zustand/devtools", never], ["zustand/subscribeWithSelector", never]],
  [],
  GuideSlice
> = (set) => ({
  Instructions: new Map<number, InstructionState>(),
  ActiveInstruction: undefined,
  CompleteInstruction: (instruction) =>
    set(
      produce((state: LevelState) => {
        const stateInstruction = state.Instructions.get(instruction.Id);
        if (!stateInstruction) return;
        stateInstruction.Done != stateInstruction.Done;
      })
    ),
  AddInstruction: (instruction) =>
    set(
      produce((state: LevelState) => {
        state.Instructions.set(instruction.Id, instruction);
      })
    ),
  DeleteInstruction: (instruction) =>
    set(
      produce((state: LevelState) => {
        state.Instructions.delete(instruction.Id);
      })
    ),
  SetActiveInstruction: (instruction) =>
    set(
      produce((state: LevelState) => {
        state.ActiveInstruction = instruction;
        state.ActiveZone = undefined;
        state.ActiveBonus = undefined;
        state.ActivePath = undefined;
        if (instruction.Type == InstructionType.ConquerBonus) {
          const bonusInstruction = instruction as ConquerBonusInstructionState;
          state.ActiveBonus = state.Bonuses.get(bonusInstruction.BonusId);
        } else if (instruction.Type == InstructionType.ConquerZone) {
          const zoneInstruction = instruction as ConquerZoneInstructionState;
          if (zoneInstruction.ZoneIds) {
            if (zoneInstruction.ZoneIds.length == 1)
              state.ActiveZone = state.Zones.get(zoneInstruction.ZoneIds[0]);
            else {
              const zones: ZoneState[] = [];
              zoneInstruction.ZoneIds.forEach((z) => {
                const stateZone = state.Zones.get(z);
                if (stateZone) zones.push(stateZone);
              });
              state.ActivePath = {
                Zones: zones,
                TotalCost: 0
              };
            }
          }
        } else if (instruction.Type == InstructionType.Text) {
          const instr = instruction as TextInstructionState;
          if (instr.ZoneId)
            state.ActiveZone = state.Zones.get(instr.ZoneId);
          if (instr.BonusId)
            state.ActiveBonus = state.Bonuses.get(instr.BonusId);
        }
      })
    ),
  SetInstructions: (instructions) =>
    set(
      produce((state: LevelState) => {
        state.ActiveInstruction = undefined;
        state.Instructions.clear();
        instructions.forEach((i) => state.Instructions.set(i.Id, i));
      })
    )
})