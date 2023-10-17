import { formatNumber } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import { Material } from "../lib/types";
import Text from "@components/atoms/text";
import MaterialImage from "./image";

const MaterialRow = (props: {
  material: Material;
  multiplier?: number;
  roundNumber?: "default" | "formatted" | "rounded" | "precision";
}) => {
  const setActiveMat = useLevelStore((state) => state.SetActiveMaterial);
  const mult = props.multiplier ? props.multiplier : 1;
  const round =
    props.roundNumber !== undefined ? props.roundNumber : "formatted";
  const amount = props.material.Amount * mult;
  let amtStr = "";
  if (round == "default") {
    amtStr = amount.toString();
  } else if (round == "rounded") {
    amtStr = Math.ceil(amount).toString();
  } else if (round == "precision") {
    amtStr = (props.material.Amount * mult).toPrecision(2);
  }
  return (
    <Text
      mode="link"
      onClick={() => setActiveMat(props.material.Type)}
      className="flex items-center"
      size='xsmall'
    >
      <MaterialImage material={props.material} />
      {props.material.Amount > 0
        ? round == "formatted"
          ? formatNumber(amount)
          : amtStr
        : ""}
    </Text>
  );
};
export default MaterialRow;