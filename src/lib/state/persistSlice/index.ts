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
  SuperCampLevel: 1,
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
        state.Crafters = data.Crafters;
        state.Mortars = data.Mortars;
        state.ArmyCamps.forEach((ac) => (ac.SuperCharged = false));
        state.Crafters.forEach((mn) => (mn.SuperCharged = false));
        for (let i = 0; i <= freeTechs; i++) {
          const te = data.Techs.flat().find((t) => t.Id == i);
          if (te) te.Bought = true;
        }
        state.Techs = data.Techs;
        state.Materials = data.Materials;
        state.Recipes = data.Recipes;
        state.SuperCamp = data.SuperCamp;
        state.SuperCamp.Level = 1;
        state.Instructions = data.Instructions;
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
          const zone = data.Zones.get(cz);
          if (zone) zone.Conquered = true;
        });
        state.ConqueredZones.forEach((cz) => {

          const zone = data.Zones.get(cz);
          if (zone) {
            zone.Bonuses.forEach((b) => {
              if (
                b.ZoneIds.filter((iz) => {
                  const inZone = data.Zones.get(iz);
                  if (inZone) return !inZone.Conquered
                  throw "No Zone in Bonus";
                })
                  .length == 0
              ) {
                const dataBonus = data.Bonuses.get(b.Id);
                if (dataBonus) dataBonus.Conquered = true;
              }
            });
          }
        });
        state.HospitalLevels.forEach((h, index) => {
          const dataHospital = data.Hospitals.get(index + 1);
          if (dataHospital) dataHospital.Level = h;
        });
        state.OwnedTechs.forEach((t) => {
          const dataTech = data.Techs.flat().find((it) => it.Id == t);
          if (dataTech) dataTech.Bought = true;
        });
        for (let i = 0; i <= freeTechs; i++) {
          const te = data.Techs.flat().find((t) => t.Id == i);
          if (te) te.Bought = true;
        }
        state.ArmyCampLevels.forEach((ac, index) => {
          const dataArmyCamp = data.ArmyCamps.get(index + 1);
          if (dataArmyCamp) dataArmyCamp.Level = ac;
        });
        state.MineLevels.forEach((ac, index) => {
          const dataMine = data.Crafters.get(index + 1);
          if (dataMine) dataMine.Level = ac;
        });
        state.StoredRenderOptions.forEach((ro) => {
          state.RenderOptions.set(ro, true);
        });
        state.ArmyCamps.forEach((ac) => (ac.SuperCharged = false));
        state.Crafters.forEach((mn) => (mn.SuperCharged = false));
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
        state.Crafters = data.Crafters;
        state.Mortars = data.Mortars;
        state.Techs = data.Techs;
        state.Materials = data.Materials;
        state.Recipes = data.Recipes;
        state.SuperCamp = data.SuperCamp;
        state.SuperCamp.Level = Math.max(state.SuperCampLevel, 1);
        state.Instructions = data.Instructions;
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
