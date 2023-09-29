import Card from "@components/atoms/card";
import CheckBox from "@components/atoms/checkbox";
import MaterialDetails from "@features/material/components/details";
import useLevelStore from "@lib/stores/levelStore";
import { TechState } from "../lib/types";
import { Settings } from "src/settings";
import { twMerge } from "tailwind-merge";

const Tech = (props: {
  tech: TechState;
  costMultiplier: number;
  highlight: boolean;
}) => {
  const toggle = useLevelStore((state) => state.ToggleTech);
  return (
    <Card
      size={props.highlight ? "small" : "xsmall"}
      mode={
        props.tech.Bought && props.highlight
          ? "semi"
          : props.highlight
          ? "normal"
          : "passive"
      }
      className={twMerge("", props.highlight ? "" : "")}
    >
      <Card.Body>
        <div className="flex flex-col">
          <img
            src={`${Settings.ResourceUrl}${props.tech.Image}`}
            alt={props.tech.Name}
            title={props.tech.Name}
            className="m-1 w-4 sm:w-8 sm:m-2 bg-black collapse sm:visible"
          />
          <CheckBox
            checked={props.tech.Bought || false}
            onClick={() => toggle(props.tech)}
            className={twMerge("m-1", props.highlight ? "visible" : "collapse")}
          />
        </div>
        <MaterialDetails
          materials={props.tech.Materials}
          multiplier={props.costMultiplier}
          roundNumber={"rounded"}
        />
      </Card.Body>
    </Card>
  );
};

export default Tech;
