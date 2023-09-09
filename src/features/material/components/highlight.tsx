import Card from '@components/atoms/card';
import StatRow from '@components/atoms/statrow';
import { BonusState } from '@features/bonus/lib/types';
import RecipeDetails from '@features/recipe/components/details';
import { ZoneState } from '@features/zone/lib/types';
import { formatNumber } from '@helpers/numberHelper';
import useLevelStore from '@lib/stores/levelStore';
import { MaterialState } from '../lib/types';

const CacheZones = (props: { zones: Map<ZoneState, number> }) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const cacheZones = Array.from(props.zones.keys());
  return (
    <div>
      Cache Zones
      {cacheZones.map((z) => (
        <StatRow
          key={z.Id}
          name={z.Name}
          value={formatNumber(props.zones.get(z))}
          onClick={() => setActiveZone(z)}
        />
      ))}
    </div>
  );
};
const MineZones = (props: { zones: Map<ZoneState, number> }) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const mineZones = Array.from(props.zones.keys());
  return (
    <div>
      Mine Zones
      {mineZones.map((z) => (
        <StatRow
          key={z.Id}
          name={z.Name}
          value={formatNumber(props.zones.get(z))}
          onClick={() => setActiveZone(z)}
        />
      ))}
    </div>
  );
};
const CacheBonuses = (props: { bonuses: Map<BonusState, number> }) => {
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);
  const cacheBonuses = Array.from(props.bonuses.keys());
  return (
    <div>
      Cache Bonuses
      {cacheBonuses.map((b) => (
        <StatRow
          key={b.Id}
          name={b.Name}
          value={formatNumber(props.bonuses.get(b))}
          onClick={() => setActiveBonus(b)}
        />
      ))}
    </div>
  );
};
const MineBonuses = (props: { bonuses: Map<BonusState, number> }) => {
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);
  const mineBonuses = Array.from(props.bonuses.keys());
  return (
    <div>
      Mine Bonuses
      {mineBonuses.map((b) => (
        <StatRow
          key={b.Id}
          name={b.Name}
          value={formatNumber(props.bonuses.get(b))}
          onClick={() => setActiveBonus(b)}
        />
      ))}
    </div>
  );
};
const MaterialHighlight = (props: { material: MaterialState }) => {
  const material = useLevelStore((state) =>
    state.Materials.get(props.material.Type)
  );
  if (!material) return <>No Mat</>;
  return (
    <Card>
      <Card.Header>
        {material.Name}{' '}
        <StatRow name="Price" value={formatNumber(material.Cost)} />
      </Card.Header>
      <Card.Body>
        {material.CacheZones.size > 0 && (
          <CacheZones zones={material.CacheZones} />
        )}
        {material.CacheBonuses.size > 0 && (
          <CacheBonuses bonuses={material.CacheBonuses} />
        )}
        {material.MineZones.size > 0 && (
          <MineZones zones={material.MineZones} />
        )}
        {material.MineBonuses.size > 0 && (
          <MineBonuses bonuses={material.MineBonuses} />
        )}
        Recipes
        {material.Recipe && <RecipeDetails recipe={material.Recipe} />}
        {material.Produces.map((recipe) => {
          return <RecipeDetails key={recipe.Produces.Type} recipe={recipe} />;
        })}
      </Card.Body>
    </Card>
  );
};
export default MaterialHighlight;
