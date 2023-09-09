import Text from '@components/atoms/text';
import useLevelStore from '@lib/stores/levelStore';
import { Material } from '../lib/types';

const MaterialLink = (props: { material: Material }) => {
  const setActiveMat = useLevelStore((state) => state.SetActiveMaterial);
  return (
    <Text onClick={() => setActiveMat(props.material.Type)} mode="link">
      {props.material.Name}
    </Text>
  );
};

export default MaterialLink;
