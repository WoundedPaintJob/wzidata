import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import Tech from ".";
import usePlayerStore from "@lib/stores/playerStore";
import { Material } from "@features/material/lib/types";
import TotalTechCosts from "./totalTechCost";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import Text from "@components/atoms/text";
import { getTechsToDisplay } from "../lib/helper";
import TechDisplayModeChange from "./displayModeChange";
const TechList = () => {
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const techDiscountMultiplier = getMultiplier(
    MultiplierType.TechDiscount,
    advancements,
    artifacts,
    techs
  );
  const cacheMultiplier =
    getMultiplier(MultiplierType.Cache, advancements, artifacts, techs) +
    getMultiplier(
      MultiplierType.CacheResources,
      advancements,
      artifacts,
      techs
    ) -
    1;
  const crafterDiscountMultiplier = getMultiplier(
    MultiplierType.CrafterDiscount,
    advancements,
    artifacts,
    techs
  );
  const crafterSpeedMultiplier = getMultiplier(
    MultiplierType.CrafterSpeed,
    advancements,
    artifacts,
    techs
  );
  const smelterDiscountMultiplier = getMultiplier(
    MultiplierType.SmelterDiscount,
    advancements,
    artifacts,
    techs
  );
  const smelterSpeedMultiplier = getMultiplier(
    MultiplierType.SmelterSpeed,
    advancements,
    artifacts,
    techs
  );
  const techDisplay = useLevelStore((state) => state.TechDisplay);
  const interestingTechs = getTechsToDisplay(techs.flat(), techDisplay);
  const markets = useLevelStore((state) => state.Markets);
  const knownMaterials = useLevelStore().Materials;
  const recipes = useLevelStore().Recipes;
  if (techs.length == 0) return <div>No Techs</div>;
  const rows = [];
  const materials: Material[] = [];
  for (let r = 0; r < 12; r++) {
    const row = [];
    for (let c = 0; c < 10; c++) {
      if (techs[r] !== undefined && techs[r][c] !== undefined) {
        const tech = techs[r][c];
        if (!tech.Bought) {
          if (interestingTechs.includes(tech)) {
            tech.Materials.forEach((m) => {
              if (!materials.some((im) => im.Type == m.Type))
                materials.push({
                  Name: m.Name,
                  Image: m.Image,
                  Type: m.Type,
                  Amount: 0,
                  Cost: m.Cost,
                  Kind: m.Kind,
                  Multiplier: m.Multiplier,
                });
              const newMat = materials.find((im) => im.Type == m.Type);
              if (newMat)
                newMat.Amount += Math.ceil(m.Amount * techDiscountMultiplier);
            });
          }
        }
        row.push(
          <Tech
            key={`${r}-${c}`}
            tech={techs[r][c]}
            costMultiplier={techDiscountMultiplier}
            highlight={interestingTechs.includes(tech)}
          />
        );
      } else row.push(<div key={`${r}-${c}`} className="table-cell collapse sm:visible"></div>);
    }
    rows.push(row);
  }
  return (
    <Section>
      <Section.Body>
        <div className="grid grid-cols-1 xl:grid-cols-7 space-x-2">
          <div className="col-span-5 table-auto border-spacing-0 sm:border-spacing-1">
            {rows.map((r, index) => (
              <div key={index} className="table-row">
                {r}
              </div>
            ))}
          </div>
          <div className="pl-2 col-span-2">
            <TechDisplayModeChange />
            <Text size="body">Required</Text>
            <TotalTechCosts
              materials={materials}
              techDiscountMultiplier={techDiscountMultiplier}
              crafterDiscountMultiplier={crafterDiscountMultiplier}
              crafterSpeedMultiplier={crafterSpeedMultiplier}
              smelterDiscountMultiplier={smelterDiscountMultiplier}
              smelterSpeedMultiplier={smelterSpeedMultiplier}
              knownMaterials={knownMaterials}
              recipes={recipes}
              markets={markets}
              cacheMultiplier={cacheMultiplier}
            />
          </div>
        </div>
      </Section.Body>
    </Section>
  );
};
export default TechList;
