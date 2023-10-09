import { Tabs } from "@lib/types/enums";

export type TabItem = {
  title: string;
  element: () => JSX.Element;
  tab: Tabs;
};
