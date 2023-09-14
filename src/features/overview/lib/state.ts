import { MaterialType } from '@features/material/lib/enums';
import { MaterialState } from '@features/material/lib/types';
import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { OverviewSlice, TechDisplayMode } from './types';
import { MapPath } from '@features/path/lib/types';
import { TechState } from '@features/tech/lib/types';
import { LevelState } from '@lib/stores/levelStore/types';
import { Tabs } from '@lib/types/enums';
import { ArmyCampState } from '@features/armyCamp/lib/types';
import { MineState } from '@features/mine/lib/types';

export const createOverviewSlice: StateCreator<
  LevelState,
  [["zustand/devtools", never], ["zustand/subscribeWithSelector", never]],
  [],
  OverviewSlice
> = (set) => ({
  Id: -1,
  Name: "",
  ImageHeight: 0,
  ImageWidth: 0,
  Materials: new Map<MaterialType, MaterialState>(),
  Techs: [],
  LevelRevision: null,
  ActiveZone: undefined,
  SetActiveZone: (zone) =>
    set(
      produce((state: LevelState) => {
        state.ActiveBonus = undefined;
        state.ActiveMaterial = undefined;
        state.ActivePath = undefined;
        state.ActiveZone = state.Zones.get(zone.Id);
      })
    ),
  ActiveBonus: undefined,
  SetActiveBonus: (bonus) =>
    set(
      produce((state: LevelState) => {
        state.ActiveZone = undefined;
        state.ActiveMaterial = undefined;
        state.ActivePath = undefined;
        state.ActiveBonus = state.Bonuses.get(bonus.Id);
      })
    ),
  ActiveMaterial: undefined,
  SetActiveMaterial: (material) =>
    set(
      produce((state: LevelState) => {
        state.ActiveZone = undefined;
        state.ActiveBonus = undefined;
        state.ActivePath = undefined;
        state.ActiveMaterial = state.Materials.get(material);
      })
    ),
  ActiveTab: Tabs.Overview,
  SetActiveTab: (tab) =>
    set(
      produce((state: LevelState) => {
        state.ActiveTab = tab;
      })
    ),
  ActivePath: undefined,
  SetActivePath: (path: MapPath) =>
    set(
      produce((state: LevelState) => {
        state.ActivePath = path;
      })
    ),
  ToggleTech: (tech: TechState) =>
    set(
      produce((state: LevelState) => {
        const te = state.Techs.flat().find((t) => t.Id == tech.Id);
        if (te)
          te.Bought = !te.Bought;
      })
    ),
  TechDisplay: TechDisplayMode.Market,
  SetTechDisplay: (mode: TechDisplayMode) =>
    set(
      produce((state: LevelState) => {
        state.TechDisplay = mode;
      })
    ),
  SuperChargeArmyCamp: (armyCamp: ArmyCampState) =>
    set(
      produce((state: LevelState) => {
        const ac = state.ArmyCamps.get(armyCamp.Index);
        if (ac)
          ac.SuperCharged = !ac.SuperCharged;
      })
    ),
  SuperChargeMine: (mine: MineState) =>
    set(
      produce((state: LevelState) => {
        const mn = state.Mines.get(mine.Index);
        if (mn)
          mn.SuperCharged = !mn.SuperCharged;
      })
    ),
});
