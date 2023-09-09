import { ZoneState } from '@features/zone/lib/types';

export type PathZone = {
  Zone: ZoneState;
  Heuristics: number;
  Parent: PathZone;
};
