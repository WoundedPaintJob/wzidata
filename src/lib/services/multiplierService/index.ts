import { AdvancementState } from '@features/advancement/lib/types';
import { MultiplierType, MultiplierGroups } from './types';
import { getAdvancementValue } from '@features/advancement/lib/util';
import { ArtifactState } from '@features/artifact/lib/types';
import { TechState } from '@features/tech/lib/types';

export function getMultiplier(
  type: MultiplierType,
  advancements: AdvancementState[],
  artifacts: ArtifactState[],
  techs: TechState[][]
) {
  const group = MultiplierGroups.get(type);
  if (group == undefined) throw 'No multiplier info' + type.toString();
  if (group.Positive) {
    let multiplier = 1;
    if (group.Artifact) {
      const artifact = artifacts.find((a) => a.Type == group.Artifact);
      if (artifact)
        if (artifact.Owned) multiplier += artifact.Values[artifact.Rarity];
    }
    if (group.Advancement) {
      const advancement = advancements.find((a) => a.Type == group.Advancement);
      if (advancement)
        multiplier += getAdvancementValue(advancement);
    }
    if (group.Tech) {
      const techss = techs.flat().filter((t) => t.Type == group.Tech);
      techss.forEach((t) => {
        if (t.Bought) multiplier += t.Effect;
      });
    }
    return multiplier;
  }
  let multiplier = 1;
  if (group.Artifact) {
    const artifact = artifacts.find((a) => a.Type == group.Artifact);
    if (artifact)
      if (artifact.Owned) multiplier *= 1 - artifact.Values[artifact.Rarity];
  }
  if (group.Advancement) {
    const advancement = advancements.find((a) => a.Type == group.Advancement);
    if (advancement)
      multiplier *= 1 - getAdvancementValue(advancement);
  }
  if (group.Tech) {
    const techss = techs.flat().filter((t) => t.Type == group.Tech);
    techss.forEach((t) => {
      if (t.Bought) multiplier *= 1 - t.Effect;
    });
  }
  return multiplier;
}
