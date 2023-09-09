import Text from '@components/atoms/text';
import { ZoneState } from '@features/zone/lib/types';
import useLevelStore from '@lib/stores/levelStore';
export interface ZoneLinkProps {
  zone: ZoneState;
}
const ZoneLink = (props: ZoneLinkProps) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  return (
    <Text onClick={() => setActiveZone(props.zone)} mode="link">
      {props.zone.Name}
    </Text>
  );
};
export default ZoneLink;
