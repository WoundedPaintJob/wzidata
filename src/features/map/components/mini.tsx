import RewardLink from "@components/atoms/rewardLink";
import Section from "@components/atoms/section"
import { RewardType } from "@features/reward/lib/enums";
import { ConquerState } from "@lib/state/hooks/assets/enums";
import useArmyCamps from "@lib/state/hooks/assets/useArmyCamps";
import useCrafters from "@lib/state/hooks/assets/useCrafters";
import useHospitals from "@lib/state/hooks/assets/useHospitals";
import useMarkets from "@lib/state/hooks/assets/useMarkets";
import useMercCamps from "@lib/state/hooks/assets/useMercCamp";
import useMines from "@lib/state/hooks/assets/useMines";
import useSmelters from "@lib/state/hooks/assets/useSmelters";
import useLevelStore from "@lib/stores/levelStore";
import { AssetState } from "@lib/types/assets";
const MiniView = () => {
  const zones = useLevelStore((state) => state.Zones);
  const bonuses = useLevelStore((state) => state.Bonuses);
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);


  const armyCamps = Array.from(useArmyCamps(ConquerState.OnlyUnConquered).values());
  const mercCamps = Array.from(useMercCamps(ConquerState.OnlyUnConquered).values());
  const hospitals = Array.from(useHospitals(ConquerState.OnlyUnConquered).values());
  const markets = Array.from(useMarkets(ConquerState.OnlyUnConquered).values());
  const mines = Array.from(useMines(ConquerState.OnlyUnConquered).values());
  const smelters = Array.from(useSmelters(ConquerState.OnlyUnConquered).values());
  const crafters = Array.from(useCrafters(ConquerState.OnlyUnConquered).values());
  function setActive(asset: AssetState) {
    if (asset.Bonus) {
      const bonus = bonuses.get(asset.Bonus);
      if (bonus)
        setActiveBonus(bonus);
    }
    if (asset.Zone) {
      const zone = zones.get(asset.Zone);
      if (zone)
        setActiveZone(zone);
    }
  }
  function showNext(type: RewardType) {
    console.log(type);
    switch (type) {
      case RewardType.ArmyCamp:
        setActive(armyCamps.sort((a, b) => a.Index - b.Index)[0]);
        break;
      case RewardType.MercenaryCamp:
        setActive(mercCamps.sort((a, b) => a.Index - b.Index)[0]);
        break;
      case RewardType.Hospital:
        setActive(hospitals.sort((a, b) => a.Index - b.Index)[0]);
        break;
      case RewardType.Market:
        setActive(markets.sort((a, b) => a.Index - b.Index)[0]);
        break;
      case RewardType.Mine:
        setActive(mines.sort((a, b) => a.Index - b.Index)[0]);
        break;
      case RewardType.Smelter:
        setActive(smelters.sort((a, b) => a.Index - b.Index)[0]);
        break;
      case RewardType.Crafter:
        setActive(crafters.sort((a, b) => a.Index - b.Index)[0]);
        break;
      default:
        console.log("UNHANDLED");
        break;
    }
  }
  return (
    <>
      <Section>
        <Section.Header>Next</Section.Header>
        <Section.Body>
          <div className="flex">
            {armyCamps.length > 0 &&
              <RewardLink type={RewardType.ArmyCamp} onClick={() => showNext(RewardType.ArmyCamp)} />
            }
            {mercCamps.length > 0 &&
              <RewardLink type={RewardType.MercenaryCamp} onClick={() => showNext(RewardType.MercenaryCamp)} />
            }
            {hospitals.length > 0 &&
              <RewardLink type={RewardType.Hospital} onClick={() => showNext(RewardType.Hospital)} />
            }
            {markets.length > 0 &&
              <RewardLink type={RewardType.Market} onClick={() => showNext(RewardType.Market)} />
            }
            {mines.length > 0 &&
              <RewardLink type={RewardType.Mine} onClick={() => showNext(RewardType.Mine)} />
            }
            {smelters.length > 0 &&
              <RewardLink type={RewardType.Smelter} onClick={() => showNext(RewardType.Smelter)} />
            }
            {crafters.length > 0 &&
              <RewardLink type={RewardType.Crafter} onClick={() => showNext(RewardType.Crafter)} />
            }
          </div>
        </Section.Body>
      </Section>
    </>
  )
}
export default MiniView;