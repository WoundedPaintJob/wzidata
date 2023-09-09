import { AdvancementType } from '@features/advancement/lib/enums';
import { getAdvancementValue } from '@features/advancement/lib/util';
import usePlayerStore from '@lib/stores/playerStore';

const LevelSelector = () => {
  const changeLevel = usePlayerStore((state) => state.ChangeLevel);
  const advancements = usePlayerStore((state) => state.Advancements);
  const levels = usePlayerStore((state) => state.Levels);
  const level = usePlayerStore((state) => state.Level);
  const freeTechAdvancement = advancements.find(
    (a) => a.Type == AdvancementType.StartWithTech
  );
  const freeTechs = getAdvancementValue(freeTechAdvancement);
  return (
    <div>
      <select
        id="selectedLevel"
        name="selectedLevel"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={level.Id}
        onChange={(e) => {
          void changeLevel(parseInt(e.target.value), freeTechs);
        }}
      >
        {levels.filter((l) => l.HaveData).map((l) => (
          <option key={l.Id} value={l.Id}>
            {l.Name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LevelSelector;
