import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import DigSite from ".";

const DigSiteList = () => {
  const digSites = useLevelStore((state) => state.DigSites);
  if (digSites.length == 0)
    return (
      <Section>
        <Section.Body>No digs</Section.Body>
      </Section>
    );
  const digs = digSites.slice().sort((a, b) => a.Cost - b.Cost);
  return (
    <Section>
      <Section.Body>
        <Section.CardList>
          {digs.map((dig, k) => {
            return <DigSite key={k} digSite={dig} />;
          })}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default DigSiteList;
