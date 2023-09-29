import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import { useEffect, useRef } from "react";
import { CardData } from "../lib/types";
import ArmyCacheCard from "./armyCacheCard";
import ArmyCard from "./armyCard";
import MercenaryCard from "./mercenaryCard";
import MoneyCacheCard from "./moneyCacheCard";
import TerritoriesCard from "./territoriesCard";
import { isAssetConquered } from "@helpers/assetHelper";
import ResourceCacheCard from "./resourceCacheCard";
import StatsCard from "./statsCard";

const OverView = () => {
  const zoneRef = useRef(useLevelStore((state) => state.Zones));
  useEffect(
    () =>
      useLevelStore.subscribe(
        (state) => state.Zones,
        (newVal) => (zoneRef.current = newVal)
      ),
    []
  );
  const bonusRef = useRef(useLevelStore((state) => state.Bonuses));
  useEffect(
    () =>
      useLevelStore.subscribe(
        (state) => state.Bonuses,
        (newVal) => (bonusRef.current = newVal)
      ),
    []
  );
  if (zoneRef.current.size == 0) return <></>;
  const zones = Array.from(zoneRef.current.values());
  const bonuses = Array.from(bonusRef.current.values());
  const hospitals = Array.from(
    useLevelStore((state) => state.Hospitals).values()
  );
  const conqueredHospitals = hospitals.filter((h) =>
    isAssetConquered(h, zoneRef.current, bonusRef.current)
  );
  const cardProps: CardData = {
    bonuses: bonuses,
    zones: zones,
    conqueredHospitals: conqueredHospitals,
  };
  return (
    <div>
      <Section>
        <Section.Body>
          <Section.CardList>
            <ArmyCard {...cardProps} />
            <TerritoriesCard {...cardProps} />
            <ArmyCacheCard {...cardProps} />
            <MoneyCacheCard {...cardProps} />
            <ResourceCacheCard {...cardProps} />
            <MercenaryCard {...cardProps} />
            <StatsCard />
          </Section.CardList>
        </Section.Body>
      </Section>
    </div>
  );
};
export default OverView;
