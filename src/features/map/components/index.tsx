import Section from "@components/atoms/section";
import MapBonus from "@features/bonus/components/mapBonus";
import MapPath from "@features/path/components/mapPath";
import useLevelStore from "@lib/stores/levelStore";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import MapZone from "../../zone/components/mapZone";
import { Settings } from "src/settings";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import usePlayerStore from "@lib/stores/playerStore";
import { isAssetConquered } from "@helpers/assetHelper";
import { useEffect, useRef } from "react";

const MapComponent = () => {
  const settings = useLevelStore((state) => state.RenderOptions);
  const activePath = useLevelStore((state) => state.ActivePath);
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

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  useEffect(() => {
    if (transformComponentRef.current && activePath) {
      const { zoomToElement, instance } = transformComponentRef.current;
      zoomToElement("path", instance.transformState.scale);
    }
  }, [activePath]);
  const conqueredHospitals = hospitals.filter((h) =>
    isAssetConquered(h, zoneMap, bonusMap)
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
  if (settings == undefined) return <></>;
  return (
    <Section>
      <Section.Body>
        <TransformWrapper ref={transformComponentRef}>
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
                <image href={`./data/${levelId}/Image.png`} />
              )}
              {zones.map((zone) => (
                <MapZone
                  key={`Z${zone.Id}`}
                  zone={zone}
                  mostExpensive={mostExpensive.Cost}
                  conqueredHospitals={conqueredHospitals}
                  hospitalMultiplier={hospitalMultiplier}
                  partOfPath={
                    (activePath &&
                      activePath.Zones.some((z) => z.Id == zone.Id)) ||
                    false
                  }
                  activeZone={activeZone}
                  activeBonus={activeBonus}
                />
              ))}
              {bonuses.map((b) => (
                <MapBonus key={`B${b.Id}`} bonus={b} />
              ))}
              {activePath && <MapPath zones={activePath.Zones} />}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </Section.Body>
    </Section>
  );
};
//MapComponent.whyDidYouRender = true;
export default MapComponent;
