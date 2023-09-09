import usePlayerStore from "@lib/stores/playerStore";
import Level from ".";
import Section from "@components/atoms/section";

const LevelList = () => {
  const levels = usePlayerStore((state) => state.Levels);
  return (
    <Section>
      <Section.Body>
        <Section.CardList>
          {levels.map((l) => (
            <Level key={l.Id} level={l} />
          ))}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default LevelList;
