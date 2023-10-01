import { MaterialType } from "@features/material/lib/enums";
import { MaterialState } from "@features/material/lib/types";
import { produce } from "immer";
import { StateCreator } from "zustand";
import { OverviewSlice, TechDisplayMode } from "./types";
import { MapPath } from "@features/path/lib/types";
import { TechState } from "@features/tech/lib/types";
import { LevelState } from "@lib/stores/levelStore/types";
import { Tabs } from "@lib/types/enums";
import { ArmyCampState } from "@features/armyCamp/lib/types";
import { MineState } from "@features/mine/lib/types";

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
        state.ActiveZone = undefined;
        const newZone = state.Zones.get(zone.Id);
        if (newZone) {
          state.Zones.forEach((z) => {
            if (z.Id != zone.Id && z.IsActive) {
              z.IsActive = false;
            }
            if (newZone.ConnectedZones.includes(z.Id)) {
              z.IsNextToActive = true;
            } else if (z.IsNextToActive) z.IsNextToActive = false;
          });
          newZone.IsActive = true;
          state.ActiveZone = newZone;
        }
      })
    ),
  ActiveBonus: undefined,
  SetActiveBonus: (bonus) =>
    set(
      produce((state: LevelState) => {
        state.ActiveZone = undefined;
        state.ActiveMaterial = undefined;
        state.ActivePath = undefined;
        const newBonus = state.Bonuses.get(bonus.Id);
        if (newBonus) {
          newBonus.IsActive = true;
          state.Zones.forEach((z) => {
            if (newBonus.ZoneIds.includes(z.Id)) z.IsActive = true;
            else if (z.IsActive) z.IsActive = false;
            if (z.IsNextToActive) z.IsNextToActive = false;
          });
          state.ActiveBonus = newBonus;
        }
      })
    ),
  ActiveMaterial: undefined,
  SetActiveMaterial: (material) =>
    set(
      produce((state: LevelState) => {
        state.ActiveZone = undefined;
        state.ActiveBonus = undefined;
        state.ActivePath = undefined;
        state.Zones.forEach((z) => {
          if (z.IsActive)
            z.IsActive = false;
        });
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
        const te = state.Techs[tech.Row][tech.Column];
        if (te) te.Bought = !te.Bought;
      })
    ),
  BuyMultipleTechs: (techs: TechState[]) =>
    set(
      produce((state: LevelState) => {
        techs.forEach((t) => {
          const te = state.Techs[t.Row][t.Column];
          if (te) te.Bought = true;
        })
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
        if (ac) ac.SuperCharged = !ac.SuperCharged;
      })
    ),
  SuperChargeMine: (mine: MineState) =>
    set(
      produce((state: LevelState) => {
        const mn = state.Mines.get(mine.Index);
        if (mn) mn.SuperCharged = !mn.SuperCharged;
      })
    ),
});
