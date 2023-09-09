import { z } from "zod";

export enum LevelRewardType {
  OreProduction = 'OreProduction',
  Superpowers = 'Superpowers',
  SeeingCircles = 'SeeingCircles',
  CouchPotato = 'CouchPotato',
  TheLegend = 'TheLegend',
  RockCandy = 'RockCandy',
  SuperArmies = 'SuperArmies',
  FourthBoy = 'FourthBoy',
  Gladiator = 'Gladiator',
  Molification = 'Molification',
  Protection = 'Protection',
  Updater = 'Updater'
}
export const levelRewardTypeSchema = z.nativeEnum(LevelRewardType);