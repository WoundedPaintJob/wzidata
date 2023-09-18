import Text from '@components/atoms/text';
import { ZoneState } from '@features/zone/lib/types';
import { formatName } from '@helpers/nameHelper';
import useLevelStore from '@lib/stores/levelStore';
export interface ZoneLinkProps {
  zone: ZoneState;
}
const ZoneLink = (props: ZoneLinkProps) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  return (
    <Text onClick={() => setActiveZone(props.zone)} mode="link" >
      {formatName(props.zone.Name, 16)}
    </Text>
  );
};
export default ZoneLink;
