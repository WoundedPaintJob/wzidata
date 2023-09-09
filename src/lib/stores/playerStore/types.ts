import { AdvancementState } from '@features/advancement/lib/types';
import { ArtifactRarity } from '@features/artifact/lib/enums';
import { ArtifactState } from '@features/artifact/lib/types';
import { LevelInfo } from '@features/level/lib/types';

export interface PlayerState {
  Levels: LevelInfo[];
  Level: LevelInfo;
  Advancements: AdvancementState[];
  AdvancementLevels: number[];
  Artifacts: ArtifactState[];
  ArtifactsOwned: boolean[];
  ArtifactRarity: ArtifactRarity[];
  WideMap: boolean;
  ChangeLevel: (to: number, freeTechs:number) => Promise<void>;
  LevelUpAdvancement: (advancement: AdvancementState) => void;
  LevelDownAdvancement: (advancement: AdvancementState) => void;
  SetArtifactRarity: (artifact: ArtifactState, rarity: ArtifactRarity) => void;
  ToggleArtifactOwned: (artifact: ArtifactState) => void;
  ResetAdvancements: () => void;
  ToggleWideMap: () => void;
}
