import { produce } from "immer";
import { StateCreator } from "zustand";
import { ZoneSlice, ZoneState } from "./types";
import { LevelState } from "@lib/stores/levelStore/types";

export const createZoneSlice: StateCreator<
  LevelState,
  [["zustand/devtools", never], ["zustand/subscribeWithSelector", never]],
  [],
  ZoneSlice
> = (set) => ({
  Zones: new Map<number, ZoneState>(),
  ConquerZone: (zone) =>
    set(
      produce((state: LevelState) => {
        const newValue = !zone.Conquered;
        const stateZone = state.Zones.get(zone.Id);
        if (stateZone == undefined) return;
        stateZone.Conquered = newValue;
        zone.Conquered = newValue;
        if (state.ActiveZone && state.ActiveZone.Id == zone.Id)
          state.ActiveZone.Conquered = newValue;
        zone.Bonuses.forEach((b) => {
          let allConquered = true;
          b.ZoneIds.forEach((z) => {
            const stateZ = state.Zones.get(z);
            if (!stateZ || !stateZ.Conquered) allConquered = false;
          });
          const stateBonus = state.Bonuses.get(b.Id);
          if (stateBonus)
            stateBonus.Conquered = allConquered;
        });
      })
    ),
  ConquerZones: (zones) =>
    set(
      produce((state: LevelState) => {
        zones.forEach((zone) => {
          const stateZone = state.Zones.get(zone.Id);
          if (stateZone == undefined) return;
          stateZone.Conquered = true;
          zone.Bonuses.forEach((b) => {
            let allConquered = true;
            b.ZoneIds.forEach((z) => {
              const stateZ = state.Zones.get(z);
              if (!stateZ || !stateZ.Conquered) allConquered = false;
            });
            const stateBonus = state.Bonuses.get(b.Id);
            if (stateBonus)
              stateBonus.Conquered = allConquered;
          });
        });
      })
    ),
});
