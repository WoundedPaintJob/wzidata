import Section from '@components/atoms/section';
import { formatNumber } from '@helpers/numberHelper';
import usePlayerStore from '@lib/stores/playerStore';
import Advancement from '.';
import { getCostForAdvancement } from '../lib/util';
const AdvancementPhase = (props: { phase: number }) => {
  const advancements = usePlayerStore((state) => state.Advancements);
  let spentSum = 0;
  advancements
    .filter((a) => a.Phase == props.phase)
    .forEach((adv) => {
      spentSum += getCostForAdvancement(adv, adv.Level);
    });
  return (
    <Section>
      <Section.Header>
        Phase {props.phase}. Spent: {formatNumber(spentSum)}. Required:{' '}
        {formatNumber(
          props.phase == 1
            ? 1000
            : props.phase == 2
              ? 8000
              : props.phase == 3
                ? 25000
                : 100000
        )}
      </Section.Header>
      <Section.Body>
        <Section.CardList>
          {advancements
            .filter((a) => a.Phase == props.phase)
            .map((adv) => (
              <Advancement advancement={adv} key={adv.Name} />
            ))}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default AdvancementPhase;
