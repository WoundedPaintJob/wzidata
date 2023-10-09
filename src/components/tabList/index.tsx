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
import { PropsWithChildren } from "react";
import { TabItem } from "./types";
import { Tabs } from "@lib/types/enums";

const TabHeader = (props: PropsWithChildren) => {
  return (
    <Tab className="rounded-md px-3 py-2 text-sm ui-selected:bg-slate-600 text-main">
      {props.children}
    </Tab>
  );
};
const tabs: TabItem[] = [
  { title: "Overview", element: OverView, tab: Tabs.Overview },
  { title: "Hospitals", element: HospitalList, tab: Tabs.Hospitals },
  { title: "Markets", element: MarketList, tab: Tabs.Markets },
  { title: "Army camps", element: ArmyCampList, tab: Tabs.ArmyCamps },
  { title: "Merc camps", element: MercenaryList, tab: Tabs.MercenaryCamp },
  { title: "Mines", element: MineList, tab: Tabs.Mines },
  { title: "Digs", element: DigSiteList, tab: Tabs.DigSite },
  { title: "Techs", element: TechList, tab: Tabs.Techs },
  { title: "Arenas", element: ArenaList, tab: Tabs.Arenas },
  { title: "Mortars", element: MortarList, tab: Tabs.Mortars },
  { title: "Advancements", element: AdvancementList, tab: Tabs.Advancements },
  { title: "Artifacts", element: ArtifactList, tab: Tabs.Artifacts },
  { title: "Evaluator", element: Evaluator, tab: Tabs.Evaluator },
  { title: "Guide", element: Guide, tab: Tabs.Guide },
  { title: "Levels", element: LevelList, tab: Tabs.Levels },
];
const TabList = () => {
  const activeTab = useLevelStore((state) => state.ActiveTab);
  const setActiveTab = useLevelStore((state) => state.SetActiveTab);
  return (
    <Tab.Group
      manual
      selectedIndex={activeTab}
      onChange={(e) => setActiveTab(e)}
    >
      <div className="sm:hidden mx-2">
        <select
          id="tabs"
          name="tabs"
          defaultValue={
            tabs.find((tab) => tab.tab == activeTab)?.title || "Overview"
          }
          onChange={(e) => {
            void setActiveTab(parseInt(e.target.value));
          }}
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.tab} value={tab.tab}>
              {tab.title}
            </option>
          ))}
        </select>
      </div>
      <Tab.List className="hidden sm:block w-full rounded-md border-gray-300 pl-2 pr-2 focus:border-indigo-500 focus:ring-indigo-500">
        {tabs.map((tab) => (
          <TabHeader key={tab.tab}>{tab.title}</TabHeader>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab) => (
          <Tab.Panel key={tab.tab}>
            <tab.element />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
export default TabList;
