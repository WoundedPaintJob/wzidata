import Text from '@components/atoms/text';
import { BonusState } from '@features/bonus/lib/types';
import { formatName } from '@helpers/nameHelper';

import useLevelStore from '@lib/stores/levelStore';

export interface BonusLinkProps {
  bonus: BonusState;
  className?: string;
}
const BonusLink = (props: BonusLinkProps) => {
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);
  return (
    <Text onClick={() => setActiveBonus(props.bonus)} mode="link">
      {formatName(props.bonus.Name, 20)} (B)
    </Text>
  );
};
export default BonusLink;
