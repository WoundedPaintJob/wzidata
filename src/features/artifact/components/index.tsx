import Card from '@components/atoms/card';
import CheckBox from '@components/atoms/checkbox';
import Text from '@components/atoms/text';
import { formatNumber, formatPercentage } from '@helpers/numberHelper';
import usePlayerStore from '@lib/stores/playerStore';
import { ArtifactRarity } from '../lib/enums';
import { ArtifactState } from '../lib/types';
import { Settings } from 'src/settings';
const Artifact = (props: { artifact: ArtifactState }) => {
  const changeRarity = usePlayerStore((state) => state.SetArtifactRarity);
  const toggleOwned = usePlayerStore((state) => state.ToggleArtifactOwned);
  return (
    <Card>
      <Card.Body>
        <div className="h-16 w-16">
          <img
            src={`${Settings.ResourceUrl}${props.artifact.Image}`}
            alt={props.artifact.Name}
            title={props.artifact.Name}
          />
        </div>
        <div className="flex">
          <Text size="xsmall">{props.artifact.Name}</Text>
          <CheckBox
            checked={props.artifact.Owned}
            onClick={() => toggleOwned(props.artifact)}
          />
        </div>
        <select
          id={props.artifact.Name}
          name="artifactRarity"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={props.artifact.Rarity}
          onChange={(e) => {
            void changeRarity(
              props.artifact,
              e.target.value as unknown as ArtifactRarity
            );
          }}
        >
          <option key="Poor" value={ArtifactRarity.Poor}>
            Poor
          </option>
          <option key="Common" value={ArtifactRarity.Common}>
            Common
          </option>
          <option key="Uncommon" value={ArtifactRarity.Uncommon}>
            Uncommon
          </option>
          <option key="Rare" value={ArtifactRarity.Rare}>
            Rare
          </option>
          <option key="Epic" value={ArtifactRarity.Epic}>
            Epic
          </option>
          <option key="Legendary" value={ArtifactRarity.Legendary}>
            Legendary
          </option>
          <option key="Insane" value={ArtifactRarity.Insane}>
            Insane
          </option>
        </select>
        <Text size="xsmall">
          {props.artifact.IsPercentage
            ? formatPercentage(props.artifact.Values[props.artifact.Rarity])
            : formatNumber(props.artifact.Values[props.artifact.Rarity])}
        </Text>
      </Card.Body>
    </Card>
  );
};
export default Artifact;
