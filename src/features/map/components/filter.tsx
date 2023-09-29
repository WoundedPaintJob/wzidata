import Section from "@components/atoms/section";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import useLevelStore from "@lib/stores/levelStore";
import { RenderOptionType } from "@lib/types/enums";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { propsTypeToString } from "../lib/helper";
import Text from "@components/atoms/text";
import CheckBox from "@components/atoms/checkbox";
import usePlayerStore from "@lib/stores/playerStore";

const RenderOption = (props: { type: RenderOptionType }) => {
  const checkHandler = useLevelStore((state) => state.UpdateRenderOption);
  const settingsState = useLevelStore((state) => state.RenderOptions);
  const checked = settingsState.has(props.type)
    ? settingsState.get(props.type)
    : false;
  return (
    <div className="flex">
      <CheckBox
        checked={checked || false}
        onClick={() => checkHandler(props.type)}
      />
      <Text size="small" className="ml-1">
        {propsTypeToString(props.type)}
      </Text>
    </div>
  );
};

const RenderColumn = (props: PropsWithChildren<{ header: string }>) => {
  return (
    <div className="col-span-1">
      <Text size="body">{props.header}</Text>
      <div className="flex flex-col">{props.children}</div>
    </div>
  );
};
const MapFilter = () => {
  const wideMap = usePlayerStore((state) => state.WideMap);
  const toggleWide = usePlayerStore((state) => state.ToggleWideMap);
  return (
    <Section>
      <Section.Body>
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex py-2 text-main">
                Filters
                <ChevronRightIcon
                  className={twMerge(
                    "h-6 w-6",
                    open ? "rotate-90 transform" : ""
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="grid grid-cols-2">
                  <RenderColumn header="General">
                    <RenderOption type={RenderOptionType.Market} />
                    <RenderOption type={RenderOptionType.Hospital} />
                    <RenderOption type={RenderOptionType.ArmyCamp} />
                    <RenderOption type={RenderOptionType.MercenaryCamp} />
                  </RenderColumn>
                  <RenderColumn header="Mixed">
                    <RenderOption type={RenderOptionType.Mine} />
                    <RenderOption type={RenderOptionType.Smelter} />
                    <RenderOption type={RenderOptionType.Crafter} />
                    <RenderOption type={RenderOptionType.Recipe} />
                  </RenderColumn>
                  <RenderColumn header="Cache">
                    <RenderOption type={RenderOptionType.CacheArmy} />
                    <RenderOption type={RenderOptionType.CacheMoney} />
                    <RenderOption type={RenderOptionType.CacheResource} />
                  </RenderColumn>
                  <RenderColumn header="Other">
                    <RenderOption type={RenderOptionType.Arena} />
                    <RenderOption type={RenderOptionType.Mortar} />
                    <RenderOption type={RenderOptionType.DigSite} />
                  </RenderColumn>
                  <RenderColumn header="Map Settings">
                    <RenderOption type={RenderOptionType.Conquered} />
                    <RenderOption type={RenderOptionType.MostExpensive} />
                    <RenderOption type={RenderOptionType.Cost} />
                    <RenderOption type={RenderOptionType.FreeZones} />
                    <div className="flex">
                      <CheckBox
                        checked={wideMap}
                        onClick={() => toggleWide()}
                      />
                      <Text size="small" className="ml-1">
                        Wider map
                      </Text>
                    </div>
                  </RenderColumn>
                  <RenderColumn header="Bonuses">
                    <RenderOption type={RenderOptionType.BonusZones} />
                    <RenderOption type={RenderOptionType.MoneyPerSecond} />
                  </RenderColumn>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </Section.Body>
    </Section>
  );
};
export default MapFilter;
