import { createBonusSlice } from "@features/bonus/lib/state";
import { createOverviewSlice } from "@features/overview/lib/state";
import { createZoneSlice } from "@features/zone/lib/state";
import { createAssetLevelSlice } from "@lib/state/assetLevelSlice";
import { createPersistSlice } from "@lib/state/persistSlice";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { LevelState } from "./types";
import { createGuideSlice } from "@features/guide/lib/state";

const useLevelStore = create<LevelState>()(
  devtools(
    persist(
      subscribeWithSelector((...a) => ({
        ...createOverviewSlice(...a),
        ...createZoneSlice(...a),
        ...createBonusSlice(...a),
        ...createAssetLevelSlice(...a),
        ...createPersistSlice(...a),
        ...createGuideSlice(...a)
      })),
      {
        name: "level-storage",
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            const baseState = str
              ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              (JSON.parse(str).state as LevelState)
              : ({
                Name: "Huruey's Castle",
                Id: 2,
                ImageWidth: 1270,
                ImageHeight: 650,
              } as Partial<LevelState>);
            return {
              state: {
                ...baseState,
              } as LevelState,
            };
          },
          setItem: (name, newValue) => {
            return localStorage.setItem(
              name,
              JSON.stringify({
                state: {
                  StoredRenderOptions: Array.from(
                    newValue.state.RenderOptions.entries()
                  )
                    .filter((ro) => ro[1])
                    .map((ro) => ro[0]),
                  ConqueredZones: Array.from(newValue.state.Zones.values())
                    .filter((z) => z.Conquered)
                    .map((z) => z.Id),
                  HospitalLevels: Array.from(newValue.state.Hospitals.values())
                    .sort((a, b) => a.Index - b.Index)
                    .map((h) => h.Level),
                  ArmyCampLevels: Array.from(newValue.state.ArmyCamps.values())
                    .sort((a, b) => a.Index - b.Index)
                    .map((h) => h.Level),
                  MineLevels: Array.from(newValue.state.Mines.values())
                    .sort((a, b) => a.Index - b.Index)
                    .map((h) => h.Level),
                  OwnedTechs: Array.from(newValue.state.Techs.values())
                    .flat()
                    .filter((t) => t.Bought)
                    .map((t) => t.Id),
                  SuperCampLevel: newValue.state.SuperCamp.Level,
                },
              })
            );
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    )
  )
);
export default useLevelStore;
