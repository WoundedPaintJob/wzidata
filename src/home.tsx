import Section from "@components/atoms/section";
import Highlights from "@components/highlight";
import LevelSelector from "@components/levelSelector";
import TabList from "@components/tabList";
import Timer from "@components/timer";
import MapComponent from "@features/map/components";
import MapFilter from "@features/map/components/filter";
import { loadLevel } from "@lib/services/levelService";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { enableMapSet } from "immer";
import { useEffect } from "react";
import { Notifications } from "react-push-notification";
import { AdvancementType } from "@features/advancement/lib/enums";
import { getAdvancementValue } from "@features/advancement/lib/util";
const Home = () => {
  enableMapSet();
  const name = useLevelStore((state) => state.Name);
  const zoneLength = useLevelStore((state) => state.Zones.size);
  const levelId = usePlayerStore((state) => state.Level.Id);
  const load = useLevelStore((state) => state.LoadLevel);
  const advancements = usePlayerStore((state) => state.Advancements);
  const changeLevel = usePlayerStore((state) => state.ChangeLevel);
  const level = usePlayerStore((state) => state.Level);
  const wideMap = usePlayerStore((state) => state.WideMap);
  useEffect(() => {
    const getData = async () => {

      if (levelId == -1) void changeLevel(2, 0);
      else {
        const data = await loadLevel({
          Id: level.Id,
          ImageHeight: level.ImageHeight,
          ImageWidth: level.ImageWidth,
          Name: level.Name,
          HaveData: true,
        });
        const freeTechAdvancement = advancements.find(
          (a) => a.Type == AdvancementType.StartWithTech
        );
        const freeTechs = getAdvancementValue(freeTechAdvancement);
        load(data, freeTechs);
      }
    };
    void getData();
  }, []);
  if (zoneLength == 0) return <>Loading</>;
  return (
    <div className="container mx-auto sm:px-4 lg:px-6">
      <div>
        <Notifications />
        <Section>
          <Section.Header>
            {name}
            <div className="float-right">
              <LevelSelector />
            </div>
            <Timer />
          </Section.Header>
        </Section>
        <TabList />
        {!wideMap && (
          <div className="grid grid-cols-1 md:grid-cols-8">
            <div className="md:col-span-2">
              <MapFilter />
              <Highlights />
            </div>
            <div className="md:col-span-6">
              <MapComponent />
            </div>
          </div>
        )}
        {wideMap && (
          <>
            <div>
              <MapComponent />
            </div>
            <div className="grid grid-cols-2">
              <MapFilter />
              <Highlights />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
