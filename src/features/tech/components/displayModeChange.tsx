import { TechDisplayMode } from '@features/overview/lib/types';
import { RadioGroup } from '@headlessui/react';
import useLevelStore from '@lib/stores/levelStore';
import Text from '@components/atoms/text';

const TechDisplayModeChange = () => {
  const displayMode = useLevelStore((state) => state.TechDisplay);
  const setDisplayMode = useLevelStore((state) => state.SetTechDisplay);
  return (
    <RadioGroup value={displayMode} onChange={(e) => setDisplayMode(e)}>
      <RadioGroup.Label>Tech filter</RadioGroup.Label>
      <RadioGroup.Option value={TechDisplayMode.Market}>
        {({ checked }) => (
          <Text mode={checked ? 'default' : 'inactive'} size="small">
            Market
          </Text>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value={TechDisplayMode.MarketPlusArmy}>
        {({ checked }) => (
          <Text mode={checked ? 'default' : 'inactive'} size="small">
            Market + Army
          </Text>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value={TechDisplayMode.Total}>
        {({ checked }) => (
          <Text mode={checked ? 'default' : 'inactive'} size="small">
            Total
          </Text>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};
export default TechDisplayModeChange;
