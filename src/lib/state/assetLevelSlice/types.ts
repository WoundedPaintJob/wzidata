import { Arena } from "@features/arena/lib/types";
import { ArmyCampState, SuperCampState } from "@features/armyCamp/lib/types";
import { CrafterState } from "@features/crafter/lib/types";
import { DigSiteState } from "@features/digSite/lib/types";
import { HospitalState } from "@features/hospital/lib/types";
import { MarketState } from "@features/market/lib/types";
import { MaterialType } from "@features/material/lib/enums";
import { MercenaryCampState } from "@features/mercenaryCamp/lib/types";
import { MineState } from "@features/mine/lib/types";
import { MortarState } from "@features/mortar/lib/types";
import { RecipeState } from "@features/recipe/lib/types";
import { SmelterState } from "@features/smelter/lib/types";
import { AssetWithLevelState } from "@lib/types/assets";
import { AssetType } from "@lib/types/enums";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AssetProps {
  Arenas: Arena[];
  ArmyCamps: Map<number, ArmyCampState>;
  Crafters: Map<number, CrafterState>;
  DigSites: DigSiteState[];
  Hospitals: Map<number, HospitalState>;
  Markets: Map<number, MarketState>;
  MercenaryCamps: Map<string, MercenaryCampState>;
  Crafters: Map<number, MineState>;
  Mortars: MortarState[];
  Crafters: Map<number, SmelterState>;
  Recipes: Map<MaterialType, RecipeState>;
  SuperCamp: SuperCampState;
}
export interface AssetLevelSlice extends AssetProps {
  LevelUp: (asset: AssetWithLevelState) => void;
  LevelDown: (asset: AssetWithLevelState) => void;
  LevelUpAll: (type: AssetType) => void;
  LevelDownAll: (type: AssetType) => void;
}
