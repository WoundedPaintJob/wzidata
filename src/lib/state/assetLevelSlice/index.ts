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
          if (asset.Type == AssetType.ArmyCamp)
            state.ArmyCamps.get(asset.Index).Level += 1;
          else if (asset.Type == AssetType.Hospital)
            state.Hospitals.get(asset.Index).Level += 1;
          else if (asset.Type == AssetType.Mine)
            state.Mines.get(asset.Index).Level += 1;
          else throw "Asset Level Not Implemented";
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
          if (asset.Type == AssetType.ArmyCamp)
            state.ArmyCamps.get(asset.Index).Level -= 1;
          else if (asset.Type == AssetType.Hospital)
            state.Hospitals.get(asset.Index).Level -= 1;
          else if (asset.Type == AssetType.Mine)
            state.Mines.get(asset.Index).Level -= 1;
          else throw "Asset Level Not Implemented";
        }
      })
    ),
  ArmyCamps: new Map<number, ArmyCampState>(),
  Crafters: new Map<number, CrafterState>(),
  DigSites: [],
  Hospitals: new Map<number, HospitalState>(),
  Markets: new Map<number, MarketState>(),
  MercenaryCamps: new Map<string, MercenaryCampState>(),
  Mines: new Map<number, MineState>(),
  Recipes: new Map<MaterialType, RecipeState>(),
  Smelters: new Map<number, SmelterState>(),
  SuperCamp: null,
});
