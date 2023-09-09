import Section from "@components/atoms/section";
import useLevelStore from "@lib/stores/levelStore";
import Market from ".";
const MarketList = () => {
  const markets = Array.from(useLevelStore((state) => state.Markets).values());
  if (markets.length == 0)
    return (
      <Section>
        <Section.Body>No markets</Section.Body>
      </Section>
    );
  return (
    <Section>
      <Section.Body>
        <Section.CardList>
          {markets
            .sort((a, b) => a.Index - b.Index)
            .map((market) => {
              return <Market key={market.Index} market={market} />;
            })}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default MarketList;
