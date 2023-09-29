import Section from "@components/atoms/section";
import MapBonus from "@features/bonus/components/mapBonus";
import MapPath from "@features/path/components/mapPath";
import useLevelStore from "@lib/stores/levelStore";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import MapZone from "../../zone/components/mapZone";
import { Settings } from "src/settings";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { useEffect, useRef } from "react";
import useMultiplier from "@lib/state/hooks/useMultiplier";
import useZoneMap from "@lib/state/hooks/useZoneMap";
import useHospitals from "@lib/state/hooks/useHospitals";
import useBonusMap from "@lib/state/hooks/useBonusMap";
import useMostExpensive from "@lib/state/hooks/useMostExpensive";
const MapComponent = () => {
  const settings = useLevelStore((state) => state.RenderOptions);
  const activePath = useLevelStore((state) => state.ActivePath);
  const zoneMap = useZoneMap(false);
  const zones = Array.from(zoneMap.values());
  const bonusMap = useBonusMap(false);
  const bonuses = Array.from(bonusMap.values());
  const imageWidth = useLevelStore((state) => state.ImageWidth);
  const imageHeight = useLevelStore((state) => state.ImageHeight);
  const levelId = useLevelStore((state) => state.Id);

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  useEffect(() => {
    if (transformComponentRef.current && activePath) {
      const { zoomToElement, instance } = transformComponentRef.current;
      zoomToElement("path", instance.transformState.scale);
    }
  }, [activePath]);
  const conqueredHospitals = useHospitals(true);
  const hospitalMultiplier = useMultiplier(MultiplierType.HospitalEffect);
  const mostExpensive = useMostExpensive();
  if (zoneMap == null) return <></>;

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
                  zoneId={zone.Id}
                  mostExpensive={mostExpensive ? mostExpensive.Cost : 0}
                  conqueredHospitals={conqueredHospitals}
                  hospitalMultiplier={hospitalMultiplier}
                  partOfPath={
                    (activePath &&
                      activePath.Zones.some((z) => z.Id == zone.Id)) ||
                    false
                  }
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
