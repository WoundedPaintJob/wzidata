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
import Manual from "@features/manual/components";
import { TransformWrapper } from "react-zoom-pan-pinch";
import MiniView from "@features/map/components/mini";
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
          IsHardened: level.IsHardened,
          Reward: level.Reward,
        });
        const freeTechAdvancement = advancements.find(
          (a) => a.Type == AdvancementType.StartWithTech
        );
        let freeTechs = 0;
        if (freeTechAdvancement)
          freeTechs = getAdvancementValue(freeTechAdvancement);
        load(data, freeTechs);
      }
    };
    void getData();
  }, []);
  if (zoneLength == 0) return <>Loading</>;
  return (
    <div className="xl:container mx-auto lg:px-4">
      <div>
        <Notifications />
        <Section>
          <Section.Header>
            <div>
              {name}
              <div className="sm:float-right">
                <LevelSelector />
              </div>
            </div>
            <div className="mt-2 sm:mt-0">
              <Timer />
            </div>
          </Section.Header>
        </Section>
        <TabList />

        <TransformWrapper>
          {!wideMap && (
            <div className="grid grid-cols-1 lg:grid-cols-8">
              <div className="col-span-1 lg:col-span-2">
                <Highlights />
                <MiniView />
                <div className="hidden lg:block">
                  <MapFilter />
                </div>
              </div>
              <div className="col-span-1 lg:col-span-6">
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
                <MiniView />
                <MapFilter />
                <Highlights />
              </div>
            </>
          )}
        </TransformWrapper>
        <div className="lg:hidden">
          <MiniView />
          <MapFilter />
        </div>
        <Manual />
      </div>
    </div>
  );
};
export default Home;
