import Card from '@components/atoms/card';
import CheckBox from '@components/atoms/checkbox';
import MaterialDetails from '@features/material/components/details';
import useLevelStore from '@lib/stores/levelStore';
import { TechState } from '../lib/types';
import { Settings } from 'src/settings';

const Tech = (props: {
  tech: TechState;
  costMultiplier: number;
  highlight: boolean;
}) => {
  const toggle = useLevelStore((state) => state.ToggleTech);
  return (
    <Card size="small" passive={!props.highlight}>
      <Card.Body>
        <div className="flex flex-col lg:flex-row">
          <img
            src={`${Settings.ResourceUrl}${props.tech.Image}`}
            alt={props.tech.Name}
            title={props.tech.Name}
            className="m-1 w-4 sm:w-8 sm:m-2 bg-black"
          />
          <CheckBox
            checked={props.tech.Bought}
            onClick={() => toggle(props.tech)}
          />
        </div>
        <MaterialDetails
          materials={props.tech.Materials}
          multiplier={props.costMultiplier}
          roundNumber={'default'}
        />
      </Card.Body>
    </Card>
  );
};

export default Tech;
