import Button from "@components/atoms/button";
import AdvancementPhase from "./advancementPhase";
import usePlayerStore from "@lib/stores/playerStore";
import Section from "@components/atoms/section";
const AdvancementList = () => {
  const resetAdvancements = usePlayerStore((state) => state.ResetAdvancements);
  return (
    <>
      <AdvancementPhase phase={1} />
      <AdvancementPhase phase={2} />
      <AdvancementPhase phase={3} />
      <AdvancementPhase phase={4} />
      <Section>
        <Button onClick={() => resetAdvancements()}>Reset Advancements</Button>
      </Section>
    </>
  );
};
export default AdvancementList;
