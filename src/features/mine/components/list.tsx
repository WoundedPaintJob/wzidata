import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import Mine from ".";
import { getMultiplier } from "@lib/services/multiplierService";
import usePlayerStore from "@lib/stores/playerStore";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useMines from "@lib/state/hooks/assets/useMines";
import { ConquerState } from "@lib/state/hooks/assets/enums";

const MineList = () => {
  const mines = useMines(ConquerState.All);
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const productionMultiplier = getMultiplier(
    MultiplierType.MineProduction,
    advancements,
    artifacts,
    techs
  );
  const costMultiplier = getMultiplier(
    MultiplierType.MineProduction,
    advancements,
    artifacts,
    techs
  );
  if (mines.length == 0)
    return (
      <Section>
        <Section.Body>No mines</Section.Body>
      </Section>
    );
  return (
    <Section>
      <Section.Body>
        <Section.CardList>
          {mines.map((mc) => {
            return (
              <Mine
                key={mc.Index}
                mine={mc}
                productionMultiplier={productionMultiplier}
                costMultiplier={costMultiplier}
              />
            );
          })}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default MineList;
