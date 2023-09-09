import { ArmyCampState } from "@features/armyCamp/lib/types";
import { BonusState } from "@features/bonus/lib/types";
import { CrafterState } from "@features/crafter/lib/types";
import { DigSiteState } from "@features/digSite/lib/types";
import { HospitalState } from "@features/hospital/lib/types";
import { LevelInfo } from "@features/level/lib/types";
import { MarketState } from "@features/market/lib/types";
import { MaterialType } from "@features/material/lib/enums";
import { MaterialState } from "@features/material/lib/types";
import { MercenaryCampState } from "@features/mercenaryCamp/lib/types";
import { MineState } from "@features/mine/lib/types";
import { MortarState } from "@features/mortar/lib/types";
import { RecipeState } from "@features/recipe/lib/types";
import { SmelterState } from "@features/smelter/lib/types";
import { TechState } from "@features/tech/lib/types";
import { ZoneState } from "@features/zone/lib/types";
import { LevelProps } from "@lib/stores/levelStore/types";
import { RenderOptionType } from "@lib/types/enums";
import { levelDataSchema } from "@lib/types/levelData";

export async function loadLevel(level: LevelInfo): Promise<LevelProps> {
  const levelData = await fetch(`/data/${level.Id}/Data.json`);
  const parseResult = levelDataSchema.safeParse(await levelData.json());
  if (parseResult.success == false) {
    console.log(parseResult.error);
    return;
  } else {
    const data = parseResult.data;
    const result: LevelProps = {
      Arenas: [],
      ArmyCamps: new Map<number, ArmyCampState>(),
      Crafters: new Map<number, CrafterState>(),
      DigSites: [],
      Hospitals: new Map<number, HospitalState>(),
      Markets: new Map<number, MarketState>(),
      MercenaryCamps: new Map<string, MercenaryCampState>(),
      Mines: new Map<number, MineState>(),
      Mortars: [],
      Smelters: new Map<number, SmelterState>(),
      Recipes: new Map<MaterialType, RecipeState>(),
      Techs: [],
      Id: level.Id,
      Name: data.Name,
      ImageWidth: level.ImageWidth,
      ImageHeight: level.ImageHeight,
      LevelRevision: data.LevelRevision,
      Bonuses: new Map<number, BonusState>(),
      Zones: new Map<number, ZoneState>(),
      ConqueredZones: [],
      StoredRenderOptions: [],
      Materials: new Map<MaterialType, MaterialState>(),
      SuperCamp: data.SuperCamp,
      RenderOptions: new Map<RenderOptionType, boolean>([
        [RenderOptionType.Conquered, true],
        [RenderOptionType.Market, true],
        [RenderOptionType.Hospital, true],
        [RenderOptionType.BonusZones, true],
        [RenderOptionType.CacheArmy, true],
        [RenderOptionType.MercenaryCamp, true],
      ]),
      HospitalLevels: [],
      ArmyCampLevels: [],
      MineLevels: [],
      SuperCampLevel: 0,
      OwnedTechs: [],
    };
    data.Materials.forEach((material) => {
      const newMaterial = material as MaterialState;
      newMaterial.CacheBonuses = new Map<BonusState, number>();
      newMaterial.CacheZones = new Map<ZoneState, number>();
      newMaterial.MineBonuses = new Map<BonusState, number>();
      newMaterial.MineZones = new Map<ZoneState, number>();
      newMaterial.Produces = [];
      newMaterial.TotalOnMap = 0;
      result.Materials.set(newMaterial.Type, newMaterial);
    });
    data.Zones.forEach((zone) => {
      const newZone = zone as ZoneState;
      if (newZone.StartingZone) newZone.Conquered = true;
      newZone.Bonuses = [];
      if (newZone.Reward.Cache && newZone.Reward.Cache.Materials.length > 0) {
        newZone.Reward.Cache.Materials.forEach((mat) => {
          result.Materials.get(mat.Type).CacheZones.set(newZone, mat.Amount);
          result.Materials.get(mat.Type).TotalOnMap += mat.Amount;
        });
      }
      if (newZone.Reward.Mine) {
        newZone.Reward.Mine.Materials.forEach((mat) => {
          result.Materials.get(mat.Type).MineZones.set(newZone, mat.Amount);
        });
        if (newZone.Reward.Recipe) {
          result.Materials.get(newZone.Reward.Recipe.Produces.Type).RecipeZone =
            newZone;
        }
      }
      result.Zones.set(newZone.Id, newZone);
    });
    data.Bonuses.forEach((bonus) => {
      const newBonus = bonus as BonusState;
      newBonus.ZoneIds.forEach((zoneId) => {
        result.Zones.get(zoneId).Bonuses.push(newBonus);
      });
      if (newBonus.Reward.Cache && newBonus.Reward.Cache.Materials.length > 0) {
        newBonus.Reward.Cache.Materials.forEach((mat) => {
          result.Materials.get(mat.Type).CacheBonuses.set(newBonus, mat.Amount);
          result.Materials.get(mat.Type).TotalOnMap += mat.Amount;
        });
      }
      if (newBonus.Reward.Mine) {
        newBonus.Reward.Mine.Materials.forEach((mat) => {
          result.Materials.get(mat.Type).MineBonuses.set(newBonus, mat.Amount);
        });
        if (newBonus.Reward.Recipe) {
          result.Materials.get(
            newBonus.Reward.Recipe.Produces.Type
          ).RecipeBonus = newBonus;
        }
      }
      result.Bonuses.set(newBonus.Id, newBonus);
    });
    data.Arenas.forEach((arena) => {
      result.Arenas.push(arena);
    })
    data.ArmyCamps.forEach((armyCamp) => {
      const newArmyCamp = armyCamp as ArmyCampState;
      result.ArmyCamps.set(newArmyCamp.Index, newArmyCamp);
    });
    data.Crafters.forEach((crafter) => {
      const newCrafter = crafter as CrafterState;
      result.Crafters.set(newCrafter.Index, newCrafter);
    });
    data.DigSites.forEach((dig) => {
      const newDig = dig as DigSiteState;
      result.DigSites.push(newDig);
    });
    data.Hospitals.forEach((hospital) => {
      const newHospital = hospital as HospitalState;
      result.Hospitals.set(newHospital.Index, newHospital);
    });
    data.Markets.forEach((market) => {
      const newMarket = market as MarketState;
      result.Markets.set(newMarket.Index, newMarket);
    });
    data.MercenaryCamps.forEach((mercenaryCamp) => {
      const newMercenaryCamp = mercenaryCamp as MercenaryCampState;
      result.MercenaryCamps.set(newMercenaryCamp.Name, newMercenaryCamp);
    });
    data.Mines.forEach((mine) => {
      const newMine = mine as MineState;
      result.Mines.set(newMine.Index, newMine);
    });
    data.Mortars.forEach((mortar) => {
      const newMortar = mortar as MortarState;
      result.Mortars.push(newMortar);
    })
    data.Smelters.forEach((smelter) => {
      const newSmelter = smelter as SmelterState;
      result.Smelters.set(newSmelter.Index, newSmelter);
    });
    data.Techs.forEach((tech) => {
      const newTech = tech as TechState;
      if (result.Techs[newTech.Row] == undefined)
        result.Techs[newTech.Row] = [];
      result.Techs[newTech.Row][newTech.Column] = newTech;
    });
    data.Recipes.forEach((recipe) => {
      const newRecipe = recipe as RecipeState;
      result.Materials.get(newRecipe.Produces.Type).Recipe = newRecipe;
      result.Recipes.set(newRecipe.Produces.Type, newRecipe);
      recipe.Requires.forEach((requiredMat) =>
        result.Materials.get(requiredMat.Type).Produces.push(newRecipe)
      );
    });
    return result;
  }
}
