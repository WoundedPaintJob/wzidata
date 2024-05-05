import { ArmyCampState, SuperCampState } from "@features/armyCamp/lib/types";
import { CrafterState } from "@features/crafter/lib/types";
import { HospitalState } from "@features/hospital/lib/types";
import { MarketState } from "@features/market/lib/types";
import { MaterialType } from "@features/material/lib/enums";
import { MercenaryCampState } from "@features/mercenaryCamp/lib/types";
import { MineState } from "@features/mine/lib/types";
import { RecipeState } from "@features/recipe/lib/types";
import { SmelterState } from "@features/smelter/lib/types";
import { canLevelDown, canLevelUp } from "@helpers/assetHelper";
import { AssetWithLevelState } from "@lib/types/assets";
import { AssetType } from "@lib/types/enums";
import { produce } from "immer";
import { StateCreator } from "zustand";
import { AssetLevelSlice } from "./types";
import { LevelState } from "@lib/stores/levelStore/types";

export const createAssetLevelSlice: StateCreator<
  LevelState,
  [["zustand/devtools", never], ["zustand/subscribeWithSelector", never]],
  [],
  AssetLevelSlice
> = (set) => ({
  LevelUp: (asset: AssetWithLevelState) =>
    set(
      produce((state: LevelState) => {
        if ((<SuperCampState>asset).Levels) {
          const camp = <SuperCampState>asset;
          if (camp.Level <= camp.Levels.length) state.SuperCamp.Level += 1;
        } else if (canLevelUp(asset)) {
          if (asset.Type == AssetType.ArmyCamp) {
            const armyCamp = state.ArmyCamps.get(asset.Index);
            if (armyCamp) armyCamp.Level += 1;
          } else if (asset.Type == AssetType.Hospital) {
            const hospital = state.Hospitals.get(asset.Index);
            if (hospital) hospital.Level += 1;
          } else if (asset.Type == AssetType.Mine) {
            const mine = state.Crafters.get(asset.Index);
            if (mine) mine.Level += 1;
          } else throw "Asset Level Not Implemented";
        }
      })
    ),
  LevelDown: (asset: AssetWithLevelState) =>
    set(
      produce((state: LevelState) => {
        if ((<SuperCampState>asset).Levels) {
          const camp = <SuperCampState>asset;
          if (camp.Level > 1) state.SuperCamp.Level -= 1;
        } else if (canLevelDown(asset)) {
          if (asset.Type == AssetType.ArmyCamp) {
            const armyCamp = state.ArmyCamps.get(asset.Index);
            if (armyCamp) armyCamp.Level -= 1;
          } else if (asset.Type == AssetType.Hospital) {
            const hospital = state.Hospitals.get(asset.Index);
            if (hospital) hospital.Level -= 1;
          } else if (asset.Type == AssetType.Mine) {
            const mine = state.Crafters.get(asset.Index);
            if (mine) mine.Level -= 1;
          } else throw "Asset Level Not Implemented";
        }
      })
    ),
  LevelUpAll: (type: AssetType) =>
    set(
      produce((state: LevelState) => {
        if (type == AssetType.Hospital) {
          state.Hospitals.forEach((hospital) => {
            if (canLevelUp(hospital)) hospital.Level += 1;
          });
        }
      })
    ),
  LevelDownAll: (type: AssetType) =>
    set(
      produce((state: LevelState) => {
        if (type == AssetType.Hospital) {
          state.Hospitals.forEach((hospital) => {
            if (canLevelDown(hospital)) hospital.Level -= 1;
          });
        }
      })
    ),
  Arenas: [],
  ArmyCamps: new Map<number, ArmyCampState>(),
  Crafters: new Map<number, CrafterState>(),
  DigSites: [],
  Hospitals: new Map<number, HospitalState>(),
  Markets: new Map<number, MarketState>(),
  MercenaryCamps: new Map<string, MercenaryCampState>(),
  Crafters: new Map<number, MineState>(),
  Mortars: [],
  Recipes: new Map<MaterialType, RecipeState>(),
  Crafters: new Map<number, SmelterState>(),
  SuperCamp: {
    Index: 0,
    Level: 0,
    Levels: [],
    Name: "",
    Type: AssetType.ArmyCamp,
    UpgradeCosts: [],
    Zone: null,
    Bonus: null,
  },
});
