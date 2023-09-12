import { BonusState } from "@features/bonus/lib/types";
import { hospitalSaveForZone } from "@features/hospital/lib/helper";
import { HospitalState } from "@features/hospital/lib/types";
import { getZoneColor, shouldDrawImage } from "@features/zone/lib/helper";
import { ZoneState } from "@features/zone/lib/types";
import { formatNumber } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import { RenderOptionType } from "@lib/types/enums";
import { Settings } from "src/settings";

const MapZone = (props: {
  zone: ZoneState;
  mostExpensive: number;
  conqueredHospitals: HospitalState[];
  hospitalMultiplier: number;
  activeZone: ZoneState;
  activeBonus: BonusState;
  partOfPath: boolean;
}) => {
  const renderSettings = useLevelStore((state) => state.RenderOptions);
  const setActive = useLevelStore((state) => state.SetActiveZone);
  const setConquered = useLevelStore((state) => state.ConquerZone);

  let hospitalSaves = 0;
  props.conqueredHospitals.forEach(
    (h) =>
      (hospitalSaves +=
        hospitalSaveForZone(h, props.zone) * props.hospitalMultiplier)
  );
  const assetSize = 40;
  if (!props.zone) return <></>;
  const color = getZoneColor(
    props.zone,
    renderSettings,
    props.activeZone,
    props.activeBonus,
    props.mostExpensive,
    hospitalSaves,
    props.partOfPath
  );
  const drawImage = shouldDrawImage(props.zone.Reward, renderSettings);
  return (
    <g
      key={`Z${props.zone.Id}G`}
      onClick={() => setActive(props.zone)}
      onContextMenu={(e) => {
        e.preventDefault();
        setConquered(props.zone);
      }}
    >
      {props.zone.Svg.Shapes.map((sh, index) => {
        return (
          <polygon
            key={`${props.zone.Id}${index}Pol`}
            id={`${props.zone.Id}${index}`}
            points={sh.Path}
            stroke="#000"
            fill={color}
          />
        );
      })}
      {drawImage && !props.zone.Conquered && (
        <image
          key={`${props.zone.Id}Ass`}
          href={`${Settings.RewardUrl}${props.zone.Reward.Image}`}
          x={props.zone.Center.X - assetSize / 2}
          y={props.zone.Center.Y - assetSize / 2}
          width={assetSize}
          height={assetSize}
        />
      )}
      {renderSettings.get(RenderOptionType.Cost) && (
        <text
          key={`${props.zone.Id}Text`}
          x={props.zone.Center.X - 20}
          y={props.zone.Center.Y}
          paintOrder="stroke"
          stroke="#FFF"
          strokeWidth="1px"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fontWeight={400}
        >
          {formatNumber(props.zone.Cost)}
        </text>
      )}
    </g>
  );
};
export default MapZone;
