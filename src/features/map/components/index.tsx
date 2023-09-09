import Section from "@components/atoms/section";
import MapBonus from "@features/bonus/components/mapBonus";
import MapPath from "@features/path/components/mapPath";
import useLevelStore from "@lib/stores/levelStore";
import { useEffect, useRef } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import MapZone from "../../zone/components/mapZone";
import { Settings } from "src/settings";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import usePlayerStore from "@lib/stores/playerStore";

const MapComponent = () => {
  const settingsRef = useRef(useLevelStore((state) => state.RenderOptions));
  useEffect(
    () =>
      useLevelStore.subscribe(
        (state) => state.RenderOptions,
        (newVal) => (settingsRef.current = newVal)
      ),
    []
  );
  const pathRef = useRef(useLevelStore((state) => state.ActivePath));
  useEffect(
    () =>
      useLevelStore.subscribe(
        (state) => state.ActivePath,
        (newVal) => (pathRef.current = newVal)
      ),
    []
  );
  const zoneMap = useLevelStore((state) => state.Zones);
  const zones = Array.from(zoneMap.values());
  const bonusMap = useLevelStore((state) => state.Bonuses);
  const bonuses = Array.from(bonusMap.values());
  const imageWidth = useLevelStore((state) => state.ImageWidth);
  const imageHeight = useLevelStore((state) => state.ImageHeight);
  const levelId = useLevelStore((state) => state.Id);
  const hospitalMap = useLevelStore((state) => state.Hospitals);
  const hospitals = Array.from(hospitalMap.values());
  const activeZone = useLevelStore((state) => state.ActiveZone);
  const activeBonus = useLevelStore((state) => state.ActiveBonus);
  const conqueredHospitals = hospitals.filter(
    (h) => zoneMap.get(h.Zone).Conquered
  );
  const hospitalMultiplier = getMultiplier(
    MultiplierType.HospitalEffect,
    usePlayerStore((state) => state.Advancements),
    usePlayerStore((state) => state.Artifacts),
    useLevelStore((state) => state.Techs)
  );
  if (zones == null) return <></>;
  const mostExpensive = zones
    .filter((z) => !z.Conquered)
    .reduce((prev, current) => (prev.Cost > current.Cost ? prev : current));
  if (settingsRef.current == undefined) return <></>;
  return (
    <Section>
      <Section.Body>
        <TransformWrapper>
          <TransformComponent wrapperClass="w-full" contentClass="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${imageWidth} ${imageHeight}`}
              className="w-full border"
              preserveAspectRatio="xMidYMid meet"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              {Settings.RenderMap && (
                <image href={`/data/${levelId}/Image.png`} />
              )}
              {zones.map((zone) => (
                <MapZone
                  key={`Z${zone.Id}`}
                  zone={zone}
                  mostExpensive={mostExpensive.Cost}
                  conqueredHospitals={conqueredHospitals}
                  hospitalMultiplier={hospitalMultiplier}
                  partOfPath={
                    pathRef.current &&
										pathRef.current.Zones.some((z) => z.Id == zone.Id)
                  }
                  activeZone={activeZone}
                  activeBonus={activeBonus}
                />
              ))}
              {bonuses.map((b) => (
                <MapBonus key={`B${b.Id}`} bonus={b} />
              ))}
              {pathRef.current && <MapPath zones={pathRef.current.Zones} />}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </Section.Body>
    </Section>
  );
};
//MapComponent.whyDidYouRender = true;
export default MapComponent;
