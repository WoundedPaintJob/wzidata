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
        state.Zones.get(zone.Id).Conquered = newValue;
        zone.Conquered = newValue;
        if (state.ActiveZone && state.ActiveZone.Id == zone.Id)
          state.ActiveZone.Conquered = newValue;
        zone.Bonuses.forEach((b) => {
          let allConquered = true;
          b.ZoneIds.forEach((z) => {
            if (!state.Zones.get(z).Conquered) allConquered = false;
          });
          state.Bonuses.get(b.Id).Conquered = allConquered;
        });
      })
    ),
  ConquerZones: (zones) =>
    set(
      produce((state: LevelState) => {
        zones.forEach((zone) => {
          state.Zones.get(zone.Id).Conquered = true;
          zone.Bonuses.forEach((b) => {
            let allConquered = true;
            b.ZoneIds.forEach((z) => {
              if (!state.Zones.get(z).Conquered) allConquered = false;
            });
            state.Bonuses.get(b.Id).Conquered = allConquered;
          });
        });
      })
    ),
});
