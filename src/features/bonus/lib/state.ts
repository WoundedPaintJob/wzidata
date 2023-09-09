import { StateCreator } from 'zustand';
import { BonusSlice, BonusState } from './types';
import { produce } from 'immer';
import { LevelState } from '@lib/stores/levelStore/types';

export const createBonusSlice: StateCreator<
  LevelState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]],
  [],
  BonusSlice
> = (set) => ({
  Bonuses: new Map<number, BonusState>(),
  ConquerBonus: (bonus) =>
    set(
      produce((state: LevelState) => {
        const newVal = !bonus.Conquered;
        state.Bonuses.get(bonus.Id).Conquered = newVal;
        if(state.ActiveBonus && state.ActiveBonus.Id == bonus.Id)
          state.ActiveBonus.Conquered = newVal;
        const affectedBonuses: BonusState[] = [];
        bonus.ZoneIds.forEach((z) => {
          const zone = state.Zones.get(z);
          zone.Conquered = newVal;
          zone.Bonuses.forEach((ib) => {
            if (ib.Id != bonus.Id && !affectedBonuses.includes(ib))
              affectedBonuses.push(ib);
          });
        });
        affectedBonuses.forEach((b) => {
          let allConquered = true;
          b.ZoneIds.forEach((z) => {
            if (!state.Zones.get(z).Conquered) allConquered = false;
          });
          state.Bonuses.get(b.Id).Conquered = allConquered;
        });
      })
    ),
});
