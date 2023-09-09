import { z } from 'zod';

export enum TechType {
  ArmyCampProduction = 'ArmyCampProduction',
  MineProduction = 'MineProduction',
  MoneyFromTerritories = 'MoneyFromTerritories',
  MoneyFromBonuses = 'MoneyFromBonuses',
  SmelterSpeed = 'SmelterSpeed',
  CrafterSpeed = 'CrafterSpeed',
  SmelterIngredents = 'SmelterIngredents',
  CrafterIngredents = 'CrafterIngredents',
  SmeltDouble = 'SmeltDouble',
  CraftDouble = 'CraftDouble',
  OreSellValues = 'OreSellValues',
  ItemSellValues = 'ItemSellValues',
  CacheProduction = 'CacheProduction',
  ArmyCampUpgradeCost = 'ArmyCampUpgradeCost',
  MineUpgradeCost = 'MineUpgradeCost',
  MercenaryDiscount = 'MercenaryDiscount',
  CanDraft = 'CanDraft',
  DraftValues = 'DraftValues',
  AlloySellValues = 'AlloySellValues',
  HospitalUpgradeCost = 'HospitalUpgradeCost',
  HospitalEffect = 'HospitalEffect',
}
export const techTypeSchema = z.nativeEnum(TechType);
