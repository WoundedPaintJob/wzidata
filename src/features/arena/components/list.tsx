import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import Arena from ".";

const ArenaList = () => {
  const arenas = Array.from(useLevelStore((state) => state.Arenas));
  return (
    <Section>
      <Section.Body>
        <Section.CardList>
          {arenas.map((ar) => (
            <Arena arena={ar} key={ar.Template.Id} />
          ))}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default ArenaList;