import { BonusState } from "@features/bonus/lib/types";
import { MaterialType } from "@features/material/lib/enums";
import { MaterialState } from "@features/material/lib/types";
import { MapPath } from "@features/path/lib/types";
import { ZoneState } from "@features/zone/lib/types";
import { Tabs } from "@lib/types/enums";
import { TechState } from "@features/tech/lib/types";
import { ArmyCampState } from "@features/armyCamp/lib/types";
import { MineState } from "@features/mine/lib/types";
import { HospitalState } from "@features/hospital/lib/types";
import { Reward } from "@features/reward/lib/types";

export interface OverviewProps {
  Name: string;
  Id: number;
  ImageWidth: number;
  ImageHeight: number;
  LevelRevision: number | null;
  Materials: Map<MaterialType, MaterialState>;
  Techs: TechState[][];
}
export interface OverviewSlice extends OverviewProps {
  ActiveZone: ZoneState | undefined;
  SetActiveZone: (zone: ZoneState) => void;
  ActiveBonus: BonusState | undefined;
  SetActiveBonus: (bonus: BonusState) => void;
  ActiveMaterial: MaterialState | undefined;
  SetActiveMaterial: (material: MaterialType) => void;
  ActiveTab: Tabs;
  SetActiveTab: (tab: Tabs) => void;
  ActivePath: MapPath | undefined;
  SetActivePath: (path: MapPath) => void;
  ToggleTech: (tech: TechState) => void;
  BuyMultipleTechs: (techs: TechState[]) => void;
  TechDisplay: TechDisplayMode;
  SetTechDisplay: (mode: TechDisplayMode) => void;
  SuperChargeArmyCamp: (armyCamp: ArmyCampState) => void;
  SuperChargeMine: (mine: MineState) => void;
}
export interface CardData {
  zones: ZoneState[];
  bonuses: BonusState[];
  conqueredHospitals: HospitalState[];
}
export enum TechDisplayMode {
  Total,
  Market,
  MarketPlusArmy,
}

export interface BiggestCacheProps {
  rewardProperty: (reward: Reward) => number;
  cacheMultiplier: number;
  cacheZones: ZoneState[];
  cacheBonuses: BonusState[];
}
export interface BestCacheProps {
  rewardProperty: (reward: Reward | null | undefined) => number;
  cacheZones: ZoneState[];
  cacheBonuses: BonusState[];
  zones: ZoneState[];
  conqueredHospitals: HospitalState[];
  cacheMultiplier: number;
  jointStrikeMultiplier: number;
  hospitalMultiplier: number;
}
export interface CacheCardProps extends CardData {
  header: string;
  rewardProperty: (reward: Reward) => number;
  cacheMultiplier: number;
  jointStrikeMultiplier: number;
  hospitalMultiplier: number;
  totalArmies?: number;
}
