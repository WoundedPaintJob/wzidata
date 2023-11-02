import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import Tech from ".";
import TotalTechCosts from "./totalTechCost";
import { MultiplierType } from "@lib/services/multiplierService/types";
import Text from "@components/atoms/text";
import { getBuyableTechs, getTotalTechCost, isTechInteresting } from "../lib/helper";
import TechDisplayModeChange from "./displayModeChange";
import useMultiplier from "@lib/state/hooks/useMultiplier";
import { twMerge } from "tailwind-merge";
import { TechDisplayMode } from "@features/overview/lib/types";
import useMarkets from "@lib/state/hooks/assets/useMarkets";
import Button from "@components/atoms/button";
const TechList = () => {
  const techs = useLevelStore((state) => state.Techs);
  const techDiscountMultiplier = useMultiplier(MultiplierType.TechDiscount);
  const buyMultipleTechs = useLevelStore((state) => state.BuyMultipleTechs);
  const cacheMultiplier =
    useMultiplier(MultiplierType.Cache) +
    useMultiplier(MultiplierType.CacheResources) -
    1;
  const crafterDiscountMultiplier = useMultiplier(
    MultiplierType.CrafterDiscount
  );
  const crafterSpeedMultiplier = useMultiplier(MultiplierType.CrafterSpeed);
  const smelterDiscountMultiplier = useMultiplier(
    MultiplierType.SmelterDiscount
  );
  const smelterSpeedMultiplier = useMultiplier(MultiplierType.SmelterSpeed);
  const techDisplayMode = useLevelStore((state) => state.TechDisplay);
  const markets = useMarkets(false);
  const conqueredMarkets = useMarkets(true);
  const knownMaterials = useLevelStore().Materials;
  const recipes = useLevelStore().Recipes;
  if (techs.length == 0) return <div>No Techs</div>;
  const rows = [];
  const smallRows = [];
  const materials = getTotalTechCost(techs, techDisplayMode, techDiscountMultiplier);
  function buyAvailable(): void {
    const buyable = getBuyableTechs(techs, techDisplayMode, conqueredMarkets);
    buyMultipleTechs(buyable);
  }
  for (let r = 0; r < 12; r++) {
    const row = [];
    const smallRow = [];
    for (let c = 0; c < 10; c++) {
      let addedTech = false;
      if (techs[r] !== undefined && techs[r][c] !== undefined) {
        const tech = techs[r][c];
        if (isTechInteresting(tech, techDisplayMode)) {
          addedTech = true;
          smallRow.push(
            <Tech
              key={`${r}-${c}`}
              tech={techs[r][c]}
              costMultiplier={techDiscountMultiplier}
              highlight={isTechInteresting(tech, techDisplayMode)}
            />
          );
        }
        row.push(
          <Tech
            key={`${r}-${c}`}
            tech={techs[r][c]}
            costMultiplier={techDiscountMultiplier}
            highlight={isTechInteresting(tech, techDisplayMode)}
          />
        );
      } else row.push(<div key={`${r}-${c}`} className="collapse"></div>);
      if (!addedTech) {
        if (techDisplayMode == TechDisplayMode.Market) {
          if ([0, 4, 5, 6, 7].includes(c))
            smallRow.push(<div key={`${r}-${c}`} className="collapse"></div>);
        } else if (techDisplayMode == TechDisplayMode.MarketPlusArmy) {
          if ([0, 1, 4, 5, 6, 7].includes(c))
            smallRow.push(<div key={`${r}-${c}`} className="collapse"></div>);
        } else if (techDisplayMode == TechDisplayMode.Total) {
          smallRow.push(<div key={`${r}-${c}`} className="collapse"></div>);
        }
      }
    }
    rows.push(row);
    smallRows.push(smallRow);
  }
  return (
    <Section>
      <Section.Body>
        <div className="grid grid-cols-1 xl:grid-cols-7 space-x-2">
          <div className="hidden col-span-5 w-fill space-y-1 sm:grid">
            {rows.map((r, index) => (
              <div
                key={index}
                className={twMerge("grid space-x-1 grid-cols-10")}
              >
                {r}
              </div>
            ))}
          </div>
          <div className="col-span-5 w-fill space-y-1 grid sm:hidden">
            {smallRows.map((r, index) => (
              <div
                key={index}
                className={twMerge(
                  "grid space-x-1",
                  techDisplayMode == TechDisplayMode.Market && "grid-cols-5",
                  techDisplayMode == TechDisplayMode.MarketPlusArmy &&
                    "grid-cols-6",
                  techDisplayMode == TechDisplayMode.Total && "grid-cols-10"
                )}
              >
                {r}
              </div>
            ))}
          </div>
          <div className="pl-2 col-span-2">
            <div className="flex flex-row items-start space-x-2">
              <Button onClick={() => buyAvailable()}>Buy Available</Button>
              <TechDisplayModeChange />
            </div>
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
