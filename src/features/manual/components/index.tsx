import Section from "@components/atoms/section";
import { Disclosure } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Card from "@components/atoms/card";
const Manual = () => {
  return (
    <Section>
      <Section.Body>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex py-2 text-main">
                Manual
                <ChevronRightIcon
                  className={twMerge(
                    "h-6 w-6",
                    open ? "rotate-90 transform" : ""
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel>
                <Section.CardList>
                  <Card>
                    <Card.Header>General</Card.Header>
                    <Card.Body>
                      <ul className="list-disc ml-4 text-xs">
                        <li>Click on any zone on the map to get information about it.</li>
                        <li>To mark it as conquered it simply right click it.</li>
                        <li>You can click all the names of hospitals or other assets and it will be highlighted on the map as well</li>
                        <li>If you have a bonus highlighted you can use the toggle to mark all zones in the bonus as conquered</li>
                      </ul>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>Pathing</Card.Header>
                    <Card.Body>
                      <ul className="list-disc ml-4 text-xs">
                        <li>Click find path to get the cheapest path to the current zone.</li>
                        <li>This doesn't work for bonuses</li>
                        <li>Make sure to click conquer path to mark all zones passed through as conquered.</li>
                      </ul>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>Filters</Card.Header>
                    <Card.Body>
                      <ul className="list-disc ml-4 text-xs">
                        <li>You can filter the map to show the territories that is interesting for you.</li>
                        <li>On the tech page you can select if you want to use market strat to have it filter out the required items from each market</li>
                        <li>The map filter "Free" is based on your hospital saves.</li>
                        <li>If you click on conquer free on the hospital slide it will mark all zones that are free and connected to an already conquered zone</li>
                      </ul>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>Stats</Card.Header>
                    <Card.Body>
                      <ul className="list-disc ml-4 text-xs">
                        <li>If you update the advancements and artifacts you have it will be used in calculations.</li>
                        <li>Make sure to level up the hospitals to match their level in the game. Same goes for techs</li>
                        <li>The evaluator can give you a hint about the required armies and money to finish the level based on it's current state. It's not 100% accurate especially on levels like Triskelion</li>
                      </ul>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>Other</Card.Header>
                    <Card.Body>
                      <ul className="list-disc ml-4 text-xs">
                        <li>The dig site % is the efficiency of the dig. 100% is 8h 100% Uncommon.</li>
                        <li>Best material on market is the one that allows for most profit</li>
                        <li>The market profit is an estimation and not exact</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Section.CardList>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </Section.Body>
    </Section >
  )
}
export default Manual;