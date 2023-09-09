import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import Mortar from ".";

const MortarList = () => {
  const mortars = Array.from(useLevelStore((state) => state.Mortars));
  return (
    <Section>
      <Section.Body>
        <Section.CardList>
          {mortars.map((mr) => (
            <Mortar mortar={mr} key={mr.Name} />
          ))}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default MortarList;
