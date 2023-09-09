import { StateCreator } from "zustand";
import { PersistSlice } from "./types";
import { LevelState } from "@lib/stores/levelStore/types";
import { RenderOptionType } from "@lib/types/enums";
import { produce } from "immer";

export const createPersistSlice: StateCreator<
	LevelState,
	[["zustand/devtools", never], ["zustand/subscribeWithSelector", never]],
	[],
	PersistSlice
> = (set) => ({
  ConqueredZones: [],
  HospitalLevels: [],
  ArmyCampLevels: [],
  MineLevels: [],
  SuperCampLevel: 0,
  OwnedTechs: [],
  StoredRenderOptions: [],
  RenderOptions: new Map<RenderOptionType, boolean>(),
  SetLevel: (data, freeTechs) => {
    set(
      produce((state: LevelState) => {
        state.ActiveZone = undefined;
        state.ActiveBonus = undefined;
        state.ActivePath = undefined;
        state.Name = data.Name;
        state.Id = data.Id;
        state.RenderOptions = data.RenderOptions;
        state.ImageWidth = data.ImageWidth;
        state.ImageHeight = data.ImageHeight;
        state.LevelRevision = data.LevelRevision;
        state.Zones = data.Zones;
        state.Bonuses = data.Bonuses;
        state.Arenas = data.Arenas;
        state.ArmyCamps = data.ArmyCamps;
        state.DigSites = data.DigSites;
        state.Hospitals = data.Hospitals;
        state.Markets = data.Markets;
        state.MercenaryCamps = data.MercenaryCamps;
        state.Mines = data.Mines;
        state.Mortars = data.Mortars;
        state.ArmyCamps.forEach((ac) => (ac.SuperCharged = false));
        state.Mines.forEach((mn) => (mn.SuperCharged = false));
        for (let i = 0; i <= freeTechs; i++) {
          const te = data.Techs.flat().find((t) => t.Id == i);
          if (te) te.Bought = true;
        }
        state.Techs = data.Techs;
        state.Materials = data.Materials;
        state.Recipes = data.Recipes;
        state.SuperCamp = data.SuperCamp;
        state.SuperCamp.Level = 1;
      })
    );
  },
  LoadLevel: (data, freeTechs) => {
    set(
      produce((state: LevelState) => {
        state.ActiveZone = undefined;
        state.ActiveBonus = undefined;
        state.ActivePath = undefined;
        state.ConqueredZones.forEach((cz) => {
          data.Zones.get(cz).Conquered = true;
        });
        state.ConqueredZones.forEach((cz) => {
          data.Zones.get(cz).Bonuses.forEach((b) => {
            if (
              b.ZoneIds.filter((zone) => !data.Zones.get(zone).Conquered)
                .length == 0
            )
              data.Bonuses.get(b.Id).Conquered = true;
          });
        });
        state.HospitalLevels.forEach((h, index) => {
          data.Hospitals.get(index + 1).Level = h;
        });
        state.OwnedTechs.forEach((t) => {
          data.Techs.flat().find((it) => it.Id == t).Bought = true;
        });
        for (let i = 0; i <= freeTechs; i++) {
          const te = data.Techs.flat().find((t) => t.Id == i);
          if (te) te.Bought = true;
        }
        state.ArmyCampLevels.forEach((ac, index) => {
          data.ArmyCamps.get(index + 1).Level = ac;
        });
        state.MineLevels.forEach((ac, index) => {
          data.Mines.get(index + 1).Level = ac;
        });
        state.StoredRenderOptions.forEach((ro) => {
          state.RenderOptions.set(ro, true);
        });
        state.ArmyCamps.forEach((ac) => (ac.SuperCharged = false));
        state.Mines.forEach((mn) => (mn.SuperCharged = false));
        state.Id = data.Id;
        state.Name = data.Name;
        state.LevelRevision = data.LevelRevision;
        state.ImageWidth = data.ImageWidth;
        state.ImageHeight = data.ImageHeight;
        state.Zones = data.Zones;
        state.Bonuses = data.Bonuses;
        state.Arenas = data.Arenas;
        state.ArmyCamps = data.ArmyCamps;
        state.DigSites = data.DigSites;
        state.Hospitals = data.Hospitals;
        state.Markets = data.Markets;
        state.MercenaryCamps = data.MercenaryCamps;
        state.Mines = data.Mines;
        state.Mortars = data.Mortars;
        state.Techs = data.Techs;
        state.Materials = data.Materials;
        state.Recipes = data.Recipes;
        state.SuperCamp = data.SuperCamp;
        state.SuperCamp.Level = state.SuperCampLevel;
      })
    );
  },
  UpdateRenderOption: (type) =>
    set(
      produce((state: LevelState) => {
        if (state.RenderOptions.has(type))
          state.RenderOptions.set(type, !state.RenderOptions.get(type));
        else state.RenderOptions.set(type, true);
      })
    ),
});
