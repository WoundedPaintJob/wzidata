import Section from "@components/atoms/section";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import Hospital from ".";
import { hospitalSaveForZone, hospitalsSavedAtLevel } from "../lib/helper";
import { isAssetConquered } from "@helpers/assetHelper";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { getMultiplier } from "@lib/services/multiplierService";
import Button from "@components/atoms/button";
import { ZoneState } from "@features/zone/lib/types";
import { AssetType } from "@lib/types/enums";
const HospitalList = () => {
  const zones = useLevelStore((state) => state.Zones);
  const bonuses = useLevelStore((state) => state.Bonuses);
  const conquerZones = useLevelStore((state) => state.ConquerZones);
  const levelUpAll = useLevelStore((state) => state.LevelUpAll);
  const levelDownAll = useLevelStore((state) => state.LevelDownAll);
  let totalSaved = 0;
  let maxSaved = 0;
  const hospitals = Array.from(
    useLevelStore((state) => state.Hospitals).values()
  );
  if (hospitals.length == 0)
    return (
      <Section>
        <Section.Body>No hospitals</Section.Body>
      </Section>
    );
  const hospitalMultiplier = getMultiplier(
    MultiplierType.HospitalEffect,
    usePlayerStore((state) => state.Advancements),
    usePlayerStore((state) => state.Artifacts),
    useLevelStore((state) => state.Techs)
  );
  hospitals.map((hospital) => {
    totalSaved += isAssetConquered(hospital, zones, bonuses)
      ? hospitalsSavedAtLevel(hospital) * hospitalMultiplier
      : 0;
    maxSaved +=
      hospitalsSavedAtLevel(hospital, hospital.UpgradeCosts.length + 1) *
      hospitalMultiplier;
  });
  function conquerFree(): void {
    const freeZones: ZoneState[] = [];
    zones.forEach((z) => {
      if (!z.Conquered) {
        if (
          z.ConnectedZones.filter((cz) => zones.get(cz)?.Conquered).length > 0
        ) {
          let hospitalSaves = 0;
          hospitals.forEach(
            (hospital) =>
              (hospitalSaves += isAssetConquered(hospital, zones, bonuses)
                ? hospitalSaveForZone(hospital, z) * hospitalMultiplier
                : 0)
          );
          if (hospitalSaves > z.Cost) freeZones.push(z);
        }
      }
    });
    if (freeZones.length > 0) conquerZones(freeZones);
  }

  return (
    <Section>
      <Section.Body>
        <div className="flex space-x-2 space-y-2 flex-wrap items-baseline mb-1">
          <StatRow name="Total Saved" value={formatNumber(totalSaved)} />
          <StatRow name="Max Saved" value={formatNumber(maxSaved)} />
          <StatRow
            name="Multiplier"
            value={formatPercentage(hospitalMultiplier)}
          />
          <Button onClick={() => conquerFree()}>Conquer Free</Button>
          <Button onClick={() => levelUpAll(AssetType.Hospital)}>
            Level up all
          </Button>
          <Button onClick={() => levelDownAll(AssetType.Hospital)}>
            Level down all
          </Button>
        </div>
        <Section.CardList>
          {hospitals
            .sort((a, b) => a.Index - b.Index)
            .map((hospital) => {
              return (
                <Hospital
                  key={hospital.Index}
                  hospital={hospital}
                  multiplier={hospitalMultiplier}
                />
              );
            })}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default HospitalList;
