import { Material, MaterialState } from '@features/material/lib/types';
import Text from '@components/atoms/text';
import MaterialDetails from '@features/material/components/details';
import { MarketState } from '@features/market/lib/types';
import { MaterialKind, MaterialType } from '@features/material/lib/enums';
import { RecipeState } from '@features/recipe/lib/types';
import { formatDuration, intervalToDuration } from 'date-fns';
import AssetHeader from '@components/assetHeader';

const TotalTechMarket = (props: {
  market: MarketState;
  materials: Material[];
  techDiscountMultiplier: number;
}) => {
  return (
    <div>
      <AssetHeader asset={props.market} />
      <MaterialDetails
        materials={props.materials}
        roundNumber='default'
        multiplier={1}
      />
    </div>
  );
};

const TotalTechRemaining = (props: {
  materials: Material[];
  markets: Map<number, MarketState>;
  techDiscountMultiplier: number;
  knownMaterials: Map<MaterialType, MaterialState>;
  recipes: Map<MaterialType, RecipeState>;
  cacheMultiplier: number;
}) => {
  const nextMats: Material[] = [];
  let craftTime: Duration;
  const mats = props.materials.map((material) => {
    const knownMat = props.knownMaterials.get(material.Type);
    if (material.Kind !== MaterialKind.Ore) {
      const recipe = props.recipes.get(material.Type);
      craftTime = intervalToDuration({
        start: 0,
        end: 1000 * recipe.Time
      });
      recipe.Requires.forEach((recipeMat) => {
        if (!nextMats.some((im) => im.Type == recipeMat.Type))
          nextMats.push({
            Name: recipeMat.Name,
            Image: recipeMat.Image,
            Type: recipeMat.Type,
            Kind: recipeMat.Kind,
            Amount: 0
          });
        nextMats.find((im) => im.Type == recipeMat.Type).Amount +=
          recipeMat.Amount * material.Amount;
      });
    }
    return (
      <div key={material.Type} className="mt-2">
        <MaterialDetails
          materials={[material]}
          roundNumber="default"
          multiplier={1}
        />
        {material.Kind !== MaterialKind.Ore && (
          <Text size="xsmall">Time: {formatDuration(craftTime)}</Text>
        )}
        <Text size="xsmall">
					On map: {knownMat.TotalOnMap * props.cacheMultiplier}
        </Text>
      </div>
    );
  });
  return (
    <>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2">{mats}</div>
      {nextMats.length > 0 && (
        <TotalTechCosts
          materials={nextMats}
          techDiscountMultiplier={props.techDiscountMultiplier}
          knownMaterials={props.knownMaterials}
          recipes={props.recipes}
          markets={props.markets}
          cacheMultiplier={props.cacheMultiplier}
        />
      )}
    </>
  );
};

const TotalTechCosts = (props: {
  materials: Material[];
  markets: Map<number, MarketState>;
  techDiscountMultiplier: number;
  knownMaterials: Map<MaterialType, MaterialState>;
  recipes: Map<MaterialType, RecipeState>;
  cacheMultiplier: number;
}) => {
  let mats = props.materials;
  const groupedMats = [];
  props.markets.forEach((market) => {
    const marketMats = [];
    market.Materials.forEach((material) => {
      const mat = mats.find((m) => m.Type == material.Type);
      if (mat !== undefined) {
        marketMats.push(mat);
        mats = mats.filter((m) => m.Type != mat.Type);
      }
    });
    if (marketMats.length > 0) {
      groupedMats.push(
        <TotalTechMarket
          market={market}
          materials={marketMats}
          techDiscountMultiplier={props.techDiscountMultiplier}
          key={market.Index}
        />
      );
    }
  });
  return (
    <>
      {groupedMats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3">{groupedMats}</div>
      )}
      {mats.length > 0 && (
        <div className="mt-2">
          <Text size="body" key="craft">
            Remaining
          </Text>
          <TotalTechRemaining
            materials={mats}
            key="mats"
            techDiscountMultiplier={props.techDiscountMultiplier}
            knownMaterials={props.knownMaterials}
            recipes={props.recipes}
            markets={props.markets}
            cacheMultiplier={props.cacheMultiplier}
          />
        </div>
      )}
    </>
  );
};

export default TotalTechCosts;
