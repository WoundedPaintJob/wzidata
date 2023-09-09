import { LevelProps } from '@lib/stores/levelStore/types';
import { RenderOptionType } from '@lib/types/enums';

export interface PersistProps {
  RenderOptions: Map<RenderOptionType, boolean>;
  ConqueredZones: number[];
  OwnedTechs: number[];
  HospitalLevels: number[];
  ArmyCampLevels: number[];
  MineLevels: number[];
  SuperCampLevel: number;
  StoredRenderOptions: number[];
}
export interface PersistSlice extends PersistProps {
  SetLevel: (data: LevelProps, freeTechs:number) => void;
  LoadLevel: (data: LevelProps, freeTechs:number) => void;
  UpdateRenderOption: (type: RenderOptionType) => void;
}
