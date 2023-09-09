import Section from '@components/atoms/section';
import BonusHighlight from '@features/bonus/components/highlight';
import MaterialHighlight from '@features/material/components/highlight';
import PathHighlight from '@features/path/components/highlight';
import ZoneHighlight from '@features/zone/components/highlight';
import useLevelStore from '@lib/stores/levelStore';

const Highlights = () => {
  const activeZone = useLevelStore((state) => state.ActiveZone);
  const activeBonus = useLevelStore((state) => state.ActiveBonus);
  const activeMat = useLevelStore((state) => state.ActiveMaterial);
  const activePath = useLevelStore((state) => state.ActivePath);
  return (
    <Section>
      <Section.Header>Highlight</Section.Header>
      <Section.Body>
        {activeZone && <ZoneHighlight zone={activeZone} />}
        {activeBonus && (
          <BonusHighlight bonus={activeBonus} />
        )}
        {activeMat && (
          <MaterialHighlight key={activeMat.Type} material={activeMat} />
        )}
        {activePath && <PathHighlight path={activePath} />}
      </Section.Body>
    </Section>
  );
};
export default Highlights;
