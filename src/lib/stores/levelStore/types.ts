import { BonusProps, BonusSlice } from '@features/bonus/lib/types';
import { OverviewProps, OverviewSlice } from '@features/overview/lib/types';
import { ZoneProps, ZoneSlice } from '@features/zone/lib/types';
import { AssetLevelSlice, AssetProps } from '@lib/state/assetLevelSlice/types';
import { PersistProps, PersistSlice } from '@lib/state/persistSlice/types';

export type LevelProps = OverviewProps &
  ZoneProps &
  BonusProps &
  AssetProps &
  PersistProps;

export type LevelState = OverviewSlice &
  ZoneSlice &
  BonusSlice &
  AssetLevelSlice &
  PersistSlice;
