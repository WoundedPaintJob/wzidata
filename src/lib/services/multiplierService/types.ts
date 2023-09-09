import { ArtifactType } from "@features/artifact/lib/enums";
import { AdvancementType } from "@features/advancement/lib/enums";
import { TechType } from "@features/tech/lib/enums";
export enum MultiplierType {
	ArmyCampCost,
	ArmyCampProduction,
	Cache,
	CacheArmies,
	CacheMoney,
	CacheResources,
	DigSpeed,
	DraftSize,
	HospitalEffect,
	JointStrike,
	MercenaryProduction,
	MercenaryDiscount,
	MineProduction,
	MineDiscount,
	SellAlloy,
	SellItem,
	SellOre,
	TechDiscount,
}

export type MultiplierGroup = {
	Artifact?: ArtifactType;
	Advancement?: AdvancementType;
	Tech?: TechType;
	Positive: boolean;
};

export const MultiplierGroups = new Map<MultiplierType, MultiplierGroup>([
  [
    MultiplierType.ArmyCampCost,
    {
      Artifact: ArtifactType.ArmyCampUpgradeDiscount,
      Advancement: AdvancementType.ArmyCampDiscount,
      Tech: TechType.ArmyCampUpgradeCost,
      Positive: false,
    },
  ],
  [
    MultiplierType.ArmyCampProduction,
    {
      Artifact: ArtifactType.ArmyCampProduction,
      Advancement: AdvancementType.ArmyCampProduction,
      Tech: TechType.ArmyCampProduction,
      Positive: true,
    },
  ],
  [
    MultiplierType.Cache,
    {
      Artifact: ArtifactType.AllCachesIncreased,
      Tech: TechType.CacheProduction,
      Positive: true,
    },
  ],
  [
    MultiplierType.CacheArmies,
    {
      Artifact: ArtifactType.CacheArmiesIncreased,
      Advancement: AdvancementType.CacheArmiesIncreased,
      Positive: true,
    },
  ],
  [
    MultiplierType.CacheMoney,
    {
      Artifact: ArtifactType.CacheMoneyIncreased,
      Advancement: AdvancementType.CacheMoneyIncreased,
      Positive: true,
    },
  ],
  [
    MultiplierType.CacheResources,
    {
      Artifact: ArtifactType.CacheResourcesIncreased,
      Advancement: AdvancementType.CacheResourceIncreased,
      Positive: true,
    },
  ],
  [
    MultiplierType.DigSpeed,
    {
      Advancement: AdvancementType.DigSpeed,
      Positive: false,
    },
  ],
  [
    MultiplierType.DraftSize,
    {
      Artifact: ArtifactType.DraftsIncreasedBy,
      Advancement: AdvancementType.DraftValues,
      Tech: TechType.DraftValues,
      Positive: true,
    },
  ],
  [
    MultiplierType.HospitalEffect,
    {
      Artifact: ArtifactType.HospitalSaveAdditional,
      Advancement: AdvancementType.HospitalEffect,
      Tech: TechType.HospitalEffect,
      Positive: true,
    },
  ],
  [
    MultiplierType.JointStrike,
    {
      Advancement: AdvancementType.MultiBorderConquerRefund,
      Positive: false,
    },
  ],
  [
    MultiplierType.MercenaryProduction,
    {
      Advancement: AdvancementType.IncreaseMercenariesAvailable,
      Positive: true,
    },
  ],
  [
    MultiplierType.MercenaryDiscount,
    {
      Artifact: ArtifactType.MercenaryDiscount,
      Advancement: AdvancementType.MercenaryDiscount,
      Tech: TechType.MercenaryDiscount,
      Positive: false,
    },
  ],
  [
    MultiplierType.MineProduction,
    {
      Artifact: ArtifactType.MineProduction,
      Tech: TechType.MineProduction,
      Positive: false,
    },
  ],
  [
    MultiplierType.MineDiscount,
    {
      Artifact: ArtifactType.MineUpgradeDiscount,
      Advancement: AdvancementType.MineUpgradeDiscount,
      Tech: TechType.MineUpgradeCost,
      Positive: false,
    },
  ],
  [
    MultiplierType.SellAlloy,
    {
      Artifact: ArtifactType.AlloySellValues,
      Advancement: AdvancementType.AlloySellValuesIncreased,
      Tech: TechType.AlloySellValues,
      Positive: true,
    },
  ],
  [
    MultiplierType.SellItem,
    {
      Artifact: ArtifactType.ItemSellValues,
      Advancement: AdvancementType.ItemSellValuesIncreased,
      Tech: TechType.ItemSellValues,
      Positive: true,
    },
  ],
  [
    MultiplierType.SellOre,
    {
      Artifact: ArtifactType.OreSellValues,
      Advancement: AdvancementType.OreSellValuesIncreased,
      Tech: TechType.OreSellValues,
      Positive: true,
    },
  ],
  [
    MultiplierType.TechDiscount,
    {
      Advancement: AdvancementType.TechDiscount,
      Positive: false,
    },
  ],
]);
