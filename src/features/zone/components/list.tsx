import Section from '@components/atoms/section';
import useLevelStore from '@lib/stores/levelStore';
import Zone from '.';

const ZoneList = () => {
  const zones = useLevelStore((state) => state.Zones);
  const mostExpensive = [...zones]
    .sort((z1, z2) => z2[1].Cost - z1[1].Cost)
    .splice(0, 5);
  if (zones.size == 0) return <div>No Zones</div>;
  return (
    <div>
      <Section>
        <Section.Header>Zones: {zones.size}</Section.Header>
        <Section.Body>
          <Section.CardList>
            {mostExpensive.map((z) => (
              <Zone key={z[1].Id} zone={z[1]} />
            ))}
          </Section.CardList>
        </Section.Body>
      </Section>
    </div>
  );
};
export default ZoneList;
