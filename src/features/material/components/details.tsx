import { Material } from "../lib/types";
import MaterialRow from "./materialRow";

const MaterialDetails = (props: {
	materials: Material[];
	multiplier?: number;
	roundNumber?: "default" | "formatted" | "rounded" | "precision";
}) => {
  return (
    <>
      {props.materials.map((mat) => (
        <MaterialRow
          key={mat.Type}
          material={mat}
          multiplier={props.multiplier}
          roundNumber={props.roundNumber}
        />
      ))}
    </>
  );
};
export default MaterialDetails;
