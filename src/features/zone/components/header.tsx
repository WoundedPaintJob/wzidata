import CheckBox from '@components/atoms/checkbox';
import useLevelStore from '@lib/stores/levelStore';
import ZoneLink from './link';

const ZoneHeader = (props: { zoneId: number }) => {
  const zone = useLevelStore((state) => state.Zones.get(props.zoneId));
  const toggleConquered = useLevelStore((state) => state.ConquerZone);
  if (zone == undefined) return <></>;
  return (
    <>
      <ZoneLink zone={zone} />
      <CheckBox
        checked={zone.Conquered || false}
        onClick={() => toggleConquered(zone)}
      />
    </>
  );
};
export default ZoneHeader;
