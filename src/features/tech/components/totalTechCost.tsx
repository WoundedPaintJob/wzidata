import { Material, MaterialState } from "@features/material/lib/types";
import Text from "@components/atoms/text";
import MaterialDetails from "@features/material/components/details";
import { MarketState } from "@features/market/lib/types";
import { MaterialKind, MaterialType } from "@features/material/lib/enums";
import { RecipeState } from "@features/recipe/lib/types";
import { formatDuration, intervalToDuration } from "date-fns";
import Section from "@components/atoms/section";
import TotalTechMarket from "./totalTechMarket";



const TotalTechRemaining = (props: {
  materials: Material[];
  markets: Map<number, MarketState>;
  techDiscountMultiplier: number;
  crafterDiscountMultiplier: number;
  crafterSpeedMultiplier: number;
  smelterDiscountMultiplier: number;
  smelterSpeedMultiplier: number;
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
      if (recipe) {
        craftTime = intervalToDuration({
          start: 0,
          end:
            1000 *
            recipe.Time *
            (material.Kind == MaterialKind.Alloy
              ? props.smelterSpeedMultiplier
              : props.crafterSpeedMultiplier),
        });
        recipe.Requires.forEach((recipeMat) => {
          if (!nextMats.some((im) => im.Type == recipeMat.Type))
            nextMats.push({
              Name: recipeMat.Name,
              Image: recipeMat.Image,
              Type: recipeMat.Type,
              Kind: recipeMat.Kind,
              Amount: 0,
              Cost: recipeMat.Cost,
              Multiplier: 1,
            });
          const newMat = nextMats.find((im) => im.Type == recipeMat.Type);
          if (newMat)
            newMat.Amount += Math.ceil(
              recipeMat.Amount *
                material.Amount *
                (material.Kind == MaterialKind.Alloy
                  ? props.smelterDiscountMultiplier
                  : props.crafterDiscountMultiplier)
            );
        });
      }
    }
    if (!knownMat) return <></>;
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
      <div className="mb-4 grid grid-cols-4">{mats}</div>
      {nextMats.length > 0 && (
        <TotalTechCosts
          materials={nextMats}
          techDiscountMultiplier={props.techDiscountMultiplier}
          crafterDiscountMultiplier={props.crafterDiscountMultiplier}
          crafterSpeedMultiplier={props.crafterSpeedMultiplier}
          smelterDiscountMultiplier={props.smelterDiscountMultiplier}
          smelterSpeedMultiplier={props.smelterSpeedMultiplier}
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
  crafterDiscountMultiplier: number;
  crafterSpeedMultiplier: number;
  smelterDiscountMultiplier: number;
  smelterSpeedMultiplier: number;
  knownMaterials: Map<MaterialType, MaterialState>;
  recipes: Map<MaterialType, RecipeState>;
  cacheMultiplier: number;
}) => {
  const markets = Array.from(props.markets.values()).sort(
    (a, b) => a.Index - b.Index
  );
  let mats = props.materials;
  const groupedMats: React.ReactElement[] = [];
  markets.forEach((market) => {
    const marketMats: Material[] = [];
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
        <Section.CardList>{groupedMats}</Section.CardList>
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
            crafterDiscountMultiplier={props.crafterDiscountMultiplier}
            crafterSpeedMultiplier={props.crafterSpeedMultiplier}
            smelterDiscountMultiplier={props.smelterDiscountMultiplier}
            smelterSpeedMultiplier={props.smelterSpeedMultiplier}
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
