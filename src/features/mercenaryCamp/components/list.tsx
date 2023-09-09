import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import MercenaryCamp from ".";

const MercenaryList = () => {
  const mercCamps = Array.from(useLevelStore((state) => state.MercenaryCamps));
  if (mercCamps.length == 0)
    return (
      <Section>
        <Section.Body>No mercs</Section.Body>
      </Section>
    );
  return (
    <Section>
      <Section.Body>
        <Section.CardList>
          {mercCamps.map((mc) => {
            return <MercenaryCamp key={mc[0]} mercCamp={mc[1]} />;
          })}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default MercenaryList;
