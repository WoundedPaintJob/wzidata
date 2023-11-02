import { StateCreator } from "zustand";
import { BonusSlice, BonusState } from "./types";
import { produce } from "immer";
import { LevelState } from "@lib/stores/levelStore/types";

export const createBonusSlice: StateCreator<
  LevelState,
  [["zustand/devtools", never], ["zustand/subscribeWithSelector", never]],
  [],
  BonusSlice
> = (set) => ({
  Bonuses: new Map<number, BonusState>(),
  ConquerBonus: (bonus) =>
    set(
      produce((state: LevelState) => {
        const newVal = !bonus.Conquered;
        const stateBonus = state.Bonuses.get(bonus.Id);
        if (stateBonus) {
          stateBonus.Conquered = newVal;
          if (state.ActiveBonus && state.ActiveBonus.Id == bonus.Id)
            state.ActiveBonus.Conquered = newVal;
          const affectedBonuses = new Set<number>();
          bonus.ZoneIds.forEach((z) => {
            const zone = state.Zones.get(z);
            if (zone) {
              zone.Conquered = newVal;
              zone.Bonuses.forEach((ib) => {
                affectedBonuses.add(ib.Id);
              });
            }
          });
          affectedBonuses.forEach((b) => {
            const stateBonus = state.Bonuses.get(b);
            if (stateBonus) {
              let allConquered = true;
              stateBonus.ZoneIds.forEach((z) => {
                const stateZ = state.Zones.get(z);
                if (!stateZ || !stateZ.Conquered) allConquered = false;
              });
              stateBonus.Conquered = allConquered;
            }
          });
        }
      })
    ),
});
