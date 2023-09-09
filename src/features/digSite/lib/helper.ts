import { DigSiteState } from './types';

export function calculateDigSiteScore(digSite: DigSiteState) {
  let baseProb = 0.0;
  if (digSite.Probabilities.Poor)
    baseProb += digSite.Probabilities.Poor / Math.pow(5, 4);
  if (digSite.Probabilities.Common)
    baseProb += digSite.Probabilities.Common / Math.pow(5, 3);
  if (digSite.Probabilities.Uncommon)
    baseProb += digSite.Probabilities.Uncommon / Math.pow(5, 2);
  if (digSite.Probabilities.Rare) baseProb += digSite.Probabilities.Rare / 5;
  if (digSite.Probabilities.Epic) baseProb += digSite.Probabilities.Epic;
  return (1000 / digSite.Hours) * baseProb;
}
