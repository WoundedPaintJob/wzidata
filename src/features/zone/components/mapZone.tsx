import { hospitalSaveForZone } from "@features/hospital/lib/helper";
import { HospitalState } from "@features/hospital/lib/types";
import { getZoneColor, shouldDrawImage } from "@features/zone/lib/helper";
import { formatNumber } from "@helpers/numberHelper";
import useZone from "@lib/state/hooks/useZone";
import useLevelStore from "@lib/stores/levelStore";
import { RenderOptionType } from "@lib/types/enums";
import { Settings } from "src/settings";

const MapZone = (props: {
  zoneId: number;
  mostExpensive: number;
  conqueredHospitals: HospitalState[];
  hospitalMultiplier: number;
  partOfPath: boolean;
}) => {
  const zone = useZone(props.zoneId);
  const renderSettings = useLevelStore((state) => state.RenderOptions);
  const setActive = useLevelStore((state) => state.SetActiveZone);
  const setConquered = useLevelStore((state) => state.ConquerZone);

  if (!zone) return <></>;
  let hospitalSaves = 0;
  props.conqueredHospitals.forEach(
    (h) =>
      (hospitalSaves += hospitalSaveForZone(h, zone) * props.hospitalMultiplier)
  );
  const assetSize = 40;
  const color = getZoneColor(
    zone,
    renderSettings,
    props.mostExpensive,
    hospitalSaves,
    props.partOfPath
  );
  const drawImage = shouldDrawImage(zone.Reward, renderSettings, zone.Conquered);
  return (
    <g
      key={`Z${zone.Id}G`}
      id={`Z${zone.Id}G`}
      onClick={() => setActive(zone)}
      onContextMenu={(e) => {
        e.preventDefault();
        setConquered(zone);
      }}
    >
      {zone.Svg.Shapes.map((sh, index) => {
        return (
          <polygon
            key={`${zone.Id}${index}Pol`}
            id={`${zone.Id}${index}`}
            points={sh.Path}
            stroke="#000"
            fill={color}
          />
        );
      })}
      {drawImage && (
        <image
          key={`${zone.Id}Ass`}
          href={`${Settings.RewardUrl}${zone.Reward.Image || ""}`}
          x={zone.Center.X - assetSize / 2}
          y={zone.Center.Y - assetSize / 2}
          width={assetSize}
          height={assetSize}
        />
      )}
      {renderSettings.get(RenderOptionType.Cost) && (
        <text
          key={`${zone.Id}Text`}
          x={zone.Center.X - 20}
          y={zone.Center.Y}
          paintOrder="stroke"
          stroke="#FFF"
          strokeWidth="1px"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fontWeight={400}
        >
          {formatNumber(zone.Cost)}
        </text>
      )}
    </g>
  );
};
export default MapZone;
