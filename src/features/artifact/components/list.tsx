import Section from '@components/atoms/section';
import usePlayerStore from '@lib/stores/playerStore';
import Artifact from '.';
import { ArtifactType } from '../lib/enums';
import Text from '@components/atoms/text';
const ArtifactList = () => {
  const artifacts = usePlayerStore((state) => state.Artifacts);
  return (
    <Section>
      <Section.Header>Artifacts</Section.Header>
      <Section.Body>
        <Text size="body">Cache</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.CacheArmiesIncreased)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.CacheMoneyIncreased)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.CacheResourcesIncreased)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.AllCachesIncreased)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_GetArmyCache)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_GetMoneyCache)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_GetResourceCache)} />
        </Section.CardList>
        <Text size="body" className="mt-2">Smelt</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.SmeltDouble)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.SmelterSpeedIncreased)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.SmelterIngredientsReduced)} />
        </Section.CardList>
        <Text size="body" className="mt-2">Craft</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.CraftDouble)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.CrafterSpeedIncreasedBy)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.CrafterIngredientsReducedBy)} />
        </Section.CardList>
        <Text size="body" className="mt-2">Army Camp</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.ArmyCampProduction)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.ArmyCampUpgradeDiscount)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.DraftsIncreasedBy)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_UpgradeArmyCampForDiscount)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_SuperchargeArmyCampByMinutes)} />
        </Section.CardList>
        <Text size="body" className="mt-2">Mercenary</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.MercenaryDiscount)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_InspireMercenaries)} />
        </Section.CardList>
        <Text size="body" className="mt-2">Hospital</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.HospitalSaveAdditional)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.HospitalUpgradeDiscount)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_UpgradeHospitalForDiscount)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_FieldHospital)} />
        </Section.CardList>
        <Text size="body" className="mt-2">Mine</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.MineProduction)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.MineUpgradeDiscount)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_SuperchargeMineByMinutes)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_UpgradeMineForDiscount)} />
        </Section.CardList>
        <Text size="body" className="mt-2">Money</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.AlloySellValues)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.ItemSellValues)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.OreSellValues)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.MoneyFromTerritories)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.MoneyFromBonuses)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_MarketRaid)} />
        </Section.CardList>
        <Text size="body" className="mt-2">Other</Text>
        <Section.CardList>
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_AdvanceTimeByMinutes)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_RevealTerritories)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.TechDiscount)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.MaxIdleTime)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_TripleStrike)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_QuadrupleStrike)} />
          <Artifact artifact={artifacts.find((a) => a.Type == ArtifactType.Active_ReduceArmiesNeededToConquerTerritory)} />
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default ArtifactList;
