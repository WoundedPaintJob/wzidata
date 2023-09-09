import { BonusState } from '@features/bonus/lib/types';
import { MaterialType } from '@features/material/lib/enums';
import { MaterialState } from '@features/material/lib/types';
import { MapPath } from '@features/path/lib/types';
import { ZoneState } from '@features/zone/lib/types';
import { Tabs } from '@lib/types/enums';
import { TechState } from '@features/tech/lib/types';
import { ArmyCampState } from '@features/armyCamp/lib/types';
import { MineState } from '@features/mine/lib/types';
import { HospitalState } from '@features/hospital/lib/types';

export interface OverviewProps {
  Name: string;
  Id: number;
  ImageWidth: number;
  ImageHeight: number;
  LevelRevision: number;
  Materials: Map<MaterialType, MaterialState>;
  Techs: TechState[][];
}
export interface OverviewSlice extends OverviewProps {
	ActiveZone: ZoneState;
	SetActiveZone: (zone: ZoneState) => void;
	ActiveBonus: BonusState;
	SetActiveBonus: (bonus: BonusState) => void;
	ActiveMaterial: MaterialState;
	SetActiveMaterial: (material: MaterialType) => void;
	ActiveTab: Tabs;
	SetActiveTab: (tab: Tabs) => void;
	ActivePath: MapPath;
	SetActivePath: (path: MapPath) => void;
	ToggleTech: (tech: TechState) => void;
	TechDisplay: TechDisplayMode;
	SetTechDisplay: (mode: TechDisplayMode) => void;
	SuperChargeArmyCamp: (armyCamp: ArmyCampState) => void;
	SuperChargeMine: (mine: MineState) => void;
}
export interface CardData {
  zones: ZoneState[];
  unconqueredZones: ZoneState[];
  bonuses: BonusState[];
  unconqueredBonuses: BonusState[];
  ConqueredHospitals: HospitalState[];
}
export enum TechDisplayMode {
  Total,
  Market,
  MarketPlusArmy,
}
