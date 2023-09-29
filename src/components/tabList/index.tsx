import AdvancementList from "@features/advancement/components/list";
import ArenaList from "@features/arena/components/list";
import ArmyCampList from "@features/armyCamp/components/list";
import ArtifactList from "@features/artifact/components/list";
import DigSiteList from "@features/digSite/components/list";
import Evaluator from "@features/evaluator/components";
import Guide from "@features/guide/components";
import HospitalList from "@features/hospital/components/list";
import LevelList from "@features/level/components/list";
import MarketList from "@features/market/components/list";
import MercenaryList from "@features/mercenaryCamp/components/list";
import MineList from "@features/mine/components/list";
import MortarList from "@features/mortar/components/list";
import OverView from "@features/overview/components";
import TechList from "@features/tech/components/list";
import { Tab } from "@headlessui/react";
import useLevelStore from "@lib/stores/levelStore";
import { PropsWithChildren, useEffect, useRef } from "react";

const TabHeader = (props: PropsWithChildren) => {
  return (
    <Tab className="rounded-md px-3 py-2 text-sm font-medium ui-selected:bg-background text-main">
      {props.children}
    </Tab>
  );
};
const TabList = () => {
  const tabRef = useRef(useLevelStore((state) => state.ActiveTab));
  useEffect(
    () =>
      useLevelStore.subscribe(
        (state) => state.ActiveTab,
        (newVal) => (tabRef.current = newVal)
      ),
    []
  );
  const setActiveTab = useLevelStore((state) => state.SetActiveTab);
  return (
    <Tab.Group
      manual
      selectedIndex={tabRef.current}
      onChange={(e) => setActiveTab(e)}
    >
      <Tab.List className="block w-full rounded-md border-gray-300 pl-2 pr-2 focus:border-indigo-500 focus:ring-indigo-500">
        <TabHeader>Overview</TabHeader>
        <TabHeader>Hospitals</TabHeader>
        <TabHeader>Markets</TabHeader>
        <TabHeader>Army camps</TabHeader>
        <TabHeader>Merc camps</TabHeader>
        <TabHeader>Mines</TabHeader>
        <TabHeader>Digs</TabHeader>
        <TabHeader>Techs</TabHeader>
        <TabHeader>Arenas</TabHeader>
        <TabHeader>Mortars</TabHeader>
        <TabHeader>Advancements</TabHeader>
        <TabHeader>Artifacts</TabHeader>
        <TabHeader>Evaluator</TabHeader>
        <TabHeader>Guide</TabHeader>
        <TabHeader>Levels</TabHeader>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <OverView />
        </Tab.Panel>
        <Tab.Panel>
          <HospitalList />
        </Tab.Panel>
        <Tab.Panel>
          <MarketList />
        </Tab.Panel>
        <Tab.Panel>
          <ArmyCampList />
        </Tab.Panel>
        <Tab.Panel>
          <MercenaryList />
        </Tab.Panel>
        <Tab.Panel>
          <MineList />
        </Tab.Panel>
        <Tab.Panel>
          <DigSiteList />
        </Tab.Panel>
        <Tab.Panel>
          <TechList />
        </Tab.Panel>
        <Tab.Panel>
          <ArenaList />
        </Tab.Panel>
        <Tab.Panel>
          <MortarList />
        </Tab.Panel>
        <Tab.Panel>
          <AdvancementList />
        </Tab.Panel>
        <Tab.Panel>
          <ArtifactList />
        </Tab.Panel>
        <Tab.Panel>
          <Evaluator />
        </Tab.Panel>
        <Tab.Panel>
          <Guide />
        </Tab.Panel>
        <Tab.Panel>
          <LevelList />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
//TabList.whyDidYouRender = true;
export default TabList;
