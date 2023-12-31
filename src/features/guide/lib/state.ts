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
        stateInstruction.Done = !instruction.Done;
        if (instruction.Type == InstructionType.ConquerBonus) {
          const bonusInstruction = instruction as ConquerBonusInstructionState;
          const stateBonus = state.Bonuses.get(bonusInstruction.BonusId);
          if (stateBonus) {
            stateBonus?.ZoneIds.forEach((zoneId) => {
              const stateZone = state.Zones.get(zoneId);
              if (stateZone) stateZone.Conquered = stateInstruction.Done;
            });
          }
        } else if (instruction.Type == InstructionType.ConquerZone) {
          const zoneInstruction = instruction as ConquerZoneInstructionState;
          const stateZone = state.Zones.get(zoneInstruction.ZoneId);
          if (stateZone) {
            stateZone.Conquered = stateInstruction.Done;
          }
        }
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
          const newBonus = state.Bonuses.get(bonusInstruction.BonusId);
          if (newBonus) {
            newBonus.IsActive = true;
            state.Zones.forEach((z) => {
              if (newBonus.ZoneIds.includes(z.Id)) z.IsActive = true;
              else if (z.IsActive) z.IsActive = false;
              if (z.IsNextToActive) z.IsNextToActive = false;
            });
            state.ActiveBonus = newBonus;
          }
        } else if (instruction.Type == InstructionType.ConquerZone) {
          const zoneInstruction = instruction as ConquerZoneInstructionState;
          if (zoneInstruction.ZoneId) {
            const newZone = state.Zones.get(zoneInstruction.ZoneId);
            if (newZone) {
              state.Zones.forEach((z) => {
                if (z.Id != newZone.Id && z.IsActive) {
                  z.IsActive = false;
                  if (z.IsNextToActive) z.IsNextToActive = false;
                }
                if (newZone.ConnectedZones.includes(z.Id)) {
                  z.IsNextToActive = true;
                } else if (z.IsNextToActive) z.IsNextToActive = false;
              });
              newZone.IsActive = true;
              state.ActiveZone = newZone;
            }
          }
        } else if (instruction.Type == InstructionType.Text) {
          const instr = instruction as TextInstructionState;
          if (instr.ZoneId) {
            const newZone = state.Zones.get(instr.ZoneId);
            if (newZone) {
              state.Zones.forEach((z) => {
                if (z.Id != newZone.Id && z.IsActive) {
                  z.IsActive = false;
                }
                if (newZone.ConnectedZones.includes(z.Id)) {
                  z.IsNextToActive = true;
                } else if (z.IsNextToActive) z.IsNextToActive = false;
              });
              newZone.IsActive = true;
              state.ActiveZone = newZone;
            }
          }
          if (instr.BonusId) {
            const newBonus = state.Bonuses.get(instr.BonusId);
            if (newBonus) {
              newBonus.IsActive = true;
              state.Zones.forEach((z) => {
                if (newBonus.ZoneIds.includes(z.Id)) z.IsActive = true;
                else if (z.IsActive) z.IsActive = false;
                if (z.IsNextToActive) z.IsNextToActive = false;
              });
              state.ActiveBonus = newBonus;
            }
          }
        }
      })
    ),
  SetInstructions: (instructions) =>
    set(
      produce((state: LevelState) => {
        state.ActiveInstruction = undefined;
        state.Instructions.clear();
        instructions.forEach((i) => {
          i.Done = false;
          state.Instructions.set(i.Id, i);
        });
      })
    ),
});
